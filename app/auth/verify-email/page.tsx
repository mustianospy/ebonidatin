import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
          <CardDescription>Check your inbox for a verification link</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We've sent a verification email to your inbox. Click the link in the email to verify your account and get
            started.
          </p>

          <div className="rounded-md bg-muted p-4">
            <p className="text-sm font-medium">Didn't receive an email?</p>
            <p className="text-sm text-muted-foreground mt-1">Check your spam folder or try signing up again.</p>
          </div>

          <Link href="/auth/login" className="block">
            <Button variant="outline" className="w-full bg-transparent">
              Back to Sign In
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
