describe('authenticated calculator', () => {
  it('should display username', () => {
    cy.createAndLogin().then((user) => {
      cy.visit('/');
      // cy.findByTestId('username').should('eq', user.username);
      cy.findByText('Logout').click();
      cy.findByTestId('username').should('not.exist');
      cy.findByText('Login').should('exist');
    });
  });
});
