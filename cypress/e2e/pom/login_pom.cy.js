 /**
  * Cypress Test Suite: OrangeHRM Login Feature (Page Object Model)
  * Location: cypress/e2e/pom/login_pom.cy.js
  */

import loginPage from "../../pages/LoginPage";
import dashboardPage from "../../pages/DashboardPage";

describe("OrangeHRM - Login Feature Test Automation with POM", () => {
  let testData;

  beforeEach(() => {
    // Memuat data dari Fixture (loginData.json)
    cy.fixture("loginData").then((data) => {
      testData = data;

      loginPage.visitLoginPage(testData.baseUrl);
    });
  });

  // ===========================================================================
  // POSITIVE TEST SCENARIOS
  // ===========================================================================

  it("TC-POM-01: Successful login with valid credentials", () => {
    loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );

    dashboardPage.verifyDashboardPageLoaded();
  });

  it('TC-POM-02: Successful login using "Enter" key on password field', () => {
    loginPage.enterUsername(testData.validUser.username);

    loginPage.enterPassword(
      testData.validUser.password,
      true
    );

    dashboardPage.verifyDashboardPageLoaded();
  });

  it('TC-POM-03: Verify "Forgot your password?" link redirection', () => {
    loginPage.clickForgotPassword();

    cy.url().should("include", "/requestPasswordResetCode");
    cy.get("h6").should("contain.text", "Reset Password");
  });

  // ===========================================================================
  // NEGATIVE TEST SCENARIOS (Invalid Credentials)
  // ===========================================================================

  it("TC-POM-04: Login with invalid username and valid password", () => {
    loginPage.login(
      testData.invalidUser.username,
      testData.validUser.password
    );

    loginPage.verifyErrorMessage(
      testData.errorMessages.invalidCredentials
    );
  });

  it("TC-POM-05: Login with valid username and invalid password", () => {
    loginPage.login(
      testData.validUser.username,
      testData.invalidUser.password
    );

    loginPage.verifyErrorMessage(
      testData.errorMessages.invalidCredentials
    );
  });

  it("TC-POM-06: Verify case sensitivity on password field", () => {
    loginPage.login(
      testData.caseSensitiveUser.username,
      testData.caseSensitiveUser.password
    );

    loginPage.verifyErrorMessage(
      testData.errorMessages.invalidCredentials
    );
  });

  // ===========================================================================
  // FIELD VALIDATIONS & SECURITY SCENARIOS
  // ===========================================================================

  it("TC-POM-07: Login with empty username and valid password", () => {
    loginPage.enterUsername("");
    loginPage.enterPassword(testData.validUser.password);
    loginPage.clickLogin();

    loginPage.verifyFieldRequiredError(1);
  });

  it("TC-POM-08: Login with empty username and empty password", () => {
    loginPage.enterUsername("");
    loginPage.enterPassword("");
    loginPage.clickLogin();

    loginPage.verifyFieldRequiredError(2);
  });

  it("TC-POM-09: Verify password field input masking", () => {
    loginPage.verifyPasswordInputMasked();
  });

  it("TC-POM-10: Verify social media footer link for LinkedIn", () => {
    loginPage.verifySocialMediaLink(
      "linkedin",
      testData.socialLinks.linkedIn
    );
  });
});