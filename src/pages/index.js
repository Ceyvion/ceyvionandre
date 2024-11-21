import React from 'react'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="min-h-[80vh] grid grid-cols-12 gap-4">
        {/* Left Column - Empty Space */}
        <div className="col-span-2" />

        {/* Center Column - Main Content */}
        <div className="col-span-8 flex flex-col justify-center">
          {/* Name */}
          <div className="mb-24">
            <h1 className="font-helvetica text-[12vw] leading-[0.85] tracking-[-0.05em] uppercase">
              <span className="block">Ceyvion</span>
              <span className="block text-accent hover:translate-x-4 transition-transform duration-500 ease-custom">
                Andre
              </span>
              <span className="block">Biggs</span>
            </h1>
          </div>

          {/* Description */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8">
              <p className="font-helvetica text-sm tracking-wide leading-relaxed opacity-75">
                A photographer specializing in fashion and editorial work,
                capturing the essence of style and individuality through
                a minimalist lens.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Empty Space */}
        <div className="col-span-2" />
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-[1px] h-16 bg-black opacity-25 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-accent animate-scroll-down" />
        </div>
      </div>
    </Layout>
  )
}
