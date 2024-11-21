import React, { useState, useEffect } from 'react'

export default function ProjectSlideshow({ images, title }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative w-full h-full">
      {/* Images */}
      {images.map((image, index) => (
        <div
          key={image.url}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.url}
            alt={`${title} - ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Title Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
        <h2 className="font-helvetica text-white text-xl tracking-wide capitalize">
          {title}
        </h2>
        <p className="font-helvetica text-white/75 text-sm tracking-wider mt-1">
          {currentImageIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  )
}
