/**
 * Test Suite: OrangeHRM - Recruitment Feature Test Automation
 * Framework: Cypress
 * Design Pattern: Page Object Model (POM)
 * Feature: Recruitment
 */

import loginPage from "../../pages/LoginPage";
import recruitmentPage from "../../pages/RecruitmentPage";

describe(
  "OrangeHRM - Recruitment Feature Test Automation (POM + Intercept)",
  () => {
    let testData;

    beforeEach(() => {
      cy.fixture("recruitmentData").then((data) => {
        testData = data;

        loginPage.visitLoginPage(testData.baseUrl);

        loginPage.login(
          testData.validUser.username,
          testData.validUser.password
        );

        recruitmentPage.navigateToRecruitment();
      });
    });

    it("TC-REC-01: View candidates list and intercept GET candidates API", () => {
      cy.intercept(
        "GET",
        "**/api/v2/recruitment/candidates*"
      ).as("getCandidates");

      cy.reload();

      cy.wait("@getCandidates").then((interception) => {
        expect(interception.request.method).to.equal("GET");
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.response.body).to.have.property("data");
      });

      recruitmentPage.verifyCandidateTableVisible();
    });

    it(
      "TC-REC-02: Filter candidates by Job Title and intercept request query params",
      () => {
        cy.intercept(
          "GET",
          "**/api/v2/recruitment/candidates*"
        ).as("filterCandidates");

        recruitmentPage.selectJobTitle(
          testData.searchCriteria.jobTitle
        );

        recruitmentPage.clickSearch();

        cy.wait("@filterCandidates").then((interception) => {
          expect(interception.response.statusCode).to.equal(200);
          expect(interception.request.url).to.include("jobTitleId=");
        });
      }
    );

    it(
      "TC-REC-03: Add new candidate and intercept POST candidate API",
      () => {
        cy.intercept(
          "POST",
          "**/api/v2/recruitment/candidates"
        ).as("postCandidate");

        recruitmentPage.clickAddCandidate();

        recruitmentPage.fillAddCandidateForm(
          testData.newCandidate.firstName,
          testData.newCandidate.lastName,
          testData.newCandidate.email
        );

        recruitmentPage.clickSave();

        cy.wait("@postCandidate").then((interception) => {
          expect(interception.request.method).to.equal("POST");
          expect(interception.response.statusCode).to.be.oneOf([
            200,
            201,
          ]);
        });

        recruitmentPage.verifyCandidateAddedSuccessfully();
      }
    );

it(
  "TC-REC-04: Navigate to Vacancies tab and intercept GET vacancies API",
  () => {
    cy.intercept(
      "GET",
      "**/api/v2/recruitment/vacancies*"
    ).as("getVacancies");

    recruitmentPage.clickVacanciesTab();

    cy.wait("@getVacancies").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body).to.have.property("data");
    });

    // Validasi URL setelah navigasi ke Vacancies
    cy.url().should("include", "/viewJobVacancy");
  }
);
    it("TC-REC-05: Reset recruitment filter form fields", () => {
      recruitmentPage.selectJobTitle(
        testData.searchCriteria.jobTitle
      );

      recruitmentPage.clickReset();

      recruitmentPage.verifyFormReset();
    });

    it(
      "TC-REC-06: Intercept Candidates API and verify request headers",
      () => {
        cy.intercept(
          "GET",
          "**/api/v2/recruitment/candidates*"
        ).as("checkCandidatesHeaders");

        recruitmentPage.clickSearch();

        cy.wait("@checkCandidatesHeaders").then((interception) => {
          expect(interception.request.headers).to.have.property("host");
          expect(interception.response.statusCode).to.equal(200);
        });
      }
    );

    it(
      "TC-REC-07: Intercept and stub custom response body for Candidates API",
      () => {
        cy.intercept(
          "GET",
          "**/api/v2/recruitment/candidates*",
          {
            statusCode: 200,
            body: {
              data: [],
              meta: {
                total: 0,
              },
            },
          }
        ).as("mockCandidatesBody");

        recruitmentPage.clickSearch();

        cy.wait("@mockCandidatesBody")
          .its("response.statusCode")
          .should("eq", 200);
      }
    );

    it(
      "TC-REC-08: Intercept Candidates API with forced HTTP 500 Server Error mock",
      () => {
        cy.intercept(
          "GET",
          "**/api/v2/recruitment/candidates*",
          {
            statusCode: 500,
            body: "Internal Server Error",
          }
        ).as("mockServerError");

        recruitmentPage.clickSearch();

        cy.wait("@mockServerError").then((interception) => {
          expect(interception.response.statusCode).to.equal(500);
        });
      }
    );
  }
);