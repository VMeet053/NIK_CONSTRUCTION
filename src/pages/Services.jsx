import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useContent } from '../context/ContentContext'
import AnimatedSection from '../components/AnimatedSection'
import MagneticButton from '../components/MagneticButton'
import StaggeredText from '../components/StaggeredText'

// Icon mapping helper
const getServiceIcon = (type) => {
  const icons = {
    conservation: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    restoration: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-9a4 4 0 0 1 8 0v9" />
      </svg>
    ),
    research: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
    ),
    reuse: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M8 11h8" />
        <path d="M12 7v8" />
      </svg>
    ),
    consultancy: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    )
  };
  return icons[type] || icons.conservation;
};

export default function Services() {
  const { services, processSteps } = useContent()
  
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div className="bg-white">
      {/* Consistent Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden bg-black py-16 text-center text-white lg:py-24">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=1920')] bg-cover bg-center opacity-40 fixed-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-white" />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 block text-sm font-bold uppercase tracking-[0.3em] text-blue"
          >
            Services & Expertise
          </motion.span>
          <StaggeredText
            text="The Art of Restoration"
            className="font-heading mb-6 text-5xl font-black md:text-8xl"
          />
          <p className="mx-auto max-w-2xl text-xl font-light text-gray-200">
            From microscopic material analysis to masterplanning entire precincts, we bring precision and passion to every layer of heritage conservation.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <AnimatedSection key={service.title} className="h-full">
              <motion.div
                whileHover={{ y: -10 }}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all hover:border-blue hover:shadow-2xl"
              >
                <div>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-black transition-colors group-hover:bg-blue group-hover:text-white">
                    {getServiceIcon(service.iconType)}
                  </div>
                  <h3 className="font-heading mb-3 text-2xl font-bold text-black group-hover:text-blue">
                    {service.title}
                  </h3>
                  <p className="mb-6 text-charcoal/80 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <ul className="space-y-2">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-sm font-medium text-charcoal/60">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Our Process - Horizontal Scroll / Steps */}
      <section className="bg-gray-50 py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mb-16 text-center">
            <h2 className="font-heading mb-4 text-4xl font-bold text-black md:text-5xl">Our Process</h2>
            <p className="text-charcoal/70">A methodological approach to every conservation challenge.</p>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-4">
            {processSteps.map((step, idx) => (
              <AnimatedSection key={step.num}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pt-8"
                >
                  <div className="absolute top-0 left-0 h-1 w-full bg-gray-200">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.2 }}
                      className="h-full bg-blue"
                    />
                  </div>
                  <div className="mb-2 text-5xl font-black text-gray-200 opacity-50">{step.num}</div>
                  <h3 className="mb-2 text-xl font-bold text-black">{step.title}</h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{step.text}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="bg-black py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-heading mb-6 text-4xl font-black md:text-6xl">
            Start your preservation journey.
          </h2>
          <p className="mb-10 text-xl text-gray-400">
            Let's collaborate to protect and revitalize your heritage asset.
          </p>
          <MagneticButton to="/contact" className="inline-block rounded-full bg-white px-10 py-5 font-bold uppercase tracking-widest text-black transition-transform hover:scale-105">
            Consult with Us
          </MagneticButton>
        </div>
      </section>
    </div>
  )
}
