export function MembershipPlansSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Start your journey",
      features: ["Basic matching", "Limited messages", "Standard profile", "Community access"],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Premium", 
      price: "$29",
      period: "/month",
      description: "Most popular choice",
      features: ["Unlimited matching", "Unlimited messages", "Video calls", "Priority support", "Advanced filters"],
      cta: "Try Free 7 Days",
      popular: true
    },
    {
      name: "Elite",
      price: "$49", 
      period: "/month",
      description: "For serious connections",
      features: ["Everything in Premium", "Personal matchmaker", "Profile highlighting", "VIP event access"],
      cta: "Start Elite Journey",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="w-full py-12 sm:py-16 md:py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Choose Your Journey
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Flexible plans designed to help you find meaningful connections.
          </p>
        </div>

        {/* Pricing Cards - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`rounded-xl sm:rounded-2xl border-2 p-4 sm:p-6 md:p-8 relative transition-all hover:scale-105 min-h-[500px] flex flex-col ${
                plan.popular 
                  ? 'border-amber-500 bg-amber-50 shadow-xl' 
                  : 'border-gray-200 shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}
              
              {/* Plan Header */}
              <div className="text-center mb-4 sm:mb-6 flex-shrink-0">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-3xl sm:text-4xl font-bold text-amber-600">{plan.price}</span>
                  {plan.period && <span className="text-gray-600 text-sm sm:text-base">{plan.period}</span>}
                </div>
                <p className="text-gray-600 text-sm sm:text-base">{plan.description}</p>
              </div>

              {/* Features List */}
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                    <span className="text-amber-500 text-lg flex-shrink-0">✓</span>
                    <span className="text-gray-700 text-sm sm:text-base leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button 
                className={`w-full py-3 px-4 sm:py-3 sm:px-6 rounded-full font-bold transition-all text-sm sm:text-base mt-auto flex-shrink-0 ${
                  plan.popular
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-gray-900 hover:bg-black text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 items-center text-xs sm:text-sm">
            {['SSL Secure Payment', '7-Day Guarantee', 'Cancel Anytime'].map((text, index) => (
              <div key={index} className="flex items-center gap-1 sm:gap-2">
                <span className="text-amber-500">✓</span>
                <span className="text-gray-700 whitespace-nowrap">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
