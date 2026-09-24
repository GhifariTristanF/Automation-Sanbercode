/**
 * Test Suite: OrangeHRM - Directory Feature Test Automation
 * Framework: Cypress
 * Design Pattern: Page Object Model (POM)
 * Feature: Directory
 */

import loginPage from "../../pages/LoginPage";
import directoryPage from "../../pages/DirectoryPage";

describe(
  "OrangeHRM - Directory Feature Test Automation (POM + Intercept)",
  () => {
    let testData;

    beforeEach(() => {
      cy.fixture("directoryData").then((data) => {
        testData = data;

        loginPage.visitLoginPage(testData.baseUrl);

        loginPage.login(
          testData.validUser.username,
          testData.validUser.password
        );

        directoryPage.navigateToDirectory();
      });
    });

    it("TC-DIR-01: View Directory list and intercept GET employees API", () => {
      cy.intercept(
        "GET",
        "**/api/v2/directory/employees*"
      ).as("getDirectoryEmployees");

      cy.reload();

      cy.wait("@getDirectoryEmployees").then((interception) => {
        expect(interception.request.method).to.equal("GET");
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.response.body).to.have.property("data");
      });

      directoryPage.verifyDirectoryCardVisible();
    });

    it("TC-DIR-02: Filter directory by Job Title and intercept filter request", () => {
      cy.intercept(
        "GET",
        "**/api/v2/directory/employees*"
      ).as("filterJobTitle");

      directoryPage.selectJobTitle(testData.searchCriteria.jobTitle);
      directoryPage.clickSearch();

      cy.wait("@filterJobTitle").then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.request.url).to.include("jobTitleId=");
      });
    });

    it("TC-DIR-03: Filter directory by Location and verify API query param", () => {
      cy.intercept(
        "GET",
        "**/api/v2/directory/employees*"
      ).as("filterLocation");

      directoryPage.selectLocation(testData.searchCriteria.location);
      directoryPage.clickSearch();

      cy.wait("@filterLocation").then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.request.url).to.include("locationId=");
      });
    });

it(
  "TC-DIR-04: Search directory with non-existing name and verify invalid input error",
  () => {
    directoryPage.typeEmployeeName(
      testData.searchCriteria.nonExistingName
    );

    directoryPage.clickSearch();

    // Validasi pesan error "Invalid" di bawah field Employee Name
    directoryPage.verifyInputInvalidError();
  }
);

    it("TC-DIR-05: Reset directory filter form fields", () => {
      directoryPage.selectJobTitle(
        testData.searchCriteria.jobTitle
      );

      directoryPage.clickReset();

      directoryPage.verifyFormReset();
    });

    it("TC-DIR-06: Intercept Directory API and verify request headers", () => {
      cy.intercept(
        "GET",
        "**/api/v2/directory/employees*"
      ).as("directoryHeadersCheck");

      directoryPage.clickSearch();

      cy.wait("@directoryHeadersCheck").then((interception) => {
        expect(interception.request.headers).to.have.property("host");
        expect(interception.response.statusCode).to.equal(200);
      });
    });

    it("TC-DIR-07: Intercept and stub empty mock response for Directory API", () => {
      cy.intercept(
        "GET",
        "**/api/v2/directory/employees*",
        {
          statusCode: 200,
          body: {
            data: [],
            meta: {
              total: 0,
            },
          },
        }
      ).as("mockEmptyDirectory");

      directoryPage.clickSearch();

      cy.wait("@mockEmptyDirectory")
        .its("response.statusCode")
        .should("eq", 200);

      directoryPage.verifyNoRecordsFound();
    });

    it("TC-DIR-08: Intercept Directory API with simulated network delay", () => {
      cy.intercept(
        "GET",
        "**/api/v2/directory/employees*",
        (req) => {
          req.on("response", (res) => {
            res.setDelay(1000);
          });
        }
      ).as("delayedDirectoryApi");

      directoryPage.clickSearch();

      cy.wait("@delayedDirectoryApi").then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
      });
    });
  }
);