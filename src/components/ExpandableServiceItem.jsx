import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ExpandableServiceItem({ title, description, icon }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`service-expandable ${expanded ? 'expanded' : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          {icon && (
            <div className="text-2xl font-bold text-blue">{icon}</div>
          )}
          <div>
            <h3 className="font-heading text-xl font-bold text-black">
              {title}
            </h3>
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-light text-charcoal"
        >
          +
        </motion.div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="service-expandable-content"
          >
            <p className="text-charcoal leading-relaxed">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
