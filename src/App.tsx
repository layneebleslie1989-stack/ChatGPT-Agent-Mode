import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'styled-components'
import { Layout } from './components/layout'
import { Dashboard } from './pages/Dashboard'
import { Users } from './pages/Users'
import { Profile } from './pages/Profile'
import { theme } from './theme'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// Mock user data - in a real app, this would come from authentication
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  id: 'user_123',
  role: 'admin' as const,
  status: 'active' as const,
  profile: {
    bio: 'Software engineer with 10+ years of experience in web development.',
    avatar_url: 'https://example.com/avatars/user_123.jpg',
    location: 'San Francisco, CA',
  },
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
}

function App() {
  const handleLogout = () => {
    // In a real app, this would clear authentication tokens and redirect to login
    console.log('Logging out...')
    alert('Logout functionality would be implemented here')
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout user={mockUser} onLogout={handleLogout}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/profile" element={<Profile user={mockUser} />} />
              <Route path="/reports" element={<div>Reports page coming soon...</div>} />
              <Route path="/documents" element={<div>Documents page coming soon...</div>} />
              <Route path="/settings" element={<div>Settings page coming soon...</div>} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App