
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'

export default function Footer() {
  const { contactInfo, footerContent } = useContent()

  const footerLinks = [
    {
      title: footerContent?.column1Title || 'Studio',
      items: [
        { label: 'About', to: '/about' },
        { label: 'Services', to: '/services' },
        { label: 'Achievements', to: '/achievements' },
      ],
    },
    {
      title: footerContent?.column2Title || 'Work',
      items: [
        { label: 'Projects', to: '/projects' },
        { label: 'Blog', to: '/blog' },
        { label: 'Contact', to: '/contact' },
      ],
    },
  ]
  
  return (
    <footer className="relative z-50 border-t border-white/10 bg-black py-16 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="font-heading mb-4 text-2xl font-bold text-white">
              {footerContent?.companyName || 'Kirti Construction'}
            </h2>
            <p className="mb-4 text-gray-400">
              {footerContent?.description || 'Heritage conservation and architecture studio. Preserving historic structures for future generations.'}
            </p>
            <p className="text-sm text-gray-500">
              {footerContent?.operatingRegions || 'Operating across South Asia, Middle East, and Europe'}
            </p>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 font-semibold text-white">{column.title}</h3>
              <ul className="space-y-2">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-gray-400 transition-colors hover:text-blue"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 font-semibold text-white">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href={`mailto:${contactInfo?.email}`}
                  className="transition-colors hover:text-blue"
                >
                  {contactInfo?.email || 'info@kirticonstruction.com'}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo?.phone}`}
                  className="transition-colors hover:text-blue"
                >
                  {contactInfo?.phone || '+91 123 456 7890'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col justify-between gap-4 text-sm text-gray-500 md:flex-row">
            <div>
              {footerContent?.copyrightText || `© ${new Date().getFullYear()} Kirti Construction. All rights reserved.`}
            </div>
            <div className="flex gap-6 items-center">
              {/* Social Icons */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-transform hover:scale-110"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <div className="w-px h-4 bg-gray-700 mx-2"></div>
              <a href="#" className="transition-colors hover:text-white">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
