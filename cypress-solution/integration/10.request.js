import { buildUser } from "../support/generate";

describe("User login", () => {
  it("should login existing user", () => {
    const { username, password } = buildUser();
    cy.request({
      url: "http://localhost:3000/register",
      method: "POST",
      body: { username, password },
    });

    cy.visit("/");
    cy.findByText("Login").click();
    cy.findByLabelText("Username").type(username);
    cy.findByLabelText("Password").type(password);
    cy.findByText("Submit").click();

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    cy.window().its("localStorage.token").should("be.a", "string");
    cy.findByText("Logout").should("exist");
  });
});
