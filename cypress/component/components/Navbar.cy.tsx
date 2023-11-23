import Navbar from '@/app/components/Navbar'

describe('<Navbar />', () => {
  beforeEach(() => {
    cy.mount(<Navbar />)
  })

  it('has a link to the homepage', () => {
    cy.get('[data-cy="homepage-nav-link"]').should('be.visible')
    cy.get('[data-cy="homepage-nav-link"]').should('have.attr', 'href', '/')
  })

  it('has a logo link to the homepage', () => {
    cy.get('[data-cy="homepage-nav-logo-link"]').should('be.visible')
    cy.get('[data-cy="homepage-nav-logo-link"]').should('have.attr', 'href', '/')
  })

  it('has a link to the chessboard page', () => {
    cy.get('[data-cy="chessboard-nav-link"]').should('be.visible')
    cy.get('[data-cy="chessboard-nav-link"]').should('have.attr', 'href', '/chessboard')
  })

  it('has a link to the contact page', () => {
    cy.get('[data-cy="contact-nav-link"]').should('be.visible')
    cy.get('[data-cy="contact-nav-link"]').should('have.attr', 'href', '/contact')
  })
})