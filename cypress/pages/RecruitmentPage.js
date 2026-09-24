/**
 * Page Object Model: RecruitmentPage.js
 * Location: cypress/pages/RecruitmentPage.js
 */

class RecruitmentPage {
  elements = {
    recruitmentMenu: () =>
      cy.get("a[href*='recruitment']"),

    pageHeader: () =>
      cy.get(".oxd-topbar-header-breadcrumb-module"),

    candidatesTab: () =>
      cy.get(".oxd-topbar-body-nav-tab").contains("Candidates"),

    vacanciesTab: () =>
      cy.get(".oxd-topbar-body-nav-tab").contains("Vacancies"),

    jobTitleSelect: () =>
      cy.get(".oxd-select-text").eq(0),

    vacancySelect: () =>
      cy.get(".oxd-select-text").eq(1),

    selectOption: (text) =>
      cy.get(".oxd-select-option").contains(text),

    searchButton: () =>
      cy.get("button[type='submit']"),

    resetButton: () =>
      cy.get("button[type='reset']"),

    addButton: () =>
      cy.get(".orangehrm-header-container button:contains('Add')"),

    tableCard: () =>
      cy.get(".oxd-table-card"),

    firstNameInput: () =>
      cy.get("input[name='firstName']"),

    lastNameInput: () =>
      cy.get("input[name='lastName']"),

    emailInput: () =>
      cy.get("input[placeholder='Type here']").eq(0),

    saveButton: () =>
      cy.get("button[type='submit']"),

    candidateApplicationHeader: () =>
      cy.get(".orangehrm-card-container"),
  };

  navigateToRecruitment() {
    this.elements.recruitmentMenu().click();

    this.elements
      .pageHeader()
      .should("contain.text", "Recruitment");
  }

  clickVacanciesTab() {
    this.elements.vacanciesTab().click();
  }

  selectJobTitle(jobTitle) {
    this.elements.jobTitleSelect().click();
    this.elements.selectOption(jobTitle).click();
  }

  clickSearch() {
    this.elements.searchButton().click();
  }

  clickReset() {
    this.elements.resetButton().click();
  }

  clickAddCandidate() {
    this.elements.addButton().click();
  }

  fillAddCandidateForm(firstName, lastName, email) {
    this.elements.firstNameInput().type(firstName);
    this.elements.lastNameInput().type(lastName);
    this.elements.emailInput().type(email);
  }

  clickSave() {
    this.elements.saveButton().click();
  }

  verifyCandidateTableVisible() {
    this.elements.tableCard().should("be.visible");
  }

  verifyCandidateAddedSuccessfully() {
    cy.url().should("include", "/addCandidate");

    this.elements
      .candidateApplicationHeader()
      .should("be.visible");
  }

  verifyFormReset() {
    this.elements
      .jobTitleSelect()
      .should("contain.text", "-- Select --");

    this.elements
      .vacancySelect()
      .should("contain.text", "-- Select --");
  }
}

export default new RecruitmentPage();