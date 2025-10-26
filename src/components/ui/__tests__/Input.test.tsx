import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { Input } from '../Input'
import { theme } from '../../../theme'

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  )
}

describe('Input Component', () => {
  it('renders with correct placeholder', () => {
    renderWithTheme(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('renders with label', () => {
    renderWithTheme(<Input label="Test Label" />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('shows required asterisk when required', () => {
    renderWithTheme(<Input label="Required Field" required />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('calls onChange when value changes', () => {
    const handleChange = jest.fn()
    renderWithTheme(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test value' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('calls onBlur when input loses focus', () => {
    const handleBlur = jest.fn()
    renderWithTheme(<Input onBlur={handleBlur} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.blur(input)
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('shows error message when error prop is provided', () => {
    renderWithTheme(<Input error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('renders with custom testId', () => {
    renderWithTheme(<Input testId="custom-input" />)
    expect(screen.getByTestId('custom-input')).toBeInTheDocument()
  })

  it('renders with correct type', () => {
    renderWithTheme(<Input type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
  })

  it('renders with correct value', () => {
    renderWithTheme(<Input value="test value" />)
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument()
  })
})