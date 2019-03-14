import "../support/public_steps";
import "../support/forgot_steps";

let server = "https://ralali.com"

let email = "damar.aji@ralali.com"
let email_invalid = "damar.aji@ralali.xyz"
let password = "12345678"

describe('Ralalicom - Forgot Valid', function() {
  it('Valid Data', function() {
    cy.server()
    cy.route('POST', server+'/password/forgot').as('forgot')

    cy.ClearCookie()
    cy.visit(server+"/login")
    cy.TitlePage("Login | Ralali.com")
    //cy.xpath('//a[@class="btnHomeLogin btn btn-primary-ghost btn-alt btn-wide"]').click()
    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/login')

    cy.ForgotPasswordBuyer(email)

    cy.wait('@forgot')

    //Assert on XHR
    cy.get('@forgot').then(function (xhr) {
      expect(xhr.status).to.eq(200)
      //expect(xhr.requestHeaders).to.have.property('Content-Type')
      //expect(xhr.requestHeaders).to.have.property('X-Password', password)
      //expect(xhr.method).to.eq('POST')
      //expect(xhr.responseBody).to.have.property('tokenId')
    })

    cy.contains("We have sent a link to reset your password.")

  })
})

describe('Ralalicom - Forgot Invalid', function() {
  it('Empty Field', function() {
    cy.server()
    cy.route('POST', server+'/password/forgot').as('forgot')

    cy.ClearCookie()
    cy.visit(server+"/login")
    cy.TitlePage("Login | Ralali.com")
    //cy.xpath('//a[@class="btnHomeLogin btn btn-primary-ghost btn-alt btn-wide"]').click()
    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/login')

    cy.ForgotPasswordBuyer(" ")

    cy.wait('@forgot')

    //Assert on XHR
    cy.get('@forgot').then(function (xhr) {
      expect(xhr.status).to.eq(422)
      //expect(xhr.requestHeaders).to.have.property('Content-Type')
      //expect(xhr.requestHeaders).to.have.property('X-Password', password)
      //expect(xhr.method).to.eq('POST')
      //expect(xhr.responseBody).to.have.property('tokenId')
    })

    cy.contains("Sorry, We can not find your email address")

  })
})

describe('Ralalicom - Forgot Invalid', function() {
  it('Invalid Email', function() {
    cy.server()
    cy.route('POST', server+'/password/forgot').as('forgot')

    cy.ClearCookie()
    cy.visit(server+"/login")
    cy.TitlePage("Login | Ralali.com")
    //cy.xpath('//a[@class="btnHomeLogin btn btn-primary-ghost btn-alt btn-wide"]').click()
    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/login')

    cy.ForgotPasswordBuyer("damar.com")

    cy.wait('@forgot')

    //Assert on XHR
    cy.get('@forgot').then(function (xhr) {
      expect(xhr.status).to.eq(422)
      //expect(xhr.requestHeaders).to.have.property('Content-Type')
      //expect(xhr.requestHeaders).to.have.property('X-Password', password)
      //expect(xhr.method).to.eq('POST')
      //expect(xhr.responseBody).to.have.property('tokenId')
    })

    cy.contains("Sorry, We can not find your email address")

  })
})

describe('Ralalicom - Forgot Invalid', function() {
  it('Wrong Email', function() {
    cy.server()
    cy.route('POST', server+'/password/forgot').as('forgot')

    cy.ClearCookie()
    cy.visit(server+"/login")
    cy.TitlePage("Login | Ralali.com")
    //cy.xpath('//a[@class="btnHomeLogin btn btn-primary-ghost btn-alt btn-wide"]').click()
    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/login')

    cy.ForgotPasswordBuyer(email_invalid)

    cy.wait('@forgot')

    //Assert on XHR
    cy.get('@forgot').then(function (xhr) {
      expect(xhr.status).to.eq(200)
      //expect(xhr.requestHeaders).to.have.property('Content-Type')
      //expect(xhr.requestHeaders).to.have.property('X-Password', password)
      //expect(xhr.method).to.eq('POST')
      //expect(xhr.responseBody).to.have.property('tokenId')
    })

    cy.contains("Sorry, We can not find your email address")

  })
})
