import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import './index.css'

function AppShell() {
  const location = useLocation()

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-shell-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className="h-full"
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <PageTransition>
              <Outlet />
            </PageTransition>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default AppShell
