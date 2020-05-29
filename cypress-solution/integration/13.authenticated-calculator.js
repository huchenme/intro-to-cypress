describe("authenticated calculator", () => {
  it("should display username", () => {
    cy.createUser().then((user) => {
      cy.request({
        url: "http://localhost:3000/login",
        method: "POST",
        body: user,
      }).then((response) => {
        window.localStorage.setItem("token", response.body.user.token);
      });

      cy.visit("/");
      // cy.findByTestId('username').should('eq', user.username);
      cy.findByText("Logout").click();
      cy.findByTestId("username").should("not.exist");
      cy.findByText("Login").should("exist");
    });
  });
});
