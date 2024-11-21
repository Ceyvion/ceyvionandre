import { useState } from 'react'
import Layout from '../components/Layout'
import FilterBar from '../components/FilterBar'
import { useFilterSystem } from '../hooks/useFilterSystem'
import Link from 'next/link'
import fs from 'fs/promises'
import path from 'path'

export default function Models({ initialPhotos }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const { filteredItems, filters, handleYearFilter, handleModelFilter } = useFilterSystem(initialPhotos)

  return (
    <Layout>
      {/* Filters */}
      <FilterBar
        filters={filters}
        onYearFilter={handleYearFilter}
        onModelFilter={handleModelFilter}
      />

      {/* Grid */}
      <div className="grid grid-cols-12 gap-4">
        {filteredItems.map((photo, index) => (
          <Link
            key={photo.url}
            href={`/models/${photo.model}`}
            className="col-span-4 aspect-square group relative overflow-hidden bg-gray-50"
          >
            {/* Image */}
            <div className="absolute inset-0">
              <img
                src={photo.url}
                alt={photo.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-custom group-hover:scale-105"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-500 ease-custom" />

            {/* Info */}
            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-custom">
              <div className="space-y-1">
                <h3 className="font-helvetica text-white text-sm tracking-wide capitalize">{photo.model}</h3>
                <p className="font-helvetica text-white text-xs tracking-wider opacity-75">{photo.year}</p>
                <p className="font-helvetica text-white text-xs tracking-wider opacity-75 uppercase">{photo.type}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <div className="absolute bottom-4 left-4 space-y-1">
              <h3 className="font-helvetica text-white text-sm tracking-wide capitalize">{selectedImage.model}</h3>
              <p className="font-helvetica text-white text-xs tracking-wider opacity-75">{selectedImage.year}</p>
              <p className="font-helvetica text-white text-xs tracking-wider opacity-75 uppercase">{selectedImage.type}</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  try {
    const galleryPath = path.join(process.cwd(), 'public/images/galleries/models/ceyvion-andre-biggs')
    const years = await fs.readdir(galleryPath)

    // Group all photos by model
    const photosByModel = new Map()

    for (const year of years) {
      const yearPath = path.join(galleryPath, year)
      const types = await fs.readdir(yearPath)

      for (const type of types) {
        const typePath = path.join(yearPath, type)
        const files = await fs.readdir(typePath)

        for (const file of files) {
          if (file.endsWith('.webp')) {
            // Extract model name from filename (before any numbers or special characters)
            const modelName = path.parse(file).name.split(/[0-9-_]/)[0].trim()
            const imageUrl = `/images/galleries/models/ceyvion-andre-biggs/${year}/${type}/${file}`

            if (!photosByModel.has(modelName)) {
              photosByModel.set(modelName, {
                model: modelName,
                year,
                type,
                url: imageUrl,
                name: path.parse(file).name
              })
            }
          }
        }
      }
    }

    // Convert Map to array and get one representative photo per model
    const initialPhotos = Array.from(photosByModel.values())

    return {
      props: {
        initialPhotos
      },
      revalidate: 60
    }
  } catch (error) {
    console.error('Error loading photos:', error)
    return {
      props: {
        initialPhotos: []
      }
    }
  }
}
