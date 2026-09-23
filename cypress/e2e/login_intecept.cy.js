describe('OrangeHRM - Login Feature with Intercept Automation', () => {
  // ===========================================================================
  // SELECTORS
  // ===========================================================================

  const selectors = {
    usernameInput: "input[placeholder='Username']",
    passwordInput: "input[placeholder='Password']",
    loginButton: "button[type='submit']",
    forgotPasswordLink: '.orangehrm-login-forgot-header',
    resetPasswordButton: "button[type='submit']",
    errorMessageAlert: '.oxd-alert-content-text',
    fieldRequiredError: '.oxd-input-field-error-message',
    dashboardHeader: '.oxd-topbar-header-breadcrumb-module'
  };

  // ===========================================================================
  // BASE URL & CREDENTIALS
  // ===========================================================================

  const baseUrl =
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  const validUser = {
    username: 'Admin',
    password: 'admin123'
  };

  // ===========================================================================
  // BEFORE EACH TEST
  // ===========================================================================

  beforeEach(() => {
    cy.visit(baseUrl);

    cy.get(selectors.usernameInput).should('be.visible');
    cy.get(selectors.passwordInput).should('be.visible');
  });

  // ===========================================================================
  // TEST CASE 1
  // Intercept POST Login Auth Validation
  // ===========================================================================

  it('TC-INT-01: Intercept POST login request payload and status code', () => {
    cy.intercept('POST', '**/web/index.php/auth/validate').as(
      'loginValidate'
    );

    cy.get(selectors.usernameInput).type(validUser.username);
    cy.get(selectors.passwordInput).type(validUser.password);
    cy.get(selectors.loginButton).click();

    cy.wait('@loginValidate').then((interception) => {
      expect(interception.request.method).to.equal('POST');
      expect(interception.response.statusCode).to.be.oneOf([200, 302]);
    });

    cy.url().should('include', '/dashboard');
  });

  // ===========================================================================
  // TEST CASE 2
  // Intercept i18n Localization Messages API
  // ===========================================================================

  it('TC-INT-02: Intercept GET i18n localization translation messages API', () => {
  cy.intercept('GET', '**/web/index.php/core/i18n/messages')
    .as('getI18nMessages');

  cy.reload();

  cy.wait('@getI18nMessages').then((interception) => {
    // Menerima HTTP 200 (OK) dan HTTP 304 (Not Modified) dari Browser Cache
    expect(interception.response.statusCode).to.be.oneOf([200, 304]);

    expect(interception.request.headers).to.have.property('accept');
  });

  cy.get(selectors.loginButton).should('be.visible');
});

  // ===========================================================================
  // TEST CASE 3
  // Intercept Dashboard Action Summary API
  // ===========================================================================

  it('TC-INT-03: Intercept GET employee action summary API upon login redirect', () => {
    cy.intercept(
      'GET',
      '**/api/v2/dashboard/employees/action-summary*'
    ).as('getActionSummary');

    cy.get(selectors.usernameInput).type(validUser.username);
    cy.get(selectors.passwordInput).type(validUser.password);
    cy.get(selectors.loginButton).click();

    cy.wait('@getActionSummary').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body).to.have.property('data');
    });

    cy.get(selectors.dashboardHeader).should('contain.text', 'Dashboard');
  });

  // ===========================================================================
  // TEST CASE 4
  // Intercept Password Reset Code API
  // ===========================================================================

it('TC-INT-04: Intercept POST request password reset endpoint', () => {
  // Melakukan stubbing response agar tidak terkena page load timeout
  // (60s) dari server demo
  cy.intercept(
    'POST',
    '**/web/index.php/auth/requestResetPassword',
    {
      statusCode: 200,
      body: {
        message: 'Reset password link sent successfully',
      },
    }
  ).as('requestResetPassword');

  cy.get(selectors.forgotPasswordLink).click();

  cy.url().should('include', '/requestPasswordResetCode');

  cy.get("input[placeholder='Username']").type('Admin');

  cy.get(selectors.resetPasswordButton).click();

  cy.wait('@requestResetPassword').then((interception) => {
    expect(interception.request.method).to.equal('POST');
    expect(interception.response.statusCode).to.equal(200);
  });
});

  // ===========================================================================
  // TEST CASE 5
  // Intercept & Stub Dashboard Shortcuts API
  // ===========================================================================

  it('TC-INT-05: Intercept and stub custom response for Dashboard Shortcuts API', () => {
    cy.intercept('GET', '**/api/v2/dashboard/shortcuts*', {
      statusCode: 200,
      body: {
        data: {
          leaveApply: true,
          leaveApprove: true,
          timesheet: true
        },
        meta: [],
        rels: []
      }
    }).as('stubbedShortcuts');

    cy.get(selectors.usernameInput).type(validUser.username);
    cy.get(selectors.passwordInput).type(validUser.password);
    cy.get(selectors.loginButton).click();

    cy.wait('@stubbedShortcuts')
      .its('response.statusCode')
      .should('eq', 200);

    cy.url().should('include', '/dashboard');
  });

  // ===========================================================================
  // TEST CASE 6
  // Intercept Time at Work API with Network Delay
  // ===========================================================================

  it('TC-INT-06: Intercept GET Time at Work API with simulated response delay', () => {
    cy.intercept(
      'GET',
      '**/api/v2/dashboard/employees/time-at-work*',
      (req) => {
        req.on('response', (res) => {
          res.setDelay(1000);
        });
      }
    ).as('delayedTimeAtWork');

    cy.get(selectors.usernameInput).type(validUser.username);
    cy.get(selectors.passwordInput).type(validUser.password);
    cy.get(selectors.loginButton).click();

    cy.wait('@delayedTimeAtWork').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });

  // ===========================================================================
  // TEST CASE 7
  // Intercept Server Error 500 Simulation
  // ===========================================================================

  it('TC-INT-07: Intercept login auth with forced 500 Internal Server Error mock', () => {
    cy.intercept('POST', '**/web/index.php/auth/validate', {
      statusCode: 500,
      body: 'Internal Server Error'
    }).as('mockServerError');

    cy.get(selectors.usernameInput).type(validUser.username);
    cy.get(selectors.passwordInput).type(validUser.password);
    cy.get(selectors.loginButton).click();

    cy.wait('@mockServerError').then((interception) => {
      expect(interception.response.statusCode).to.equal(500);
    });
  });

  // ===========================================================================
  // TEST CASE 8
  // Intercept Employee Leaves API with Custom Headers Check
  // ===========================================================================

  it('TC-INT-08: Intercept GET Employees Leaves API and verify request headers', () => {
    cy.intercept('GET', '**/api/v2/dashboard/employees/leaves*').as(
      'getEmployeeLeaves'
    );

    cy.get(selectors.usernameInput).type(validUser.username);
    cy.get(selectors.passwordInput).type(validUser.password);
    cy.get(selectors.loginButton).click();

    cy.wait('@getEmployeeLeaves').then((interception) => {
      expect(interception.request.headers).to.have.property('host');
      expect(interception.response.statusCode).to.equal(200);
    });

    cy.get(selectors.dashboardHeader).should('be.visible');
  });
});
