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

  it('Should display the login page when the back button is clicked.', () => {
    cy.get('[data-testid="forgot-password-form-back-button"]')
      .click()

    cy.get('[data-testid="login-form"]')
      .should('exist')
    
    cy.get('[data-testid="login-form-forgot-password-button"]')
      .click()

    cy.get('[data-testid="forgot-password"]')
      .should('exist')
  })

  it('Should display a potential success snack bar when the wrong email is input.', () => {
    cy.get('[data-testid="forgot-password-email-input"]')
      .type('Somerandomtestemail@email.com')
    
    cy.get('[data-testid="forgot-password-form-reset-password-button"]')
      .click()

    cy.get('[id="notistack-snackbar"]')
      .should('exist')
      .should('have.text', 'If an account with this email exists, you will receive an email to reset your password.')

    cy.request({ url: 'http://localhost:3001/api/test/passTempCode?email=Somerandomtestemail@email.com', failOnStatusCode: false })
      .should((response) => {
        expect(response.status).to.equal(404)
        expect(response.body).to.equal('NOTFOUND')
      })
  })

  it('Should display a success snack bar when the wrong email is input.', () => {
    cy.get('[data-testid="forgot-password-form-back-button"]')
      .click()
    
    cy.get('[data-testid="login-form-forgot-password-button"]')
      .click()

    cy.get('[data-testid="forgot-password"]')
      .should('exist')

    cy.get('[data-testid="forgot-password-email-input"]')
      .type('amydavis@email.com')
    
    cy.request({ url: 'http://localhost:3001/api/test/passTempCode?email=amydavis@email.com', failOnStatusCode: false })
      .should((response) => {
        expect(response.status).to.equal(401)
        expect(response.body).to.equal('EXPIRED')
      })

    cy.get('[data-testid="forgot-password-form-reset-password-button"]')
      .click()

    cy.get('[id="notistack-snackbar"]')
      .should('exist')
      .should('have.text', 'If an account with this email exists, you will receive an email to reset your password.')

    cy.request({ url: 'http://localhost:3001/api/test/passTempCode?email=amydavis@email.com', failOnStatusCode: false })
      .should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.pass_key).to.match(/.{32}/)
      })
  })

})