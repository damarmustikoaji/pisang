import "../support/login_steps";
import "../support/public_steps";

describe('Ralalicom - Register Test Positive', function() {
  it('Valid Data', function() {
    cy.server()
    //cy.route('POST', '/auth/login').as('login')

    cy.ClearCookie()
    cy.visit(Cypress.env('host')+"/signup")
    //cy.TitlePage("Login | Ralali.com")
    //cy.xpath('//a[@class="btnHomeLogin btn btn-primary-ghost btn-alt btn-wide"]').click()
    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/signup')

    cy.get('input[name="name"]').type(Cypress.env('buyer'))
    cy.get('input[name="email"]').type(Cypress.env('emailtest'))
    cy.wait(2000)
    cy.get('button[id="btn-next"]').click()
    cy.wait(1000)
    cy.xpath('//div[@id="captcha_slider"]/i[@class="fa fa-long-arrow-right"]')//.click()
      .trigger('mousemove', { clientX: 350, clientY: 0 })
    cy.wait(5000)
    //cy.LoginBuyer(Cypress.env('emailtest'), Cypress.env('passwordtest'))

    //cy.wait('@login')

    //Assert on XHR
    //cy.get('@login').then(function (xhr) {
    //  expect(xhr.status).to.eq(200)
    //  expect(xhr.requestHeaders).to.have.property('Content-Type')
      //expect(xhr.requestHeaders).to.have.property('X-Password', password)
    //  expect(xhr.method).to.eq('POST')
      //expect(xhr.responseBody).to.have.property('tokenId')
    //})

    //cy.contains('Damar')


  })
})
