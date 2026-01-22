import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useContent } from '../context/ContentContext'
import AnimatedSection from '../components/AnimatedSection'
import StatGrid from '../components/StatGrid'
import StaggeredText from '../components/StaggeredText'

export default function Achievements() {
  const { achievementStats, awards, certifications } = useContent()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div className="bg-white" ref={containerRef}>
      {/* Consistent Hero Section */}
      <section className="relative overflow-hidden bg-black py-16 text-center text-white lg:py-24">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605649486189-e75140188b97?w=1920')] bg-cover bg-center opacity-40 fixed-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-white" />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 block text-sm font-bold uppercase tracking-[0.3em] text-blue"
          >
            Recognition
          </motion.span>
          <StaggeredText
            text="Excellence Defined"
            className="font-heading mb-6 text-6xl font-black md:text-8xl"
          />
          <p className="mx-auto max-w-2xl text-xl font-light text-gray-200">
            Our commitment to methodological rigor and ethical conservation has been celebrated globally.
          </p>
        </div>
      </section>

      {/* Stats */}
      <AnimatedSection className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <StatGrid stats={achievementStats} />
      </AnimatedSection>

      {/* Detailed Timeline Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Animated Vertical Line */}
        <div className="absolute left-[2.25rem] top-0 bottom-0 hidden w-px bg-gray-200 md:block lg:left-[50%]">
          <motion.div
            style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
            className="h-full w-full bg-blue"
          />
        </div>

        <div className="space-y-24">
          {awards.map((award, idx) => (
            <div key={award.title} className={`relative flex flex-col gap-8 md:flex-row ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>

              {/* Timeline Node (Desktop) */}
              <div className="absolute left-0 top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-blue bg-white md:block lg:left-[50%]">
                <div className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-blue" />
              </div>

              {/* Content Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`flex-1 ${idx % 2 !== 0 ? 'lg:pl-16' : 'lg:pr-16 text-right'}`}
              >
                {/* Mobile Timeline Node styling adjustment needed here if strictly mobile */}
                <div className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-lg lg:p-10">

                  {/* Header Details */}
                  <div className={`flex flex-col gap-2 ${idx % 2 === 0 ? 'lg:items-end' : 'lg:items-start'}`}>
                    <span className="inline-block rounded-full bg-blue/5 px-3 py-1 text-xs font-bold text-blue">
                      {award.year}
                    </span>
                    <h2 className="font-heading text-2xl font-bold leading-tight text-black md:text-3xl">
                      {award.title}
                    </h2>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal/50">
                      <span>{award.issuer}</span>
                      <span className="h-1 w-1 rounded-full bg-gray-300" />
                      <span>{award.category}</span>
                    </div>
                  </div>

                  {/* Image & Citation */}
                  <div className="group relative overflow-hidden rounded-xl bg-gray-100">
                    <div className="aspect-[2/1] w-full overflow-hidden opacity-90 transition-opacity group-hover:opacity-100">
                      <img src={award.image} alt={award.project} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <div className="mb-1 text-xs font-bold uppercase tracking-widest opacity-80">Project Context</div>
                      <div className="font-heading text-xl font-bold">{award.project}</div>
                      <div className="text-sm opacity-80">{award.location}</div>
                    </div>
                  </div>

                  <div className={`relative border-l-2 border-blue/20 pl-4 ${idx % 2 === 0 ? 'lg:border-l-0 lg:border-r-2 lg:pl-0 lg:pr-4' : ''}`}>
                    <p className="font-serif text-lg italic leading-relaxed text-charcoal/80">
                      "{award.citation}"
                    </p>
                  </div>

                </div>
              </motion.div>

              {/* Empty Space for Grid Balance (Desktop) */}
              <div className="hidden flex-1 lg:block" />
            </div>
          ))}
        </div>
      </section>

      {/* Certifications & Memberships */}
      <section className="bg-charcoal py-16 text-white">
        <AnimatedSection className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <div>
              <h2 className="font-heading mb-4 text-3xl font-bold">
                Professional<br />Accreditations
              </h2>
              <p className="max-w-xs text-sm text-gray-400">
                Maintaining the highest standards of practice through continuous professional development and global memberships.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={cert.id || idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                  <span className="font-medium text-gray-200">{cert.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
