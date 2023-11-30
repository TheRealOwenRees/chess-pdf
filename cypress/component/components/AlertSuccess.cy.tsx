import AlertSuccess from "@/app/components/AlertError";

describe('<AlertSuccess />', () => {

beforeEach(() => {
    cy.mount(<AlertSuccess />)
  })

  it('should render', () => {
    cy.getBySel('alert-error').should('exist')
  })

  it('should render a close button', () => {
    cy.getBySel('alert-close').should('exist')
  })

})