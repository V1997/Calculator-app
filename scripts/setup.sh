#!/bin/bash

# Enhanced Calculator Development Setup Script
# Sets up the development environment for new contributors

set -e  # Exit on any error

echo "🛠️  Setting up Enhanced Calculator development environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
print_status "Checking prerequisites..."

# Check Node.js
if ! command_exists node; then
    print_error "Node.js is not installed"
    echo "Please install Node.js 16+ from: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js version 16+ is required. Current: $(node --version)"
    echo "Please update Node.js from: https://nodejs.org/"
    exit 1
fi

print_success "Node.js $(node --version) ✓"

# Check npm
if ! command_exists npm; then
    print_error "npm is not installed"
    exit 1
fi

print_success "npm $(npm --version) ✓"

# Check Git
if ! command_exists git; then
    print_warning "Git is not installed. Some features may not work."
else
    print_success "Git $(git --version | cut -d' ' -f3) ✓"
fi

# Install dependencies
print_status "Installing dependencies..."
npm install
print_success "Dependencies installed ✓"

# Setup git hooks (if Git is available)
if command_exists git && [ -d ".git" ]; then
    print_status "Setting up Git hooks..."
    npm run prepare
    print_success "Git hooks configured ✓"
fi

# Create necessary directories
print_status "Creating directory structure..."
mkdir -p public/assets
mkdir -p src/assets
mkdir -p tests/fixtures
mkdir -p docs/assets
print_success "Directory structure created ✓"

# Run initial build
print_status "Running initial build..."
npm run build
print_success "Initial build completed ✓"

# Run tests to ensure everything works
print_status "Running test suite..."
if npm test; then
    print_success "All tests passed ✓"
else
    print_warning "Some tests failed. This might be normal for a fresh setup."
fi

# Check for common development tools
print_status "Checking optional development tools..."

if command_exists code; then
    print_success "VS Code detected ✓"
    echo "  Recommended extensions:"
    echo "    - ESLint"
    echo "    - Prettier"
    echo "    - Jest"
    echo "    - GitLens"
else
    print_warning "VS Code not detected. Consider installing for better development experience."
fi

if command_exists lighthouse; then
    print_success "Lighthouse CLI detected ✓"
else
    print_warning "Lighthouse CLI not found. Install with: npm install -g lighthouse"
fi

# Setup environment file (if needed)
if [ ! -f ".env.local" ]; then
    print_status "Creating local environment file..."
    cat > .env.local << EOF
# Local development environment variables
# Add your configuration here

# Example:
# ANALYTICS_ID=your-analytics-id
# API_URL=http://localhost:3001
EOF
    print_success "Environment file created ✓"
fi

print_success "🎉 Development environment setup completed!"

echo ""
echo "📋 Quick start commands:"
echo "  npm run dev        - Start development server"
echo "  npm run test       - Run test suite"
echo "  npm run lint       - Check code quality"
echo "  npm run build      - Build for production"
echo ""
echo "📚 Documentation:"
echo "  README.md          - Project overview and usage"
echo "  CONTRIBUTING.md    - Contribution guidelines"
echo "  docs/DEPLOYMENT.md - Deployment instructions"
echo ""
echo "🌐 Development server will be available at:"
echo "  http://localhost:3000"
echo ""
echo "🚀 Happy coding!"

# Ask if user wants to start dev server
echo ""
read -p "🚀 Would you like to start the development server now? (y/N): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Starting development server..."
    npm run dev
fi
