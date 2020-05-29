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
  cy.window()
    .its('localStorage.token')
    .should('be.a', 'string');
  cy.findByText('Logout').should('exist');
  cy.findByTestId('username').should('have.text', user.username);
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
