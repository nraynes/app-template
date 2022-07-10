/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Change Password feature tests', () => {

  it('Should navigate back to the login page when an invalid code is used.', () => {
    cy.exec('cd ../backend && npm run test:teardown')
    cy.exec('cd ../backend && npm run test:setup')
    cy.visit('http://localhost:3000/password/change?temp=somerandom')

    cy.wait(500)

    cy.get('[data-testid="login-form"]')
      .should('exist')

    cy.url().should((url) => {
      expect(url).to.equal('http://localhost:3000/auth/login')
    })

    cy.get('[id="notistack-snackbar"]')
      .should('exist')
      .should('have.text', 'Temporary Code Invalid.')
  })

  it('Should display the change password form when a correct temp code is used.', () => {
    cy.get('[data-testid="login-form-forgot-password-button"]')
      .click()

    cy.get('[data-testid="forgot-password"]')
      .should('exist')

    cy.get('[data-testid="forgot-password-email-input"]')
      .type('amydavis@email.com')

    cy.get('[data-testid="forgot-password-form-reset-password-button"]')
      .click()

    cy.wait(1000)

    cy.get('[id="notistack-snackbar"]')
      .should('exist')
      .should('have.text', 'If an account with this email exists, you will receive an email to reset your password.')

    cy.request({ url: 'http://localhost:3001/api/test/passTempCode?email=amydavis@email.com', failOnStatusCode: false })
      .should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.pass_key).to.match(/.{32}/)

        cy.visit(`http://localhost:3000/password/change?temp=${response.body.pass_key}`)

        cy.wait(500)

        cy.get('[data-testid="change-password"]')
          .should('exist')
      })
  })

  it('Color Picker should exist on change password page', () => {
    cy.get('[data-testid="colors-button"]')
      .should('exist')
  })

  it('Should return you to the login page and display a snackbar saying your password was changed when you change your password.', () => {
    cy.get('[data-testid="change-password-password-input"]')
      .type('ASDFasdf1', { delay: 50 })

    cy.get('[data-testid="change-password-confirm-password-input"]')
      .type('ASDFasdf1', { delay: 50 })

    cy.get('[data-testid="change-password-form-change-password-button"]')
      .click()

    cy.wait(500)

    cy.get('[data-testid="login-form"]')
      .should('exist')

    cy.get('[id="notistack-snackbar"]')
      .should('exist')
      .should('have.text', 'Password successfully changed.')
    
    cy.get('[data-testid="login-email-input"]')
      .type('amydavis@email.com', { delay: 50 })

    cy.get('[data-testid="login-password-input"]')
      .type('ASDFasdf1', { delay: 50 })

    cy.get('[data-testid="login-form-login-button"]')
      .click()

    cy.wait(500)

    cy.url().should((url) => {
      expect(url).to.equal('http://localhost:3000/')
    })

    cy.get('[data-testid="profile-button"]')
      .should('exist')

    cy.get('[data-testid="profile-button"]')
      .click()

    cy.get('[data-testid="profile-menu-logout"]')
      .click()

    cy.get('[data-testid="profile-button"]')
      .should('not.exist')

    cy.get('[data-testid="login-button"]')
      .should('exist')
  })

  it('Should be able to go back to login page via the cancel button.', () => {
    cy.get('[data-testid="login-button"]')
      .click()

    cy.get('[data-testid="login-form-forgot-password-button"]')
      .click()

    cy.get('[data-testid="forgot-password"]')
      .should('exist')

    cy.get('[data-testid="forgot-password-email-input"]')
      .type('amydavis@email.com')

    cy.get('[data-testid="forgot-password-form-reset-password-button"]')
      .click()

    cy.wait(1000)

    cy.get('[id="notistack-snackbar"]')
      .should('exist')
      .should('have.text', 'If an account with this email exists, you will receive an email to reset your password.')

    cy.request({ url: 'http://localhost:3001/api/test/passTempCode?email=amydavis@email.com', failOnStatusCode: false })
      .should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.pass_key).to.match(/.{32}/)

        cy.visit(`http://localhost:3000/password/change?temp=${response.body.pass_key}`)

        cy.wait(500)

        cy.get('[data-testid="change-password"]')
          .should('exist')

        cy.get('[data-testid="change-password-form-cancel-button"]')
          .click()

        cy.get('[data-testid="login-form"]')
          .should('exist')
      })
  })

})