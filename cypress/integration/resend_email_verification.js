import "../support/public_steps";
import "../support/resendverify_steps";

describe('Ralalicom - Resend Verify Valid', function() {
  it('Valid Data', function() {
    cy.server()
    cy.route('POST', '/auth/send-verify-email').as('verify')

    cy.ClearCookie()
    cy.visit(Cypress.env('host')+"/login")
    cy.TitlePage("Login | Ralali.com")
    //cy.xpath('//a[@class="btnHomeLogin btn btn-primary-ghost btn-alt btn-wide"]').click()
    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/login')

    cy.ResendVerificationBuyer(Cypress.env('emailtest'))

    cy.wait('@verify')

    //Assert on XHR
    cy.get('@verify').then(function (xhr) {
      expect(xhr.status).to.eq(200)
      //expect(xhr.requestHeaders).to.have.property('Content-Type')
      //expect(xhr.requestHeaders).to.have.property('X-Password', password)
      //expect(xhr.method).to.eq('POST')
      //expect(xhr.responseBody).to.have.property('tokenId')
    })

    cy.contains("Verification failed, your mail is confirmed.")

  })
})

describe('Ralalicom - Resend Verify Invalid', function() {
  it('Empty Field', function() {
    cy.server()
    cy.route('POST', '/auth/send-verify-email').as('verify')

    cy.ClearCookie()
    cy.visit(Cypress.env('host')+"/login")
    cy.TitlePage("Login | Ralali.com")
    //cy.xpath('//a[@class="btnHomeLogin btn btn-primary-ghost btn-alt btn-wide"]').click()
    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/login')

    cy.ResendVerificationBuyer(" ")

    //cy.wait('@verify')

    //Assert on XHR
    //cy.get('@verify').then(function (xhr) {
      //expect(xhr.status).to.eq(422)
      //expect(xhr.requestHeaders).to.have.property('Content-Type')
      //expect(xhr.requestHeaders).to.have.property('X-Password', password)
      //expect(xhr.method).to.eq('POST')
      //expect(xhr.responseBody).to.have.property('tokenId')
    //})

    cy.contains("Enter your email, we will resend the verification link.")

  })
})

describe('Ralalicom - Resend Verify Invalid', function() {
  it('Invalid Email', function() {
    cy.server()
    cy.route('POST', '/auth/send-verify-email').as('verify')

    cy.ClearCookie()
    cy.visit(Cypress.env('host')+"/login")
    cy.TitlePage("Login | Ralali.com")
    //cy.xpath('//a[@class="btnHomeLogin btn btn-primary-ghost btn-alt btn-wide"]').click()
    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/login')

    cy.ResendVerificationBuyer("damar.com")

    cy.wait('@verify')

    //Assert on XHR
    cy.get('@verify').then(function (xhr) {
      expect(xhr.status).to.eq(200)
      //expect(xhr.requestHeaders).to.have.property('Content-Type')
      //expect(xhr.requestHeaders).to.have.property('X-Password', password)
      //expect(xhr.method).to.eq('POST')
      //expect(xhr.responseBody).to.have.property('tokenId')
    })

    cy.contains("Sorry, We can not find your email address")

  })
})

describe('Ralalicom - Resend Verify Invalid', function() {
  it('Wrong Email', function() {
    cy.server()
    cy.route('POST', '/auth/send-verify-email').as('verify')

    cy.ClearCookie()
    cy.visit(Cypress.env('host')+"/login")
    cy.TitlePage("Login | Ralali.com")
    //cy.xpath('//a[@class="btnHomeLogin btn btn-primary-ghost btn-alt btn-wide"]').click()
    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/login')

    cy.ResendVerificationBuyer("damar@mailyahoo.com")

    cy.wait('@verify')

    //Assert on XHR
    cy.get('@verify').then(function (xhr) {
      expect(xhr.status).to.eq(200)
      //expect(xhr.requestHeaders).to.have.property('Content-Type')
      //expect(xhr.requestHeaders).to.have.property('X-Password', password)
      //expect(xhr.method).to.eq('POST')
      //expect(xhr.responseBody).to.have.property('tokenId')
    })

    cy.contains("Sorry, We can not find your email address")

  })
})
