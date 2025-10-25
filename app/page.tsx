
import { BannerHero } from "@/components/banner-hero";
import { ModelOfPeriod } from "@/components/model-of-period";

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
    <div className="m-4">
      <BannerHero
        image="/couple-1.jpg"
        title="Welcome to Eboni"
        subtitle="The best place to find your soulmate."
        cta={{
          text: "Get Started",
          href: "/auth/sign-up",
          // Suggestion: Log a 'select_content' event here for analytics.
          // This can help you track how many users are starting the sign-up process
          // from the homepage banner.
          // Example:
          // onClick: () => {
          //   analytics.logEvent('select_content', {
          //     content_type: 'button',
          //     item_id: 'get_started_banner',
          //   });
          // }
        }}
      />
      <div className="mt-8">
        <ModelOfPeriod models={models} />
      </div>
    </div>
  );
}
