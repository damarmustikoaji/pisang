import "../support/public_steps";
import "../support/search_steps";

describe('Search - Negative Case', function() {
  it('Empty Field', function() {
    cy.visit(Cypress.env('host'))
    cy.Search("")
  })

  it('No Results Found', function() {
    cy.visit(Cypress.env('host'))
    cy.Search(Cypress.env('keywordtest_invalid'))
    cy.contains("Coba cari kata kunci lainnya").should('be.visible')
  })
})

describe('Search - Positive Case', function() {
  it('Results Found', function() {
    cy.visit(Cypress.env('host'))
    cy.Search(Cypress.env('keywordtest'))
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    cy.xpath('//h1[@id="category-name"]').contains(capitalizeFirstLetter(Cypress.env('keywordtest'))).should('be.visible')
    cy.SelectSearchResult(Cypress.env('keywordtest'))
  })
})
