
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
    <footer className="border-t border-gray bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="font-heading mb-4 text-2xl font-bold text-black">
              {footerContent?.companyName || 'Kirti Construction'}
            </h2>
            <p className="mb-4 text-charcoal">
              {footerContent?.description || 'Heritage conservation and architecture studio. Preserving historic structures for future generations.'}
            </p>
            <p className="text-sm text-charcoal">
              {footerContent?.operatingRegions || 'Operating across South Asia, Middle East, and Europe'}
            </p>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 font-semibold text-black">{column.title}</h3>
              <ul className="space-y-2">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-charcoal transition-colors hover:text-black"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 font-semibold text-black">Contact</h3>
            <ul className="space-y-2 text-charcoal">
              <li>
                <a
                  href={`mailto:${contactInfo?.email}`}
                  className="transition-colors hover:text-black"
                >
                  {contactInfo?.email || 'info@kirticonstruction.com'}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo?.phone}`}
                  className="transition-colors hover:text-black"
                >
                  {contactInfo?.phone || '+91 123 456 7890'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray pt-8">
          <div className="flex flex-col justify-between gap-4 text-sm text-charcoal md:flex-row">
            <div>
              {footerContent?.copyrightText || `© ${new Date().getFullYear()} Kirti Construction. All rights reserved.`}
            </div>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-black">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-black">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
