import EmblaCarousel from './EmblaCarousel'
import { useTranslations } from '@/lib/i18n/use-translations'

export default function HeroSection() {
  const { t } = useTranslations()

  return (
    <section className="relative flex flex-col justify-center items-center min-h-[500px] bg-black">
      <div className="absolute inset-0 w-full h-full">
        <EmblaCarousel
          images={[
            '/couple1.jpg',
            '/couple2.jpg',
            '/couple3.jpg',
            '/couple4.jpg',
            '/couple5.jpg',
          ]}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
      </div>
      <div className="relative z-10 max-w-2xl w-full px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {t.home.title}
        </h1>
        <p className="text-lg md:text-xl text-white mb-8">{t.home.subtitle}</p>
        <form className="flex flex-col md:flex-row justify-center items-center gap-2 bg-black/60 p-4 rounded-lg w-full max-w-xl mx-auto">
          <input className="px-4 py-2 rounded bg-white/80 text-black" placeholder="Name" required />
          <input className="px-4 py-2 rounded bg-white/80 text-black" placeholder="Age" type="number" required />
          <input className="px-4 py-2 rounded bg-white/80 text-black" placeholder="Email" type="email" required />
          <select className="px-4 py-2 rounded bg-white/80 text-black" required>
            <option value="">I'm a...</option>
            <option value="man">Man</option>
            <option value="woman">Woman</option>
            <option value="other">Other</option>
          </select>
          <button className="bg-yellow-600 text-white font-bold px-6 py-2 rounded hover:bg-yellow-700 transition">
            {t.home.cta}
          </button>
        </form>
      </div>
    </section>
  )
}
