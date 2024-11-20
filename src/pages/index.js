import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  const [hoveredWord, setHoveredWord] = useState(null)

  const nameWords = ['CEYVION', 'ANDRE', 'BIGGS']

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          {nameWords.map((word, index) => (
            <div
              key={word}
              className="relative inline-block"
              onMouseEnter={() => setHoveredWord(word)}
              onMouseLeave={() => setHoveredWord(null)}
            >
              <h1 
                className={`
                  transition-colors duration-300 ease-custom
                  ${index > 0 ? 'ml-8' : ''}
                  ${hoveredWord === word ? 'text-accent' : 'text-text'}
                `}
              >
                {word}
              </h1>
              
              {/* Hover line animation */}
              <div 
                className={`
                  absolute bottom-0 left-0 w-full h-0.5
                  transition-transform duration-300 ease-custom origin-left
                  ${hoveredWord === word ? 'scale-x-100' : 'scale-x-0'}
                  bg-accent
                `}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
