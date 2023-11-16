import Accordion from "@/app/components/Accordion"

describe('<Accordion />', () => {
  beforeEach(() => {
    cy.mount(<Accordion className={'testClass'} />)
  })

  it('item is visible', () => {
    cy.get('[data-cy="accordion-item"]').should('be.visible')
  })

  it('text is hidden until accordion is clicked, hiding when clicked again', () => {
    cy.get('[data-cy="accordion-text"]').should('not.exist')
    cy.get('button').eq(0).click()  // button is not in component but is in DOM
    cy.get('[data-cy="accordion-text"]').should('be.visible')
    cy.get('button').eq(0).click()
    cy.get('[data-cy="accordion-text"]').should('not.exist')
  })
})