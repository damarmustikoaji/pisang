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

//if (keyword !== null && keyword !== '') {
//  $btn.clear()
//  $btn.type(keyword)
//  $btn.should('have.value', keyword)
//}

Cypress.Commands.add('Search', (keyword) => {
  if (keyword !== null && keyword !== "") {
    cy.xpath('//input[@type="text" and @name="search"]')
      .click()
      .clear()
      .type(keyword)
      .should('have.value', keyword)
    }
  cy.get('.btn.btnSearchHome').contains('Search').click()
})

Cypress.Commands.add('SelectSearchResult', (product) => {
  cy.url().should('include', '/search')
  cy.get('div[itemprop="name"]')
    .contains(product).click()
})
