import "../support/cms/login_steps";
import "../support/cms/public_steps";

let server = "https://dev.ralali.xyz"

let email = "damar.aji@ralali.com"
let email_invalid = "damar.aji@ralali.xyz"
let password = "12345678"

describe('Ralalicom - Login Valid', function() {
  it('Valid Data', function() {
    cy.server()
    cy.route('POST', server+'/auth/login').as('login')

    cy.ClearCookie()
    cy.visit(server+"/login")
    cy.TitlePage("Login | Ralali.com")
    //cy.xpath('//a[@class="btnHomeLogin btn btn-primary-ghost btn-alt btn-wide"]').click()
    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/login')

    cy.LoginBuyer(email, password)

    cy.wait('@login')

    //Assert on XHR
    cy.get('@login').then(function (xhr) {
      expect(xhr.status).to.eq(200)
      expect(xhr.requestHeaders).to.have.property('Content-Type')
      //expect(xhr.requestHeaders).to.have.property('X-Password', password)
      expect(xhr.method).to.eq('POST')
      //expect(xhr.responseBody).to.have.property('tokenId')
    })

    cy.contains('Damar')


  })
})

describe('Ralalicom - Login Fail', function() {
  it('Invalid Email', function() {
    cy.server()
    cy.route('POST', server+'/auth/login').as('login')

    cy.clearCookies()
    cy.getCookies().should('be.empty')
    cy.visit(server+"/login")
    cy.title().should('eq', 'Login | Ralali.com')
    //cy.xpath('//a[@class="btnHomeLogin btn btn-primary-ghost btn-alt btn-wide"]').click()
    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/login')

    cy.xpath('//input[@type="text" and @name="email"]')
      .type("damar.com")
      .should('have.value', "damar.com")
    cy.xpath('//button[@class="btn btn-primary pull-right" and @type="submit"]').click()

    cy.contains("failed to login, please contact our customer service")

  })
})

describe('Ralalicom - Login Fail', function() {
  it.skip('Wrong Email', function() {
    cy.server()
    cy.route('POST', server+'/auth/login').as('login')

    cy.clearCookies()
    cy.getCookies().should('be.empty')
    cy.visit(server+"/login")
    cy.title().should('eq', 'Login | Ralali.com')
    //cy.xpath('//a[@class="btnHomeLogin btn btn-primary-ghost btn-alt btn-wide"]').click()
    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/login')

    // Get an input, type into it and verify that the value has been updated
    cy.LoginBuyer(email_invalid, password)

    cy.wait('@login')

    //Assert on XHR
    cy.get('@login').then(function (xhr) {
      expect(xhr.status).to.eq(400)
      //expect(xhr.requestHeaders).to.have.property('Content-Type')
      //expect(xhr.requestHeaders).to.have.property('X-Password', password)
      //expect(xhr.method).to.eq('POST')
      //expect(xhr.responseBody).to.have.property('tokenId')
    })

    cy.contains("Email or password that you've entered is incorrect")

  })
})

describe('Ralalicom - Login Fail', function() {
  it.skip('Wrong Password', function() {
    cy.server()
    cy.route('POST', server+'/auth/login').as('login')

    cy.clearCookies()
    cy.getCookies().should('be.empty')
    cy.visit(server+"/login")
    cy.title().should('eq', 'Login | Ralali.com')
    //cy.xpath('//a[@class="btnHomeLogin btn btn-primary-ghost btn-alt btn-wide"]').click()
    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/login')

    // Get an input, type into it and verify that the value has been updated
    cy.LoginBuyer(email, "abcdzxcqwe123")

    cy.wait('@login')

    //Assert on XHR
    cy.get('@login').then(function (xhr) {
      expect(xhr.status).to.eq(400)
      //expect(xhr.requestHeaders).to.have.property('Content-Type')
      //expect(xhr.requestHeaders).to.have.property('X-Password', password)
      //expect(xhr.method).to.eq('POST')
      //expect(xhr.responseBody).to.have.property('tokenId')
    })

    cy.contains("Email or password that you've entered is incorrect")

  })
})

describe('Ralalicom - Login Fail', function() {
  it.skip('Not Verified', function() {
    cy.server()
    cy.route('POST', server+'/auth/login').as('login')

    cy.clearCookies()
    cy.getCookies().should('be.empty')
    cy.visit(server+"/login")
    cy.title().should('eq', 'Login | Ralali.com')
    //cy.xpath('//a[@class="btnHomeLogin btn btn-primary-ghost btn-alt btn-wide"]').click()
    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/login')

    // Get an input, type into it and verify that the value has been updated
    cy.LoginBuyer("elmalaga@gmail.com", "12345678")

    cy.wait('@login')

    //Assert on XHR
    cy.get('@login').then(function (xhr) {
      expect(xhr.status).to.eq(400)
      //expect(xhr.requestHeaders).to.have.property('Content-Type')
      //expect(xhr.requestHeaders).to.have.property('X-Password', password)
      //expect(xhr.method).to.eq('POST')
      //expect(xhr.responseBody).to.have.property('tokenId')
    })

    cy.contains("Your email has not been verified. Please verify your email")

  })
})
