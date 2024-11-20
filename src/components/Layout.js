import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.pageYOffset / totalScroll) * 100
      setScrollProgress(currentProgress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => router.pathname === path

  return (
    <div className="min-h-screen">
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-accent z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 right-0 p-6 z-40">
        {/* Desktop Navigation */}
        <div className="hidden tablet:flex space-x-8">
          <Link 
            href="/models"
            className={`nav-link ${isActive('/models') ? 'active' : ''}`}
          >
            MODELS
          </Link>
          <Link 
            href="/work"
            className={`nav-link ${isActive('/work') ? 'active' : ''}`}
          >
            WORK
          </Link>
          <Link 
            href="/contact"
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
          >
            CONTACT
          </Link>
        </div>

        {/* Mobile Navigation Button */}
        <button 
          className="tablet:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-text transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5' : ''}`} />
          <div className={`w-6 h-0.5 bg-text my-1.5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-text transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Mobile Menu */}
        <div className={`
          fixed inset-0 bg-primary z-30 flex flex-col items-center justify-center
          transition-transform duration-300 tablet:hidden
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <Link 
            href="/models"
            className="nav-link text-2xl mb-8"
            onClick={() => setIsMenuOpen(false)}
          >
            MODELS
          </Link>
          <Link 
            href="/work"
            className="nav-link text-2xl mb-8"
            onClick={() => setIsMenuOpen(false)}
          >
            WORK
          </Link>
          <Link 
            href="/contact"
            className="nav-link text-2xl"
            onClick={() => setIsMenuOpen(false)}
          >
            CONTACT
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="page-container pt-16">
        {children}
      </main>
    </div>
  )
}

export default Layout
