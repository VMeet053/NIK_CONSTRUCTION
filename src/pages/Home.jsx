import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useContent } from '../context/ContentContext'
import AnimatedSection from '../components/AnimatedSection'
import SplitSection from '../components/SplitSection'
import HorizontalScroll, { HorizontalScrollItem } from '../components/HorizontalScroll'
import StatGrid from '../components/StatGrid'
import ProjectCard from '../components/ProjectCard'
import StaggeredText from '../components/StaggeredText'
import MagneticButton from '../components/MagneticButton'
import IndiaMap from '../components/IndiaMap'
import Testimonials from '../components/Testimonials'
import Clients from '../components/Clients'

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
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  };
  return icons[type] || icons.conservation;
};

export default function Home() {
  const { heroContent, stats, projects, services } = useContent();
  const featuredProjects = projects.filter(p => p.featured).slice(0, 5);
  const displayServices = services.map(s => ({ ...s, icon: getServiceIcon(s.iconType) })).slice(0, 4);

  const heroRef = useRef(null)
  const [heroIndex, setHeroIndex] = useState(0)
  const [activeProject, setActiveProject] = useState(0)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Preload all images for smooth transitions
  useEffect(() => {
    heroContent.forEach((item) => {
      const image = new Image()
      image.src = item.src
    })
  }, [])

  // Auto-rotate background images
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroContent.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative bg-white">
      {/* 1. Immersive Center-Aligned Hero */}
      <section ref={heroRef} className="hero-fullscreen relative overflow-hidden bg-black text-white">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          {heroContent.map((item, idx) => (
            <motion.div
              key={item.src}
              initial={false}
              animate={{
                opacity: idx === heroIndex ? 1 : 0,
                scale: idx === heroIndex ? 1 : 1.1,
              }}
              transition={{
                duration: 2.0,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-black/40" />
              <motion.img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover"
                initial={false}
                animate={{
                  x: idx === heroIndex ? [0, 0] : 0,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
            </motion.div>
          ))}
        </motion.div>

        <div className="relative z-10 flex h-full min-h-[85vh] flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-16 max-w-5xl"
          >
            <div className="mb-8 flex items-center justify-center gap-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-px bg-blue"
              />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm font-bold uppercase tracking-[0.3em] text-blue"
              >
                Est. 1986
              </motion.span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-px bg-blue"
              />
            </div>

            <div className="mb-10 min-h-[160px] flex items-center justify-center">
              <StaggeredText
                key={heroIndex}
                text={heroContent[heroIndex].text}
                className="hero-headline font-heading text-6xl font-black leading-[0.9] text-white md:text-[7rem]"
                delay={0.2}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mx-auto mb-12 max-w-2xl text-xl font-light leading-relaxed text-gray-200 md:text-2xl"
            >
              We conserve, restore, and adapt historic buildings for the next century. Precision-driven work across four decades.
            </motion.p>

            {/* FIXED BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="flex flex-col items-center justify-center gap-6 sm:flex-row"
            >
              <MagneticButton
                to="/projects"
                className="group relative flex min-w-[200px] items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:bg-gray-100"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Portfolio
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
              </MagneticButton>

              <MagneticButton
                to="/contact"
                className="group flex min-w-[200px] items-center justify-center rounded-full border border-white/30 bg-black/40 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <span>Get in Touch</span>
              </MagneticButton>
            </motion.div>

          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/50"
          >
            <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
            <div className="h-12 w-px bg-gradient-to-b from-white to-transparent" />
          </motion.div>
        </motion.div>

        {/* Slider dots */}
        <div className="absolute bottom-12 right-12 hidden lg:block">
          <div className="flex items-center gap-3">
            {heroContent.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroIndex(idx)}
                className="group relative h-10 w-4 outline-none"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <div className={`absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 transition-colors ${idx === heroIndex ? 'bg-white' : 'bg-white/20 group-hover:bg-white/40'}`} />
                {idx === heroIndex && (
                  <motion.div layoutId="activeSlide" className="absolute top-1/2 left-0 -mt-1.5 h-3 w-3 rounded-full bg-blue" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Intro & Stats Section */}
      <section className="relative bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <AnimatedSection>
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-12 bg-blue"></span>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue">The Studio</span>
              </div>
              <h2 className="font-heading mb-8 text-5xl font-bold leading-tight text-black lg:text-6xl">
                Precision meets <br /><span className="text-charcoal/50">Preservation.</span>
              </h2>
              <p className="text-xl leading-relaxed text-charcoal">
                Verdantia is a heritage conservation and architecture studio dedicated to the precise, methodical work of keeping historic structures alive.
              </p>
              <p className="mt-6 text-lg text-charcoal/70">
                From temple towns and forts to civic archives, we work quietly behind the scenes so that places can continue to hold memory.
              </p>

              <div className="mt-10 pt-10 border-t border-gray-100">
                <StatGrid stats={stats} />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-100 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200"
                  alt="Architectural Detail"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <div className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Philosophy</div>
                  <div className="font-heading text-3xl font-bold">"We don't just fix buildings;<br />we heal them."</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 3. Featured Projects - Creative Grid */}
      <section className="relative overflow-hidden bg-gray-50 py-16">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <div className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-blue">
              Portfolio
            </div>
            <StaggeredText
              text="Selected Projects"
              className="font-heading mb-6 text-4xl font-bold text-black md:text-6xl"
              delay={0.2}
            />
            <p className="mx-auto max-w-2xl text-lg text-charcoal">
              A curated selection of our recent conservation and restoration work.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-4 h-[600px] lg:h-[500px] w-full px-2 lg:px-0">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                onClick={() => setActiveProject(idx)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-700 ease-[cubic-bezier(0.05,0.61,0.41,0.95)] ${
                  activeProject === idx 
                    ? 'flex-[10] lg:flex-[10]' 
                    : 'flex-[2] lg:flex-[1] hover:flex-[3] lg:hover:flex-[1.5]'
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 h-full w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`h-full w-full object-cover transition-transform duration-700 ${
                      activeProject === idx ? 'scale-100' : 'scale-110 grayscale-[50%]'
                    }`}
                  />
                  <div className={`absolute inset-0 bg-black/30 transition-opacity duration-500 ${
                    activeProject === idx ? 'opacity-20' : 'opacity-60'
                  }`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                </div>

                {/* Content - Active State */}
                <div className={`absolute inset-x-0 bottom-0 p-8 z-20 transition-all duration-500 ${
                  activeProject === idx 
                    ? 'opacity-100 translate-y-0 delay-200' 
                    : 'opacity-0 translate-y-10 pointer-events-none'
                }`}>
                  <div className="mb-4 inline-flex items-center gap-2 overflow-hidden rounded-full bg-blue/90 px-3 py-1 backdrop-blur-md">
                    <span className="text-xs font-bold uppercase tracking-widest text-white">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-heading mb-4 text-3xl font-bold leading-[1.1] text-white md:text-5xl">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-white/80">
                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className="text-sm">{project.location}</span>
                    </div>
                    <span className="h-1 w-1 rounded-full bg-white/50" />
                    <span className="text-sm">{project.year}</span>
                  </div>
                </div>

                {/* Content - Inactive State (Vertical Text) */}
                <div className={`absolute bottom-8 left-8 origin-bottom-left -rotate-90 transition-all duration-300 ${
                  activeProject === idx ? 'opacity-0 scale-75' : 'opacity-100 scale-100 delay-100'
                }`}>
                  <h3 className="whitespace-nowrap text-2xl font-bold text-white/90">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm uppercase tracking-widest text-blue/90 font-bold">
                    0{idx + 1}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <MagneticButton
              to="/projects"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-black px-8 py-4 text-white transition-all hover:bg-blue hover:shadow-lg"
            >
              <div className="flex items-center gap-3 w-full whitespace-nowrap">
                <span className="relative z-10 text-xs font-bold tracking-[0.2em] uppercase">View Full Portfolio</span>
                <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white text-black text-xs">
                  →
                </span>
              </div>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* 4. India Map Section */}
      {/* <AnimatedSection className="mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <motion.div className="mb-16 text-center">
          <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue">
            Our Reach
          </div>
          <h2 className="font-heading mb-4 text-4xl font-bold text-black md:text-5xl">
            Projects Across India
          </h2>
        </motion.div>
        <IndiaMap />
      </AnimatedSection> */}

      {/* 5. Testimonials */}
      <Testimonials />

      {/* 6. Clients */}
      <Clients />

      {/* 7. NEW MODERN SERVICES SECTION - DARK THEME + CREATIVE GRID */}
      <section className="bg-black py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <AnimatedSection>
              <div className="mb-4 flex items-center gap-3 text-blue">
                <span className="h-px w-8 bg-blue"></span>
                <span className="text-sm font-bold uppercase tracking-widest">Expertise</span>
              </div>
              <h2 className="font-heading text-5xl font-black leading-tight md:text-6xl">
                Our Craft.
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <p className="max-w-sm text-lg text-gray-400">
                A suite of specialized conservation services tailored to the unique needs of historic fabric.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {displayServices.map((service, idx) => (
              <AnimatedSection key={service.title} delay={idx * 0.1} className="h-full">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group relative flex h-full flex-col justify-end overflow-hidden rounded-3xl bg-charcoal p-8 min-h-[400px]"
                >
                  {/* Background Image on Hover */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-40">
                    <img src={service.image} alt={service.title} className="h-full w-full object-cover grayscale" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                  <div className="relative z-10 transition-transform duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 text-white bg-white/5 backdrop-blur-sm transition-colors group-hover:border-blue group-hover:bg-blue">
                      {service.icon}
                    </div>
                    <h3 className="font-heading mb-3 text-2xl font-bold text-white transition-colors group-hover:text-blue">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA Section */}
      <section className="relative overflow-hidden bg-white py-20 text-black border-t border-gray-100">
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <AnimatedSection>
            <StaggeredText
              text="Ready to start your project?"
              className="font-heading mb-6 text-4xl font-bold md:text-6xl"
              delay={0.1}
            />
            <p className="mb-12 text-lg text-charcoal/80">
              Let's discuss how we can help preserve and adapt your historic building.
            </p>
            <MagneticButton
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 text-white transition-all hover:bg-blue hover:shadow-lg"
            >
              <div className="flex items-center gap-3 w-full whitespace-nowrap">
                <span className="text-sm font-bold uppercase tracking-wider">Start Conversation</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white text-black text-xs">→</span>
              </div>
            </MagneticButton>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
