import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const sliderImages = [
    "/images/slider/couple1.jpg",
    "/images/slider/couple2.jpg", 
    "/images/slider/couple3.jpg",
    "/images/slider/couple4.jpg",
    "/images/slider/couple5.jpg"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Find Love, Build Connections,
            <br />
            <span className="text-yellow-400">Celebrate Black Love</span>
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of singles worldwide in a safe, culturally-rich dating community.
          </p>
          
          {/* Signup Form */}
          <div className="bg-black/50 rounded-2xl p-8 max-w-2xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input 
                type="text" 
                placeholder="Name" 
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400"
              />
              <input 
                type="number" 
                placeholder="Age" 
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 md:col-span-2"
              />
              <select className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white">
                <option value="">I'm a...</option>
                <option value="man">Man looking for a woman</option>
                <option value="woman">Woman looking for a man</option>
                <option value="both">Open to all</option>
              </select>
            </div>
            <Link 
              href="/auth/sign-up"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg w-full block transition-colors text-center"
            >
              Join Free Today
            </Link>
          </div>
        </div>
      </section>

      {/* Image Slider Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Success Stories</h2>
          <p className="text-xl text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            Real couples who found love through Eboni Dating
          </p>
          
          {/* Image Slider */}
          <div className="relative">
            <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
              {sliderImages.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-80 h-96 relative rounded-2xl overflow-hidden snap-center group">
                  <Image
                    src={image}
                    alt={`Happy couple ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                  {/* Overlay with couple number */}
                  <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-bold">Couple #{index + 1}</h3>
                      <p className="text-sm opacity-90">Found love on Eboni Dating</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Instructions */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              ← Scroll to see more success stories →
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Members</h3>
              <p className="text-gray-400">Profiles you can trust</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
              <p className="text-gray-400">AI powered connections</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Rich Communication</h3>
              <p className="text-gray-400">Chat, voice, and video calls</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Privacy First</h3>
              <p className="text-gray-400">Your data is our top priority</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Membership Plans</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-4">Free</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Basic Matching
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Limited Messages
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="text-gray-400 mr-2">✗</span>
                  Video calls
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="text-gray-400 mr-2">✗</span>
                  Priority Support
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Unlimited Matches
                </li>
              </ul>
              <Link 
                href="/auth/sign-up"
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors block text-center"
              >
                Get Started
              </Link>
            </div>

            {/* Plus Plan */}
            <div className="bg-yellow-500 text-black rounded-2xl p-8 border-2 border-yellow-400 transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Plus</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-black mr-2">✓</span>
                  Unlimited Messages
                </li>
                <li className="flex items-center">
                  <span className="text-black mr-2">✓</span>
                  Video calls
                </li>
                <li className="flex items-center">
                  <span className="text-black mr-2">✓</span>
                  Priority Support
                </li>
                <li className="flex items-center">
                  <span className="text-black mr-2">✓</span>
                  Unlimited Matches
                </li>
              </ul>
              <Link 
                href="/pricing"
                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition-colors block text-center"
              >
                Choose Plus
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-4">Premium</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Unlimited Messages
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Video calls
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Priority Support
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Unlimited Matches
                </li>
              </ul>
              <Link 
                href="/pricing"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-semibold transition-colors block text-center"
              >
                Choose Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">Real Love Stories from Eboni Dating</h2>
          <p className="text-gray-400 mb-8">Choose Your Plan</p>
          <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
            <p className="text-xl italic mb-4">
              "We matched in 2023, got married in 2024. Thank you, Eboni Dating!"
            </p>
            <p className="text-yellow-400 font-semibold">~Jasmine & Malik</p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">Join Our Community</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Join thousands of singles who have found meaningful connections through our platform.
        </p>
        <Link 
          href="/auth/sign-up"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg inline-block transition-colors"
        >
          Start Your Journey Today
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-yellow-400">Eboni Dating</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/pricing" className="hover:text-white transition-colors">
                Pricing
              </Link>
            </div>
          </div>

          <div className="text-center mt-6 text-sm text-gray-500">
            © 2025 Eboni Dating. All rights reserved.
            <br />Celebrating Black Love and Meaningful Connections.
          </div>
        </div>
      </footer>
    </div>
  )
}
