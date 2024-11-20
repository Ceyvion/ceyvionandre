import { useState, useEffect, useCallback } from 'react'
import PlaceholderImage from './PlaceholderImage'

const ImageGallery = ({ 
  images, 
  initialIndex = 0,
  onClose,
  showInfo = true,
  info = {}  // { year, type }
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isLoading, setIsLoading] = useState(true)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          navigate('prev')
          break
        case 'ArrowRight':
          navigate('next')
          break
        case 'Escape':
          onClose()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentIndex, onClose])

  // Prevent body scroll when gallery is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Navigation functions
  const navigate = useCallback((direction) => {
    setIsLoading(true)
    setCurrentIndex(current => {
      if (direction === 'next') {
        return current === images.length - 1 ? 0 : current + 1
      } else {
        return current === 0 ? images.length - 1 : current - 1
      }
    })
  }, [images.length])

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-primary hover:text-accent transition-colors duration-200"
        aria-label="Close gallery"
      >
        ✕
      </button>

      {/* Navigation arrows */}
      <button
        onClick={() => navigate('prev')}
        className="absolute left-6 text-primary hover:text-accent transition-colors duration-200"
        aria-label="Previous image"
      >
        ←
      </button>
      <button
        onClick={() => navigate('next')}
        className="absolute right-6 text-primary hover:text-accent transition-colors duration-200"
        aria-label="Next image"
      >
        →
      </button>

      {/* Main image */}
      <div className="relative w-full h-full max-w-7xl max-h-[90vh] mx-6">
        <PlaceholderImage
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="w-full h-full"
          objectFit="contain"
          onLoadingComplete={() => setIsLoading(false)}
        />

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Image info */}
        {showInfo && info && (
          <div className="
            absolute bottom-0 left-0 right-0
            bg-gradient-to-t from-black to-transparent
            text-primary p-6
            transform transition-transform duration-300
            translate-y-full hover:translate-y-0
          ">
            {info.year && (
              <p className="text-small mb-1">{info.year}</p>
            )}
            {info.type && (
              <p className="text-small">{info.type}</p>
            )}
          </div>
        )}
      </div>

      {/* Image counter */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-primary">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}

export default ImageGallery
