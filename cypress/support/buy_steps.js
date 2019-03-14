// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('BuyProduct', (qty, address, shipping, payment, atasnama, referencenumber) => {
  // Get an input, type into it and verify that the value has been updated
  cy.xpath('//button[@class="btn btn-primary hidden-sm hidden-xs" and @id="btn-add-to-cart"]').click()

  cy.wait(10000)

  //modal
  cy.xpath('//tr[@data-ng-init="ctrl.calculation()"]')
    .xpath('//input')
  cy.contains('Checkout').click()

  cy.contains(address).click()
  cy.xpath('//button[@class="btn btn-block btn-primary ng-scope" and @id="btn-checkout-step-2-shipping"]')
    .contains("Continue with shipping").click()

  cy.wait(5000)
  cy.xpath('//button[@class="btn btn-default btn-shipment-list ng-binding dropdown-toggle"]')
    .contains("Day")

  cy.xpath('//button[@class="btn btn-block btn-primary ng-scope" and @id="btn-checkout-step-3-payment"]')
    .contains("Continue with payment").click()

  cy.wait(5000)
  cy.contains(payment).click()
  cy.xpath('//button[@class="btn btn-block btn-primary ng-scope" and @id="btn-checkout-step-4-confirm-order"]')
    .contains("Place order and pay").click()

  cy.wait(10000)

  //cy.xpath('//p[@class="orange-order"]/strong').invoke('text')

  cy.xpath('//p[@class="orange-order"]/strong').then(($element) => {

    // store the button's text
    const txt = $element.text()
    cy.log(txt)
  })

  cy.xpath('//a[@class="hidden-xs btn btn-primary"]')
    .contains("Confirm Payment").click()

  cy.wait(10000)
  cy.xpath('//input[@data-ng-model="confirm.data.atas_nama"]')
    .type(atasnama)
    .should('have.value', atasnama)
  cy.xpath('//input[@data-ng-model="confirm.data.reference_number"]')
    .type(referencenumber)
    .should('have.value', referencenumber)
  cy.xpath('//button[@class="btn btn-primary"]')
    .contains("Payment Confirmation").click()
  cy.wait(10000)

});

Cypress.Commands.add('Buy', () => {
  cy.xpath('//button[@class="btn btn-primary hidden-sm hidden-xs" and @id="btn-add-to-cart"]').then($button => {
    if ($button.is(':visible')) {
      cy.xpath('//button[@class="btn btn-primary hidden-sm hidden-xs" and @id="btn-add-to-cart"]').click()
      }
    else {
      cy.xpath('//button[@class="btn btn-primary btn-buy btn-pc-buy m-b-md ng-scope" and contains(text(), "Buy Now")]').click()
    }
    })
  //cy.find('//button[@class="btn btn-primary hidden-sm hidden-xs" and @id="btn-add-to-cart"]').click()
  cy.wait(5000)
})

Cypress.Commands.add('ShoppingCart', (action) => {
  cy.wait(10000)
  cy.xpath('//div[@class="r-table-row ng-scope"]')
    .xpath('//div[@class="r-table-cell cart-table-cell product-image"]')
    .xpath('//div[@class="r-table-cell cart-table-cell product-name"]')
    .xpath('//div[@class="r-table-cell cart-table-cell product-quantity"]')
    .xpath('//button[@class="close icon-close icon-gray"]')

  cy.xpath('//span[@class="price total"]').then(($element) => {
      // store the button's text
      const txt = $element.text()
      cy.log(txt)
    })
  cy.xpath('//span[@class="price total"]')
  if (action == "Yes") {
    cy.xpath('//a[@class="btn btn-secondary btn-block"]')
      .contains("Continue to checkout").click()//.should('have.attr', 'href', '/checkout')
  }
  else {
    cy.xpath('//a[@class="btn btn-default btn-block"]')
      .contains("Continue Shopping").click()
  }
})

Cypress.Commands.add('Checkout', (address, shipping, payment) => {
  //address
  cy.contains(address).click()
  cy.xpath('//button[@class="btn btn-block btn-primary ng-scope" and @id="btn-checkout-step-2-shipping"]')
    .contains("Continue with shipping").click()

  cy.wait(5000)

  //shipping
  cy.xpath('//button[@class="btn btn-default btn-shipment-list ng-binding dropdown-toggle"]')
    .contains("Day")
  cy.xpath('//button[@class="btn btn-block btn-primary ng-scope" and @id="btn-checkout-step-3-payment"]')
    .contains("Continue with payment").click()

  cy.wait(5000)

  //payment method
  cy.contains(payment).click()

  //done
  cy.xpath('//button[@class="btn btn-block btn-primary ng-scope" and @id="btn-checkout-step-4-confirm-order"]')
    .contains("Place order and pay").click()

  cy.wait(15000)

  //cy.xpath('//p[@class="orange-order"]/strong').invoke('text')

  cy.xpath('//p[@class="orange-order"]/strong').then(($element) => {

    // store the button's text
    const txt = $element.text()
    cy.log(txt)
  })
})

Cypress.Commands.add('ConfirmPayment', (atasnama, referencenumber) => {
  cy.xpath('//a[@class="hidden-xs btn btn-primary"]')
    .contains("Confirm Payment").click()

  cy.wait(10000)
  cy.xpath('//input[@data-ng-model="confirm.data.atas_nama"]')
    .type(atasnama)
    .should('have.value', atasnama)
  cy.xpath('//input[@data-ng-model="confirm.data.reference_number"]')
    .type(referencenumber)
    .should('have.value', referencenumber)
  cy.xpath('//button[@class="btn btn-primary"]')
    .contains("Payment Confirmation").click()
  cy.wait(10000)
})
