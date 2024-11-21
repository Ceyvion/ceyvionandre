const fs = require('fs').promises
const path = require('path')
const chokidar = require('chokidar')
const sharp = require('sharp')
const exif = require('exif-js')

// Configuration
const PHOTO_INPUT_DIR = path.join(__dirname, '../photos/input')
const GALLERY_OUTPUT_DIR = path.join(__dirname, '../public/images/galleries')

// Utility functions
const extractYear = (filename, metadata) => {
  // Try to extract year from EXIF data
  if (metadata.DateTimeOriginal) {
    const match = metadata.DateTimeOriginal.match(/^(\d{4})/)
    if (match) return match[1]
  }

  // Try to extract year from filename
  const yearMatch = filename.match(/(\d{4})/)
  return yearMatch ? yearMatch[1] : new Date().getFullYear().toString()
}

const guessShootType = (filename) => {
  const lowerFilename = filename.toLowerCase()
  const typeMap = {
    editorial: ['editorial', 'magazine', 'fashion', 'shoot'],
    commercial: ['commercial', 'brand', 'product', 'ad', 'advertisement'],
    personal: ['personal', 'test', 'portfolio', 'self']
  }

  for (const [type, keywords] of Object.entries(typeMap)) {
    if (keywords.some(keyword => lowerFilename.includes(keyword))) {
      return type
    }
  }

  return 'personal'
}

const processImage = async (filePath) => {
  try {
    const filename = path.basename(filePath)

    // Read image metadata
    const metadata = await sharp(filePath).metadata()

    // Determine year and shoot type
    const year = extractYear(filename, metadata)
    const shootType = guessShootType(filename)

    // Create destination directory
    const destDir = path.join(
      GALLERY_OUTPUT_DIR,
      'models',
      'ceyvion-andre-biggs',
      year,
      shootType
    )

    await fs.mkdir(destDir, { recursive: true })

    // Optimize and save image
    const destPath = path.join(destDir, filename)
    await sharp(filePath)
      .resize(2400, 1600, { fit: 'inside', withoutEnlargement: true })
      .toFormat('webp', { quality: 80 })
      .toFile(destPath)

    console.log(`Processed: ${filename} → ${destPath}`)

    // Optional: Remove original file after processing
    await fs.unlink(filePath)
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error)
  }
}

// File watcher
const startWatcher = () => {
  console.log(`Watching for new photos in: ${PHOTO_INPUT_DIR}`)

  const watcher = chokidar.watch(PHOTO_INPUT_DIR, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    depth: 0
  })

  watcher
    .on('add', async (filePath) => {
      const ext = path.extname(filePath).toLowerCase()
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.tiff', '.webp']

      if (imageExtensions.includes(ext)) {
        await processImage(filePath)
      }
    })
    .on('error', error => console.error(`Watcher error: ${error}`))
}

// Ensure input and output directories exist
const initializeDirectories = async () => {
  await fs.mkdir(PHOTO_INPUT_DIR, { recursive: true })
  await fs.mkdir(GALLERY_OUTPUT_DIR, { recursive: true })
}

// Main function
const main = async () => {
  try {
    await initializeDirectories()
    startWatcher()
  } catch (error) {
    console.error('Initialization error:', error)
  }
}

main()
