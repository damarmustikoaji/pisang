describe('Ralalicom - Login', function() {
  it('Login - Valid', function() {
    cy.visit('https://dev.ralali.xyz/')

    cy.title().should('eq', 'B2B Marketplace Indonesia - Harga Grosir dari Ribuan Penjual | Ralali.com')

    cy.xpath('//a[@class="btnHomeLogin btn btn-primary-ghost btn-alt btn-wide"]').click()

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/login')

    // Get an input, type into it and verify that the value has been updated
    cy.xpath('//input[@type="text" and @name="email"]')
      .type('damar123@ralali.com')
      .should('have.value', 'damar123@ralali.com')

    cy.xpath('//button[@class="btn btn-primary pull-right" and @type="submit"]').click()

    cy.xpath('//input[@type="password" and @name="password"]')
      .type('12345678')
      .should('have.value', '12345678')

    cy.xpath('//button[@class="btnHomeLogin btn btn-primary" and @type="button"]').click()

    cy.contains('Hi, Damar Mustiko A..')

    cy.visit('https://dev.ralali.xyz/v/keripikcasciscus/product/raksasa-elektronik-high-quality-new-35mm-jack-flexible-microphone-mic-miniature-for-pc-laptop-notebook-skype-speaker-60243003')
    //cy.xpath('//div[@class="feedback-close"]').click()

    cy.xpath('//button[@class="btn btn-primary hidden-sm hidden-xs" and @id="btn-add-to-cart"]').click()
    //cy.xpath('//div[@class="media-left cart-img"]/img[@class="media-object img-rounded"]')
    cy.contains('Raksasa Elektronik High Quality New 3.5mm Jack Flexible Microphone Mic Miniature For PC Laptop Notebook Skype speaker')
    cy.xpath('//button[@id="finishedshopping"]').click()
    cy.get('[id="finishedshopping"]').click()

    cy.xpath('//button[@class="btn btn-primary pull-right" and @type="submit"]').click()

    cy.xpath('//button[@id="shipment-list"]').click()
  })
})
