describe('not authenticated calculator', () => {
  it('should add numbers', () => {
    cy.visit('/');
    cy.findByText('1').click();
    cy.findByText('+').click();
    cy.findByText('2').click();
    cy.findByText('=').click();
    cy.findByTestId('total').should('have.text', '3');
  });
});

describe('authenticated calculator', () => {
  it('should display username', () => {
    cy.createAndLogin().then((user) => {
      cy.visit('/');
      cy.assertHome();
      cy.assertLoggedInAs(user);
    });
  });
});
