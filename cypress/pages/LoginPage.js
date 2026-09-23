/**
 * Page Object Model: LoginPage.js
 * Location: cypress/pages/LoginPage.js
 */

class LoginPage {
  // ---------------------------------------------------------------------------
  // 1. Locators / Selectors
  // ---------------------------------------------------------------------------

  elements = {
    usernameInput: () => cy.get("input[placeholder='Username']"),
    passwordInput: () => cy.get("input[placeholder='Password']"),
    loginButton: () => cy.get("button[type='submit']"),
    forgotPasswordLink: () =>
      cy.get(".orangehrm-login-forgot-header"),
    errorMessageAlert: () =>
      cy.get(".oxd-alert-content-text"),
    fieldRequiredError: () =>
      cy.get(".oxd-input-field-error-message"),
    linkedInIcon: () =>
      cy.get("a[href*='linkedin.com']"),
    loginTitle: () =>
      cy.get(".orangehrm-login-title"),
  };

  // ---------------------------------------------------------------------------
  // 2. Action Methods
  // ---------------------------------------------------------------------------

  visitLoginPage(url) {
    cy.visit(url);

    this.elements.usernameInput().should("be.visible");
    this.elements.passwordInput().should("be.visible");
  }

  enterUsername(username) {
    if (username) {
      this.elements.usernameInput().clear().type(username);
    } else {
      this.elements.usernameInput().clear();
    }
  }

  enterPassword(password, pressEnter = false) {
    if (password) {
      if (pressEnter) {
        this.elements
          .passwordInput()
          .clear()
          .type(`${password}{enter}`);
      } else {
        this.elements
          .passwordInput()
          .clear()
          .type(password);
      }
    } else {
      this.elements.passwordInput().clear();
    }
  }

  clickLogin() {
    this.elements.loginButton().click();
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }

  clickForgotPassword() {
    this.elements
      .forgotPasswordLink()
      .should("be.visible")
      .click();
  }

  // ---------------------------------------------------------------------------
  // 3. Assertion Methods
  // ---------------------------------------------------------------------------

  verifyErrorMessage(expectedMessage) {
    this.elements
      .errorMessageAlert()
      .should("be.visible")
      .and("have.text", expectedMessage);
  }

  verifyFieldRequiredError(expectedCount = 1) {
    this.elements
      .fieldRequiredError()
      .should("have.length", expectedCount)
      .each(($el) => {
        cy.wrap($el)
          .should("be.visible")
          .and("contain.text", "Required");
      });
  }

  verifyPasswordInputMasked() {
    this.elements
      .passwordInput()
      .should("have.attr", "type", "password");
  }

  verifySocialMediaLink(platform, expectedDomain) {
    if (platform === "linkedin") {
      this.elements
        .linkedInIcon()
        .should("be.visible")
        .and("have.attr", "href")
        .and("include", expectedDomain);
    }
  }
}

export default new LoginPage();