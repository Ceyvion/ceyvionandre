export const PHOTO_CONFIG = {
  // Input/Output directories
  directories: {
    input: 'photos/input',
    output: 'public/images/galleries',
    photographer: 'ceyvion-andre-biggs'
  },

  // Image optimization settings
  imageProcessing: {
    maxWidth: 2400,
    maxHeight: 1600,
    quality: 80,
    format: 'webp'
  },

  // Shoot type detection rules
  shootTypes: {
    editorial: {
      keywords: [
        'editorial',
        'magazine',
        'fashion',
        'style',
        'vogue',
        'elle'
      ],
      patterns: [
        /mag[-_\s]?shoot/,
        /model[-_\s]?test/,
        /agency[-_\s]?test/,
        /port[-_\s]?test/,
        /[A-Z][a-z]+[-_\s]?[0-9]{1,2}/, // e.g., "Alex_01"
        /[A-Z][a-z]+[-_\s]?(shoot|session)/, // e.g., "Sarah_shoot"
        /[A-Z][a-z]+[-_\s]?@[-_\s]?[a-zA-Z]+/ // e.g., "Jane@AgencyName"
      ]
    },
    commercial: {
      keywords: [
        'commercial',
        'brand',
        'product',
        'ad',
        'campaign',
        'client'
      ],
      patterns: [
        /com[-_\s]?shoot/,
        /brand[-_\s]?shoot/,
        /product[-_\s]?shoot/
      ]
    },
    personal: {
      keywords: [
        'personal',
        'test',
        'portfolio',
        'concept',
        'creative'
      ],
      patterns: [
        /pers[-_\s]?shoot/,
        /test[-_\s]?shoot/,
        /concept[-_\s]?shoot/
      ]
    }
  },

  // File extensions to process
  supportedExtensions: [
    '.jpg',
    '.jpeg',
    '.png',
    '.tiff',
    '.webp'
  ],

  // Default settings
  defaults: {
    year: new Date().getFullYear().toString(),
    shootType: 'editorial'  // Changed default to editorial for model photos
  }
}
