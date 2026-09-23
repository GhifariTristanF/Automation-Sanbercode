# OrangeHRM Login Automation

Automated testing project for the **OrangeHRM Login Feature** using **Cypress**.

This repository was created as part of the **Sanbercode QA Automation** assignment series. It covers end-to-end test automation for the OrangeHRM login feature using three implementation approaches: **Standard E2E Testing**, **Network Intercept Testing**, and **Page Object Model (POM)**.

---

## 🔗 Application Under Test

**OrangeHRM Demo Platform:**
https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

---

## 🛠️ Tools & Technologies

* **Cypress (v14+)** — End-to-end web testing framework
* **JavaScript (ES6+)** — Scripting language
* **Page Object Model (POM)** — Design pattern for clean code separation
* **Cypress Network Intercept (`cy.intercept()`)** — Network traffic monitoring and stubbing
* **Node.js** — JavaScript runtime environment
* **Git & GitHub** — Version control and repository management

---

## 📂 Project Structure

```text
Automation-Sanbercode/
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js
│   │   │   # Quiz 3: Basic E2E Test Suite (12 TCs)
│   │   ├── intercept/
│   │   │   └── orangehrm_login_intercept.cy.js
│   │   │       # Tugas 16: Network Intercept Suite (8 Scenarios)
│   │   └── pom/
│   │       └── login_pom.cy.js
│   │           # Tugas 17: Page Object Model Test Specs
│   │
│   ├── fixtures/
│   │   └── loginData.json
│   │       # Test Data for POM Framework
│   │
│   ├── pages/
│   │   ├── LoginPage.js
│   │   │   # POM Page Object: Login Actions & Selectors
│   │   └── DashboardPage.js
│   │       # POM Page Object: Dashboard Actions
│   │
│   └── support/
│       ├── commands.js
│       └── e2e.js
│
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 🧪 Test Suites & Coverage

### 1. Basic E2E Login Test Suite

**Location:** `cypress/e2e/login.cy.js`

Covers **12 functional test cases** verifying positive, negative, validation, and UI security behaviors.

| Test Case ID  | Test Scenario                                    | Type          |
| ------------- | ------------------------------------------------ | ------------- |
| **TC-LOG-01** | Successful login with valid credentials          | Positive      |
| **TC-LOG-02** | Login with invalid username and valid password   | Negative      |
| **TC-LOG-03** | Login with valid username and invalid password   | Negative      |
| **TC-LOG-04** | Login with invalid username and invalid password | Negative      |
| **TC-LOG-05** | Login with empty username and valid password     | Negative      |
| **TC-LOG-06** | Login with valid username and empty password     | Negative      |
| **TC-LOG-07** | Login with empty username and empty password     | Negative      |
| **TC-LOG-08** | Verify password field input masking              | UI / Security |
| **TC-LOG-09** | Verify case sensitivity on password field        | Negative      |
| **TC-LOG-10** | Login using "Enter" key on keyboard              | Positive      |
| **TC-LOG-11** | Verify "Forgot your password?" link redirection  | Functional    |
| **TC-LOG-12** | Verify social media footer links                 | Functional    |

---

### 2. Network Intercept Test Suite

**Location:** `cypress/e2e/intercept/orangehrm_login_intercept.cy.js`

Demonstrates API request/response validation, response stubbing, network delay simulation, and server error simulation using Cypress `cy.intercept()` across **8 scenarios**.

| Test ID       | Intercept Focus          | Target Endpoint                                     | Intercept Technique                                   |
| ------------- | ------------------------ | --------------------------------------------------- | ----------------------------------------------------- |
| **TC-INT-01** | Auth Validation API      | `POST **/auth/validate`                             | Status code (200/302) & HTTP method assertion         |
| **TC-INT-02** | i18n Translation API     | `GET **/core/i18n/messages`                         | Request header verification & cache support (200/304) |
| **TC-INT-03** | Action Summary API       | `GET **/api/v2/dashboard/employees/action-summary*` | Response JSON body `data` property assertion          |
| **TC-INT-04** | Password Reset API       | `POST **/auth/requestResetPassword`                 | Response stubbing (`200 OK`) to prevent load timeout  |
| **TC-INT-05** | Shortcuts API Mocking    | `GET **/api/v2/dashboard/shortcuts*`                | Custom mock response stubbing (`statusCode: 200`)     |
| **TC-INT-06** | Network Delay Simulation | `GET **/api/v2/dashboard/employees/time-at-work*`   | Simulated network response latency (`1000ms`)         |
| **TC-INT-07** | Server Error Handling    | `POST **/auth/validate`                             | Forced HTTP `500 Internal Server Error` mock          |
| **TC-INT-08** | Employee Leaves API      | `GET **/api/v2/dashboard/employees/leaves*`         | Request header verification (`host`)                  |

---

### 3. Page Object Model (POM) Suite

**Location:** `cypress/e2e/pom/login_pom.cy.js`

Implements a clean test architecture by separating page locators/actions, test data, and test assertions.

#### Page Objects

* **LoginPage.js** — Encapsulates login selectors, actions (`login()`, `enterUsername()`, `enterPassword()`), and validation methods.
* **DashboardPage.js** — Encapsulates dashboard header verification and logout actions.
* **loginData.json** — Centralized test data containing credentials, base URL, error messages, and social media domains.

---

## 🔐 Test Credentials

Tests use the default OrangeHRM demo credentials stored in the fixture file:

```text
Username: Admin
Password: admin123
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/GhifariTristanF/Automation-Sanbercode.git
```

### 2. Navigate to the Project Directory

```bash
cd Automation-Sanbercode
```

### 3. Install Dependencies

```bash
npm install
```

---

## ▶️ Running the Tests

### Interactive Test Runner (Cypress UI)

```bash
npx cypress open
```

### Run All Specs in Headless Mode

```bash
npx cypress run
```

### Run Specific Test Suites

#### Task 1: Basic E2E Test Suite

```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

#### Task 2: Network Intercept Test Suite

```bash
npx cypress run --spec "cypress/e2e/intercept/orangehrm_login_intercept.cy.js"
```

#### Task 3: Page Object Model (POM) Test Suite

```bash
npx cypress run --spec "cypress/e2e/pom/login_pom.cy.js"
```

---

## 👨‍💻 Author

**Ghifari Tristan Fadli**
QA / Software Quality Assurance Enthusiast

**GitHub:**
https://github.com/GhifariTristanF
