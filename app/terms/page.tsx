import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/auth/signup">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign Up
          </Link>
        </Button>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
              Terms of Service
            </CardTitle>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Eboni Dating ("the Service"), you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to these Terms of Service, please do not use the
                Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">2. Eligibility</h2>
              <p className="text-gray-700 leading-relaxed">
                You must be at least 18 years old to use this Service. By using the Service, you represent and warrant
                that you have the right, authority, and capacity to enter into this agreement and to abide by all of the
                terms and conditions set forth herein.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">3. Account Registration</h2>
              <p className="text-gray-700 leading-relaxed">
                To use certain features of the Service, you must register for an account. You agree to provide accurate,
                current, and complete information during the registration process and to update such information to keep
                it accurate, current, and complete. You are responsible for safeguarding your password and for all
                activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">4. User Conduct</h2>
              <p className="text-gray-700 leading-relaxed">You agree not to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  Use the Service for any illegal purpose or in violation of any local, state, national, or
                  international law
                </li>
                <li>Harass, threaten, demean, embarrass, or otherwise harm any other user</li>
                <li>
                  Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or
                  entity
                </li>
                <li>Post or transmit any content that is defamatory, obscene, pornographic, abusive, or offensive</li>
                <li>Use the Service to engage in commercial activities without our prior written consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">5. Content</h2>
              <p className="text-gray-700 leading-relaxed">
                You retain all rights to the content you post on the Service. By posting content, you grant us a
                worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish,
                transmit, display, and distribute such content in any and all media or distribution methods.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">6. Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Your use of the Service is also governed by our Privacy Policy. Please review our Privacy Policy, which
                explains how we collect, use, and disclose information that pertains to your privacy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">7. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice
                or liability, under our sole discretion, for any reason whatsoever, including without limitation if you
                breach the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                In no event shall Eboni Dating, nor its directors, employees, partners, agents, suppliers, or
                affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages,
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">9. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                provide at least 30 days' notice prior to any new terms taking effect.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">10. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms, please contact us at support@ebonidating.com
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
