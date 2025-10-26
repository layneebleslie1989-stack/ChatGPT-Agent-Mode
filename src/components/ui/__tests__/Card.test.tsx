import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { Card } from '../Card'
import { theme } from '../../../theme'

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  )
}

describe('Card Component', () => {
  it('renders children correctly', () => {
    renderWithTheme(
      <Card>
        <div>Card content</div>
      </Card>
    )
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders with title', () => {
    renderWithTheme(
      <Card title="Card Title">
        <div>Card content</div>
      </Card>
    )
    expect(screen.getByText('Card Title')).toBeInTheDocument()
  })

  it('renders without title', () => {
    renderWithTheme(
      <Card>
        <div>Card content</div>
      </Card>
    )
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('renders with custom testId', () => {
    renderWithTheme(
      <Card testId="custom-card">
        <div>Card content</div>
      </Card>
    )
    expect(screen.getByTestId('custom-card')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    renderWithTheme(
      <Card className="custom-class">
        <div>Card content</div>
      </Card>
    )
    expect(screen.getByText('Card content').closest('div')).toHaveClass('custom-class')
  })
})