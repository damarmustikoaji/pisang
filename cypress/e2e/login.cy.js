import "../support/public_steps";

describe('Ralalicom - Login Positive', function() {
  it.skip('Valid Data', function() {
    cy.server()
    cy.route('POST', '/sso/v1/login').as('login')

    cy.ClearCookie()
    cy.visit(Cypress.env('host')+"/login")
    cy.TitlePage("Wholesale Marketplace - Pusat Toko Grosir Online Indonesia | Ralali.com")
    cy.url().should('include', '/login')

    cy.get('#username').type(Cypress.env('emailtest'))
    cy.get('[data-testid=input-password]').type(Cypress.env('passwordtest'))
    cy.get('[data-testid=button-submit]').click()

    cy.wait('@login')
    //Assert on XHR
    cy.get('@login').then(function (xhr) {
      expect(xhr.status).to.eq(200)
      expect(xhr.requestHeaders).to.have.property('Content-Type')
      expect(xhr.method).to.eq('POST')
    })

    cy.contains('Jambu')
  })
})

describe('Ralalicom - Login Negative 1', function() {
  it('Invalid Email', function() {
    cy.server()
    cy.route('POST', '/sso/v1/login').as('login')

    cy.ClearCookie()
    cy.visit(Cypress.env('host')+"/login")
    cy.TitlePage("Wholesale Marketplace - Pusat Toko Grosir Online Indonesia | Ralali.com")
    cy.url().should('include', '/login')

    cy.get('#username').type('jambunananina@mail.com')
    cy.get('[data-testid=input-password]').type('passwordnya')
    cy.get('[data-testid=button-submit]').click()

    // cy.wait('@login')
    // //Assert on XHR
    // cy.get('@login').then(function (xhr) {
    //   expect(xhr.requestHeaders).to.have.property('Content-Type')
    //   expect(xhr.method).to.eq('POST')
    // })

    cy.contains("Email atau kata sandi yang Anda masukkan salah.")
  })
})

describe('Ralalicom - Login Negative 2', function() {
  it('Wrong Password', function() {
    cy.server()
    cy.route('POST', '/sso/v1/login').as('login')

    cy.ClearCookie()
    cy.visit(Cypress.env('host')+"/login")
    cy.TitlePage("Wholesale Marketplace - Pusat Toko Grosir Online Indonesia | Ralali.com")
    cy.url().should('include', '/login')

    cy.get('#username').type(Cypress.env('emailtest'))
    cy.get('[data-testid=input-password]').type('123asssss')
    cy.get('[data-testid=button-submit]').click()

    // cy.wait('@login')
    // //Assert on XHR
    // cy.get('@login').then(function (xhr) {
    //   expect(xhr.status).to.eq(200)
    //   expect(xhr.requestHeaders).to.have.property('Content-Type')
    //   expect(xhr.method).to.eq('POST')
    // })

    cy.wait(3000)
    cy.contains('Email atau kata sandi yang Anda masukkan salah.')
  })
})

describe('Ralalicom - Login Negative 3', function() {
  it('Not Verified', function() {
    cy.server()
    cy.route('POST', '/sso/v1/login').as('login')

    cy.ClearCookie()
    cy.visit(Cypress.env('host')+"/login")
    cy.TitlePage("Wholesale Marketplace - Pusat Toko Grosir Online Indonesia | Ralali.com")
    cy.url().should('include', '/login')

    cy.get('#username').type('jambudoe@mailnya.com')
    cy.get('[data-testid=input-password]').type('123qwe')
    cy.get('[data-testid=button-submit]').click()

    cy.wait('@login')
    //Assert on XHR
    cy.get('@login').then(function (xhr) {
      // expect(xhr.status).to.eq(200)
      expect(xhr.requestHeaders).to.have.property('Content-Type')
      expect(xhr.method).to.eq('POST')
    })

    cy.wait(3000)
    cy.contains('Verifikasi')
  })
})

describe('Ralalicom - Login Negative 4', function() {
  it.skip('Test Skip Type', function() {
    cy.server()
    cy.route('POST', '/auth/v3/token').as('login')

    cy.ClearCookie()
    cy.visit(Cypress.env('host')+"/login")
    cy.TitlePage("Masuk / Login | Ralali.com")
    cy.url().should('include', '/login')

    cy.get('#username').type('jambudoe@mailnya.com')
    cy.get('[data-testid=input-password]').type('123qwe')
    cy.get('[data-testid=button-submit]').click()

    cy.wait('@login')
    //Assert on XHR
    cy.get('@login').then(function (xhr) {
      expect(xhr.status).to.eq(200)
      expect(xhr.requestHeaders).to.have.property('Content-Type')
      expect(xhr.method).to.eq('POST')
    })

    cy.contains('Verifikasi')
  })
})
