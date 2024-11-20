import { useState, useEffect, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import { 
  generateBlurDataURL, 
  checkImageExists, 
  getImageDimensions,
  getResponsiveImageSrc 
} from '../utils/imageLoader'

export function useImageLoader(src, options = {}) {
  const {
    priority = false,
    preload = false,
    responsive = true,
    quality = 75
  } = options

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageData, setImageData] = useState({
    src: '',
    blurDataURL: '',
    width: 0,
    height: 0,
    responsiveSources: null
  })

  const { isImageCached, addToImageCache, preloadImage } = useApp()

  // Load image data
  const loadImageData = useCallback(async () => {
    if (!src) return

    try {
      setLoading(true)
      setError(null)

      // Check if image exists
      const exists = await checkImageExists(src)
      if (!exists) throw new Error('Image not found')

      // Generate blur data URL
      const blurDataURL = await generateBlurDataURL(src)

      // Get image dimensions
      const dimensions = await getImageDimensions(src)

      // Get responsive sources if needed
      const responsiveSources = responsive ? getResponsiveImageSrc(src, {
        mobile: 640,
        tablet: 1200,
        desktop: 1920
      }) : null

      setImageData({
        src,
        blurDataURL,
        width: dimensions.width,
        height: dimensions.height,
        responsiveSources
      })

      // Add to cache
      addToImageCache(src)
    } catch (err) {
      setError(err.message)
      console.error('Error loading image:', err)
    } finally {
      setLoading(false)
    }
  }, [src, responsive, addToImageCache])

  // Preload image
  useEffect(() => {
    if (!src || !preload || isImageCached(src)) return
    preloadImage(src)
  }, [src, preload, isImageCached, preloadImage])

  // Load image data on mount or src change
  useEffect(() => {
    loadImageData()
  }, [loadImageData])

  // Generate srcSet for responsive images
  const getSrcSet = useCallback(() => {
    if (!imageData.responsiveSources) return ''

    return Object.entries(imageData.responsiveSources)
      .map(([size, url]) => `${url} ${size}w`)
      .join(', ')
  }, [imageData.responsiveSources])

  // Get optimal image size based on container
  const getOptimalSize = useCallback((containerWidth) => {
    if (!imageData.responsiveSources) return src

    const breakpoints = {
      mobile: 640,
      tablet: 1200,
      desktop: 1920
    }

    const optimalBreakpoint = Object.entries(breakpoints)
      .reverse()
      .find(([_, width]) => containerWidth <= width)

    return optimalBreakpoint 
      ? imageData.responsiveSources[optimalBreakpoint[0]]
      : imageData.responsiveSources.desktop
  }, [src, imageData.responsiveSources])

  return {
    loading,
    error,
    imageData,
    getSrcSet,
    getOptimalSize,
    reload: loadImageData
  }
}

export default useImageLoader
