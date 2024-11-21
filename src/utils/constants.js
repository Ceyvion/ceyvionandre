// Image configurations
export const IMAGE_CONFIG = {
  dimensions: {
    thumbnail: {
      width: 400,
      height: 400
    },
    preview: {
      width: 800,
      height: 800
    },
    full: {
      width: 1920,
      height: 1080
    }
  },
  placeholders: {
    default: '/images/placeholders/default.svg'
  },
  quality: 75
}

// Filter options
export const FILTER_OPTIONS = {
  years: ['2024', '2023', '2022', 'ALL'],
  types: ['EDITORIAL', 'COMMERCIAL', 'PERSONAL']
}

// Animation configurations
export const ANIMATIONS = {
  transition: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1]
  },
  pageTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

// Breakpoints (matching Tailwind config)
export const BREAKPOINTS = {
  mobile: 320,
  tablet: 768,
  desktop: 1200
}

// Social links
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com',
  linkedin: 'https://linkedin.com',
  email: 'mailto:contact@example.com'
}

// Navigation
export const NAV_LINKS = [
  { href: '/models', label: 'MODELS' },
  { href: '/work', label: 'WORK' },
  { href: '/contact', label: 'CONTACT' }
]

// SEO defaults
export const SEO_DEFAULTS = {
  title: 'Ceyvion Andre Biggs Photography',
  description: 'Professional photography portfolio showcasing editorial, commercial, and personal work',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://example.com',
    site_name: 'Ceyvion Andre Biggs Photography'
  }
}

// Contact form
export const CONTACT_FORM = {
  initialValues: {
    name: '',
    email: '',
    message: ''
  },
  validation: {
    name: {
      required: 'Name is required',
      min: 2,
      max: 50
    },
    email: {
      required: 'Email is required',
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    },
    message: {
      required: 'Message is required',
      min: 10,
      max: 1000
    }
  }
}

// Error messages
export const ERROR_MESSAGES = {
  general: 'Something went wrong. Please try again.',
  notFound: 'The page you're looking for doesn't exist.',
  imageLoad: 'Failed to load image.',
  formSubmit: 'Failed to submit form. Please try again.'
}

// Cache keys
export const CACHE_KEYS = {
  models: 'models-data',
  projects: 'projects-data',
  filters: 'active-filters'
}

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'cb-theme',
  filters: 'cb-filters',
  viewPreferences: 'cb-view-preferences'
}
