import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

function StatItem({ number, label, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
    </motion.div>
  )
}

export default function StatGrid({ stats = [], className = '' }) {
  return (
    <div className={`stat-grid ${className}`}>
      {stats.map((stat, idx) => (
        <StatItem
          key={stat.label}
          number={stat.number}
          label={stat.label}
          delay={idx * 0.1}
        />
      ))}
    </div>
  )
}
