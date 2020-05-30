import { buildUser } from '../support/generate';

Cypress.Commands.add('createUser', (overrides) => {
  const user = buildUser(overrides);
  cy.request({
    url: 'http://localhost:3000/register',
    method: 'POST',
    body: user,
  }).then((response) => response.body.user);
});

Cypress.Commands.add('login', (user) => {
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
    cy.login(user);
  });
});

Cypress.Commands.add('assertHome', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`);
});

Cypress.Commands.add('assertLoggedInAs', (user) => {
  cy.window().its('localStorage.token').should('be.a', 'string');
  cy.findByText('Logout').should('exist');
  cy.findByTestId('username').should('have.text', user.username);
});
