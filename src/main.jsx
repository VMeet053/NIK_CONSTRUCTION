
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import AppShell from './App.jsx'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
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

// Context Provider
import { ContentProvider } from './context/ContentContext'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ContentProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<AppShell />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="projects" element={<Projects />} />
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
            </Route>
          </Routes>
        </BrowserRouter>
      </ContentProvider>
    </AuthProvider>
  </StrictMode>,
)
