import Feature from "@/app/components/Feature";

describe('<Feature />', () => {
  it('Text and Classname', () => {
    cy.mount(<Feature title={'Test Title'} text={'Test Text'} />)
    cy.get('[data-cy="title"]').should('have.text', 'Test Title')
    cy.get('[data-cy="text"]').should('have.text', 'Test Text')
  })
})