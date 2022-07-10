/* eslint-disable no-undef */
/// <reference types="cypress" />


describe('Profile feature tests', () => {
  Cypress.Cookies.defaults({
    preserve: ['accessToken', 'refreshToken'],
  })
  
  it('Should display the user profile editor when logged in and visiting the right page.', () => {
    cy.exec('cd ../backend && npm run test:teardown')
    cy.exec('cd ../backend && npm run test:setup')
    cy.visit('http://localhost:3000/')

    cy.get('[data-testid="login-button"]')
      .click()

    cy.get('[data-testid="login-form"]')
      .should('exist')

    cy.get('[data-testid="login-email-input"]')
      .type('amydavis@email.com', { delay: 50 })

    cy.get('[data-testid="login-password-input"]')
      .type('asdfASDF1', { delay: 50 })

    cy.get('[data-testid="login-form-login-button"]')
      .click()

    cy.get('[data-testid="profile-button"]')
      .click()

    cy.get('[data-testid="profile-menu-profile"]')
      .click()

    cy.get('[data-testid="profile-editor"]')
      .should('exist')
    
    cy.wait(500)
  })

  it('Should display the users email on the form.', () => {
    cy.get('[data-testid="profile-editor-email-input"]')
      .children('div')
      .children('input')
      .should('have.attr', 'value', 'amydavis@email.com')
  })

  it('Should allow the user to enter an editing mode when clicking on the edit button.', () => {
    cy.get('[data-testid="profile-editor-form-cancel-button"]')
      .should('not.exist')

    cy.get('[data-testid="profile-editor-form-edit-submit-button"]')
      .should('have.text', 'Edit')
      .click()

    cy.get('[data-testid="profile-editor-form-cancel-button"]')
      .should('exist')

    cy.get('[data-testid="profile-editor-form-edit-submit-button"]')
      .should('have.text', 'Submit') 
      
    cy.get('[data-testid="profile-editor-email-input"]')
      .should('not.exist')

    cy.get('[data-testid="profile-editor-email-input-editing"]')
      .should('exist')
      .clear()
      .type('newuseremail@email.com', { delay: 50 })
  })

  it('Should allow the user to cancel edit mode by clicking the cancel button.', () => {
    cy.get('[data-testid="profile-editor-form-cancel-button"]')
      .click()

    cy.get('[data-testid="profile-editor-form-edit-submit-button"]')
      .should('have.text', 'Edit')

    cy.get('[data-testid="profile-editor-form-cancel-button"]')
      .should('not.exist')

    cy.get('[data-testid="profile-editor-email-input"]')
      .should('exist')

    cy.get('[data-testid="profile-editor-email-input-editing"]')
      .should('not.exist')
    
    cy.get('[data-testid="profile-editor-email-input"]')
      .children('div')
      .children('input')
      .should('have.attr', 'value', 'amydavis@email.com')
  })

  it('Should allow the user to change their email via edit mode and log the user out upon submitting the new email.', () => {
    cy.get('[data-testid="profile-editor-form-edit-submit-button"]')
      .should('have.text', 'Edit')
      .click()

    cy.get('[data-testid="profile-editor-email-input-editing"]')
      .clear()
      .type('newuseremail@email.com', { delay: 50 })

    cy.get('[data-testid="profile-editor-form-edit-submit-button"]')
      .should('have.text', 'Submit')
      .click()

    cy.get('[data-testid="alert-dialog"]')
      .should('exist')

    cy.get('[data-testid="alert-dialog-yes"]')
      .click()
    
    cy.wait(500)

    cy.get('[id="notistack-snackbar"]')
      .should('exist')
      .should('have.text', 'Info changed successfully!Please check your email to reverify it. You will now be logged out.')

    cy.wait(5000)

    cy.get('[data-testid="profile-editor"]')
      .should('not.exist')

    cy.url().should((url) => {
      expect(url).to.equal('http://localhost:3000/')
    })

    cy.get('[data-testid="login-button"]')
      .click()

    cy.get('[data-testid="login-form"]')
      .should('exist')
  })

  it('Should show an unverified popup when logging in after changing email because the account is no longer verified.', () => {
    cy.get('[data-testid="login-email-input"]')
      .type('newuseremail@email.com', { delay: 50 })

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

  it('Should be able to log in after reverifying email and profile form should now display new email.', () => {
    cy.request('http://localhost:3001/api/test/emailTempCode?email=newuseremail@email.com')
      .should((response) => {
        expect(response.body).to.match(/.{32}/)
        cy.visit(`http://localhost:3000/auth/login?code=${response.body}`)
    
        cy.get('[id="notistack-snackbar"]')
          .should('exist')
          .should('have.text', 'Your email has been successfully verified!')
      })
    cy.wait(1000)
    cy.get('[data-testid="login-email-input"]')
      .type('newuseremail@email.com', { delay: 50 })

    cy.get('[data-testid="login-password-input"]')
      .type('asdfASDF1', { delay: 50 })

    cy.get('[data-testid="login-form-login-button"]')
      .click()

    cy.get('[data-testid="profile-button"]')
      .click()

    cy.get('[data-testid="profile-menu-profile"]')
      .click()

    cy.get('[data-testid="profile-editor"]')
      .should('exist')
    
    cy.wait(500)

    cy.get('[data-testid="profile-editor-email-input"]')
      .children('div')
      .children('input')
      .should('have.attr', 'value', 'newuseremail@email.com')
  })

  it('Should be able to log out of all devices when clicking the appropriate button.', () => {
    cy.get('[data-testid="profile-editor-form-log-out-all-button"]')
      .click()

    cy.get('[data-testid="alert-dialog"]')
      .should('exist')

    cy.get('[data-testid="alert-dialog-yes"]')
      .click()

    cy.get('[id="notistack-snackbar"]')
      .should('exist')
      .should('have.text', 'Successfully logged out of all devices. You will now be logged out.')

    cy.wait(5000)

    cy.get('[data-testid="profile-editor"]')
      .should('not.exist')

    cy.url().should((url) => {
      expect(url).to.equal('http://localhost:3000/')
    })

    cy.get('[data-testid="login-button"]')
      .click()

    cy.get('[data-testid="login-form"]')
      .should('exist')

    cy.get('[data-testid="login-email-input"]')
      .type('newuseremail@email.com', { delay: 50 })

    cy.get('[data-testid="login-password-input"]')
      .type('asdfASDF1', { delay: 50 })

    cy.get('[data-testid="login-form-login-button"]')
      .click()

    cy.get('[data-testid="profile-button"]')
      .click()

    cy.get('[data-testid="profile-menu-profile"]')
      .click()

    cy.get('[data-testid="profile-editor"]')
      .should('exist')
  })

  it('Should be able to delete the users account by clicking on the delete account button and confirming via a prompt.', () => {
    cy.get('[data-testid="profile-editor-form-delete-account-button"]')
      .click()

    cy.get('[data-testid="alert-dialog"]')
      .should('exist')

    cy.get('[data-testid="alert-dialog-yes"]')
      .click()

    cy.get('[id="notistack-snackbar"]')
      .should('exist')
      .should('have.text', 'Successfully deleted user account. You will now be logged out.')

    cy.wait(5000)

    cy.get('[data-testid="profile-editor"]')
      .should('not.exist')

    cy.url().should((url) => {
      expect(url).to.equal('http://localhost:3000/')
    })

    cy.get('[data-testid="login-button"]')
      .click()

    cy.get('[data-testid="login-form"]')
      .should('exist')

    cy.get('[data-testid="login-email-input"]')
      .type('newuseremail@email.com', { delay: 50 })

    cy.get('[data-testid="login-password-input"]')
      .type('asdfASDF1', { delay: 50 })

    cy.get('[data-testid="login-form-login-button"]')
      .click()

    cy.get('[id="notistack-snackbar"]')
      .should('exist')
      .should('have.text', 'There was no user matching those credentials')
  })

})