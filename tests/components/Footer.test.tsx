import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Footer from '@/app/components/Footer'

describe('Footer', () => {
  it('should render the component', () => {
    render(<Footer />)
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  // copyright year

  // links
})
