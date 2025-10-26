
import { BannerHero } from "@/components/banner-hero";
import { FeaturesSection } from "@/components/features-section";
import { ModelOfPeriod } from "@/components/model-of-period";
import { TestimonialsSection } from "@/components/testimonials-section";

export default function HomePage() {
  const models = [
    {
      id: "1",
      name: "Stacy",
      avatar: "/beautiful-black-woman-model-1.jpg",
      images: [
        "/beautiful-black-woman-model-1.jpg",
        "/beautiful-black-woman-model-2.jpg",
        "/beautiful-black-woman-model-3.jpg",
      ],
      likes: 1000,
      awardType: "day",
    },
    {
      id: "2",
      name: "Tracy",
      avatar: "/beautiful-black-woman-model-2.jpg",
      images: [
        "/beautiful-black-woman-model-4.jpg",
        "/beautiful-black-woman-model-5.jpg",
        "/couple-2.jpg",
      ],
      likes: 2000,
      awardType: "week",
    },
    {
      id: "3",
      name: "Stacy",
      avatar: "/beautiful-black-woman-model-3.jpg",
      images: [
        "/couple-3.jpg",
        "/couple-4.jpg",
        "/couple-5.jpg",
      ],
      likes: 3000,
      awardType: "month",
    },
  ];

  return (
    <>
      <BannerHero
        image="/hero-banner.jpg"
        title="Welcome to Eboni"
        subtitle="The best place to find your soulmate."
        cta={{
          text: "Get Started",
          href: "/auth/sign-up",
        }}
        aria-label="Find your soulmate on Eboni, the best place for black singles to connect."
      />
      <FeaturesSection />
      <ModelOfPeriod models={models} />
      <TestimonialsSection />
    </>
  );
}
