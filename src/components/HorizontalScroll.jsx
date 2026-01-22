import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function HorizontalScroll({ children, className = '' }) {
  const scrollRef = useRef(null)
  const containerRef = useRef(null)

  const { scrollXProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollXProgress, [0, 1], ['0%', '-50%'])

  return (
    <div ref={scrollRef} className={`relative ${className}`}>
      <div className="sticky top-20 overflow-hidden">
        <motion.div
          ref={containerRef}
          style={{ x }}
          className="flex gap-8"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

export function HorizontalScrollItem({ children, className = '' }) {
  return (
    <div className={`horizontal-scroll-item flex-shrink-0 ${className}`}>
      {children}
    </div>
  )
}
