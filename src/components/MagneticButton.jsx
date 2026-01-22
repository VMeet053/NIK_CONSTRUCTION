import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function MagneticButton({ 
  children, 
  className = '', 
  to,
  onClick,
  ...props 
}) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left - width / 2
    const mouseY = e.clientY - rect.top - height / 2
    x.set(mouseX * 0.3)
    y.set(mouseY * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const motionProps = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: {
      x: mouseXSpring,
      y: mouseYSpring,
    },
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    className,
    ...props,
  }

  if (to) {
    return (
      <motion.div {...motionProps}>
        <Link to={to} className="block">
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button {...motionProps} onClick={onClick}>
      {children}
    </motion.button>
  )
}
