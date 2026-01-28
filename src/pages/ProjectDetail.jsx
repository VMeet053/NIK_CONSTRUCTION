import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useContent } from '../context/ContentContext'
import StaggeredText from '../components/StaggeredText'
import html2pdf from 'html2pdf.js'

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects } = useContent()
  const [project, setProject] = useState(null)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    if (projects.length > 0) {
      // Find project by slug (title converted to kebab-case) or direct comparison if we passed ID
      // Assuming we link using slugified title
      const found = projects.find(p => 
        (p.slug && p.slug === id) ||
        p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id || 
        p.id === id
      )
      
      if (found) {
        setProject(found)
      } else {
        // Handle not found
        console.log("Project not found")
      }
    }
  }, [id, projects])

  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center bg-sand text-charcoal">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading Project...</h2>
          <p>Or project not found.</p>
          <Link to="/projects" className="mt-4 inline-block text-blue underline">Back to Projects</Link>
        </div>
      </div>
    )
  }

  // Mock data for missing fields if they don't exist in the project object
  const details = {
    ...project,
    fullDescription: project.fullDescription || project.history || "No detailed history available.",
    challenges: project.challenges || "The main challenge was preserving the structural integrity while modernizing the utilities. The site had suffered from years of neglect and weathering.",
    intervention: project.intervention || project.summary || "Comprehensive restoration including structural strengthening, lime plastering, and stone restoration.",
    outcome: project.outcome || "The site has been fully restored to its former glory and now serves as a cultural landmark.",
    gallery: project.gallery || [
        project.image,
        'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
        'https://images.unsplash.com/photo-1548625361-12563f683411?w=800'
    ]
  }

  const downloadPDF = async () => {
    if (generating) return
    setGenerating(true)
    
    // Helper to ensure absolute paths
    const getFullPath = (path) => {
        if (!path) return ''
        if (path.startsWith('http')) return path
        if (path.startsWith('/')) return `${window.location.origin}${path}`
        return path
    }

    // Convert image to base64 to ensure it renders in PDF
    const getBase64FromUrl = async (url) => {
        try {
            const data = await fetch(url)
            const blob = await data.blob()
            return new Promise((resolve) => {
                const reader = new FileReader()
                reader.readAsDataURL(blob)
                reader.onloadend = () => resolve(reader.result)
            })
        } catch (error) {
            console.error("Image loading error:", error)
            return url // Fallback to URL if fetch fails
        }
    }

    const bgUrl = getFullPath('/bgg.png')
    const bgBase64 = await getBase64FromUrl(bgUrl)
    
    const heroUrl = getFullPath(details.image) || bgUrl
    
    const g1 = details.gallery && details.gallery[0] ? getFullPath(details.gallery[0]) : heroUrl
    const g2 = details.gallery && details.gallery[1] ? getFullPath(details.gallery[1]) : bgUrl
    const safe = (s) => String(s || '')
    
    // Create a temporary container
    const element = document.createElement('div')
    element.style.width = '210mm' // Force A4 width
    
    element.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&display=swap');
        html, body { margin: 0; padding: 0; }
        .pdf-container {
             position: relative;
             width: 100%;
             height: 295mm; /* Fixed height slightly less than A4 to prevent 2nd page */
             font-family: 'Lato', sans-serif;
             color: #333;
             overflow: hidden;
             background-image: url('${bgBase64}');
             background-size: cover;
             background-position: center;
             background-color: #f4f1ea;
         }
        .content-wrapper {
            padding: 40px;
        }
        .header { 
            margin-bottom: 30px; 
            border-bottom: 2px solid #0b3b70; 
            padding-bottom: 20px; 
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        .title { 
            font-family: 'Playfair Display', serif; 
            font-size: 36px; 
            font-weight: 800; 
            color: #111; 
            line-height: 1; 
            width: 65%;
        }
        .meta { 
            text-align: right; 
            font-size: 11px; 
            line-height: 1.6;
            width: 30%;
        }
        .section-title { 
            font-family: 'Playfair Display', serif; 
            font-size: 18px; 
            font-weight: 700; 
            color: #0b3b70; 
            margin: 20px 0 10px; 
            text-transform: uppercase; 
            letter-spacing: 1px; 
        }
        .quote { 
            border-left: 4px solid #0b3b70; 
            padding: 15px 20px; 
            font-style: italic; 
            color: #222; 
            margin-bottom: 20px; 
            font-size: 14px; 
            background: rgba(255,255,255,0.6); 
            border-radius: 0 8px 8px 0;
        }
        .grid-row { 
            display: flex; 
            gap: 20px; 
            margin-bottom: 20px; 
        }
        .card { 
            flex: 1; 
            background: rgba(255,255,255,0.9); 
            border: 1px solid rgba(0,0,0,0.1); 
            padding: 15px; 
            border-radius: 8px; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .card.dark { 
            background: #1a1a1a; 
            color: #fff; 
        }
        .card.dark .section-title { color: #fff; }
        .card.dark div { color: #ccc; }
        
        .gallery-grid { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 15px; 
            margin-top: 15px; 
        }
        .gallery-img { 
            width: 100%; 
            height: 200px; 
            object-fit: cover; 
            border-radius: 4px; 
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .outcome-box {
            margin-top: 20px; 
            background: rgba(11,59,112,0.1); 
            border-left: 5px solid #0b3b70; 
            padding: 20px;
            border-radius: 0 8px 8px 0;
        }
        p, div { font-size: 12px; line-height: 1.5; }
      </style>
      
      <div class="pdf-container">
        <div class="content-wrapper">
            <div class="header">
              <div class="title">${safe(details.title)}</div>
              <div class="meta">
                <div><strong>Location:</strong> ${safe(details.location)}</div>
                <div><strong>Year:</strong> ${safe(details.year)}</div>
                <div><strong>Client:</strong> ${safe(details.client || 'Private Client')}</div>
                <div><strong>Status:</strong> ${safe(details.status || 'Completed')}</div>
              </div>
            </div>
            
            <div class="section-title">Historical Context</div>
            <div class="quote">"${safe(details.fullDescription)}"</div>
            
            <div class="grid-row">
              <div class="card">
                <div class="section-title" style="margin-top:0;">The Challenge</div>
                <div>${safe(details.challenges)}</div>
              </div>
              <div class="card dark">
                <div class="section-title" style="margin-top:0;">Intervention</div>
                <div>${safe(details.intervention)}</div>
              </div>
            </div>
            
            <div class="section-title">Project Gallery</div>
            <div class="gallery-grid">
              <img src="${g1}" class="gallery-img" />
              <img src="${g2}" class="gallery-img" />
            </div>
            
            <div class="outcome-box">
              <div class="section-title" style="margin-top:0;">The Outcome</div>
              <div>${safe(details.outcome)}</div>
            </div>
        </div>
      </div>
    `

    const opt = {
      margin: 0,
      filename: `${details.title}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        logging: false,
        width: 794,
        windowWidth: 794,
        height: 1100, 
        windowHeight: 1100
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }

    try {
        await html2pdf().set(opt).from(element).save()
    } catch (err) {
        console.error('PDF generation error:', err)
        alert('Failed to generate PDF. Please try again.')
    } finally {
        setGenerating(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-sand text-charcoal">
       {/* Fixed Background Image */}
       <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="/bgg.png"
          alt="Vintage Background"
          className="h-full w-full object-cover opacity-100"
          onError={(e) => {
            const target = e.target;
            if (target.src.endsWith('bgg.png')) {
               target.src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2000&auto=format&fit=crop';
            }
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        {createPortal(
          <div className="fixed top-28 right-6 z-[9999]">
            <button
              onClick={downloadPDF}
              className="rounded-full bg-white text-black px-6 py-3 font-bold transition-all hover:bg-gray-100 hover:scale-105 shadow-2xl border border-gray-200 flex items-center gap-2 ring-1 ring-black/5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download PDF
            </button>
          </div>,
          document.body
        )}
        <img
            src={details.image || '/bgg.png'}
            alt="Project Hero"
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => { e.target.src = '/bgg.png' }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 text-white z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl"
            >
                <div className="flex items-center gap-4 mb-4">
                    <span className="bg-blue px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                        {details.category}
                    </span>
                    <span className="text-lg font-medium">{details.year}</span>
                </div>
                <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6">
                    {details.title}
                </h1>
                <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl">
                    {details.location}
                </p>
            </motion.div>
        </div>
      </section>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Sidebar Info */}
            <div className="lg:col-span-4 space-y-10">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/50 backdrop-blur-md p-8 border border-charcoal/10 rounded-none"
                >
                    <h3 className="font-bold uppercase tracking-widest text-blue mb-6">Project Details</h3>
                    <ul className="space-y-4">
                        <li className="flex flex-col">
                            <span className="text-xs font-bold text-charcoal/50 uppercase">Location</span>
                            <span className="text-lg font-medium">{details.location}</span>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-xs font-bold text-charcoal/50 uppercase">Year</span>
                            <span className="text-lg font-medium">{details.year}</span>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-xs font-bold text-charcoal/50 uppercase">Client</span>
                            <span className="text-lg font-medium">{details.client || "Private Client"}</span>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-xs font-bold text-charcoal/50 uppercase">Status</span>
                            <span className="text-lg font-medium">{details.status || "Completed"}</span>
                        </li>
                    </ul>
                </motion.div>

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                    <button 
                        onClick={() => navigate('/projects')}
                        className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-charcoal hover:text-blue transition-colors"
                    >
                        <span>←</span> Back to Projects
                    </button>
                </div>
            </div>

            {/* Right Column: Main Content */}
            <div className="lg:col-span-8 space-y-16">
                
                {/* Historical Context */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-black">Historical Context</h2>
                    <p className="text-lg md:text-xl leading-relaxed text-charcoal/80 border-l-4 border-blue pl-6 italic">
                        "{details.fullDescription}"
                    </p>
                </motion.section>

                {/* Challenges & Intervention */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/30 p-8 border border-charcoal/5"
                    >
                        <h3 className="font-heading text-2xl font-bold mb-4 text-black">The Challenge</h3>
                        <p className="text-charcoal/80 leading-relaxed">
                            {details.challenges}
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-black text-white p-8"
                    >
                        <h3 className="font-heading text-2xl font-bold mb-4 text-white">Intervention</h3>
                        <p className="text-gray-300 leading-relaxed">
                            {details.intervention}
                        </p>
                    </motion.section>
                </div>

                {/* Gallery */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-black">Project Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {details.gallery.map((img, idx) => (
                            <div key={idx} className={`relative overflow-hidden group ${idx === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square'}`}>
                                <img 
                                    src={img || '/bgg.png'} 
                                    alt={`Gallery ${idx + 1}`}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => { e.target.src = '/bgg.png' }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Outcome */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-blue/10 p-10 border-l-4 border-blue"
                >
                     <h3 className="font-heading text-2xl font-bold mb-4 text-blue">The Outcome</h3>
                     <p className="text-lg leading-relaxed text-charcoal">
                        {details.outcome}
                     </p>
                </motion.section>

            </div>
        </div>
      </div>
    </div>
  )
}
