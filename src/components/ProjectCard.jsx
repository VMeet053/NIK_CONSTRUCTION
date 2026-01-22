import { useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function ProjectCard({ project, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct * 25)
    y.set(yPct * 25)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative h-[650px] overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500 hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)]"
    >
      {/* Image container with creative overlay */}
      <div className="relative h-[70%] overflow-hidden">
        <motion.div
          style={{
            x: mouseXSpring,
            y: mouseYSpring,
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute inset-0"
        >
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          {/* Creative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </motion.div>

        {/* Animated overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-gradient-to-br from-blue/30 to-transparent"
        />

        {/* Top corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue/20 blur-3xl" />

        {/* Category badge - Modern design */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className="absolute top-6 left-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-black shadow-lg">
            <span className="h-2 w-2 rounded-full bg-blue"></span>
            {project.category}
          </span>
        </motion.div>

        {/* Year badge - Top right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="absolute top-6 right-6"
        >
          <div className="rounded-full bg-black/80 backdrop-blur-md px-4 py-2 text-sm font-bold text-white">
            {project.year}
          </div>
        </motion.div>
      </div>

      {/* Content section - Modern layout */}
      <div className="relative h-[30%] bg-white p-8">
        {/* Decorative line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gray to-transparent" />

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.4 }}
          className="font-heading mb-3 text-2xl font-bold text-black transition-colors group-hover:text-blue md:text-3xl"
        >
          {project.title}
        </motion.h3>

        {/* Meta info with icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="mb-4 flex items-center gap-3 text-sm text-charcoal"
        >
          <span className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 1L10.5 5.5L15.5 6.5L12 9.5L13 14.5L8 12L3 14.5L4 9.5L0.5 6.5L5.5 5.5L8 1Z" />
            </svg>
            {project.location}
          </span>
          <span className="text-charcoal/30">•</span>
          <span className="font-medium">{project.year}</span>
        </motion.div>

        {/* View Project button - Creative design */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isHovered ? 1 : 0.7, x: isHovered ? 0 : -10 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <motion.button
            whileHover={{ x: 5 }}
            className="group/btn flex items-center gap-3 text-sm font-semibold text-blue transition-all"
          >
            <span>View Project</span>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-blue text-white transition-all group-hover/btn:bg-black"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 12L10 8L6 4" />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-blue"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)',
        }}
        animate={{
          x: isHovered ? ['-100%', '200%'] : '-100%',
        }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}
