/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Login feature tests', () => {

  it('Login form should exist.', () => {
    cy.exec('cd ../backend && npm run test:teardown')
    cy.exec('cd ../backend && npm run test:setup')
    cy.visit('http://localhost:3000/')

    cy.get('[data-testid="login-button"]')
      .click()

    cy.get('[data-testid="login-form"]')
      .should('exist')
  })

  it('Should display an alert saying the account is unverified and ask if the user wants to resend a verification email.', () => {

  })

})