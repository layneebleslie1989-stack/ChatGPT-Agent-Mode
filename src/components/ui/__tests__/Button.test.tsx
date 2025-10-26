import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { Button } from '../Button'
import { theme } from '../../../theme'

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  )
}

describe('Button Component', () => {
  it('renders with correct text', () => {
    renderWithTheme(<Button>Test Button</Button>)
    expect(screen.getByText('Test Button')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<Button disabled>Disabled Button</Button>)
    expect(screen.getByText('Disabled Button')).toBeDisabled()
  })

  it('shows loading state', () => {
    renderWithTheme(<Button loading>Loading Button</Button>)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('applies correct variant class', () => {
    renderWithTheme(<Button variant="danger">Danger Button</Button>)
    const button = screen.getByText('Danger Button')
    expect(button).toBeInTheDocument()
  })

  it('applies correct size class', () => {
    renderWithTheme(<Button size="large">Large Button</Button>)
    const button = screen.getByText('Large Button')
    expect(button).toBeInTheDocument()
  })

  it('renders with custom testId', () => {
    renderWithTheme(<Button testId="custom-button">Custom Button</Button>)
    expect(screen.getByTestId('custom-button')).toBeInTheDocument()
  })

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn()
    renderWithTheme(<Button disabled onClick={handleClick}>Disabled Button</Button>)
    
    fireEvent.click(screen.getByText('Disabled Button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('does not call onClick when loading', () => {
    const handleClick = jest.fn()
    renderWithTheme(<Button loading onClick={handleClick}>Loading Button</Button>)
    
    fireEvent.click(screen.getByText('Loading Button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})