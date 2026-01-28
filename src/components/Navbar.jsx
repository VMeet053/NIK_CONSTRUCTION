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
              className="h-20 w-auto object-contain md:h-24"
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
          <div className="flex items-center gap-4 xl:-mr-4">
            {/* Desktop Action Group - Visible on XL+ */}
            <div className="hidden xl:flex items-center p-1.5 bg-white border border-gray-100 rounded-full shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_25px_-4px_rgba(0,0,0,0.12)] hover:border-gray-200">
              <Link
                to="/contact"
                className="rounded-full bg-black px-7 py-3 text-sm font-bold text-white shadow-md shadow-black/10 transition-all duration-300 hover:bg-gray-900 hover:scale-[1.02] active:scale-95"
                style={{ color: '#ffffff' }}
              >
                Contact
              </Link>
              
              <div className="mx-3 h-8 w-px bg-gray-100"></div>
              
              <div className="flex items-center gap-2 pr-2">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-blue-50/80"
                  aria-label="Facebook"
                >
                  <svg className="transition-transform duration-300 group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-blue-50/80"
                  aria-label="LinkedIn"
                >
                  <svg className="transition-transform duration-300 group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="#0A66C2">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

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

                {/* Social Icons Mobile */}
                <div className="flex items-center gap-6 mt-8">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="transition-colors hover:scale-110"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="transition-colors hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#0A66C2">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </AnimatePresence>
  )
}
