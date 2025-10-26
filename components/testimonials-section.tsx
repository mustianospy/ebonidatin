
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Tasha",
      role: "Software Engineer",
      testimonial: `"Eboni is a game-changer! I met the love of my life here. The platform is easy to use and full of genuine people. Highly recommended!"`,
      avatar: "/model-1.jpg",
    },
    {
      name: "James",
      role: "Doctor",
      testimonial: `"I was skeptical about online dating, but Eboni proved me wrong. I found someone special who shares my values and interests. Thank you, Eboni!"`,
      avatar: "/model-2.jpg",
    },
    {
      name: "Simone",
      role: "Lawyer",
      testimonial: `"A fantastic app for black professionals. The quality of profiles is impressive, and the smart matching feature is brilliant. I'm now in a happy relationship!"`,
      avatar: "/model-3.jpg",
    },
  ];

  return (
    <section className="py-12" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4">
        <h2 id="testimonials-heading" className="text-3xl font-bold text-center mb-8">
          What Our Members Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{testimonial.testimonial}</p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
