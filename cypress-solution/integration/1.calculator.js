describe('calculator', () => {
  it('should add number', () => {
    cy.visit('http://localhost:8080');
    cy.get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(3)').click();
    cy.get('._1yUJ9HTWYf2v-MMhAEVCAn > :nth-child(4)').click();
    cy.get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(4)').click();
    cy.get('._1yUJ9HTWYf2v-MMhAEVCAn > :nth-child(5)').click();
    cy.get('[data-testid=total]').should('have.text', '3');
  });
});
