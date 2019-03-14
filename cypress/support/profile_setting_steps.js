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

Cypress.Commands.add('EditMyAccount', (photo, gender, birthdate, birthmonth, birthyear) => {
  cy.server()
  cy.route('POST', Cypress.env('host')+'/customer/profil-data').as('edit-profile')
  cy.xpath("//button[contains(@data-ng-click, 'accountinfo')]")
    .contains("Edit")
    .click()
  cy.xpath('//div[@class="spinner-loading"]').should('be.visible')
  cy.xpath('//div[@class="spinner-loading"]').should('not.be.visible')
  //cy.contains(gender).click()
  cy.xpath('//button[@class="btn btn-primary res-width-stretch-full"]')
    .contains("Save")
    .click()
  cy.wait('@edit-profile')
  cy.get('@edit-profile').then(function (xhr) {
    expect(xhr.method).to.eq('POST')
    expect(xhr.status).to.eq(200)
  })
});
