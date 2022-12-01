/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Color Picker feature tests', () => {
  Cypress.Cookies.defaults({
    preserve: ['accessToken', 'refreshToken', 'theme', 'customConfig'],
  });

  it('Should display the color picker on all pages.', () => {
    cy.exec('cd ../backend && npm run test:teardown');
    cy.exec('cd ../backend && npm run test:setup');
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="colors-button"]')
      .should('exist');
    
    cy.get('[data-testid="login-button"]')
      .click();

    cy.get('[data-testid="colors-button"]')
      .should('exist');

    cy.get('[data-testid="login-form-forgot-password-button"]')
      .click();

    cy.get('[data-testid="colors-button"]')
      .should('exist');

    cy.get('[data-testid="forgot-password-form-back-button"]')
      .click();

    cy.get('[data-testid="login-form-signup-button"]')
      .click();
    
    cy.get('[data-testid="colors-button"]')
      .should('exist');

    cy.get('[data-testid="signup-form-login-button"]')
      .click();

    cy.get('[data-testid="login-email-input"]')
      .type('amydavis@email.com', { delay: 50 });

    cy.get('[data-testid="login-password-input"]')
      .type('asdfASDF1', { delay: 50 });

    cy.get('[data-testid="login-form-login-button"]')
      .click();

    cy.wait(500);

    cy.get('[data-testid="colors-button"]')
      .should('exist');

    cy.get('[data-testid="profile-button"]')
      .click();

    cy.get('[data-testid="profile-menu-profile"]')
      .click();

    cy.get('[data-testid="colors-button"]')
      .should('exist');

    cy.get('[data-testid="profile-button"]')
      .click();

    cy.get('[data-testid="profile-menu-logout"]')
      .click();
  });

  it('Should display the color picker when the color picker button is clicked on.', () => {
    cy.get('[data-testid="color_drawer_container"]')
      .should('not.exist');

    cy.get('[data-testid="colors-button"]')
      .click();

    cy.get('[data-testid="color_drawer_container"]')
      .should('exist');
  });

  it('Should be able to be closed by clicking the close button.', () => {
    cy.get('[data-testid="color_drawer_close_button"]')
      .click();

    cy.get('[data-testid="color_drawer_container"]')
      .should('not.exist');

    cy.get('[data-testid="colors-button"]')
      .click();

    cy.get('[data-testid="color_drawer_container"]')
      .should('exist');
  });

  it('Should have a 5 color palette picker and transparency setters for every major component.', () => {
    cy.wait(500);

    cy.get('[data-testid="primary_one"]')
      .should('exist');

    cy.get('[data-testid="primary_two"]')
      .should('exist');

    cy.get('[data-testid="secondary_one"]')
      .should('exist');

    cy.get('[data-testid="secondary_two"]')
      .should('exist');

    cy.get('[data-testid="secondary_three"]')
      .should('exist');

    cy.get('[data-testid="background_opacity_setter"]')
      .should('exist');

    cy.get('[data-testid="form_opacity_setter"]')
      .should('exist');

    cy.get('[data-testid="button_opacity_setter"]')
      .should('exist');

    cy.get('[data-testid="button_bar_opacity_setter"]')
      .should('exist');

    cy.get('[data-testid="title_bar_opacity_setter"]')
      .should('exist');

    cy.get('[data-testid="drawer_opacity_setter"]')
      .should('exist');

    cy.get('[data-testid="component_opacity_setter"]')
      .should('exist');
  });

  it('Should be able to change the color palette by changing the colors in the pickers and clicking apply.', () => {
    cy.get('[data-testid="primary_one"]')
      .click();

    cy.get('[data-testid="color_menu_primary_one_red_slider_text"]')
      .clear()
      .type('255');

    cy.get('[data-testid="color_menu_primary_one_green_slider_text"]')
      .clear()  
      .type('0');

    cy.get('[data-testid="color_menu_primary_one_blue_slider_text"]')
      .clear()
      .type('0');

    cy.get('body')
      .click(100, 100);

    cy.get('[data-testid="primary_two"]')
      .click();

    cy.get('[data-testid="color_menu_primary_two_red_slider_text"]')
      .clear()
      .type('0');

    cy.get('[data-testid="color_menu_primary_two_green_slider_text"]')
      .clear()  
      .type('255');

    cy.get('[data-testid="color_menu_primary_two_blue_slider_text"]')
      .clear()
      .type('0');

    cy.get('body')
      .click(100, 100);

    cy.get('[data-testid="secondary_one"]')
      .click();

    cy.get('[data-testid="color_menu_secondary_one_red_slider_text"]')
      .clear()
      .type('0');

    cy.get('[data-testid="color_menu_secondary_one_green_slider_text"]')
      .clear()  
      .type('0');

    cy.get('[data-testid="color_menu_secondary_one_blue_slider_text"]')
      .clear()
      .type('255');

    cy.get('body')
      .click(100, 100);

    cy.get('[data-testid="secondary_two"]')
      .click();

    cy.get('[data-testid="color_menu_secondary_two_red_slider_text"]')
      .clear()
      .type('0');

    cy.get('[data-testid="color_menu_secondary_two_green_slider_text"]')
      .clear()  
      .type('255');

    cy.get('[data-testid="color_menu_secondary_two_blue_slider_text"]')
      .clear()
      .type('255');

    cy.get('body')
      .click(100, 100);

    cy.get('[data-testid="secondary_three"]')
      .click();

    cy.get('[data-testid="color_menu_secondary_three_red_slider_text"]')
      .clear()
      .type('255');

    cy.get('[data-testid="color_menu_secondary_three_green_slider_text"]')
      .clear()  
      .type('255');

    cy.get('[data-testid="color_menu_secondary_three_blue_slider_text"]')
      .clear()
      .type('0');

    cy.get('body')
      .click(100, 100);

    cy.get('[data-testid="background_opacity_setter_slider"]')
      .click();

    cy.get('[data-testid="form_opacity_setter_slider"]')
      .click();

    cy.get('[data-testid="button_opacity_setter_slider"]')
      .click();

    cy.get('[data-testid="button_bar_opacity_setter_slider"]')
      .click();

    cy.get('[data-testid="title_bar_opacity_setter_slider"]')
      .click();

    cy.get('[data-testid="drawer_opacity_setter_slider"]')
      .click();

    cy.get('[data-testid="component_opacity_setter_slider"]')
      .click();

    cy.get('[data-testid="color_drawer_apply_button"]')
      .click();

    cy.wait(500);

    cy.get('[data-testid="colors-button"]')
      .click();

    cy.get('[data-testid="color_drawer_container"]')
      .should('exist');

    cy.get('[data-testid="color_box_primary_one"]')
      .should('have.css', 'background-color', 'rgb(255, 0, 0)');

    cy.get('[data-testid="color_box_primary_two"]')
      .should('have.css', 'background-color', 'rgb(0, 255, 0)');

    cy.get('[data-testid="color_box_secondary_one"]')
      .should('have.css', 'background-color', 'rgb(0, 0, 255)');

    cy.get('[data-testid="color_box_secondary_two"]')
      .should('have.css', 'background-color', 'rgb(0, 255, 255)');

    cy.get('[data-testid="color_box_secondary_three"]')
      .should('have.css', 'background-color', 'rgb(255, 255, 0)');

    cy.get('[data-testid="background_opacity_setter_slider"]')
      .children('span')
      .children('input')
      .should('have.attr', 'aria-valuenow', 50);

    cy.get('[data-testid="form_opacity_setter_slider"]')
      .children('span')
      .children('input')
      .should('have.attr', 'aria-valuenow', 50);

    cy.get('[data-testid="button_opacity_setter_slider"]')
      .children('span')
      .children('input')
      .should('have.attr', 'aria-valuenow', 50);

    cy.get('[data-testid="button_bar_opacity_setter_slider"]')
      .children('span')
      .children('input')
      .should('have.attr', 'aria-valuenow', 50);

    cy.get('[data-testid="title_bar_opacity_setter_slider"]')
      .children('span')
      .children('input')
      .should('have.attr', 'aria-valuenow', 50);

    cy.get('[data-testid="drawer_opacity_setter_slider"]')
      .children('span')
      .children('input')
      .should('have.attr', 'aria-valuenow', 50);

    cy.get('[data-testid="component_opacity_setter_slider"]')
      .children('span')
      .children('input')
      .should('have.attr', 'aria-valuenow', 50);
    
    cy.get('[data-testid="color_drawer_close_button"]')
      .click();

    cy.get('[data-testid="color_drawer_container"]')
      .should('not.exist');
  });

  it('Elements should have the colors and transparencies set by the color drawer.', () => {
    cy.get('body')
      .should('have.css', 'background-color', 'rgba(255, 0, 0, 0.5)');

    cy.get('[data-testid="app-title-container"]')
      .should('have.css', 'background', 'rgba(0, 0, 0, 0) linear-gradient(to right, rgba(255, 255, 0, 0.5) 0%, rgba(255, 255, 0, 0.5) 75%, rgba(255, 255, 0, 0) 100%) repeat scroll 0% 0% / auto padding-box border-box');

    cy.get('[data-testid="top-bar-button-bar"]')
      .should('have.css', 'background', 'rgba(0, 0, 0, 0) linear-gradient(to left, rgba(255, 255, 0, 0.5) 0%, rgba(255, 255, 0, 0.5) 75%, rgba(255, 255, 0, 0) 100%) repeat scroll 0% 0% / auto padding-box border-box');

    cy.get('[data-testid="login-button"]')
      .click();

    cy.get('[data-testid="login-form"]')
      .should('have.css', 'background-color', 'rgba(0, 0, 255, 0.5)');

    cy.get('[data-testid="login-form-login-button"]')
      .should('have.css', 'background-color', 'rgba(0, 255, 255, 0.5)');
  });

  it('Should set everything back to the default color scheme when that button is clicked.', () => {
    cy.get('[data-testid="home-button"]')
      .click();

    cy.get('[data-testid="colors-button"]')
      .click();

    cy.get('[data-testid="color_drawer_container"]')
      .should('exist');

    cy.get('[data-testid="color_drawer_defaults_button"]')
      .click();

    cy.wait(500);

    cy.get('[data-testid="colors-button"]')
      .click();

    cy.get('[data-testid="color_drawer_container"]')
      .should('exist');

    cy.get('[data-testid="color_box_primary_one"]')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)');

    cy.get('[data-testid="color_box_primary_two"]')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)');

    cy.get('[data-testid="color_box_secondary_one"]')
      .should('have.css', 'background-color', 'rgb(200, 200, 200)');

    cy.get('[data-testid="color_box_secondary_two"]')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)');

    cy.get('[data-testid="color_box_secondary_three"]')
      .should('have.css', 'background-color', 'rgb(12, 18, 117)');

    cy.wait(100);

    cy.get('[data-testid="background_opacity_setter_slider"]')
      .children('span')
      .children('input')
      .should('have.attr', 'aria-valuenow', 100);

    cy.get('[data-testid="form_opacity_setter_slider"]')
      .children('span')
      .children('input')
      .should('have.attr', 'aria-valuenow', 80);

    cy.get('[data-testid="button_opacity_setter_slider"]')
      .children('span')
      .children('input')
      .should('have.attr', 'aria-valuenow', 100);

    cy.get('[data-testid="button_bar_opacity_setter_slider"]')
      .children('span')
      .children('input')
      .should('have.attr', 'aria-valuenow', 60);

    cy.get('[data-testid="title_bar_opacity_setter_slider"]')
      .children('span')
      .children('input')
      .should('have.attr', 'aria-valuenow', 0);

    cy.get('[data-testid="drawer_opacity_setter_slider"]')
      .children('span')
      .children('input')
      .should('have.attr', 'aria-valuenow', 80);

    cy.get('[data-testid="component_opacity_setter_slider"]')
      .children('span')
      .children('input')
      .should('have.attr', 'aria-valuenow', 15);
    
    cy.get('[data-testid="color_drawer_close_button"]')
      .click();

    cy.get('[data-testid="color_drawer_container"]')
      .should('not.exist');
  });

});