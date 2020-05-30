import { buildUser } from '../support/generate';

describe('Registration', () => {
  it('should register a new user', () => {
    const user = buildUser();

    cy.visit('/');
    cy.findByText('Register').click();
    cy.findByLabelText('Username').type(user.username);
    cy.findByLabelText('Password').type(user.password);
    cy.findByText('Submit').click();

    cy.assertHome();
    cy.assertLoggedInAs(user);
  });

  it('should display error message if registration fail', () => {
    const user = buildUser();

    cy.server().route({
      url: 'http://localhost:3000/register',
      method: 'POST',
      status: 500,
      response: {},
    });

    cy.visit('/');
    cy.findByText('Register').click();
    cy.findByLabelText('Username').type(user.username);
    cy.findByLabelText('Password').type(user.password);
    cy.findByText('Submit').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/register`);
    cy.window().its('localStorage.token').should('not.be.a', 'string');
    cy.findByText(/error.*try again/i).should('exist');
  });
});
