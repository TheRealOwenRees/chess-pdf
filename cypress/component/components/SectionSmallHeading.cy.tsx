import SectionSmallHeading from '@/app/components/SectionSmallHeading'

describe('<SectionSmallHeading />', () => {
  it('Text and Classname', () => {
    cy.mount(<SectionSmallHeading text={'Test Text'} className={'testClass'} />)
    cy.get('[data-cy="text"]').should('have.text', 'Test Text')
    cy.get('[data-cy="heading-div"]').should('have.class', 'testClass')
  })
})