import { buildUser } from '../support/generate';

Cypress.Commands.add('createUser', (overrides) => {
  const { username, password } = buildUser(overrides);
  cy.request({
    url: 'http://localhost:3000/register',
    method: 'POST',
    body: { username, password },
  }).then((response) => response.body.user);
});

Cypress.Commands.add('loginUser', (user) => {
  cy.request({
    url: 'http://localhost:3000/login',
    method: 'POST',
    body: user,
  }).then((response) => {
    window.localStorage.setItem('token', response.body.user.token);
    return response.body.user;
  });
});

Cypress.Commands.add('createAndLogin', (overrides) => {
  cy.createUser(overrides).then((user) => {
    cy.loginUser(user);
  });
});

Cypress.Commands.add('assertHome', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`);
});

Cypress.Commands.add('assertLoggedInAs', (user) => {
  cy.findByTestId('username').should('have.text', user.username);
  cy.findByText('Logout').should('exist');
  cy.window().its('localStorage.token').should('be.a', 'string');
});
