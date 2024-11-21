import { useState } from 'react'
import Layout from '../../components/Layout'
import fs from 'fs/promises'
import path from 'path'

export default function ModelProfile({ modelData }) {
  const [selectedImage, setSelectedImage] = useState(null)

  // Group images by type (editorial, commercial, personal)
  const imagesByType = modelData.images.reduce((acc, img) => {
    if (!acc[img.type]) {
      acc[img.type] = []
    }
    acc[img.type].push(img)
    return acc
  }, {})

  return (
    <Layout>
      {/* Model Header */}
      <div className="text-center mb-12">
        <h1 className="font-helvetica text-4xl tracking-wide capitalize mb-4">
          {modelData.name}
        </h1>
        <div className="flex justify-center gap-4">
          {Object.keys(imagesByType).map(type => (
            <span key={type} className="font-helvetica text-sm tracking-wider uppercase opacity-75">
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      {Object.entries(imagesByType).map(([type, images]) => (
        <div key={type} className="mb-16">
          <h2 className="font-helvetica text-xl tracking-wide capitalize mb-8">
            {type}
          </h2>
          <div className="grid grid-cols-12 gap-4">
            {images.map((image) => (
              <div
                key={image.url}
                className="col-span-4 aspect-square group relative overflow-hidden bg-gray-50 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <img
                    src={image.url}
                    alt={`${modelData.name} - ${type}`}
                    className="w-full h-full object-cover transition-transform duration-500 ease-custom group-hover:scale-105"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-500 ease-custom" />

                {/* Info */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-custom">
                  <div className="space-y-1">
                    <p className="font-helvetica text-white text-xs tracking-wider opacity-75">{image.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={selectedImage.url}
              alt={`${modelData.name}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <div className="absolute bottom-4 left-4 space-y-1">
              <p className="font-helvetica text-white text-xs tracking-wider opacity-75">{selectedImage.year}</p>
              <p className="font-helvetica text-white text-xs tracking-wider opacity-75 uppercase">{selectedImage.type}</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export async function getStaticPaths() {
  try {
    const galleryPath = path.join(process.cwd(), 'public/images/galleries/models/ceyvion-andre-biggs')
    const years = await fs.readdir(galleryPath)

    // Get all unique model names
    const modelNames = new Set()

    for (const year of years) {
      const yearPath = path.join(galleryPath, year)
      const types = await fs.readdir(yearPath)

      for (const type of types) {
        const typePath = path.join(yearPath, type)
        const files = await fs.readdir(typePath)

        for (const file of files) {
          if (file.endsWith('.webp')) {
            const modelName = path.parse(file).name.split(/[0-9-_]/)[0].trim()
            modelNames.add(modelName)
          }
        }
      }
    }

    // Create paths for each model
    const paths = Array.from(modelNames).map(model => ({
      params: { model }
    }))

    return {
      paths,
      fallback: false
    }
  } catch (error) {
    console.error('Error generating paths:', error)
    return {
      paths: [],
      fallback: false
    }
  }
}

export async function getStaticProps({ params }) {
  try {
    const { model } = params
    const galleryPath = path.join(process.cwd(), 'public/images/galleries/models/ceyvion-andre-biggs')
    const years = await fs.readdir(galleryPath)

    const modelImages = []

    for (const year of years) {
      const yearPath = path.join(galleryPath, year)
      const types = await fs.readdir(yearPath)

      for (const type of types) {
        const typePath = path.join(yearPath, type)
        const files = await fs.readdir(typePath)

        for (const file of files) {
          if (file.endsWith('.webp')) {
            const modelName = path.parse(file).name.split(/[0-9-_]/)[0].trim()
            if (modelName === model) {
              modelImages.push({
                url: `/images/galleries/models/ceyvion-andre-biggs/${year}/${type}/${file}`,
                year,
                type
              })
            }
          }
        }
      }
    }

    // Sort images by year and type
    modelImages.sort((a, b) => {
      if (a.year !== b.year) {
        return b.year.localeCompare(a.year)
      }
      return a.type.localeCompare(b.type)
    })

    return {
      props: {
        modelData: {
          name: model,
          images: modelImages
        }
      },
      revalidate: 60
    }
  } catch (error) {
    console.error('Error loading model data:', error)
    return {
      notFound: true
    }
  }
}
