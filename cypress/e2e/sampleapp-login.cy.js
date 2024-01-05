describe('SampleApp Login Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.getDataTest("username").as("username")
    cy.getDataTest("password").as("password")
    cy.getDataTest("login-button").as("loginBtn")

  })

  it('Verify login page elements are all loaded', () => {
    cy.get('[class=login_logo]').should("contain.text","Swag Labs")
    cy.get("@username").should("be.visible").should("have.attr","placeholder", "Username")
    cy.get("@password").should("be.visible").should("have.attr", "placeholder", "Password")
    cy.get("@loginBtn").should("be.visible").should("have.value", "Login")

    })

    ;['standard_user','problem_user','error_user', 'performance_glitch_user','visual_user'].forEach((username) => {
    it('Verify user can login with valid username, ' + username+ ', and password', () => {
      cy.performLogin(username, "secret_sauce")
      cy.url().should("equal", "https://www.saucedemo.com/inventory.html")
    })
  })

    it('Verify error message displayed to user that is locked out', () => {
      cy.performLogin("locked_out_user", "secret_sauce")
      cy.getDataTest("error").should("be.visible").should("contain", "locked out")
    })

    it('Verify username required message appears when logging in w/o a username', () => {
      cy.get("@loginBtn").click()
      cy.getDataTest("error").should("be.visible").should("contain.text", "Epic sadface: Username is required")
    })

    it('Verify password required message appears when logging in w/o a password', () => {
      cy.get("@username").type("standard_user")
      cy.get("@loginBtn").click()
      cy.getDataTest("error").should("be.visible").should("contain.text", "Epic sadface: Password is required")
    })
})