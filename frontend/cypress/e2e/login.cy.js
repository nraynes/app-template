/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Login feature tests', () => {
  Cypress.Cookies.defaults({
    preserve: ['accessToken', 'refreshToken'],
  })
  
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

  it('Should be able to verify a user if the correct code is sent in the login query params.', () => {
    cy.request('http://localhost:3001/api/test/emailTempCode?email=paulblart@email.com')
      .should((response) => {
        expect(response.body).to.match(/.{32}/)
        cy.visit(`http://localhost:3000/auth/login?code=${response.body}`)
    
        cy.get('[id="notistack-snackbar"]')
          .should('exist')
          .should('have.text', 'Your email has been successfully verified!')
      })
    cy.wait(1000)
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

    cy.wait(500)

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

    cy.wait(500)

    cy.get('[id="notistack-snackbar"]')
      .should('exist')
      .should('have.text', 'There was no user matching those credentials')
  })

  it('Should log the user in and display the landing page when correct account information is input.', () => {
    cy.get('[data-testid="home-button"]')
      .click()

    cy.get('[data-testid="login-button"]')
      .click()

    cy.get('[data-testid="login-email-input"]')
      .type('amydavis@email.com', { delay: 50 })

    cy.get('[data-testid="login-password-input"]')
      .type('asdfASDF1', { delay: 50 })

    cy.get('[data-testid="login-form-login-button"]')
      .click()

    cy.wait(500)

    cy.url().should((url) => {
      expect(url).to.equal('http://localhost:3000/')
    })

    cy.get('[data-testid="profile-button"]')
      .should('exist')
  })

  it('Should be able to log out via the top bar.', () => {
    cy.get('[data-testid="profile-button"]')
      .click()

    cy.get('[data-testid="profile-menu-logout"]')
      .click()

    cy.get('[data-testid="profile-button"]')
      .should('not.exist')

    cy.get('[data-testid="login-button"]')
      .should('exist')
  })

})