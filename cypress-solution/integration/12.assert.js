describe('User login', () => {
  it('should login existing user', () => {
    cy.createUser().then((user) => {
      cy.visit('/');
      cy.findByText('Login').click();
      cy.findByLabelText('Username').type(user.username);
      cy.findByLabelText('Password').type(user.password);
      cy.findByText('Submit').click();

      cy.assertHome();
      cy.assertLoggedInAs(user);
    });
  });
});
