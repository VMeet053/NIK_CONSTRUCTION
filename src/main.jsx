
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import AppShell from './App.jsx'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Achievements from './pages/Achievements'
import Blog from './pages/Blog'
import Contact from './pages/Contact'

// Admin Imports
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AdminProjects from './pages/admin/AdminProjects'
import AdminServices from './pages/admin/AdminServices'
import AdminTestimonials from './pages/admin/AdminTestimonials'
import AdminClients from './pages/admin/AdminClients'
import AdminAchievements from './pages/admin/AdminAchievements'
import AdminBlog from './pages/admin/AdminBlog'
import AdminHero from './pages/admin/AdminHero'
import AdminStats from './pages/admin/AdminStats'
import AdminAbout from './pages/admin/AdminAbout'
import AdminContact from './pages/admin/AdminContact'
import AdminHomeGeneral from './pages/admin/AdminHomeGeneral'
import AdminServicesGeneral from './pages/admin/AdminServicesGeneral'
import AdminProjectsGeneral from './pages/admin/AdminProjectsGeneral'
import AdminFooter from './pages/admin/AdminFooter'

// Context Provider
import { ContentProvider } from './context/ContentContext'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { ConfirmProvider } from './context/ConfirmContext'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

import ScrollToTop from './components/ScrollToTop'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <ConfirmProvider>
          <ContentProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
            {/* Public Routes */}
            <Route path="/" element={<AppShell />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="achievements" element={<Achievements />} />
              <Route path="blog" element={<Blog />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Auth Route */}
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="clients" element={<AdminClients />} />
              <Route path="achievements" element={<AdminAchievements />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="hero" element={<AdminHero />} />
              <Route path="stats" element={<AdminStats />} />
              <Route path="about" element={<AdminAbout />} />
              <Route path="contact" element={<AdminContact />} />
              <Route path="home-general" element={<AdminHomeGeneral />} />
              <Route path="services-general" element={<AdminServicesGeneral />} />
              <Route path="projects-general" element={<AdminProjectsGeneral />} />
              <Route path="footer" element={<AdminFooter />} />
            </Route>
          </Routes>
          </BrowserRouter>
          </ContentProvider>
        </ConfirmProvider>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>,
)
