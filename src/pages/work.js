import { useState } from 'react'
import Layout from '../components/Layout'

// Mock data - replace with actual data
const mockProjects = [
  {
    id: 1,
    title: 'Project Title',
    year: '2024',
    type: 'EDITORIAL',
    image: '/placeholder.jpg',
    description: 'Project description goes here',
    models: ['Model 1', 'Model 2'],
    images: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg']
  },
  // Add more mock projects as needed
]

const years = ['2024', '2023', '2022', 'ALL']
const types = ['EDITORIAL', 'COMMERCIAL', 'PERSONAL']

export default function Work() {
  const [selectedYear, setSelectedYear] = useState('ALL')
  const [selectedType, setSelectedType] = useState(null)
  const [expandedProject, setExpandedProject] = useState(null)

  const filteredProjects = mockProjects.filter(project => {
    if (selectedYear !== 'ALL' && project.year !== selectedYear) return false
    if (selectedType && project.type !== selectedType) return false
    return true
  })

  return (
    <Layout>
      {/* Filters */}
      <div className="sticky top-16 bg-primary z-20 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Year Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            <span className="text-text">YEAR:</span>
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`
                  px-4 py-1 transition-colors duration-200
                  ${selectedYear === year 
                    ? 'bg-accent text-primary' 
                    : 'text-text hover:text-accent'}
                `}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            <span className="text-text">TYPE:</span>
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(selectedType === type ? null : type)}
                className={`
                  px-4 py-1 transition-colors duration-200
                  ${selectedType === type 
                    ? 'bg-accent text-primary' 
                    : 'text-text hover:text-accent'}
                `}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-24 mt-16">
        {filteredProjects.map(project => (
          <div key={project.id} className="space-y-8">
            {/* Project Header */}
            <div 
              className="cursor-pointer"
              onClick={() => setExpandedProject(
                expandedProject === project.id ? null : project.id
              )}
            >
              {/* Hero Image */}
              <div className="relative aspect-[21/9] overflow-hidden mb-6">
                <div 
                  className="w-full h-full bg-center bg-cover image-hover"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>

              {/* Project Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h2>{project.title}</h2>
                  <p className="text-small">{project.year}</p>
                </div>
                <div className={`
                  transform transition-transform duration-300
                  ${expandedProject === project.id ? 'rotate-180' : ''}
                `}>
                  ↓
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedProject === project.id && (
              <div className="space-y-8 transition-all duration-300">
                <p>{project.description}</p>
                
                {/* Models */}
                {project.models.length > 0 && (
                  <div>
                    <h3 className="mb-4">Featured Models</h3>
                    <div className="flex flex-wrap gap-4">
                      {project.models.map(model => (
                        <span 
                          key={model}
                          className="text-accent hover:underline cursor-pointer"
                        >
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Grid */}
                <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-grid-gap">
                  {project.images.map((image, index) => (
                    <div 
                      key={index}
                      className="relative aspect-square overflow-hidden"
                    >
                      <div 
                        className="w-full h-full bg-center bg-cover image-hover"
                        style={{ backgroundImage: `url(${image})` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  )
}
