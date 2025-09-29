import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
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
              Privacy Policy
            </CardTitle>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">1. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed">
                We collect information you provide directly to us when you create an account, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Personal information (name, email address, date of birth, phone number)</li>
                <li>Location information (country, city, address)</li>
                <li>Profile information (photos, bio, interests, preferences)</li>
                <li>Communication data (messages, interactions with other users)</li>
                <li>Payment information (for premium features)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">2. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Create and manage your account</li>
                <li>Match you with other users based on your preferences</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, prevent, and address fraud and other illegal activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">3. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>With other users as part of the normal operation of the Service</li>
                <li>With service providers who perform services on our behalf</li>
                <li>If required by law or to protect our rights</li>
                <li>In connection with a merger, sale, or acquisition of all or part of our company</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">4. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We take reasonable measures to help protect your personal information from loss, theft, misuse,
                unauthorized access, disclosure, alteration, and destruction. However, no internet or email transmission
                is ever fully secure or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">5. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access and receive a copy of your personal information</li>
                <li>Correct or update your personal information</li>
                <li>Delete your account and personal information</li>
                <li>Object to or restrict certain processing of your information</li>
                <li>Withdraw consent where we rely on consent to process your information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">6. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information for as long as necessary to provide our services and for legitimate
                business purposes. If you delete your account, we will delete your information within 30 days, except
                where we are required to retain it for legal purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">7. Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to collect information about your browsing activities
                and to distinguish you from other users. This helps us provide you with a better experience and improve
                our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">8. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Service is not intended for users under the age of 18. We do not knowingly collect personal
                information from children under 18. If you become aware that a child has provided us with personal
                information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">9. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">10. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at privacy@ebonidating.com
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
