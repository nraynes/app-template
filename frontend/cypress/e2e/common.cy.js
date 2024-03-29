/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Common page tests', () => {
  Cypress.Cookies.defaults({
    preserve: ['accessToken', 'refreshToken'],
  });
  
  it('Should have a top bar.', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="login-button"]')
      .should('exist');

    cy.get('[data-testid="app-title"]')
      .should('exist');

    cy.get('[data-testid="top-bar"]')
      .should('exist');
  });

});