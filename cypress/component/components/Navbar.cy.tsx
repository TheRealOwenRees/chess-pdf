import Navbar from '@/app/components/Navbar'

describe('<Navbar />', () => {
  beforeEach(() => {
    cy.mount(<Navbar />)
  })

  it('has a link to the homepage', () => {
    cy.get('[data-cy="homepage-link"]').should('be.visible')
    cy.get('[data-cy="homepage-link"]').should('have.attr', 'href', '/')
  })

  it('has a link to the chessboard page', () => {
    cy.get('[data-cy="chessboard-link"]').should('be.visible')
    cy.get('[data-cy="chessboard-link"]').should('have.attr', 'href', '/chessboard')
  })

  it('has a link to the contact page', () => {
    cy.get('[data-cy="contact-link"]').should('be.visible')
    cy.get('[data-cy="contact-link"]').should('have.attr', 'href', '/contact')
  })
})