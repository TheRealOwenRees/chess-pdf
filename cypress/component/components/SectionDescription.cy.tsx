import SectionDescription from "@/app/components/SectionDescription";

describe('<SectionDescription />', () => {
  it('Text and Classname', () => {
    cy.mount(<SectionDescription text={'Test Text'} className={'testClass'} />)
    cy.getBySel('text').should('have.text', 'Test Text')
    cy.getBySel('description-div').should('have.class', 'testClass')
  })
})