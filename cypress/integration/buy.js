import "../support/login_steps";
import "../support/buy_steps";
import "../support/public_steps";
import "../support/cms/login_steps";

var productlist = ["/v/damarstore1/product/Indomie-Gor", "/v/damarstore/product/Aqua", "/v/damarstore/product/Ades"]

describe('Ralalicom - Buy', function() {
  it('Buy', function() {
    cy.server()
    cy.route('POST', '/auth/login').as('login')
    cy.ClearCookie()
    cy.visit(Cypress.env('host')+"/login")
    cy.url().should('include', '/login')
    cy.LoginBuyer(Cypress.env('emailtest'), Cypress.env('passwordtest'))
    cy.wait('@login')
    cy.get('@login').then(function (xhr) {
      expect(xhr.status).to.eq(200)
      expect(xhr.requestHeaders).to.have.property('Content-Type')
      expect(xhr.method).to.eq('POST')
    })
    cy.contains(Cypress.env('buyer'))
    cy.route('POST', '/cart/store').as('buy')
    Cypress._.each(productlist, (product) => {
      cy.visit(Cypress.env('host')+product)
      cy.Buy()
      cy.get('@buy').then(function (xhr) {
        expect(xhr.status).to.eq(200)
      })
    })
    cy.visit(Cypress.env('host')+'/show-cart')
    cy.ShoppingCart("Yes")
    cy.Checkout("Address Kantor Ralali", "Ralali Kargo", "Bank Transfer")
    cy.ConfirmPayment("damar", "12345678")
  })
})

describe('Ralalicom - CMS', function() {
  it.skip('All Order', function() {
    cy.ClearCookie()
    cy.visit(Cypress.env('cmshost'))
    cy.LoginCMS(Cypress.env('emailtest'), Cypress.env('passwordtest'))
    cy.contains(Cypress.env('admincms'))
    cy.visit(Cypress.env('cmshost')+"/admin-cp/incoming-order/all")
    cy.wait(10000)
    cy.get('input[id="filter_customer_name"]').type(Cypress.env('buyer'))
    cy.xpath('/html/body/div[3]/div[2]/div/div[2]/div[3]/table/tbody[1]/tr/td[3]/div/span').click()
    cy.wait(5000)
    cy.get('td').contains(Cypress.env('buyer'))
    cy.xpath('//a[@class="btn black" and @onclick="modalPembayaran(this)"]').contains('Verify').click()
    cy.get('form[id="form-konfirmasi-payment-baru"]')
      .get('button[id="tombolkonfirmmodal"]').click()
    cy.contains("Memproses Data")
    cy.wait(5000)
  })
})
