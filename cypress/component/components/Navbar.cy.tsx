import Navbar from '@/app/components/Navbar'

describe('<Navbar />', () => {
  beforeEach(() => {
    cy.mount(<Navbar />)
  })

  it('has a link to the homepage', () => {
    cy.getBySel('homepage-nav-link').should('be.visible')
    cy.getBySel('homepage-nav-link').should('have.attr', 'href', '/')
  })

  it('has a logo link to the homepage', () => {
    cy.getBySel('homepage-nav-logo-link').should('be.visible')
    cy.getBySel('homepage-nav-logo-link').should('have.attr', 'href', '/')
  })

  it('has a link to the chessboard page', () => {
    cy.getBySel('chessboard-nav-link').should('be.visible')
    cy.getBySel('chessboard-nav-link').should('have.attr', 'href', '/chessboard')
  })

  it('has a link to the contact page', () => {
    cy.getBySel('contact-nav-link').should('be.visible')
    cy.getBySel('contact-nav-link').should('have.attr', 'href', '/contact')
  })
})