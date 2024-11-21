import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import ProjectSlideshow from '../components/ProjectSlideshow'
import fs from 'fs/promises'
import path from 'path'

export default function Work({ allProjects }) {
  const [displayedProjects, setDisplayedProjects] = useState([])

  useEffect(() => {
    // Select two random projects on mount or refresh
    const selectRandomProjects = () => {
      const shuffled = [...allProjects].sort(() => 0.5 - Math.random())
      setDisplayedProjects(shuffled.slice(0, 2))
    }

    selectRandomProjects()
  }, [allProjects])

  return (
    <Layout>
      <div className="grid grid-cols-12 gap-8 mt-8">
        {displayedProjects.map((project, index) => (
          <div key={project.model} className={`col-span-6 aspect-[4/5]`}>
            <ProjectSlideshow
              images={project.images}
              title={project.model}
            />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  try {
    const galleryPath = path.join(process.cwd(), 'public/images/galleries/models/ceyvion-andre-biggs')
    const years = await fs.readdir(galleryPath)

    // Group all photos by model
    const projectsByModel = new Map()

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

            if (!projectsByModel.has(modelName)) {
              projectsByModel.set(modelName, {
                model: modelName,
                images: []
              })
            }

            projectsByModel.get(modelName).images.push({
              url: imageUrl,
              year,
              type
            })
          }
        }
      }
    }

    // Convert Map to array and sort images within each project
    const allProjects = Array.from(projectsByModel.values()).map(project => ({
      ...project,
      images: project.images.sort((a, b) => a.url.localeCompare(b.url))
    }))

    return {
      props: {
        allProjects
      },
      revalidate: 60
    }
  } catch (error) {
    console.error('Error loading projects:', error)
    return {
      props: {
        allProjects: []
      }
    }
  }
}
