import "../support/login_steps";
import "../support/public_steps";

let server = "https://dev.ralali.xyz"

describe('Ralalicom - Login Valid', function() {
  it('Valid Data', function() {

    //cy.route('POST', '/auth/login').as('login')
    cy.ClearCookie()
    cy.visit(Cypress.env('host')+"/login")
    cy.TitlePage("Login | Ralali.com")
    cy.url().should('include', '/login')
    //cy.LoginBuyer(Cypress.env('emailtest'), Cypress.env('passwordtest'))
    cy.server()
    cy.request('POST', '/auth/login', {
        email: 'damar.aji@ralali.com',
        latitude: null,
        longitude: null,
        password: "12345678"
      })
      .then((xhr) => {
        // response.body is automatically serialized into JSON
        expect(xhr.status).to.eq(200) // true
      })
    //cy.wait('@login')
    //Assert on XHR
    //cy.get('@login').then(function (xhr) {
    //  expect(xhr.status).to.eq(200)
    //  expect(xhr.requestHeaders).to.have.property('Content-Type')
      //expect(xhr.requestHeaders).to.have.property('X-Password', password)
    //  expect(xhr.method).to.eq('POST')
      //expect(xhr.responseBody).to.have.property('tokenId')
    //})
    cy.visit(Cypress.env('host'))
    //cy.contains('Damar')
  })
})
