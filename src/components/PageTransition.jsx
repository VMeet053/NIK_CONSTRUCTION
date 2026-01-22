import { motion } from 'framer-motion'

const overlayVariants = {
  initial: { scaleX: 1, originX: 0, opacity: 0 },
  enter: {
    scaleX: 0,
    originX: 1,
    opacity: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    scaleX: 1,
    originX: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
}

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
}

export default function PageTransition({ children }) {
  return (
    <div className="relative">
      <motion.div
        className="pointer-events-none fixed inset-y-0 right-0 z-30 w-full bg-black"
        variants={overlayVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      />
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  )
}
