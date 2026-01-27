import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useContent } from '../context/ContentContext'
import AnimatedSection from '../components/AnimatedSection'
import MagneticButton from '../components/MagneticButton'
import StaggeredText from '../components/StaggeredText'

// Icon mapping for About Values
const getAboutIcon = (type) => {
  const icons = {
    precision: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    respect: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    innovation: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
        <line x1="9.69" y1="8" x2="21.17" y2="8" />
        <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
        <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
        <line x1="14.31" y1="16" x2="2.83" y2="16" />
        <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
      </svg>
    ),
  }
  return icons[type] || icons.precision
}

export default function About() {
  const { achievementStats, stats, aboutContent, loading } = useContent()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  if (loading || !aboutContent?.hero) {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-amber-600"></div>
                <p className="text-gray-500 font-medium tracking-widest uppercase text-sm">Loading Story...</p>
            </div>
        </div>
    );
  }

  return (
    <div className="relative bg-transparent">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="/bgg.png"
          alt="Vintage Background"
          className="h-full w-full object-cover opacity-100"
          onError={(e) => {
            const target = e.target;
            if (target.src.endsWith('bgg.png')) {
               target.src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2000&auto=format&fit=crop';
            }
          }}
        />
      </div>

      {/* Consistent Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden bg-black py-20 text-center text-white lg:py-32">
        <motion.div
          style={{ y }}
          className={`absolute inset-0 bg-cover bg-center opacity-40 fixed-bg ${!aboutContent.hero.image && 'bg-gray-900'}`}
          initial={{ backgroundImage: aboutContent.hero.image ? `url(${aboutContent.hero.image})` : 'none' }}
          animate={{ backgroundImage: aboutContent.hero.image ? `url(${aboutContent.hero.image})` : 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-white" />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 block text-sm font-bold uppercase tracking-[0.3em] text-blue"
          >
            {aboutContent.hero.subtitle}
          </motion.span>
          <StaggeredText
            text={aboutContent.hero.title}
            className="font-heading mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black"
          />
          <p className="mx-auto max-w-2xl text-lg sm:text-xl font-light text-gray-200">
            {aboutContent.hero.description}
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2">
            <AnimatedSection>
              <h2 className="font-heading text-4xl font-black uppercase text-black md:text-6xl">
                {aboutContent.philosophy.title}
              </h2>
            </AnimatedSection>
            <AnimatedSection className="space-y-8 text-lg leading-relaxed text-charcoal">
              <p>
                {aboutContent.philosophy.paragraph1}
              </p>
              <p>
                {aboutContent.philosophy.paragraph2}
              </p>

              <div className="pt-8">
                <div className="grid grid-cols-2 gap-8 border-t border-black/10 pt-8">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="font-heading text-4xl font-bold text-black">{stat.number}</div>
                      <div className="text-sm font-medium uppercase tracking-wider text-charcoal/60">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="relative bg-transparent py-16 text-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection className="mb-20 text-center">
            <h2 className="font-heading mb-4 text-4xl font-bold md:text-5xl text-black">Our Core Tenets</h2>
            <div className="mx-auto h-1 w-24 bg-blue"></div>
          </AnimatedSection>

          <div className="grid gap-12 md:grid-cols-3">
            {aboutContent.values.map((val, idx) => (
              <AnimatedSection key={val.title} className="text-center">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group flex flex-col items-center gap-6 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 p-8 shadow-lg transition-all hover:bg-white/80 hover:shadow-xl"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue text-white shadow-lg shadow-blue/20 transition-transform group-hover:scale-110 overflow-hidden">
                    {val.image ? (
                        <img src={val.image} alt={val.title} className="w-full h-full object-cover" />
                    ) : (
                        getAboutIcon(val.iconType)
                    )}
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-black">{val.title}</h3>
                  <p className="text-charcoal/80 leading-relaxed font-medium">{val.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Quote */}
      <section className="relative overflow-hidden bg-transparent py-16 text-center">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <div className="mx-auto mb-8 flex h-40 w-40 items-center justify-center rounded-full border-4 border-white bg-white text-4xl text-blue shadow-2xl overflow-hidden relative">
              {aboutContent.founder?.image ? (
                 <img 
                    src={aboutContent.founder.image} 
                    alt={aboutContent.founder.name} 
                    className="w-full h-full object-cover"
                 />
              ) : (
                 <span className="text-6xl">❝</span>
              )}
            </div>
            <blockquote className="font-heading mb-10 text-4xl font-bold leading-tight text-black md:text-5xl">
              "{aboutContent.founder.quote}"
            </blockquote>
            <cite className="block text-lg font-bold uppercase tracking-widest text-charcoal">
              — {aboutContent.founder.name}
            </cite>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
