describe('SampleApp Login Tests', () => {
  it('Verify login page elements are all loaded', () => {
    cy.visit('/login')
    cy.get('h2').should("contain.text","Agile Travel")
    cy.get('[id=username]').should("be.visible")
    cy.get('[id=username]').parent().should("contain.html", "User Name: <i>agileway</i>")
    cy.get('[id=password]').should("be.visible")
    cy.get('[id=password]').parent().should("contain.html","Password: <i>testwise</i>")
    cy.get('[id=remember_me]').should("be.visible")
    cy.get('[id=remember_me]').parent().should("contain.html", "Remember me")

    })
})