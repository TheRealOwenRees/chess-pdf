import SectionDescription from "@/app/components/SectionDescription";

describe('<SectionDescription />', () => {
  it('Text and Classname', () => {
    cy.mount(<SectionDescription text={'Test Text'} className={'testClass'} />)
    cy.get('[data-cy="text"]').should('have.text', 'Test Text')
    cy.get('[data-cy="description-div"]').should('have.class', 'testClass')
  })
})