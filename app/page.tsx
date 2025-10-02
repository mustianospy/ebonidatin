import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import MembershipPlansSection from '@/components/MembershipPlansSection'
import TestimonialSection from '@/components/TestimonialSection'
import CommunitySection from '@/components/CommunitySection'

export default function HomePage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <MembershipPlansSection />
      <TestimonialSection />
      <CommunitySection />
    </main>
  )
}
