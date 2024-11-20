import { useState } from 'react'
import Layout from '../components/Layout'

// Mock data - replace with actual data
const mockModels = [
  { id: 1, name: 'Model Name', year: '2024', type: 'EDITORIAL', image: '/placeholder.jpg' },
  { id: 2, name: 'Model Name', year: '2023', type: 'COMMERCIAL', image: '/placeholder.jpg' },
  { id: 3, name: 'Model Name', year: '2022', type: 'PERSONAL', image: '/placeholder.jpg' },
]

const years = ['2024', '2023', '2022', 'ALL']
const types = ['EDITORIAL', 'COMMERCIAL', 'PERSONAL']

export default function Models() {
  const [selectedYear, setSelectedYear] = useState('ALL')
  const [selectedType, setSelectedType] = useState(null)

  const filteredModels = mockModels.filter(model => {
    if (selectedYear !== 'ALL' && model.year !== selectedYear) return false
    if (selectedType && model.type !== selectedType) return false
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

      {/* Grid */}
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-grid-gap mt-8">
        {filteredModels.map(model => (
          <div 
            key={model.id}
            className="group relative aspect-square overflow-hidden bg-gray-light"
          >
            {/* Image */}
            <div className="absolute inset-0">
              <div 
                className="w-full h-full bg-center bg-cover image-hover"
                style={{ backgroundImage: `url(${model.image})` }}
              />
            </div>

            {/* Overlay */}
            <div className="
              absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40
              flex items-end justify-start p-6
              transition-all duration-300 ease-custom
            ">
              <div className="
                transform translate-y-full group-hover:translate-y-0
                transition-transform duration-300 ease-custom
              ">
                <h3 className="text-primary">{model.name}</h3>
                <p className="text-primary text-small">{model.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
