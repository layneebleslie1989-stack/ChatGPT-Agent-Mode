// User types based on API documentation
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  status: 'active' | 'inactive' | 'pending'
  profile?: {
    bio?: string
    avatar_url?: string
    location?: string
  }
  created_at: string
  updated_at: string
}

export interface UserProfile extends User {
  profile: {
    bio: string
    avatar_url: string
    location: string
  }
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
  timestamp?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
}

export interface UsersResponse {
  users: User[]
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
}

// Form types
export interface CreateUserData {
  email: string
  name: string
  password: string
  role?: 'admin' | 'user'
}

export interface UpdateUserData {
  name?: string
  role?: 'admin' | 'user'
  status?: 'active' | 'inactive' | 'pending'
}

// Component prop types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  className?: string
  testId?: string
}

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  required?: boolean
  error?: string
  label?: string
  className?: string
  testId?: string
}

export interface CardProps {
  title?: string
  children: React.ReactNode
  className?: string
  testId?: string
}

// Theme types
export interface Theme {
  colors: {
    primary: string
    secondary: string
    success: string
    warning: string
    danger: string
    info: string
    light: string
    dark: string
    white: string
    black: string
    gray: {
      50: string
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
      700: string
      800: string
      900: string
    }
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xxl: string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
  }
  shadows: {
    sm: string
    md: string
    lg: string
  }
  breakpoints: {
    sm: string
    md: string
    lg: string
    xl: string
  }
}