describe("User login", () => {
  it("should login existing user", () => {
    cy.createUser().then((user) => {
      cy.visit("/");
      cy.findByText("Login").click();
      cy.findByLabelText("Username").type(user.username);
      cy.findByLabelText("Password").type(user.password);
      cy.findByText("Submit").click();

      cy.url().should("eq", `${Cypress.config().baseUrl}/`);
      cy.window().its("localStorage.token").should("be.a", "string");
      cy.findByText("Logout").should("exist");
    });
  });
});
