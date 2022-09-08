/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Signup feature tests', () => {
  Cypress.Cookies.defaults({
    preserve: ['accessToken', 'refreshToken'],
  });
  
  it('Login and Signup forms should exist.', () => {
    cy.exec('cd ../backend && npm run test:teardown');
    cy.exec('cd ../backend && npm run test:setup');
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="login-button"]')
      .click();

    cy.get('[data-testid="login-form"]')
      .should('exist');

    cy.get('[data-testid="login-form-signup-button"]')
      .click();

    cy.get('[data-testid="signup-form"]')
      .should('exist');

    cy.wait(1000);

    cy.get('[data-testid="google-recaptcha"]')
      .should('exist');
  });

  it('Should display a snackbar that says the email is invalid when an email with the wrong format is used.', () => {
    cy.get('[data-testid="signup-email-input"]')
      .type('frontend', { delay: 50 });

    cy.get('[data-testid="signup-password-input"]')
      .type('asdfASDF1', { delay: 50 });

    cy.get('[data-testid="signup-confirm-password-input"]')
      .type('asdfASDF1', { delay: 50 });

    cy.get('[data-testid="signup-form-signup-button"]')
      .click();

    cy.get('[id="notistack-snackbar"]')
      .should('exist')
      .should('have.text', '"email" must be a valid email\n');
  });

  it('Should display a snackbar saying the password policy when supplied with an invalid password.', () => {
    cy.get('[data-testid="signup-form-login-button"]')
      .click();

    cy.get('[data-testid="login-form-signup-button"]')
      .click();

    cy.get('[data-testid="signup-email-input"]')
      .type('frontend@email.com', { delay: 50 });

    cy.get('[data-testid="signup-password-input"]')
      .type('asdfASDF', { delay: 50 });

    cy.get('[data-testid="signup-confirm-password-input"]')
      .type('asdfASDF', { delay: 50 });

    cy.get('[data-testid="signup-form-signup-button"]')
      .click();

    cy.get('[id="notistack-snackbar"]')
      .should('exist')
      .should('have.text', 'password must contain at least 1 number\n');
  });

  it('Should display a snackbar saying that the passwords must match when two different passwords are input.', () => {
    cy.get('[data-testid="signup-form-login-button"]')
    .click();

    cy.get('[data-testid="login-form-signup-button"]')
      .click();

    cy.get('[data-testid="signup-email-input"]')
      .type('frontend@email.com', { delay: 50 });

    cy.get('[data-testid="signup-password-input"]')
      .type('asdfASDF', { delay: 50 });

    cy.get('[data-testid="signup-confirm-password-input"]')
      .type('asdfASDF1', { delay: 50 });

    cy.get('[data-testid="signup-form-signup-button"]')
      .click();

    cy.get('[id="notistack-snackbar"]')
      .should('exist')
      .should('have.text', 'Passwords must match.');
  });

  it('Should create an account successfully and display a snackbar notifying the user when correct information is supplied.', () => {
    cy.get('[data-testid="signup-form-login-button"]')
    .click();
    
    cy.get('[data-testid="login-form-signup-button"]')
      .click();

    cy.get('[data-testid="signup-email-input"]')
      .type('frontend@email.com', { delay: 50 });

    cy.get('[data-testid="signup-password-input"]')
      .type('asdfASDF1', { delay: 50 });

    cy.get('[data-testid="signup-confirm-password-input"]')
      .type('asdfASDF1', { delay: 50 });

    cy.get('[data-testid="signup-form-signup-button"]')
      .click();

    cy.get('[id="notistack-snackbar"]')
      .should('exist')
      .should('have.text', 'Created the account successfully! Check your email to verify it.');
  });

  it('Should display a snack bar saying that the account already exists when the same information is put in.', () => {
    cy.get('[data-testid="login-form-signup-button"]')
    .click();

    cy.get('[data-testid="signup-email-input"]')
      .type('frontend@email.com', { delay: 50 });

    cy.get('[data-testid="signup-password-input"]')
      .type('asdfASDF1', { delay: 50 });

    cy.get('[data-testid="signup-confirm-password-input"]')
      .type('asdfASDF1', { delay: 50 });

    cy.get('[data-testid="signup-form-signup-button"]')
      .click();

    cy.get('[id="notistack-snackbar"]')
      .should('exist')
      .should('have.text', 'That account already exists');

    cy.get('[data-testid="signup-form-login-button"]')
      .click();
  });

});