/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Forgot Password feature tests', () => {

  it('Should display the forgot password form when navigated to.', () => {
    cy.exec('cd ../backend && npm run test:teardown')
    cy.exec('cd ../backend && npm run test:setup')
    cy.visit('http://localhost:3000/')

    cy.get('[data-testid="login-button"]')
      .click()

    cy.get('[data-testid="login-form"]')
      .should('exist')
    
    cy.get('[data-testid="login-form-forgot-password-button"]')
      .click()

    cy.get('[data-testid="forgot-password"]')
      .should('exist')
  })

})