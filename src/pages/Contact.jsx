import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useContent } from '../context/ContentContext'
import AnimatedSection from '../components/AnimatedSection'
import MagneticButton from '../components/MagneticButton'
import StaggeredText from '../components/StaggeredText'

export default function Contact() {
  const { contactInfo, contactPageContent } = useContent()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  if (!contactInfo) return null

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

      {/* Hero Section - Matching Projects Theme */}
      <section ref={heroRef} className="relative overflow-hidden bg-black py-16 text-center text-white lg:py-24">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-cover bg-center opacity-40 fixed-bg"
          initial={{ backgroundImage: `url(${contactPageContent?.hero?.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920'})` }}
          animate={{ backgroundImage: `url(${contactPageContent?.hero?.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920'})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-white" />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 block text-sm font-bold uppercase tracking-[0.3em] text-blue"
          >
            {contactPageContent?.hero?.subtitle || "Contact Us"}
          </motion.span>
          <StaggeredText
            text={contactPageContent?.hero?.title || "Start a Conversation"}
            className="font-heading mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black"
          />
          <p className="mx-auto max-w-2xl text-lg sm:text-xl font-light text-gray-200">
            {contactPageContent?.hero?.description || "Whether you have a restoration project in mind or simply want to inquire about our services, we are here to listen."}
          </p>

          <div className="mt-10">
            <MagneticButton className="inline-block rounded-full bg-blue px-10 py-4 font-bold uppercase text-white shadow-lg transition-transform hover:scale-105">
              Get in Touch
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">

          {/* Info Side */}
          <AnimatedSection>
            <div>
              <h2 className="font-heading mb-8 text-4xl font-bold text-black">
                Main Studio
              </h2>
              <p className="mb-12 text-lg text-charcoal/70 leading-relaxed">
                Our studio is located in the heart of the heritage district, surrounded by the very history we work to preserve. Visits by appointment only.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-black">Phone</h3>
                    <p className="text-charcoal">{contactInfo.phone}</p>
                    <p className="text-sm text-charcoal/60">{contactInfo.timings}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-black">Email</h3>
                    <a href={`mailto:${contactInfo.email}`} className="text-charcoal hover:text-blue transition-colors">{contactInfo.email}</a>
                    <p className="text-sm text-charcoal/60">For project inquiries and careers</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-black">Office</h3>
                    <p className="text-charcoal">
                      {contactInfo?.address?.line1}<br />
                      {contactInfo?.address?.line2}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Form Side */}
          <AnimatedSection delay={0.2}>
            <div className="rounded-3xl border border-white/40 bg-white/60 backdrop-blur-md p-8 shadow-sm lg:p-12">
              <h2 className="font-heading mb-8 text-3xl font-bold text-black">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-bold uppercase tracking-wider text-charcoal/60">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-b-2 border-gray-300 bg-transparent py-3 text-lg text-black outline-none transition-colors focus:border-black"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-bold uppercase tracking-wider text-charcoal/60">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-b-2 border-gray-300 bg-transparent py-3 text-lg text-black outline-none transition-colors focus:border-black"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-bold uppercase tracking-wider text-charcoal/60">Message</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full border-b-2 border-gray-300 bg-transparent py-3 text-lg text-black outline-none transition-colors focus:border-black resize-none"
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>
                <div className="pt-4">
                  <MagneticButton className="w-full rounded-full bg-black py-4 font-bold uppercase text-white shadow-lg transition-transform hover:bg-blue hover:shadow-xl">
                    Get in Touch
                  </MagneticButton>
                </div>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full bg-gray-200">
        <iframe
          src={contactInfo.mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  )
}
