import { useState, useEffect } from 'react'
import Image from 'next/image'
import { generateBlurDataURL, checkImageExists } from '../utils/imageLoader'

const PlaceholderImage = ({
  src,
  alt,
  className = '',
  priority = false,
  objectFit = 'cover',
  layout = 'fill'
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [blurDataURL, setBlurDataURL] = useState('')

  useEffect(() => {
    const loadImage = async () => {
      try {
        // Generate blur placeholder
        const dataURL = await generateBlurDataURL(src)
        setBlurDataURL(dataURL)

        // Check if image exists
        const exists = await checkImageExists(src)
        if (!exists) throw new Error('Image not found')

        setLoading(false)
      } catch (err) {
        console.error('Error loading image:', err)
        setError(true)
        setLoading(false)
      }
    }

    loadImage()
  }, [src])

  if (error) {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 bg-gray-light flex items-center justify-center">
          <span className="text-gray-dark">Image not found</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        layout={layout}
        objectFit={objectFit}
        priority={priority}
        placeholder="blur"
        blurDataURL={blurDataURL}
        className={`
          transition-opacity duration-300
          ${loading ? 'opacity-0' : 'opacity-100'}
        `}
        onLoadingComplete={() => setLoading(false)}
      />
      
      {loading && (
        <div className="absolute inset-0 bg-gray-light animate-pulse" />
      )}
    </div>
  )
}

export default PlaceholderImage
