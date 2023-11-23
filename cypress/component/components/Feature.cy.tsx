import Feature from "@/app/components/Feature";

describe('<Feature />', () => {
  it('Text and Classname', () => {
    cy.mount(<Feature title={'Test Title'} text={'Test Text'} />)
    cy.getBySel('title').should('have.text', 'Test Title')
    cy.getBySel('text').should('have.text', 'Test Text')
  })
})