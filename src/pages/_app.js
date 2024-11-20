import { useEffect } from 'react'
import Head from 'next/head'
import { AppProvider } from '../context/AppContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // Handle errors that occur outside of components
  useEffect(() => {
    const handleError = (error) => {
      console.error('Global error:', error)
      // TODO: Implement error reporting service
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleError)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleError)
    }
  }, [])

  // Handle client-side navigation progress
  useEffect(() => {
    const handleStart = () => {
      document.body.style.cursor = 'wait'
    }
    const handleComplete = () => {
      document.body.style.cursor = 'default'
    }

    window.addEventListener('routeChangeStart', handleStart)
    window.addEventListener('routeChangeComplete', handleComplete)
    window.addEventListener('routeChangeError', handleComplete)

    return () => {
      window.removeEventListener('routeChangeStart', handleStart)
      window.removeEventListener('routeChangeComplete', handleComplete)
      window.removeEventListener('routeChangeError', handleComplete)
    }
  }, [])

  return (
    <AppProvider>
      <Head>
        <title>Ceyvion Andre Biggs Photography</title>
        <meta name="description" content="Professional photography portfolio showcasing editorial, commercial, and personal work" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Ceyvion Andre Biggs Photography" />
        <meta property="og:description" content="Professional photography portfolio showcasing editorial, commercial, and personal work" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ceyvion Andre Biggs Photography" />
        <meta name="twitter:description" content="Professional photography portfolio showcasing editorial, commercial, and personal work" />
        <meta name="twitter:image" content="/og-image.jpg" />
        
        {/* Preload fonts */}
        <link
          rel="preload"
          href="/fonts/HelveticaNeue.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>

      <div className="min-h-screen bg-primary">
        <Component {...pageProps} />
      </div>

      {/* Global loading indicator */}
      <div
        id="nprogress"
        className="pointer-events-none"
        style={{
          display: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          zIndex: 9999,
          background: 'var(--color-accent)',
          transform: 'translateX(-100%)',
          transition: 'transform 0.2s linear'
        }}
      />
    </AppProvider>
  )
}

export default MyApp
