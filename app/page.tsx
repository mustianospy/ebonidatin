"use client";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 text-yellow-500">
          Find Love, Build Connections, Celebrate Black Love
        </h1>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8">
          Join thousands of singles connecting every day on Eboni Dating. Where real love meets authenticity.
        </p>

        {/* Signup Form */}
        <form className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Name"
            className="w-full sm:w-auto flex-1 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="number"
            placeholder="Age"
            className="w-full sm:w-auto flex-1 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full sm:w-auto flex-1 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-yellow-500"
          />
          <select className="w-full sm:w-auto flex-1 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-yellow-500">
            <option>I'm a...</option>
            <option>Man Seeking Woman</option>
            <option>Woman Seeking Man</option>
          </select>
          <button
            type="submit"
            className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-500 text-white font-semibold rounded-lg p-3 touch-button"
          >
            Join Free Today
          </button>
        </form>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-yellow-500">Why Choose Eboni Dating?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Authentic Profiles", desc: "Real people. Real love stories." },
              { title: "Private & Secure", desc: "Your information stays safe with us." },
              { title: "Smart Matching", desc: "We connect you with compatible singles." },
              { title: "Community Vibes", desc: "Celebrate love, culture, and connection." },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition"
              >
                <h3 className="text-xl font-semibold text-yellow-500 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-10">Choose Your Membership Plan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { plan: "Free", price: "$0", features: ["Basic Matchmaking", "Profile Setup"] },
              { plan: "Premium", price: "$19.99/mo", features: ["Advanced Matchmaking", "Unlimited Chats", "Priority Support"] },
              { plan: "Elite", price: "$49.99/mo", features: ["Everything in Premium", "Verified Badge", "Video Calls"] },
            ].map((p, i) => (
              <div key={i} className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-105 transition">
                <h3 className="text-xl font-semibold text-yellow-500 mb-3">{p.plan}</h3>
                <p className="text-3xl font-bold mb-4">{p.price}</p>
                <ul className="text-gray-300 text-sm mb-6 space-y-2">
                  {p.features.map((f, j) => (
                    <li key={j}>• {f}</li>
                  ))}
                </ul>
                <button className="bg-yellow-600 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-10">
            Join Our Thriving Community
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Image
                key={i}
                src={`/community${i + 1}.jpg`}
                alt={`Community member ${i + 1}`}
                width={300}
                height={300}
                className="rounded-xl object-cover w-full h-auto hover:opacity-90 transition"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center border-t border-gray-700">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Eboni Dating — All rights reserved.
        </p>
      </footer>
    </main>
  );
}
