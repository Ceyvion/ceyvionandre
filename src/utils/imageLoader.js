// Helper function to generate blur data URL for image placeholders
export const generateBlurDataURL = async (src) => {
  // TODO: Implement actual blur data URL generation
  // For now, return a light gray placeholder
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="#F8F8F8"/></svg>`
  ).toString('base64')}`
}

// Helper function to get image dimensions
export const getImageDimensions = async (src) => {
  // TODO: Implement actual image dimension detection
  // For now, return default dimensions
  return {
    width: 1200,
    height: 1200
  }
}

// Image loader for Next.js Image component
export const imageLoader = ({ src, width, quality = 75 }) => {
  // TODO: Implement actual image optimization/CDN URL generation
  // For now, return the original source
  return src
}

// Helper function to check if image exists
export const checkImageExists = async (src) => {
  try {
    const response = await fetch(src, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

// Helper function to get optimized image sources for different screen sizes
export const getResponsiveImageSrc = (src, { mobile, tablet, desktop }) => {
  return {
    mobile: `${src}?w=${mobile}`,
    tablet: `${src}?w=${tablet}`,
    desktop: `${src}?w=${desktop}`
  }
}

// Constants for image dimensions
export const IMAGE_DIMENSIONS = {
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
}

// Helper function to format image alt text
export const formatAltText = (filename) => {
  return filename
    .replace(/[-_]/g, ' ')
    .replace(/\.[^/.]+$/, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
