Cypress.Commands.add('ForgotPasswordBuyer', (email) => {
  cy.contains('Atur ulang kata sandi')
  cy.url().should('include', 'reset-password')
  cy.get('[data-testid=input-username]').type(email)
  cy.get('[data-testid=button-submit]').click()
});
