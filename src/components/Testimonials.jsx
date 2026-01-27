import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContent } from '../context/ContentContext'

export default function Testimonials() {
  const { testimonials } = useContent()
  const [activeIndex, setActiveIndex] = useState(0)
  const active = testimonials[activeIndex]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-transparent py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue">
            Testimonials
          </div>
          <h2 className="font-heading mb-4 text-4xl font-bold text-black md:text-5xl">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl bg-black/80 backdrop-blur-md text-white shadow-2xl border border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue/30 via-black/40 to-black" />
              <div className="relative p-10 md:p-14">
                <div className="mb-6 flex items-center gap-3">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]">
                    Client Voices
                  </span>
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(active.rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>
                </div>
                <motion.blockquote
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mb-10 text-2xl font-light leading-relaxed md:text-3xl"
                >
                  “{active.quote}”
                </motion.blockquote>
                <div className="flex items-center gap-4">
                  {active.image ? (
                    <motion.img
                      src={active.image}
                      alt={active.name}
                      className="h-16 w-16 rounded-full object-cover ring-2 ring-white/40"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.25, type: 'spring', stiffness: 200 }}
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-blue flex items-center justify-center ring-2 ring-white/40 text-xl font-bold text-white">
                      {active.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-lg font-semibold">{active.name}</div>
                    <div className="text-sm text-gray-300">
                      {active.role} · {active.location}
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex items-center justify-between text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue" />
                    Conservation Partner
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={prevTestimonial}
                      className="rounded-full border border-white/20 p-3 transition hover:border-white/60 hover:bg-white/10"
                      aria-label="Previous testimonial"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="rounded-full border border-white/20 p-3 transition hover:border-white/60 hover:bg-white/10"
                      aria-label="Next testimonial"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="space-y-4">
            {testimonials.map((testimonial, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={testimonial.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${isActive
                      ? 'border-black bg-white shadow-xl shadow-black/10 scale-[1.02]'
                      : 'border-white/50 bg-white/80 backdrop-blur-xl hover:bg-white/95 hover:shadow-md hover:border-white/80'
                    }`}
                  aria-label={`Read testimonial from ${testimonial.name}`}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-black">{testimonial.name}</div>
                    <div className="text-sm text-charcoal/80">{testimonial.role}</div>
                    <div className="mt-1 text-xs text-charcoal/60">{testimonial.location}</div>
                  </div>
                  <div
                    className={`text-xs font-semibold uppercase tracking-[0.1em] ${isActive ? 'text-blue' : 'text-charcoal/50'
                      }`}
                  >
                    {isActive ? 'Now' : 'View'}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
