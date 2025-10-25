# Getting Started Guide

Welcome! This guide will help you get up and running with the project quickly and efficiently.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- A code editor (VS Code recommended)

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/your-org/your-repo.git
cd your-repo

# Install dependencies
npm install
# or
yarn install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
# Add your API keys, database URLs, etc.
```

### 3. Development Server

```bash
# Start development server
npm run dev
# or
yarn dev

# Your application will be available at http://localhost:3000
```

### 4. Verify Installation

```bash
# Run tests to ensure everything is working
npm test

# Check linting
npm run lint

# Build the project
npm run build
```

## 📚 Project Structure

```
project/
├── src/                    # Source code
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── utils/            # Utility functions
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   └── types/            # TypeScript type definitions
├── docs/                 # Documentation
├── tests/               # Test files
├── public/              # Static assets
└── config/              # Configuration files
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

```bash
# API Configuration
API_BASE_URL=https://api.example.com/v1
API_KEY=your-api-key-here

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Authentication
JWT_SECRET=your-jwt-secret
AUTH_PROVIDER=auth0

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_EXPERIMENTAL_FEATURES=false
```

### Configuration Files

- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - Linting rules
- `prettier.config.js` - Code formatting rules
- `jest.config.js` - Test configuration

## 🎯 Your First Component

Let's create a simple component to get you started:

```jsx
// src/components/Welcome.tsx
import React from 'react';

interface WelcomeProps {
  name: string;
  onGetStarted?: () => void;
}

export function Welcome({ name, onGetStarted }: WelcomeProps) {
  return (
    <div className="welcome">
      <h1>Welcome, {name}!</h1>
      <p>You're ready to start building amazing things.</p>
      {onGetStarted && (
        <button onClick={onGetStarted} className="btn-primary">
          Get Started
        </button>
      )}
    </div>
  );
}
```

### Using Your Component

```jsx
// src/pages/Home.tsx
import React from 'react';
import { Welcome } from '../components/Welcome';

export function Home() {
  const handleGetStarted = () => {
    console.log('User clicked Get Started!');
  };

  return (
    <div className="home">
      <Welcome 
        name="Developer" 
        onGetStarted={handleGetStarted} 
      />
    </div>
  );
}
```

## 🔌 Making API Calls

### Setting Up API Client

```typescript
// src/services/api.ts
class APIClient {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new APIClient();
```

### Using the API Client

```typescript
// src/hooks/useUsers.ts
import { useState, useEffect } from 'react';
import { apiClient } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const userData = await apiClient.get<{ users: User[] }>('/users');
        setUsers(userData.users);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return { users, loading, error };
}
```

## 🧪 Writing Tests

### Component Test

```tsx
// src/components/__tests__/Welcome.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Welcome } from '../Welcome';

describe('Welcome Component', () => {
  it('renders welcome message with name', () => {
    render(<Welcome name="John" />);
    expect(screen.getByText('Welcome, John!')).toBeInTheDocument();
  });

  it('calls onGetStarted when button is clicked', () => {
    const mockGetStarted = jest.fn();
    render(<Welcome name="John" onGetStarted={mockGetStarted} />);
    
    fireEvent.click(screen.getByText('Get Started'));
    expect(mockGetStarted).toHaveBeenCalledTimes(1);
  });
});
```

### API Test

```typescript
// src/services/__tests__/api.test.ts
import { apiClient } from '../api';

// Mock fetch
global.fetch = jest.fn();

describe('API Client', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('makes GET request with correct headers', async () => {
    const mockResponse = { users: [{ id: '1', name: 'John' }] };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await apiClient.get('/users');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users'),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Authorization': expect.stringContaining('Bearer'),
        }),
      })
    );
    expect(result).toEqual(mockResponse);
  });
});
```

## 🎨 Styling Guidelines

### CSS Modules

```css
/* src/components/Welcome.module.css */
.welcome {
  padding: 2rem;
  text-align: center;
  background: #f8f9fa;
  border-radius: 8px;
}

.welcome h1 {
  color: #333;
  margin-bottom: 1rem;
}

.btnPrimary {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.btnPrimary:hover {
  background: #0056b3;
}
```

### Using CSS Modules

```tsx
import styles from './Welcome.module.css';

export function Welcome({ name, onGetStarted }: WelcomeProps) {
  return (
    <div className={styles.welcome}>
      <h1>Welcome, {name}!</h1>
      {onGetStarted && (
        <button onClick={onGetStarted} className={styles.btnPrimary}>
          Get Started
        </button>
      )}
    </div>
  );
}
```

## 🔍 Debugging

### Development Tools

1. **Browser DevTools** - Inspect elements, debug JavaScript
2. **React DevTools** - Inspect React component tree
3. **VS Code Debugger** - Set breakpoints in your code

### Common Issues

**Issue**: Module not found errors
**Solution**: Check import paths and ensure files exist

**Issue**: API calls failing
**Solution**: Verify environment variables and API endpoints

**Issue**: Tests not running
**Solution**: Check Jest configuration and test file naming

### Debug Configuration

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug React App",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/react-scripts",
      "args": ["start"],
      "env": {
        "BROWSER": "none"
      },
      "console": "integratedTerminal"
    }
  ]
}
```

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript type checking

# Documentation
npm run docs:dev     # Start documentation server
npm run docs:build   # Build documentation
npm run storybook    # Start Storybook
```

## 🚀 Deployment

### Build for Production

```bash
# Create production build
npm run build

# The build folder contains optimized files ready for deployment
```

### Environment-Specific Builds

```bash
# Development build
NODE_ENV=development npm run build

# Staging build
NODE_ENV=staging npm run build

# Production build
NODE_ENV=production npm run build
```

## 📖 Next Steps

Now that you have the basics set up, here are some recommended next steps:

1. **Read the Documentation**
   - [API Documentation](../api/README.md)
   - [Component Documentation](../components/README.md)
   - [Function Documentation](../functions/README.md)

2. **Explore Examples**
   - [Code Examples](../examples/README.md)
   - [Integration Examples](../examples/integrations.md)

3. **Learn Best Practices**
   - [Documentation Standards](../STANDARDS.md)
   - [Testing Guide](./testing.md)
   - [Performance Guide](./performance.md)

4. **Join the Community**
   - Check GitHub Issues for ways to contribute
   - Read the [Contributing Guide](../../CONTRIBUTING.md)
   - Follow our [Code of Conduct](../../CODE_OF_CONDUCT.md)

## 🆘 Getting Help

If you run into issues:

1. Check the [Troubleshooting Guide](./troubleshooting.md)
2. Search existing [GitHub Issues](https://github.com/your-org/your-repo/issues)
3. Create a new issue with detailed information
4. Join our community discussions

Welcome to the project! We're excited to see what you'll build. 🎉