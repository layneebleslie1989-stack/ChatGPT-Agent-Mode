#!/bin/bash

# Frontend Development Script
echo "🚀 Starting Frontend Development Environment"
echo "============================================="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created. Please update with your configuration."
fi

echo ""
echo "🎯 Available commands:"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm run test         - Run tests"
echo "  npm run storybook    - Start Storybook"
echo "  npm run lint         - Run linting"
echo ""
echo "🌐 Development server will be available at: http://localhost:5173"
echo "📚 Storybook will be available at: http://localhost:6006"
echo ""

# Start development server
echo "🚀 Starting development server..."
npm run dev