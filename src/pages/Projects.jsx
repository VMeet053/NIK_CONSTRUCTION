import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useContent } from '../context/ContentContext'
import AnimatedSection from '../components/AnimatedSection'
import StaggeredText from '../components/StaggeredText'

const ProjectItem = ({ project, idx }) => {
  const isEven = idx % 2 === 0
  const slug = (project.slug || project.title || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`relative flex flex-col gap-10 py-20 lg:flex-row lg:items-center lg:gap-20 ${!isEven ? 'lg:flex-row-reverse' : ''
        }`}
    >
      {/* Visual Section - Large Image */}
      <div className="relative w-full lg:w-3/5">
        <Link to={`/projects/${slug}`} className="group relative aspect-[16/10] overflow-hidden rounded-3xl shadow-2xl block">
          {project.image ? (
            <motion.img
              src={project.image}
              alt={project.title}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7 }}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-400">
              <span className="text-6xl">🏗️</span>
            </div>
          )}
          {/* Detailed Image Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />

          {/* Floating Year Badge */}
          <div className="absolute top-6 right-6 overflow-hidden rounded-xl border border-white/20 bg-black/30 backdrop-blur-md">
            <div className="px-4 py-2 text-xl font-bold text-white">
              {project.year}
            </div>
          </div>
        </Link>

        {/* Decorative Element */}
        <div className={`absolute -bottom-10 -z-10 h-64 w-64 rounded-full bg-blue/5 blur-3xl ${isEven ? '-left-10' : '-right-10'
          }`} />
      </div>

      {/* Content Section - History & Description */}
      <div className="w-full lg:w-2/5">
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: isEven ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-10 bg-blue"></span>
            <span className="text-sm font-bold uppercase tracking-widest text-blue">
              {project.category}
            </span>
          </motion.div>

          <h2 className="font-heading text-4xl font-black leading-tight text-black lg:text-5xl">
            {project.title}
          </h2>

          <div className="space-y-6">
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-charcoal/50">
                Location
              </h4>
              <p className="text-lg font-medium text-black">
                {project.location}
              </p>
            </div>

            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-charcoal/50">
                Historical Context
              </h4>
              <p className="border-l-2 border-blue/30 pl-4 text-lg leading-relaxed text-charcoal/80 italic">
                "{project.history}"
              </p>
            </div>

            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-charcoal/50">
                Intervention
              </h4>
              <p className="text-lg leading-relaxed text-charcoal">
                {project.summary}
              </p>
            </div>
          </div>

          <Link
            to={`/projects/${slug}`}
            className="mt-4 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-black hover:text-blue transition-colors"
          >
            Explore Case Study
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { projects, projectsPageContent } = useContent()
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...new Set(projects.map(p => p.category))]

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <div className="relative bg-transparent">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="/bgg.png"
          alt="Vintage Background"
          className="h-full w-full object-cover opacity-100"
        />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black py-24 text-center text-white lg:py-40 min-h-[60vh] flex flex-col justify-center">
        <img
          src={projectsPageContent?.hero?.image || '/bgg.png'}
          alt="Projects Hero"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          onError={(e) => { e.target.src = '/bgg.png' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/20" />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 block text-sm font-bold uppercase tracking-[0.3em] text-blue drop-shadow-md"
          >
            {projectsPageContent?.hero?.subtitle !== undefined ? projectsPageContent.hero.subtitle : "Our Portfolio"}
          </motion.span>
          <StaggeredText
            text={projectsPageContent?.hero?.title !== undefined ? projectsPageContent.hero.title : "Preserving the Past"}
            className="font-heading mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black drop-shadow-2xl"
          />
          <p className="mx-auto max-w-2xl text-lg sm:text-xl font-light text-gray-200 drop-shadow-lg">
            {projectsPageContent?.hero?.description !== undefined ? projectsPageContent.hero.description : "A journey through our archival documentation, structural conservation, and adaptive reuse projects."}
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-20 z-40 bg-white/10 backdrop-blur-md border-b border-white/10 py-4">
        <div className="mx-auto flex max-w-7xl justify-start md:justify-center gap-2 px-6 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all hover:bg-black hover:text-white ${activeCategory === cat ? 'bg-black text-white' : 'bg-white/40 text-black backdrop-blur-sm border border-white/20'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects List */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.map((project, idx) => (
              <ProjectItem key={project.title} project={project} idx={idx} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  )
}
