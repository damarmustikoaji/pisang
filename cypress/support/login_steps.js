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

Cypress.Commands.add('subValues', (a, b) => {
  return a - b
});

Cypress.Commands.add('LoginBuyer', (email, password) => {
  cy.TitlePage("Login | Ralali.com")
  cy.url().should('include', '/login')
  cy.xpath('//a[@class="btnHomeLogin btn btn-primary-ghost btn-alt btn-wide"]').click()
  cy.xpath('//input[@type="text" and @name="email"]')
    .type(email)
    .should('have.value', email)
  cy.xpath('//button[@class="btn btn-primary pull-right" and @type="submit"]').click()
  cy.xpath('//input[@type="password" and @name="password"]')
    .type(password)
    .should('have.value', password)
  cy.xpath('//button[@class="btnHomeLogin btn btn-primary" and @type="button"]').click()
  //cy.wait(1000)
});
