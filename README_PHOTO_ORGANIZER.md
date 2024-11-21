# Photo Organization System

## Overview
Automated photo organization system for Ceyvion Andre Biggs Photography portfolio.

## Features
- Automatic file sorting by year and shoot type
- Supports multiple image formats
- Watches input directory for new photos
- Optimizes images for web performance

## Setup

### Prerequisites
- Node.js 16+
- npm

### Installation
```bash
npm install
```

## Usage

### Manual Organization
```bash
npm run organize-photos
```

### Automatic Watching
```bash
npm run watch-photos
```

### Integrated Development
```bash
npm run dev  # Starts Next.js dev server and photo watcher
```

## Photo Input Directory
Place new photos in: `photos/input/`

## Automatic Sorting
Photos are organized into:
```
public/images/galleries/
└── models/
    └── ceyvion-andre-biggs/
        ├── 2024/
        │   ├── editorial/
        │   ├── commercial/
        │   └── personal/
        └── ...
```

## Shoot Type Detection
- Editorial: keywords like 'editorial', 'magazine', 'fashion'
- Commercial: keywords like 'commercial', 'brand', 'product'
- Personal: default or keywords like 'personal', 'test'

## Image Optimization
- Converts to WebP
- Resizes to max 2400x1600
- Maintains aspect ratio
- Reduces file size

## Troubleshooting
- Ensure input directory exists
- Check console for processing errors
- Verify image file permissions
