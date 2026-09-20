describe('OrangeHRM - Login Feature Test Automation', () => {

  const elements = {
    // Login Page Selectors
    companyLogo: "img[alt='company-branding']",
    // XPath: //img[@alt='company-branding']

    loginHeading: '.orangehrm-login-title',
    // XPath: //h5[normalize-space()='Login']

    usernameLabel: "label:contains('Username')",
    // XPath: //label[normalize-space()='Username']

    usernameInput: "input[placeholder='Username']",
    // XPath: //input[@placeholder='Username']

    passwordLabel: "label:contains('Password')",
    // XPath: //label[normalize-space()='Password']

    passwordInput: "input[placeholder='Password']",
    // XPath: //input[@placeholder='Password']

    loginButton: "button[type='submit']",
    // XPath: //button[@type='submit']

    forgotPasswordLink: '.orangehrm-login-forgot-header',
    // XPath: //p[@class='oxd-text oxd-text--p orangehrm-login-forgot-header']

    errorMessageAlert: '.oxd-alert-content-text',
    // Alert error box untuk invalid credentials

    fieldRequiredError: '.oxd-input-field-error-message',
    // Validation error message untuk field kosong

    osVersionText: "p:contains('OrangeHRM OS')",
    // XPath: //p[normalize-space()='OrangeHRM OS 5.9']

    companyFooterLink: "a:contains('OrangeHRM, Inc')",
    // XPath: //a[normalize-space()='OrangeHRM, Inc']

    linkedInIcon: "a[href*='linkedin.com']",
    // XPath: //a[contains(@href, 'linkedin.com')]

    // Dashboard Page Selectors
    dashboardHeader: '.oxd-topbar-header-breadcrumb-module'
    // CSS: .oxd-topbar-header-breadcrumb-module
  };

  // ===========================================================================
  // CREDENTIALS & BASE URL
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
    // Kunjungi halaman login sebelum setiap test case berjalan
    cy.visit(baseUrl);

    // Pastikan elemen input utama sudah siap dan terlihat
    cy.get(elements.usernameInput).should('be.visible');
    cy.get(elements.passwordInput).should('be.visible');
  });

  // ===========================================================================
  // POSITIVE TEST CASES
  // ===========================================================================

  it('TC-LOG-01: Successful login with valid credential', () => {
    // 1. Input Username Valid
    cy.get(elements.usernameInput).type(validUser.username);

    // 2. Input Password Valid
    cy.get(elements.passwordInput).type(validUser.password);

    // 3. Klik Tombol Login
    cy.get(elements.loginButton).click();

    // Expected Result:
    // Berhasil login dan diarahkan ke halaman Dashboard
    cy.url().should('include', '/dashboard');

    cy.get(elements.dashboardHeader)
      .should('be.visible')
      .and('contain.text', 'Dashboard');
  });

  it('TC-LOG-10: Login using "Enter" key on keyboard', () => {
    // 1. Input Username
    cy.get(elements.usernameInput).type(validUser.username);

    // 2. Input Password dan tekan tombol Enter
    cy.get(elements.passwordInput).type(`${validUser.password}{enter}`);

    // Expected Result:
    // Berhasil login dan diarahkan ke halaman Dashboard
    cy.url().should('include', '/dashboard');

    cy.get(elements.dashboardHeader)
      .should('be.visible')
      .and('contain.text', 'Dashboard');
  });

  it('TC-LOG-11: Verify "Forgot your password?" link redirection', () => {
    // 1. Klik tautan "Forgot your password?"
    cy.get(elements.forgotPasswordLink)
      .should('be.visible')
      .click();

    // Expected Result:
    // Diarahkan ke halaman Reset Password
    cy.url().should('include', '/requestPasswordResetCode');

    cy.get('h6')
      .should('contain.text', 'Reset Password');
  });

  it('TC-LOG-12: Verify social media footer links', () => {
    // 1. Verifikasi ikon/link LinkedIn ada
    //    dan memiliki tautan resmi
    cy.get(elements.linkedInIcon)
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', 'linkedin.com');
  });

  // ===========================================================================
  // NEGATIVE TEST CASES 
  // ===========================================================================

  it('TC-LOG-02: Login with invalid username and valid password', () => {
    // 1. Input Username Invalid
    cy.get(elements.usernameInput).type('TristanTesting');

    // 2. Input Password Valid
    cy.get(elements.passwordInput).type(validUser.password);

    // 3. Klik Tombol Login
    cy.get(elements.loginButton).click();

    // Expected Result:
    // Sistem menolak akses dan menampilkan "Invalid credentials"
    cy.get(elements.errorMessageAlert)
      .should('be.visible')
      .and('have.text', 'Invalid credentials');

    cy.url().should('include', '/auth/login');
  });

  it('TC-LOG-03: Login with valid username and invalid password', () => {
    // 1. Input Username Valid
    cy.get(elements.usernameInput).type(validUser.username);

    // 2. Input Password Invalid
    cy.get(elements.passwordInput).type('SalahPassword123!');

    // 3. Klik Tombol Login
    cy.get(elements.loginButton).click();

    // Expected Result:
    // Sistem menolak akses dan menampilkan "Invalid credentials"
    cy.get(elements.errorMessageAlert)
      .should('be.visible')
      .and('have.text', 'Invalid credentials');

    cy.url().should('include', '/auth/login');
  });

  it('TC-LOG-04: Login with invalid username and invalid password', () => {
    // 1. Input Username Invalid
    cy.get(elements.usernameInput).type('TristanTesting');

    // 2. Input Password Invalid
    cy.get(elements.passwordInput).type('SalahPassword123!');

    // 3. Klik Tombol Login
    cy.get(elements.loginButton).click();

    // Expected Result:
    // Sistem menolak akses dan menampilkan "Invalid credentials"
    cy.get(elements.errorMessageAlert)
      .should('be.visible')
      .and('have.text', 'Invalid credentials');

    cy.url().should('include', '/auth/login');
  });

  it('TC-LOG-09: Verify case sensitivity on password field', () => {
    // 1. Input Username Valid
    cy.get(elements.usernameInput).type(validUser.username);

    // 2. Input Password dengan Huruf Besar Semua
    cy.get(elements.passwordInput).type('ADMIN123');

    // 3. Klik Tombol Login
    cy.get(elements.loginButton).click();

    // Expected Result:
    // Akses ditolak karena password bersifat case-sensitive
    cy.get(elements.errorMessageAlert)
      .should('be.visible')
      .and('have.text', 'Invalid credentials');
  });

  it('TC-LOG-05: Login with empty username and valid password', () => {
    // 1. Biarkan Username kosong

    // 2. Input Password Valid
    cy.get(elements.passwordInput).type(validUser.password);

    // 3. Klik Tombol Login
    cy.get(elements.loginButton).click();

    // Expected Result:
    // Pesan error "Required" muncul di bawah field Username
    cy.get(elements.fieldRequiredError)
      .should('be.visible')
      .and('contain.text', 'Required');
  });

  it('TC-LOG-06: Login with valid username and empty password', () => {
    // 1. Input Username Valid
    cy.get(elements.usernameInput).type(validUser.username);

    // 2. Biarkan Password kosong

    // 3. Klik Tombol Login
    cy.get(elements.loginButton).click();

    // Expected Result:
    // Pesan error "Required" muncul di bawah field Password
    cy.get(elements.fieldRequiredError)
      .should('be.visible')
      .and('contain.text', 'Required');
  });

  it('TC-LOG-07: Login with empty username and empty password', () => {
    // 1. Biarkan Username dan Password kosong

    // 2. Klik Tombol Login
    cy.get(elements.loginButton).click();

    // Expected Result:
    // Pesan error "Required" muncul di kedua kolom
    cy.get(elements.fieldRequiredError)
      .should('have.length', 2)
      .each(($err) => {
        cy.wrap($err)
          .should('be.visible')
          .and('contain.text', 'Required');
      });
  });

  it('TC-LOG-08: Verify password field input masking', () => {
    // 1. Verifikasi field password memiliki attribute type="password"
    //    agar karakter tersembunyi
    cy.get(elements.passwordInput)
      .should('have.attr', 'type', 'password');
  });
});