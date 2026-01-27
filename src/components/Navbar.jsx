import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  return (
    <AnimatePresence initial={false}>
      <motion.header
        key="navbar-header"
        className={`navbar-minimal fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen ? 'bg-white/90 backdrop-blur-md shadow-md' : ''
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-0 xl:px-12 relative h-20 md:h-24">
          {/* 1. Logo (Left) */}
          <Link to="/" className="flex items-center relative z-50 shrink-0">
            <img 
              src="/logo.png" 
              alt="Kirti Construction" 
              className="h-16 w-auto object-contain md:h-20"
            />
          </Link>

          {/* 2. Centered Nav Items (Absolute Center - Desktop Only) */}
          <div className="hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-10">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-lg font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-black font-bold'
                      : 'text-charcoal hover:text-black'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* 3. Right Side: Contact Button (Desktop) + Hamburger (Mobile) */}
          <div className="flex items-center gap-4">
            {/* Contact Button - Visible on XL+ */}
            <Link
              to="/contact"
              className="hidden xl:block rounded-full bg-black px-8 py-3 text-base font-bold text-white transition-all duration-200 hover:bg-charcoal hover:scale-105"
              style={{ color: '#ffffff' }} // Force white color
            >
              Contact
            </Link>

            {/* Mobile Menu Toggle - Hidden on XL+ */}
            <button 
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 xl:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span 
                animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="h-0.5 w-6 bg-black"
              />
              <motion.span 
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="h-0.5 w-6 bg-black"
              />
              <motion.span 
                animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="h-0.5 w-6 bg-black"
              />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white xl:hidden"
            >
              <div className="flex flex-col items-center gap-8">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-3xl font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-black font-bold'
                          : 'text-charcoal hover:text-black'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-8 rounded-full bg-black px-10 py-4 text-xl font-bold text-white hover:bg-charcoal"
                  style={{ color: '#ffffff' }}
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </AnimatePresence>
  )
}
