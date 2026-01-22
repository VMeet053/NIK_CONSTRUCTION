import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 28 },
  enter: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: i * 0.12,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  }),
}

export default function ServiceCard({ icon, title, description, index }) {
  return (
    <motion.article
      custom={index}
      initial="initial"
      whileInView="enter"
      viewport={{ once: true, amount: 0.35 }}
      variants={variants}
      className="group relative overflow-hidden rounded-3xl border border-stone-200/70 bg-sand/70 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.06)] backdrop-blur-md"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-forest-soft/0 via-bronze-soft/0 to-stone-soft/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="relative z-10 flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-stone-300/70 bg-sand-deep/70 text-lg text-stone-800 shadow-sm">
          {icon}
        </div>
        <div>
          <h3 className="font-display text-sm uppercase tracking-[0.22em] text-stone-800">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            {description}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

