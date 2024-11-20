# Ceyvion Andre Biggs Photography Portfolio

A modern, minimalist photography portfolio showcasing models and professional work with advanced filtering and interaction capabilities.

## Features

- Responsive design optimized for all devices
- Advanced image loading and optimization
- Interactive filtering system (Year/Type)
- Smooth transitions and animations
- Keyboard navigation for galleries
- Progressive image loading
- SEO optimized
- Accessibility compliant

## Tech Stack

- **Framework:** Next.js 13
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Image Optimization:** Sharp
- **Code Quality:** ESLint & Prettier
- **State Management:** React Context
- **Testing:** Jest & React Testing Library (planned)

## Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd cbportfolio2
   ```

2. Run the setup script:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

   Or manually install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── public/
│   └── images/
│       ├── models/          # Model photography
│       ├── projects/        # Project photography
│       └── placeholders/    # Loading placeholders
├── src/
│   ├── components/          # Reusable components
│   │   ├── Layout.js       # Main layout wrapper
│   │   ├── FilterBar.js    # Filtering system
│   │   ├── ImageGallery.js # Image gallery component
│   │   └── ...
│   ├── context/            # React Context providers
│   │   └── AppContext.js   # Global state management
│   ├── hooks/              # Custom React hooks
│   │   ├── useImageLoader.js
│   │   └── useFilterSystem.js
│   ├── pages/              # Next.js pages
│   │   ├── index.js        # Landing page
│   │   ├── models.js       # Models portfolio
│   │   ├── work.js         # Work portfolio
│   │   └── contact.js      # Contact form
│   ├── styles/             # Global styles
│   │   └── globals.css     # Tailwind imports & global CSS
│   └── utils/              # Utility functions
│       └── imageLoader.js  # Image optimization utils
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm run format` - Format code with Prettier

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Husky for pre-commit hooks
- Lint-staged for staged files linting

### Image Guidelines

#### Models Photography
- Dimensions: 1200x1200px (1:1 ratio)
- Format: JPG with WebP conversion
- Max file size: 500KB
- Resolution: 72 DPI
- Color space: sRGB

#### Project Photography
- Dimensions: 2400x1600px (3:2 ratio)
- Format: JPG with WebP conversion
- Max file size: 800KB
- Resolution: 72 DPI
- Color space: sRGB

### Performance Optimization

- Image lazy loading
- Progressive image loading
- Responsive images
- Route prefetching
- Component code splitting
- CSS purging
- Asset optimization

### Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- iOS Safari (last 2 versions)
- Android Chrome (last 2 versions)

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Test the production build:
   ```bash
   npm run start
   ```

3. Deploy to your hosting platform of choice

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

### Pull Request Guidelines

- Include screenshots for UI changes
- Update documentation if needed
- Add tests if applicable
- Ensure all tests pass
- Follow the existing code style
- Keep pull requests focused in scope

## License

[License details to be added]

## Contact

[Contact information to be added]
