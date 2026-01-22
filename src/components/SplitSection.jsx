import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SplitSection({
  left,
  right,
  reverse = false,
  className = '',
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      ref={ref}
      className={`split-section ${reverse ? 'md:grid-flow-dense' : ''} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={reverse ? 'md:col-start-2' : ''}
      >
        {left}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className={reverse ? 'md:col-start-1 md:row-start-1' : ''}
      >
        {right}
      </motion.div>
    </section>
  )
}
