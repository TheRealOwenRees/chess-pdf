import AlertError from "@/app/components/AlertError";

describe('<AlertError />', () => {

beforeEach(() => {
    cy.mount(<AlertError />)
  })

  it('should render', () => {
    cy.getBySel('alert-error').should('exist')
  })

  it('should render a close button', () => {
    cy.getBySel('alert-close').should('exist')
  })

})