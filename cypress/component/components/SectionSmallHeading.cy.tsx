import SectionSmallHeading from '@/app/components/SectionSmallHeading'

describe('<SectionSmallHeading />', () => {
  it('Text and Classname', () => {
    cy.mount(<SectionSmallHeading text={'Test Text'} className={'testClass'} />)
    cy.getBySel('text').should('have.text', 'Test Text')
    cy.getBySel('heading-div').should('have.class', 'testClass')
  })
})