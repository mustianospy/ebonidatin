export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 to-rose-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto text-center">
        {/* Main Heading - Responsive sizing */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
          Find Authentic <span className="text-amber-300 block md:inline">Black Love</span>
        </h1>
        
        {/* Subtitle - Responsive text */}
        <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
          Join thousands of Black singles in a culturally-rich community that celebrates our heritage.
        </p>
        
        {/* Trust Badges - Responsive grid */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-8 px-4">
          {[
            { icon: 'ShieldCheck', text: 'Verified Members' },
            { icon: 'Heart', text: 'Cultural Matching' },
            { icon: 'Users', text: 'Safe & Inclusive' }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 bg-black/30 px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base">
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons - Responsive layout */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <button className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-base sm:text-lg transition-all transform hover:scale-105 min-h-[50px] flex items-center justify-center">
            Join Free Today
          </button>
          <button className="w-full sm:w-auto border-2 border-white hover:bg-white hover:text-amber-900 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-base sm:text-lg transition-all min-h-[50px] flex items-center justify-center">
            See Success Stories
          </button>
        </div>
        
        {/* Footer text */}
        <p className="mt-6 text-amber-200 text-sm sm:text-base px-4">
          LGBTQ+ inclusive • Privacy focused • Community driven
        </p>
      </div>
    </section>
  );
}
