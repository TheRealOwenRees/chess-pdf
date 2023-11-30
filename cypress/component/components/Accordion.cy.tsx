import Accordion from "@/app/components/Accordion"

describe('<Accordion />', () => {
  beforeEach(() => {
    cy.mount(<Accordion />)
  })

  it('all items should be visible', () => {
    cy.getBySel('accordion-item').should('have.length', 3).and('be.visible')
  })

  it('no items are checked on mount', () => {
    cy.getBySel('accordion-item').should('not.be.checked')
  })

  it('clicking each items leaves only one checked at a time', () => {
    cy.getBySel('accordion-item').each((item, index) => {
      cy.wrap(item).click()
      cy.wrap(item).should('be.checked')
      cy.getBySel('accordion-item').not(':eq(' + index + ')').should('not.be.checked')
    })
  })
})