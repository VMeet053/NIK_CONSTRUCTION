import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

export default function Counter({
  from = 0,
  to,
  duration = 1.5,
  className = '',
  suffix = '',
}) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => Math.floor(latest).toLocaleString())

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: [0.4, 0, 0.2, 1],
    })
    return controls.stop
  }, [count, to, duration])

  return (
    <motion.div className={className}>
      <motion.span className="font-heading text-4xl font-bold text-black md:text-5xl">
        {rounded}
      </motion.span>
      {suffix && (
        <span className="ml-2 text-sm font-medium text-charcoal">
          {suffix}
        </span>
      )}
    </motion.div>
  )
}
