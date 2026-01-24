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
  const { aboutValues, achievementStats, stats } = useContent()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div className="bg-white">
      {/* Consistent Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden bg-black py-20 text-center text-white lg:py-32">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1920')] bg-cover bg-center opacity-40 fixed-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-white" />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 block text-sm font-bold uppercase tracking-[0.3em] text-blue"
          >
            The Studio
          </motion.span>
          <StaggeredText
            text="Guardians of the Built World"
            className="font-heading mb-6 text-6xl font-black md:text-8xl"
          />
          <p className="mx-auto max-w-2xl text-xl font-light text-gray-200">
            Verdantia is more than a firm; we are custodians of history. We ensure that the stories written in stone continue to be told.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2">
            <AnimatedSection>
              <h2 className="font-heading text-4xl font-black uppercase text-black md:text-6xl">
                Restoring <br /><span className="text-blue">Time Itself.</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection className="space-y-8 text-lg leading-relaxed text-charcoal">
              <p>
                We approach every project as an archive. A building is not just bricks and mortar; it is a witness to centuries of sunlight, rain, political shifts, and human lives. Our role is to listen to this testimony.
              </p>
              <p>
                Our philosophy is "Slow Architecture." In a world of fast construction, we advocate for the careful, deliberative process of repair. We believe that caring for an existing building is the most sustainable act an architect can perform.
              </p>

              <div className="pt-8">
                <div className="grid grid-cols-2 gap-8 border-t border-black/10 pt-8">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="font-heading text-4xl font-bold text-black">{stat.value}</div>
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
      <section className="bg-charcoal py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection className="mb-20 text-center">
            <h2 className="font-heading mb-4 text-4xl font-bold md:text-5xl">Our Core Tenets</h2>
            <div className="mx-auto h-1 w-24 bg-blue"></div>
          </AnimatedSection>

          <div className="grid gap-12 md:grid-cols-3">
            {aboutValues.map((val, idx) => (
              <AnimatedSection key={val.title} className="text-center">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group flex flex-col items-center gap-6 rounded-2xl bg-white/5 p-8 transition-colors hover:bg-white/10"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue text-white shadow-lg shadow-blue/20 transition-transform group-hover:scale-110">
                    {getAboutIcon(val.iconType)}
                  </div>
                  <h3 className="font-heading text-2xl font-bold">{val.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{val.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Quote */}
      <section className="relative overflow-hidden bg-gray-50 py-16 text-center">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border-2 border-black/10 bg-white text-4xl text-blue shadow-xl">
              ❝
            </div>
            <blockquote className="font-heading mb-10 text-4xl font-bold leading-tight text-black md:text-5xl">
              "We do not own heritage; we merely borrow it from our ancestors to keep safe for our children."
            </blockquote>
            <cite className="block text-lg font-bold uppercase tracking-widest text-charcoal">
              — Dr. Anjali Savani, Principal
            </cite>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
