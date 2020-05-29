describe("calculator", () => {
  it("should add number", () => {
    cy.visit("/");
    cy.findByText("1").click();
    cy.findByText("+").click();
    cy.findByText("2")
      // .then((subject) => {
      //   debugger;
      //   return subject;
      // })
      // .debug()
      .pause()
      .click();
    cy.findByText("=").click();
    cy.findByTestId("total").should("have.text", "4");
  });
});
