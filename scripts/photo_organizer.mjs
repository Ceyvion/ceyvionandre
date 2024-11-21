import fs from 'fs/promises'
import path from 'path'
import chokidar from 'chokidar'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { PHOTO_CONFIG } from '../src/config/photo-organizer.config.js'

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration
const PHOTO_INPUT_DIR = path.join(__dirname, '..', PHOTO_CONFIG.directories.input)
const GALLERY_OUTPUT_DIR = path.join(__dirname, '..', PHOTO_CONFIG.directories.output)

// Utility functions
const extractYear = (filename, metadata) => {
  // Try to extract year from EXIF data
  if (metadata.DateTimeOriginal) {
    const match = metadata.DateTimeOriginal.match(/^(\d{4})/)
    if (match) return match[1]
  }

  // Try to extract year from filename
  const yearMatch = filename.match(/(\d{4})/)
  return yearMatch ? yearMatch[1] : PHOTO_CONFIG.defaults.year
}

const guessShootType = (filename) => {
  const lowerFilename = filename.toLowerCase()

  // Check each shoot type's rules
  for (const [type, rules] of Object.entries(PHOTO_CONFIG.shootTypes)) {
    // Check keywords
    if (rules.keywords.some(keyword => lowerFilename.includes(keyword))) {
      return type
    }

    // Check patterns
    if (rules.patterns.some(pattern => pattern.test(filename))) {
      return type
    }
  }

  // Default to editorial for model photos (assuming most photos are model shots)
  return PHOTO_CONFIG.defaults.shootType
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
      PHOTO_CONFIG.directories.photographer,
      year,
      shootType
    )

    await fs.mkdir(destDir, { recursive: true })

    // Optimize and save image
    const destPath = path.join(destDir, `${path.parse(filename).name}.webp`)
    await sharp(filePath)
      .resize(
        PHOTO_CONFIG.imageProcessing.maxWidth,
        PHOTO_CONFIG.imageProcessing.maxHeight,
        { fit: 'inside', withoutEnlargement: true }
      )
      .toFormat(PHOTO_CONFIG.imageProcessing.format, {
        quality: PHOTO_CONFIG.imageProcessing.quality
      })
      .toFile(destPath)

    console.log(`Processed: ${filename} → ${destPath} (Type: ${shootType})`)

    // Optional: Remove original file after processing
    await fs.unlink(filePath)
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error)
  }
}

// File watcher
const startWatcher = () => {
  console.log(`Watching for new photos in: ${PHOTO_INPUT_DIR}`)
  console.log('Photos will be automatically sorted into:')
  console.log(`- Editorial: Fashion shoots, model tests, agency work`)
  console.log(`- Commercial: Brand work, product shoots, advertisements`)
  console.log(`- Personal: Test shoots, portfolio work, creative concepts`)

  const watcher = chokidar.watch(PHOTO_INPUT_DIR, {
    ignored: /(^|[/\\])\../, // ignore dotfiles
    persistent: true,
    depth: 0
  })

  watcher
    .on('add', async (filePath) => {
      const ext = path.extname(filePath).toLowerCase()

      if (PHOTO_CONFIG.supportedExtensions.includes(ext)) {
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
