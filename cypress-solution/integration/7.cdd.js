import { buildUser } from '../support/generate';

describe('User registration', () => {
  it('should register user', () => {
    const { username, password } = buildUser();
    cy.visit('/');
    cy.findByText('Register').click();
    cy.findByLabelText('Username').type(username);
    cy.findByLabelText('Password').type(password);
    cy.findByText('Submit').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.window()
      .its('localStorage.token')
      .should('be.a', 'string');
    cy.findByText('Logout').should('exist');
    cy.findByTestId('username').should('have.text', username);
  });
});
