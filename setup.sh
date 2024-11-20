#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up Ceyvion Andre Biggs Photography Portfolio...${NC}"

# Install dependencies
echo -e "\n${GREEN}Installing dependencies...${NC}"
npm install

# Create necessary directories
echo -e "\n${GREEN}Creating project directories...${NC}"
mkdir -p public/images/{models,projects}
mkdir -p src/{components,pages,hooks,utils,context,styles}

# Initialize Git hooks
echo -e "\n${GREEN}Setting up Git hooks...${NC}"
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"

# Create placeholder images directory
echo -e "\n${GREEN}Creating placeholder images...${NC}"
mkdir -p public/images/placeholders

# Build the project
echo -e "\n${GREEN}Building the project...${NC}"
npm run build

echo -e "\n${BLUE}Setup complete! Run 'npm run dev' to start the development server.${NC}"
