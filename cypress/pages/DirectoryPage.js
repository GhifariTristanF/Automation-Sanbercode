/**
 * Page Object Model: DirectoryPage.js
 * Location: cypress/pages/DirectoryPage.js
 */

class DirectoryPage {
  elements = {
    directoryMenu: () =>
      cy.get("a[href*='viewDirectory']"),

    pageHeader: () =>
      cy.get(".oxd-topbar-header-breadcrumb-module"),

    employeeNameInput: () =>
      cy.get("input[placeholder='Type for hints...']"),

    autocompleteDropdown: () =>
      cy.get(".oxd-autocomplete-dropdown"),

    autocompleteOption: () =>
      cy.get(".oxd-autocomplete-option"),

    jobTitleSelect: () =>
      cy.get(".oxd-select-text").eq(0),

    locationSelect: () =>
      cy.get(".oxd-select-text").eq(1),

    selectOption: (text) =>
      cy.get(".oxd-select-option").contains(text),

    searchButton: () =>
      cy.get("button[type='submit']"),

    resetButton: () =>
      cy.get("button[type='reset']"),

    directoryCard: () =>
      cy.get(".orangehrm-directory-card"),

    directoryCardName: () =>
      cy.get(".orangehrm-directory-card-header"),

    directoryCardTitle: () =>
      cy.get(".orangehrm-directory-card-subtitle"),

    recordCountText: () =>
      cy.get(".orangehrm-horizontal-padding .oxd-text"),

    // Toast Notification
    toastNotification: () =>
      cy.get(
        ".oxd-toast, .oxd-toast-content, .oxd-text--toast-message"
      ),
  };

  // ---------------------------------------------------------------------------
  // Action Methods
  // ---------------------------------------------------------------------------

  navigateToDirectory() {
    this.elements.directoryMenu().click();

    this.elements
      .pageHeader()
      .should("contain.text", "Directory");
  }

  typeEmployeeName(name) {
    if (name) {
      this.elements
        .employeeNameInput()
        .clear()
        .type(name);
    } else {
      this.elements
        .employeeNameInput()
        .clear();
    }
  }

  selectJobTitle(jobTitle) {
    this.elements.jobTitleSelect().click();
    this.elements.selectOption(jobTitle).click();
  }

  selectLocation(location) {
    this.elements.locationSelect().click();
    this.elements.selectOption(location).click();
  }

  clickSearch() {
    this.elements.searchButton().click();
  }

  clickReset() {
    this.elements.resetButton().click();
  }

  // ---------------------------------------------------------------------------
  // Assertion Methods
  // ---------------------------------------------------------------------------


verifyInputInvalidError() {
  // Memeriksa pesan error "Invalid" di bawah field Employee Name
  cy.get(".oxd-input-field-error-message")
    .should("be.visible")
    .and("contain.text", "Invalid");
}

verifyNoRecordsFound() {
  // Memeriksa pesan "No Records Found" pada halaman
  cy.get("body")
    .should("contain.text", "No Records Found");
}

  verifyDirectoryCardVisible() {
    this.elements
      .directoryCard()
      .should("be.visible");
  }

  verifyNoRecordsFound() {
    cy.get(
      ".oxd-toast, .oxd-toast-content, body",
      { timeout: 10000 }
    ).should(
      "contain.text",
      "No Records Found"
    );
  }

  verifyFormReset() {
    this.elements
      .employeeNameInput()
      .should("have.value", "");

    this.elements
      .jobTitleSelect()
      .should(
        "contain.text",
        "-- Select --"
      );

    this.elements
      .locationSelect()
      .should(
        "contain.text",
        "-- Select --"
      );
  }
}

export default new DirectoryPage();