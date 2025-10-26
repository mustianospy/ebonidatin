
import { Heart, Search, Users, Shield } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Heart className="w-12 h-12 text-red-500" />,
      title: "Smart Matching",
      description:
        "Our smart matching algorithm helps you find the most compatible partners based on your interests, values, and preferences.",
    },
    {
      icon: <Search className="w-12 h-12 text-blue-500" />,
      title: "Advanced Search",
      description:
        "Filter profiles by location, age, religion, and more to find exactly who you're looking for.",
    },
    {
      icon: <Users className="w-12 h-12 text-green-500" />,
      title: "Vibrant Community",
      description:
        "Join a thriving community of black singles and connect with people who share your culture and values.",
    },
    {
      icon: <Shield className="w-12 h-12 text-yellow-500" />,
      title: "Safe & Secure",
      description:
        "We prioritize your safety with advanced security features and a dedicated team to ensure a secure dating experience.",
    },
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800" aria-labelledby="features-heading">
      <div className="container mx-auto px-4">
        <h2 id="features-heading" className="text-3xl font-bold text-center mb-8">
          Why Choose Eboni?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
