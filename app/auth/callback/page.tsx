"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code");
        if (!code) throw new Error("Missing verification code");

        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) throw new Error("Invalid or expired verification link");

        // Optionally update profile email_verified field
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from("profiles").update({ email_verified: true }).eq("id", user.id);
        }

        setStatus("success");
        setMessage("Email verified successfully! Redirecting to dashboard...");

        setTimeout(() => router.push("/dashboard"), 2000);
      } catch (error: any) {
        console.error("Auth callback error:", error);
        setStatus("error");
        setMessage(error.message || "An error occurred during verification");
      }
    };

    handleCallback();
  }, [router, searchParams, supabase]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-b from-amber-50 to-white">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {status === "loading" && <Loader2 className="h-5 w-5 animate-spin text-amber-600" />}
            {status === "success" && <CheckCircle className="h-5 w-5 text-green-600" />}
            {status === "error" && <XCircle className="h-5 w-5 text-red-600" />}
            Email Verification
          </CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        {status === "error" && (
          <CardContent className="space-y-2">
            <Button onClick={() => router.push("/auth/sign-up")} className="w-full bg-amber-600 hover:bg-amber-700">
              Sign Up Again
            </Button>
            <Button onClick={() => router.push("/auth/login")} variant="outline" className="w-full">
              Go to Login
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
