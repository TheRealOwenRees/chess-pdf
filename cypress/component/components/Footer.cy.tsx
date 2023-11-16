import Footer from '@/app/components/Footer'

describe('<Footer />', () => {
  beforeEach(() => {
    cy.mount(<Footer />)
  })

  it('has a link to the homepage', () => {
    cy.get('[data-cy="homepage-link"]').should('be.visible')
    cy.get('[data-cy="homepage-link"]').should('have.attr', 'href', '/')
  })

  it('has a link to the github repo', () => {
    cy.get('[data-cy="github-link"]').should('be.visible')
    cy.get('[data-cy="github-link"]').should('have.attr', 'href', Cypress.env('GITHUB_URL'))
  })

  it('has a link to the contact page', () => {
    cy.get('[data-cy="contact-link"]').should('be.visible')
    cy.get('[data-cy="contact-link"]').should('have.attr', 'href', '/contact')
  })

  it('has a copyright notice with the current year', () => {
    cy.get('[data-cy="copyright"]').should('be.visible')
    cy.get('[data-cy="copyright"]').should('contain', new Date().getFullYear())
  })
})