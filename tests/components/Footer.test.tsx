import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Footer from '@/app/components/Footer'

describe('Footer', () => {

  beforeEach(() => {
    render(<Footer />)
  })

  it('should render the current year and copyright notice', () => {
    const currentYear = new Date().getFullYear()
    expect(screen.getByTestId('copyright').textContent).toEqual(`Copyright © 2023 - ${currentYear}`)
  })

  it('should render the appropriate footer links', () => {
    expect(screen.getByTestId('homepage-link')).toBeInTheDocument()
    expect(screen.getByTestId('github-link')).toBeInTheDocument()
    expect(screen.getByTestId('contact-link')).toBeInTheDocument()
  })
})
