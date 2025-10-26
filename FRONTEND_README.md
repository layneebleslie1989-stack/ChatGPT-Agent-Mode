# Frontend Application

A modern React TypeScript application built with Vite, featuring a comprehensive UI component library and user management system.

## 🚀 Features

- **Modern React Stack**: Built with React 18, TypeScript, and Vite
- **Component Library**: Reusable UI components with Storybook documentation
- **User Management**: Complete CRUD operations for user management
- **Responsive Design**: Mobile-first responsive layout
- **Theme System**: Centralized theming with styled-components
- **API Integration**: RESTful API client with React Query
- **Testing**: Unit tests with Vitest and Testing Library
- **Type Safety**: Full TypeScript support throughout

## 📦 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Styled Components
- **Routing**: React Router DOM
- **State Management**: React Query
- **Testing**: Vitest + Testing Library
- **Documentation**: Storybook
- **Icons**: Lucide React

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm test             # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript type checking

# Documentation
npm run storybook    # Start Storybook
npm run build-storybook # Build Storybook
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # UI components (Button, Input, Card, etc.)
│   └── layout/         # Layout components (Header, Sidebar, Layout)
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── Users.tsx
│   └── Profile.tsx
├── services/           # API services
│   └── api.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── theme/              # Theme configuration
│   └── index.ts
├── test/               # Test utilities
│   └── setup.ts
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## 🎨 Component Library

The application includes a comprehensive set of UI components:

### UI Components
- **Button**: Multiple variants (primary, secondary, danger, ghost) and sizes
- **Input**: Form inputs with validation and error states
- **Card**: Content containers with optional headers
- **Modal**: Overlay dialogs with backdrop
- **Table**: Data tables with sorting and pagination

### Layout Components
- **Header**: Top navigation with user info and actions
- **Sidebar**: Collapsible navigation menu
- **Layout**: Main layout wrapper with responsive design

## 🔌 API Integration

The application integrates with a RESTful API for user management:

### Users API
- `GET /users` - List users with filtering and pagination
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### API Client
- Centralized API client with Axios
- Request/response interceptors
- Error handling
- TypeScript support

## 🧪 Testing

The application includes comprehensive testing:

### Unit Tests
- Component testing with Testing Library
- API service testing
- Utility function testing

### Test Commands
```bash
npm test                 # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
```

## 📚 Storybook

Component documentation is available in Storybook:

```bash
npm run storybook
```

Access Storybook at `http://localhost:6006`

## 🎯 Key Features

### User Management
- View all users in a data table
- Create new users with form validation
- Edit existing user information
- Delete users with confirmation
- Search and filter users

### Dashboard
- Overview of key metrics
- Statistics cards
- Recent activity

### Profile Management
- View user profile information
- Edit profile details
- Update bio and location

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile
- Responsive grid layouts
- Touch-friendly interactions

## 🔧 Configuration

### Environment Variables
```bash
VITE_API_BASE_URL=https://api.example.com/v1
VITE_API_KEY=your-api-key-here
VITE_APP_TITLE=Frontend App
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_EXPERIMENTAL_FEATURES=false
```

### Theme Configuration
The theme system is centralized in `src/theme/index.ts` and includes:
- Color palette
- Spacing system
- Border radius values
- Shadows
- Breakpoints

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build output will be in the `dist` directory, ready for deployment to any static hosting service.

### Environment-Specific Builds
```bash
# Development build
NODE_ENV=development npm run build

# Production build
NODE_ENV=production npm run build
```

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Write tests for new components and features
3. Update Storybook stories for UI changes
4. Ensure TypeScript types are properly defined
5. Run linting and formatting before committing

## 📄 License

This project is part of the larger documentation system and follows the same licensing terms.

## 🆘 Support

For issues and questions:
1. Check the component documentation in Storybook
2. Review the test files for usage examples
3. Check the TypeScript types for prop definitions
4. Refer to the API documentation for backend integration