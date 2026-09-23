/**
 * Page Object Model: DashboardPage.js
 * Location: cypress/pages/DashboardPage.js
 */

class DashboardPage {
  // ---------------------------------------------------------------------------
  // 1. Locators / Selectors
  // ---------------------------------------------------------------------------

  elements = {
    dashboardHeader: () =>
      cy.get(".oxd-topbar-header-breadcrumb-module"),

    userDropdown: () =>
      cy.get(".oxd-userdropdown-tab"),

    logoutOption: () =>
      cy.get("a:contains('Logout')"),
  };

  // ---------------------------------------------------------------------------
  // 2. Assertion Methods
  // ---------------------------------------------------------------------------

  verifyDashboardPageLoaded() {
    cy.url().should("include", "/dashboard");

    this.elements
      .dashboardHeader()
      .should("be.visible")
      .and("contain.text", "Dashboard");
  }

  // ---------------------------------------------------------------------------
  // 3. Action Methods
  // ---------------------------------------------------------------------------

  logout() {
    this.elements.userDropdown().click();
    this.elements.logoutOption().click();

    cy.url().should("include", "/auth/login");
  }
}

export default new DashboardPage();