import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Achievements', to: '/achievements' },
//  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence initial={false}>
      <motion.header
        className={`navbar-minimal fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'scrolled' : ''
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link to="/" className="font-heading text-xl font-bold text-black">
            Kirti Construction
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-black font-semibold'
                      : 'text-charcoal hover:text-black'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <Link
            to="/contact"
            className="rounded-full bg-black px-6 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-charcoal"
            style={{ color: '#ffffff' }}
          >
            Contact
          </Link>
        </nav>
      </motion.header>
      <div className="h-20" />
    </AnimatePresence>
  )
}
