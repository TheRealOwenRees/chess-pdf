import SectionLargeHeading from '@/app/components/SectionLargeHeading'

describe('<SectionLargeHeading />', () => {
  it('Text and Classname', () => {
    cy.mount(<SectionLargeHeading text={'Test Text'} className={'testClass'} textAccent={' accent'} />)
    cy.get('[data-cy="text"]').should('contains.text', 'Test Text')
    cy.get('[data-cy="accent"]').should('have.text', ' accent')
    cy.get('[data-cy="heading-div"]').should('have.class', 'testClass')
  })
})