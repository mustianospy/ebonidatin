
"use client";

import type React from "react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getCountries, getCitiesByCountry } from "@/lib/countries-data";
import { Loader2, Mail, Upload, ShieldCheck } from "lucide-react";
import { MembershipSelector } from "./membership-selector";
import Image from "next/image";

export function EnhancedSignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userType, setUserType] = useState<"user" | "model">("user");
  const [membershipTier, setMembershipTier] = useState("free");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
  const [uploadingPicture, setUploadingPicture] = useState(false);

  const countries = getCountries();
  const cities = country ? getCitiesByCountry(country) : [];
  const requiresPayment = membershipTier !== "free";

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file));
    }
  };

  const uploadProfilePicture = async (): Promise<string | null> => {
    if (!profilePicture) return null;

    setUploadingPicture(true);
    try {
      const supabase = createClient();
      const fileName = `${Date.now()}_${profilePicture.name}`;
      const { data, error } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, profilePicture);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(data.path);

      return publicUrlData.publicUrl;
    } catch (err: any) {
      setError("Failed to upload profile picture. Please try again.");
      return null;
    } finally {
      setUploadingPicture(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password || !fullName || !phone || !country || !city) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      setError("Password must contain uppercase, lowercase, and numeric characters");
      setLoading(false);
      return;
    }

    if (requiresPayment && !paymentMethod) {
      setError("Please select a payment method for premium membership");
      setLoading(false);
      return;
    }

    if (!termsAccepted) {
      setError("You must accept the terms and conditions");
      setLoading(false);
      return;
    }

    try {
      let profilePhotoUrl = null;
      if (profilePicture) {
        profilePhotoUrl = await uploadProfilePicture();
        if (!profilePhotoUrl) {
          setLoading(false);
          return;
        }
      }

      const supabase = createClient();
      const redirectUrl = process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`;

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
      });

      if (authError) throw authError;

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
        });

        if (profileError) {
          setError("Failed to create profile. Please try again.");
          return;
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
            });

            if (response.ok) {
              const { url } = await response.json();
              window.location.href = url;
              return;
            } else {
              const errorData = await response.json();
              setError(errorData.error || "Payment processing failed. Please try again.");
            }
          } catch (err) {
            setError("Payment processing failed. Please try again.");
          }
          return;
        }

        setSuccess(true);
      }
    } catch (err: any) {
      if (err.message.includes("already registered")) {
        setError("This email address is already registered. Please log in or use a different email.");
      } else if (err.message.includes("rate limit")) {
        setError("You are signing up too frequently. Please try again later.");
      } else {
        setError(err.message || "An error occurred during sign up. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const supabase = createClient();
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        setError(error.message);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during Google sign up. Please try again.");
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-5 w-5 text-green-600" />
            <CardTitle>Verification Required</CardTitle>
          </div>
          <CardDescription>We've sent a verification link to {email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-900">
              <strong>Action Required:</strong> To complete your registration, please check your email and click the verification link.
            </AlertDescription>
          </Alert>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>The verification link will expire in 10 minutes.</p>
            <p>
              Didn't receive the email? Check your spam folder or{" "}
              <button onClick={() => setSuccess(false)} className="text-amber-600 hover:underline font-medium">
                try signing up again
              </button>.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-gray-800">Create your Account</CardTitle>
        <CardDescription className="text-center text-gray-500">Join our community and find your match</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <Label htmlFor="profilePicture" className="cursor-pointer">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {profilePicturePreview ? (
                    <Image src={profilePicturePreview} alt="Profile preview" width={128} height={128} className="object-cover" />
                  ) : (
                    <Upload className="h-12 w-12 text-gray-400" />
                  )}
                </div>
              </Label>
              <Input id="profilePicture" type="file" accept="image/*" onChange={handleProfilePictureChange} className="hidden" />
              <Button type="button" onClick={() => document.getElementById('profilePicture')?.click()} disabled={uploadingPicture}>
                {uploadingPicture ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />} Upload Picture
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="Eboni Johnson" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="********" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+1 (555) 555-5555" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select onValueChange={setCountry} value={country}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select onValueChange={setCity} value={city} disabled={!country}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>I am a...</Label>
              <Select onValueChange={(value) => setUserType(value as "user" | "model")} value={userType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="model">Model</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <MembershipSelector selectedPlan={membershipTier} onSelect={setMembershipTier} />

            {requiresPayment && (
              <div className="space-y-2">
                <Label>Payment Method</Label>
                {/* Placeholder for Payment Method Selection */}
                <p className="text-sm text-gray-500">Payment integration would go here.</p>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={termsAccepted} onCheckedChange={(checked) => setTermsAccepted(!!checked)} />
              <Label htmlFor="terms" className="text-sm font-normal">I accept the <a href="/terms" className="underline">terms and conditions</a></Label>
            </div>
          </div>

          <div className="md:col-span-2">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Sign Up
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignUp} disabled={loading}>
              <Mail className="mr-2 h-4 w-4" /> Sign Up with Google
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
