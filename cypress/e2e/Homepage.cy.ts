describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('render navbar', () => {
    cy.get('nav').should('be.visible')
  })

  it('render footer', () => {
    cy.get('footer').should('be.visible')
  })

  // TODO test that 'Get Started' button leads to /chessboard
})