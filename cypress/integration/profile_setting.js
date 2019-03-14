import "../support/public_steps";
import "../support/login_steps";
import "../support/profile_setting_steps";

describe('My Account', function() {
  it('Login', function() {
    cy.server()
    cy.route('POST', '/auth/login').as('login')
    cy.ClearCookie()
    cy.visit(Cypress.env('host')+"/login")
    cy.LoginBuyer(Cypress.env('emailtest'), Cypress.env('passwordtest'))
    //cy.wait('@login')
    //Assert on XHR
    //cy.get('@login').then(function (xhr) {
    //  expect(xhr.status).to.eq(200)
    //  expect(xhr.requestHeaders).to.have.property('Content-Type')
    //  expect(xhr.method).to.eq('POST')
    //})
    cy.contains('Damar')
    cy.visit(Cypress.env('host')+"/customer/profile")
    cy.EditMyAccount("", "Male", "01", "12", "2019")
  })
})
