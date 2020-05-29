import { buildUser } from "../support/generate";

describe("User registration", () => {
  it("should show error message if there is error registering", () => {
    cy.server()
      .route({
        url: "http://localhost:3000/register",
        method: "POST",
        status: 500,
        response: {},
      })
      .as("register");

    const { username, password } = buildUser();
    cy.visit("/register");
    cy.findByLabelText("Username").type(username);
    cy.findByLabelText("Password").type(password);
    cy.findByText("Submit").click();
    cy.wait("@register");
    cy.findByText(/error.*try again/i);
    cy.url().should("eq", `${Cypress.config().baseUrl}/register`);
  });
});
