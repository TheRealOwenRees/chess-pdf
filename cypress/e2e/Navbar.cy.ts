describe('Navbar', () => {
  it('can navigate around the site', () => {
    cy.visit('/')

    // /chessboard
    cy.getBySel('chessboard-nav-link').should('be.visible').click()
    cy.location('pathname').should('eq', '/chessboard')
    cy.contains('h4', 'Convert PGN to PDF')

    // homepage via text
    cy.getBySel('homepage-nav-link').should('be.visible').click()
    cy.location('pathname').should('eq', '/')
    cy.contains('h1', 'Convert your Chess PGN')

    // /contact
    cy.getBySel('contact-nav-link').should('be.visible').click()
    cy.location('pathname').should('eq', '/contact')
    cy.contains('h4', 'Contact Us')

    // homepage via logo
    cy.getBySel('homepage-nav-logo-link').should('be.visible').click()
    cy.location('pathname').should('eq', '/')
    cy.contains('h1', 'Convert your Chess PGN')
  })
})