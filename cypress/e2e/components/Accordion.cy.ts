describe('Accordion', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('clicking on each accordion item should show and hide text', () => {
    cy.getBySel('accordion-item').each((item, index) => {
      cy.wrap(item).click()
      cy.getBySel('accordion-text').should('have.length', 3).and('be.visible')
    })
  })
})