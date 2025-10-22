"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getCountries, getCitiesByCountry } from "@/lib/countries-data"
import { Loader2, Mail, Upload } from "lucide-react"
import { MembershipSelector } from "./membership-selector"
import Image from "next/image"

export function EnhancedSignupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [userType, setUserType] = useState<"user" | "model">("user")
  const [membershipTier, setMembershipTier] = useState("free")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null)
  const [uploadingPicture, setUploadingPicture] = useState(false)

  const countries = getCountries()
  const cities = country ? getCitiesByCountry(country) : []
  const requiresPayment = membershipTier !== "free"

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Profile picture must be less than 5MB")
        return
      }
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file")
        return
      }
      setProfilePicture(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadProfilePicture = async (): Promise<string | null> => {
    if (!profilePicture) return null

    setUploadingPicture(true)
    try {
      const formData = new FormData()
      formData.append("file", profilePicture)

      const response = await fetch("/api/upload-profile-picture", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Failed to upload profile picture")

      const data = await response.json()
      return data.url
    } catch (err) {
      setError("Failed to upload profile picture")
      return null
    } finally {
      setUploadingPicture(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!email || !password || !fullName || !phone || !country || !city) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setLoading(false)
      return
    }

    if (requiresPayment && !paymentMethod) {
      setError("Please select a payment method for premium membership")
      setLoading(false)
      return
    }

    if (!termsAccepted) {
      setError("You must accept the terms and conditions")
      setLoading(false)
      return
    }

    try {
      let profilePhotoUrl = null
      if (profilePicture) {
        profilePhotoUrl = await uploadProfilePicture()
        if (!profilePhotoUrl) {
          setLoading(false)
          return
        }
      }

      const supabase = createClient()
      const redirectUrl = process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            phone,
            country,
            city,
            user_type: userType,
            membership_tier: membershipTier,
            profile_photo_url: profilePhotoUrl,
            terms_accepted: true,
            terms_accepted_at: new Date().toISOString(),
          },
        },
      })

      if (authError) throw authError

      if (authData.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: authData.user.id,
          email: authData.user.email,
          full_name: fullName,
          phone,
          country,
          city,
          user_type: userType,
          subscription_tier: membershipTier,
          profile_photo_url: profilePhotoUrl,
          email_verified: false,
          gallery_access: membershipTier !== "free",
          terms_accepted: true,
          terms_accepted_at: new Date().toISOString(),
        })

        if (profileError) {
          setError("Failed to create profile. Please try again.")
          return
        }

        if (requiresPayment) {
          try {
            const response = await fetch("/api/create-checkout-session", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: authData.user.id,
                tier: membershipTier,
                email: email,
              }),
            })

            if (response.ok) {
              const { url } = await response.json()
              window.location.href = url
              return
            }
          } catch (err) {
            setError("Payment processing failed. Please try again.")
            return
          }
        }

        setSuccess(true)
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during sign up. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (err: any) {
      setError(err.message || "Failed to sign up with Google")
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-5 w-5 text-amber-600" />
            <CardTitle>Check Your Email</CardTitle>
          </div>
          <CardDescription>We've sent a verification link to {email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-amber-50 border-amber-200">
            <AlertDescription className="text-amber-900">
              <strong>Important:</strong> Please check your email inbox (and spam folder) for a verification link from
              Eboni Dating. You must verify your email before you can log in.
            </AlertDescription>
          </Alert>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>The verification link will expire in 24 hours.</p>
            <p>
              Didn't receive the email?{" "}
              <button onClick={() => setSuccess(false)} className="text-amber-600 hover:underline font-medium">
                Try signing up again
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Create Your Account</CardTitle>
        <CardDescription>Join the Eboni Dating community today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full border-2 hover:bg-gray-50 bg-transparent"
            onClick={handleGoogleSignUp}
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <MembershipSelector selectedPlan={membershipTier} onSelect={setMembershipTier} />

          <div className="space-y-2">
            <Label htmlFor="profilePicture">Profile Picture (Optional)</Label>
            <div className="flex items-center gap-4">
              {profilePicturePreview ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-amber-600">
                  <Image
                    src={profilePicturePreview || "/placeholder.svg"}
                    alt="Profile preview"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <div className="flex-1">
                <Input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-1">Max size: 5MB. Formats: JPG, PNG, WebP</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 234 567 8900"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userType">Account Type *</Label>
              <Select value={userType} onValueChange={(value: "user" | "model") => setUserType(value)}>
                <SelectTrigger id="userType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Regular User</SelectItem>
                  <SelectItem value="model">Model</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Select
                value={country}
                onValueChange={(value) => {
                  setCountry(value)
                  setCity("")
                }}
              >
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Select value={city} onValueChange={setCity} disabled={!country}>
                <SelectTrigger id="city">
                  <SelectValue placeholder={country ? "Select city" : "Select country first"} />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {requiresPayment && (
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method *</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="apple">Apple Pay</SelectItem>
                  <SelectItem value="google">Google Pay</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-4 pt-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                I agree to the Terms and Conditions and Privacy Policy. I understand that I must be 18 years or older to
                use this service. I consent to receive communications and understand that my information will be
                processed according to the privacy policy.
              </Label>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700"
            disabled={loading || uploadingPicture}
          >
            {loading || uploadingPicture ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {uploadingPicture
                  ? "Uploading Picture..."
                  : requiresPayment
                    ? "Processing Payment..."
                    : "Creating Account..."}
              </>
            ) : (
              `Create Account${requiresPayment ? " & Pay" : ""}`
            )}
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <a href="/auth/login" className="text-amber-600 hover:underline font-medium">
              Log in
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
