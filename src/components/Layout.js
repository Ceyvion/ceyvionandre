import React from 'react'
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full h-24 grid grid-cols-12 border-b border-gray-100 bg-white z-50">
        {/* Logo */}
        <div className="col-span-4 pl-12 flex items-center">
          <Link href="/" className="block">
            <h1 className="text-4xl tracking-[-0.05em] leading-[0.9] font-helvetica">
              <span className="block">CEYVION</span>
              <span className="block hover:text-accent transition-colors duration-300">ANDRE</span>
              <span className="block">BIGGS</span>
            </h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="col-start-8 col-span-4 flex items-center justify-end pr-12">
          <ul className="flex gap-12">
            <li>
              <Link
                href="/models"
                className="text-nav hover:text-accent transition-colors duration-300 font-helvetica"
              >
                MODELS
              </Link>
            </li>
            <li>
              <Link
                href="/work"
                className="text-nav hover:text-accent transition-colors duration-300 font-helvetica"
              >
                WORK
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-nav hover:text-accent transition-colors duration-300 font-helvetica"
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="pt-36 px-12 pb-12">
        <div className="grid grid-cols-12 gap-4">
          {/* Left Margin */}
          <div className="col-span-1" />

          {/* Content */}
          <div className="col-span-10">
            {children}
          </div>

          {/* Right Margin */}
          <div className="col-span-1" />
        </div>
      </div>
    </div>
  )
}
