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
    cy.get('[data-testid="login-email-input"]')
      .type('paulblart@email.com', { delay: 50 })

    cy.get('[data-testid="login-password-input"]')
      .type('asdfASDF1', { delay: 50 })

    cy.get('[data-testid="login-form-login-button"]')
      .click()
    
    cy.get('[data-testid="alert-dialog"]')
      .should('exist')

    cy.get('[data-testid="alert-dialog-yes"]')
      .click()
    
    cy.get('[id="notistack-snackbar"]')
      .should('exist')
      .should('have.text', 'Verification email has been sent!')
  })

  it('Should display a wrong password snackbar if the wrong password is input.', () => {
    cy.get('[data-testid="home-button"]')
      .click()

    cy.get('[data-testid="login-button"]')
      .click()

    cy.get('[data-testid="login-email-input"]')
      .type('jamesbrown@email.com', { delay: 50 })

    cy.get('[data-testid="login-password-input"]')
      .type('asdfASDF2', { delay: 50 })

    cy.get('[data-testid="login-form-login-button"]')
      .click()

    cy.get('[id="notistack-snackbar"]')
      .should('exist')
      .should('have.text', 'Password entered is incorrect')
  })

  it('Should display a not found snackbar when an invalid user account is input.', () => {
    cy.get('[data-testid="home-button"]')
      .click()

    cy.get('[data-testid="login-button"]')
      .click()

    cy.get('[data-testid="login-email-input"]')
      .type('jamesdoesnotexist@email.com', { delay: 50 })

    cy.get('[data-testid="login-password-input"]')
      .type('asdfASDF1', { delay: 50 })

    cy.get('[data-testid="login-form-login-button"]')
      .click()

    cy.get('[id="notistack-snackbar"]')
      .should('exist')
      .should('have.text', 'There was no user matching those credentials')
  })

})