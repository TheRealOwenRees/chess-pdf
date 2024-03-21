import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Navbar from '@/app/components/Navbar'

describe('Navbar', () => {

  beforeEach(() => {
    render(<Navbar />)
  })

  it('should render the component', () => {
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })

  it('links are present and navigable', () => {
    expect(screen.getByTestId('homepage-nav-logo-link')).toBeInTheDocument()
    expect(screen.getByTestId('homepage-nav-link')).toHaveAttribute('href', '/')

    expect(screen.getByTestId('homepage-nav-link')).toBeInTheDocument()
    expect(screen.getByTestId('homepage-nav-link')).toHaveAttribute('href', '/')

    expect(screen.getByTestId('chessboard-nav-link')).toBeInTheDocument()
    expect(screen.getByTestId('chessboard-nav-link')).toHaveAttribute('href', '/chessboard')

    expect(screen.getByTestId('contact-nav-link')).toBeInTheDocument()
    expect(screen.getByTestId('contact-nav-link')).toHaveAttribute('href', '/contact')
  })
})
