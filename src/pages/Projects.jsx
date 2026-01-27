import { useState, useRef } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useContent } from '../context/ContentContext'
import AnimatedSection from '../components/AnimatedSection'
import StaggeredText from '../components/StaggeredText'

const ProjectItem = ({ project, idx }) => {
  const isEven = idx % 2 === 0

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
        <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl shadow-2xl">
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
          <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />

          {/* Floating Year Badge */}
          <div className="absolute top-6 right-6 overflow-hidden rounded-xl border border-white/20 bg-black/30 backdrop-blur-md">
            <div className="px-4 py-2 text-xl font-bold text-white">
              {project.year}
            </div>
          </div>
        </div>

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

          <motion.button
            whileHover={{ x: 10 }}
            className="mt-4 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-black hover:text-blue"
          >
            Explore Case Study
            <span className="text-xl">→</span>
          </motion.button>
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
          onError={(e) => {
            const target = e.target;
            if (target.src.endsWith('bgg.png')) {
               target.src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2000&auto=format&fit=crop';
            }
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black py-16 text-center text-white lg:py-24">
        <motion.div 
            className="absolute inset-0 bg-cover bg-center opacity-30 fixed-bg"
            initial={{ backgroundImage: `url(${projectsPageContent?.hero?.image || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1920'})` }}
            animate={{ backgroundImage: `url(${projectsPageContent?.hero?.image || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1920'})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-white" />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 block text-sm font-bold uppercase tracking-[0.3em] text-blue"
          >
            {projectsPageContent?.hero?.subtitle !== undefined ? projectsPageContent.hero.subtitle : "Our Portfolio"}
          </motion.span>
          <StaggeredText
            text={projectsPageContent?.hero?.title !== undefined ? projectsPageContent.hero.title : "Preserving the Past"}
            className="font-heading mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black"
          />
          <p className="mx-auto max-w-2xl text-lg sm:text-xl font-light text-gray-200">
            {projectsPageContent?.hero?.description !== undefined ? projectsPageContent.hero.description : "A journey through our archival documentation, structural conservation, and adaptive reuse projects."}
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray/20 py-4">
        <div className="mx-auto flex max-w-7xl justify-start md:justify-center gap-2 px-6 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all hover:bg-black hover:text-white ${activeCategory === cat ? 'bg-black text-white' : 'bg-gray-100 text-charcoal'
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
