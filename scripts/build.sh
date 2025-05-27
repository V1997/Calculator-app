#!/bin/bash

# Enhanced Calculator Build Script
# Builds the project for production deployment

set -e  # Exit on any error

echo "🚀 Starting Enhanced Calculator build process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 16+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js version 16+ is required. Current version: $(node --version)"
    exit 1
fi

print_success "Node.js version check passed: $(node --version)"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm ci
    print_success "Dependencies installed"
else
    print_status "Dependencies already installed"
fi

# Clean previous build
print_status "Cleaning previous build..."
npm run clean 2>/dev/null || true
print_success "Previous build cleaned"

# Run linting
print_status "Running ESLint..."
if npm run lint; then
    print_success "Code linting passed"
else
    print_warning "Linting issues found. Attempting to fix..."
    npm run lint:fix
    print_success "Linting issues fixed"
fi

# Check code formatting
print_status "Checking code formatting..."
if npm run format:check; then
    print_success "Code formatting is correct"
else
    print_warning "Code formatting issues found. Fixing..."
    npm run format
    print_success "Code formatted"
fi

# Run tests
print_status "Running test suite..."
if npm run test:coverage; then
    print_success "All tests passed"
else
    print_error "Tests failed. Please fix failing tests before building."
    exit 1
fi

# Build the application
print_status "Building application..."

# Build CSS
print_status "Building CSS..."
npm run build:css
print_success "CSS built successfully"

# Build JavaScript
print_status "Building JavaScript..."
npm run build:js
print_success "JavaScript built successfully"

# Copy assets
print_status "Copying assets..."
npm run build:assets
print_success "Assets copied successfully"

# Verify build output
print_status "Verifying build output..."

if [ ! -f "public/css/bundle.css" ]; then
    print_error "CSS bundle not found"
    exit 1
fi

if [ ! -f "public/js/bundle.js" ]; then
    print_error "JavaScript bundle not found"
    exit 1
fi

# Check file sizes
CSS_SIZE=$(du -h public/css/bundle.css | cut -f1)
JS_SIZE=$(du -h public/js/bundle.js | cut -f1)

print_success "Build verification passed"
print_status "Bundle sizes:"
echo "  - CSS: $CSS_SIZE"
echo "  - JavaScript: $JS_SIZE"

# Optional: Run performance audit
if command -v lighthouse &> /dev/null; then
    print_status "Running Lighthouse performance audit..."
    npm run test:perf > /dev/null 2>&1 || print_warning "Lighthouse audit failed or not configured"
fi

print_success "🎉 Build completed successfully!"
print_status "The 'public' folder contains your production-ready application."
print_status "You can deploy the contents of the 'public' folder to any static hosting service."

echo ""
echo "📋 Next steps:"
echo "  1. Test the build locally: npm run preview"
echo "  2. Deploy to GitHub Pages: npm run deploy:gh-pages"
echo "  3. Deploy to Netlify: npm run deploy:netlify"
echo "  4. Or upload the 'public' folder to your hosting service"

exit 0
