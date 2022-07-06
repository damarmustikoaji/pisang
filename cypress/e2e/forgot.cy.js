import "../support/public_steps";
import "../support/forgot_steps";

describe('Ralalicom - Forgot Valid', function() {
  it('Valid Data', function() {
    cy.server()
    cy.route('POST', '/auth/v3/users/verification').as('verification')

    cy.ClearCookie()
    cy.visit(Cypress.env('host')+"/reset-password")
    cy.url().should('include', '/reset-password')

    cy.ForgotPasswordBuyer(Cypress.env('emailtest'))

    cy.wait(1000)
    cy.wait('@verification')
    //Assert on XHR
    cy.get('@verification').then(function (xhr) {
      expect(xhr.status).to.eq(200)
      expect(xhr.requestHeaders).to.have.property('Content-Type')
      expect(xhr.requestBody).to.have.property('email')
      expect(xhr.requestBody).to.have.property('type')
      expect(xhr.method).to.eq('POST')
    })

    cy.contains("Verifikasi")

  })
})

describe('Ralalicom - Forgot Invalid', function() {
  it('Invalid Email', function() {
    cy.server()
    cy.route('POST', '/auth/v3/users/verification').as('verification')

    cy.ClearCookie()
    cy.visit(Cypress.env('host')+"/reset-password")
    cy.url().should('include', '/reset-password')

    cy.ForgotPasswordBuyer('jambhu@mailnya.com')

    cy.wait(1000)
    cy.wait('@verification')
    //Assert on XHR
    cy.get('@verification').then(function (xhr) {
      expect(xhr.status).to.eq(400)
      expect(xhr.requestHeaders).to.have.property('Content-Type')
      expect(xhr.requestBody).to.have.property('email')
      expect(xhr.requestBody).to.have.property('type')
      expect(xhr.method).to.eq('POST')
    })

    cy.contains("email tidak valid")

  })
})
