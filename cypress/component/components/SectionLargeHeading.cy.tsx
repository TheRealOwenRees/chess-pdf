import SectionLargeHeading from '@/app/components/SectionLargeHeading'

describe('<SectionLargeHeading />', () => {
  it('Text and Classname', () => {
    cy.mount(<SectionLargeHeading text={'Test Text'} className={'testClass'} textAccent={' accent'} />)
    cy.getBySel('text').should('contains.text', 'Test Text')
    cy.getBySel('accent').should('have.text', ' accent')
    cy.getBySel('heading-div').should('have.class', 'testClass')
  })
})