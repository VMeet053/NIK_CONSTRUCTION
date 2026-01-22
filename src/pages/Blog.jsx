import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useContent } from '../context/ContentContext'
import AnimatedSection from '../components/AnimatedSection'
import MagneticButton from '../components/MagneticButton'
import StaggeredText from '../components/StaggeredText'

export default function Blog() {
  const { articles } = useContent()
  const featured = articles.find((a) => a.featured)
  const regular = articles.filter((a) => !a.featured)
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Same subtle parallax as Projects page
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div className="bg-white">
      {/* Consistent Hero Section Style */}
      <section ref={heroRef} className="relative overflow-hidden bg-black py-16 text-center text-white lg:py-24">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481026469463-66327c86e544?w=1920&q=80')] bg-cover bg-center opacity-40 fixed-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-white" />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 block text-sm font-bold uppercase tracking-[0.3em] text-blue"
          >
            Insights & Perspectives
          </motion.span>
          <StaggeredText
            text="Field Notes"
            className="font-heading mb-6 text-6xl font-black md:text-8xl"
          />
          <p className="mx-auto max-w-2xl text-xl font-light text-gray-200">
            Thoughts, techniques, and stories from the cutting edge of heritage conservation.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="relative px-6 -mt-10 z-20 pb-16 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <AnimatedSection>
              <div className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-[400px] lg:h-auto overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                      src={featured.image}
                      alt={featured.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="relative flex flex-col justify-center p-12 lg:p-20">
                    <div className="mb-6 flex items-center gap-4 text-sm font-bold tracking-widest text-charcoal/50 uppercase">
                      <span className="text-blue">{featured.category}</span>
                      <span className="h-1 w-1 rounded-full bg-gray-300" />
                      <span>{featured.date}</span>
                    </div>

                    <h2 className="font-heading mb-6 text-4xl font-black leading-tight text-black lg:text-5xl">
                      {featured.title}
                    </h2>

                    <p className="mb-8 text-lg leading-relaxed text-charcoal/80">
                      {featured.excerpt}
                    </p>

                    <div className="flex items-center gap-6">
                      <MagneticButton className="rounded-full bg-black px-8 py-4 font-bold text-white transition-all hover:bg-blue">
                        Read Article
                      </MagneticButton>
                      <span className="text-sm font-bold uppercase tracking-widest text-charcoal/40">
                        {featured.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Recent Articles Grid */}
      <section className="px-6 pb-16 pt-12 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="mb-16 flex items-end justify-between border-b border-gray-200 pb-8">
              <h2 className="font-heading text-4xl font-bold text-black">
                Latest Entries
              </h2>
              <div className="hidden text-sm font-bold uppercase tracking-widest text-charcoal/40 md:block">
                Archive 2024
              </div>
            </div>

            <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {regular.map((article, idx) => (
                <motion.article
                  key={article.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative mb-6 overflow-hidden rounded-2xl aspect-[4/3]">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider text-black rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-charcoal/40">
                      <span>{article.date}</span>
                      <span className="h-1 w-1 rounded-full bg-gray-300" />
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="font-heading text-2xl font-bold leading-tight text-black group-hover:text-blue transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-charcoal/70 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="pt-4">
                      <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black group-hover:gap-4 transition-all">
                        Read Story <span className="text-xl">→</span>
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-20 px-6 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedSection>
            <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-blue">
              Stay Connected
            </span>
            <h2 className="font-heading mb-8 text-4xl font-black text-black md:text-5xl">
              Join our architectural digest.
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-charcoal/70">
              Receive curated insights, project updates, and conservation news directly to your inbox.
            </p>
            <form className="mx-auto flex max-w-md flex-col gap-4 md:flex-row">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-full border-2 border-gray-200 bg-white px-6 py-4 outline-none transition-all focus:border-blue focus:ring-4 focus:ring-blue/10"
              />
              <MagneticButton className="whitespace-nowrap rounded-full bg-black px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-blue hover:shadow-xl">
                Subscribe
              </MagneticButton>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
