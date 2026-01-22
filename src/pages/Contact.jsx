import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import MagneticButton from '../components/MagneticButton'
import StaggeredText from '../components/StaggeredText'

export default function Contact() {
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

  return (
    <div className="bg-white">
      {/* Hero Section - Matching Projects Theme */}
      <section ref={heroRef} className="relative overflow-hidden bg-black py-16 text-center text-white lg:py-24">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920')] bg-cover bg-center opacity-40 fixed-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-white" />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 block text-sm font-bold uppercase tracking-[0.3em] text-blue"
          >
            Contact Us
          </motion.span>
          <StaggeredText
            text="Start a Conversation"
            className="font-heading mb-6 text-6xl font-black md:text-8xl"
          />
          <p className="mx-auto max-w-2xl text-xl font-light text-gray-200">
            Whether you have a restoration project in mind or simply want to inquire about our services, we are here to listen.
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
                    <p className="text-charcoal">+91 123 456 7890</p>
                    <p className="text-sm text-charcoal/60">Mon-Fri, 9am - 6pm IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-black">Email</h3>
                    <a href="mailto:info@verdantia.com" className="text-charcoal hover:text-blue transition-colors">info@verdantia.com</a>
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
                      123 Heritage Street<br />
                      River Town, India 380001
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Form Side */}
          <AnimatedSection delay={0.2}>
            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-8 shadow-sm lg:p-12">
              <h3 className="font-heading mb-6 text-2xl font-bold text-black">Send us a message</h3>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117498.05581299387!2d72.48347209822606!3d23.02905445217436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1710338781297!5m2!1sen!2sin"
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
