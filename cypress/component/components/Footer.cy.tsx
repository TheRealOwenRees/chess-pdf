import Footer from '@/app/components/Footer'

describe('<Footer />', () => {
  beforeEach(() => {
    cy.mount(<Footer />)
  })

  it('has a link to the homepage', () => {
    cy.getBySel('homepage-link').should('be.visible')
    cy.getBySel('homepage-link').should('have.attr', 'href', '/')
  })

  it('has a link to the github repo', () => {
    cy.getBySel('github-link').should('be.visible')
    cy.getBySel('github-link').should('have.attr', 'href', Cypress.env('GITHUB_URL'))
  })

  it('has a link to the contact page', () => {
    cy.getBySel('contact-link').should('be.visible')
    cy.getBySel('contact-link').should('have.attr', 'href', '/contact')
  })

  it('has a copyright notice with the current year', () => {
    cy.getBySel('copyright').should('be.visible')
    cy.getBySel('copyright').should('contain', new Date().getFullYear())
  })
})