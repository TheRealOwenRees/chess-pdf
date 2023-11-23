import Accordion from "@/app/components/Accordion"

describe('<Accordion />', () => {
  beforeEach(() => {
    cy.mount(<Accordion className={'testClass'} />)
  })

  it('item is visible', () => {
    cy.getBySel('accordion-item').should('be.visible')
  })

  it('text is hidden until accordion is clicked, hiding when clicked again', () => {
    cy.getBySel('accordion-text').should('not.exist')
    cy.get('button').eq(0).click()  // button is not in component but is in DOM
    cy.getBySel('accordion-text').should('be.visible')
    cy.get('button').eq(0).click()
    cy.getBySel('accordion-text').should('not.exist')
  })
})