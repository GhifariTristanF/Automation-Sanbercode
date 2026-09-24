# OrangeHRM Test Automation (Sanbercode QA Automation)

Automated testing project for the **OrangeHRM Web Application** using **Cypress**.

This repository contains end-to-end test automation suites for the **Login**, **Directory**, and **Recruitment** features across multiple testing approaches: **Standard E2E**, **Network Intercept (`cy.intercept()`)**, and **Page Object Model (POM)**.

---

## 🔗 Application Under Test

**OrangeHRM Demo Platform:**
https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

---

## 🛠️ Tools & Technologies

* **Cypress (v14+)** — End-to-end web automation testing framework
* **JavaScript (ES6+)** — Core programming language
* **Page Object Model (POM)** — Design pattern for scalable and maintainable test architecture
* **Cypress Network Intercept (`cy.intercept()`)** — Network monitoring, request assertion, and API stubbing
* **Node.js & npm** — Package execution and dependency management
* **Git & GitHub** — Version control and project repository

---

## 📂 Project Structure

```text
Automation-Sanbercode/
├── cypress/
│   ├── e2e/
│   │   ├── api-test/
│   │   │   └── categories.cy.js
│   │   │       # Tugas 18
│   │   │
│   │   ├── intercept/
│   │   │   └── orangehrm_login_intercept.cy.js
│   │   │       # Tugas 16
│   │   │
│   │   ├── pom/
│   │   │   ├── login_pom.cy.js
│   │   │   │   # Tugas 17 
│   │   │   ├── directory_pom.cy.js
│   │   │   │   # Quiz 4
│   │   │   └── recruitment_pom.cy.js
│   │   │       # Quiz 4
│   │   │
│   │   └── login.cy.js
│   │       # Quiz 3
│   │
│   ├── fixtures/
│   │   ├── loginData.json
│   │   │   # Test Data: Login Credentials & Messages
│   │   ├── directoryData.json
│   │   │   # Test Data: Directory Search Criteria
│   │   └── recruitmentData.json
│   │       # Test Data: Candidate & Vacancy Criteria
│   │
│   ├── pages/
│   │   ├── LoginPage.js
│   │   │   # POM Class: Login Locators & Actions
│   │   ├── DashboardPage.js
│   │   │   # POM Class: Dashboard Locators & Actions
│   │   ├── DirectoryPage.js
│   │   │   # POM Class: Directory Locators & Actions
│   │   └── RecruitmentPage.js
│   │       # POM Class: Recruitment Locators & Actions
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

### 1. Login Feature Suites

#### A. Basic E2E Suite

**Location:** `cypress/e2e/login.cy.js`
**Coverage:** 12 Test Cases

* **TC-LOG-01** — Successful login with valid credentials *(Positive)*
* **TC-LOG-02** — Invalid username with valid password *(Negative)*
* **TC-LOG-03** — Valid username with invalid password *(Negative)*
* **TC-LOG-04** — Invalid username and invalid password *(Negative)*
* **TC-LOG-05** — Empty username with valid password *(Negative)*
* **TC-LOG-06** — Valid username with empty password *(Negative)*
* **TC-LOG-07** — Empty username and password *(Negative)*
* **TC-LOG-08** — Password input masking verification *(UI / Security)*
* **TC-LOG-09** — Password field case sensitivity check *(Negative)*
* **TC-LOG-10** — Login execution via "Enter" key press *(Positive)*
* **TC-LOG-11** — Forgot Password link navigation *(Functional)*
* **TC-LOG-12** — Social media footer link verification *(Functional)*

#### B. Network Intercept Suite

**Location:** `cypress/e2e/intercept/orangehrm_login_intercept.cy.js`
**Coverage:** 8 Scenarios

* **TC-INT-01** — Intercept POST Auth validation and verify status code (200/302)
* **TC-INT-02** — Intercept i18n translation messages API and verify cache support (200/304)
* **TC-INT-03** — Intercept Dashboard action summary API and verify response body
* **TC-INT-04** — Intercept Password Reset API with response stubbing
* **TC-INT-05** — Intercept and stub mock response for Dashboard shortcuts API
* **TC-INT-06** — Intercept Time-at-work API with simulated 1000ms response delay
* **TC-INT-07** — Intercept Auth validation API with forced HTTP 500 error
* **TC-INT-08** — Intercept Employee Leaves API and verify request headers

#### C. Page Object Model (POM) Suite

**Location:** `cypress/e2e/pom/login_pom.cy.js`
**Coverage:** 10 Test Cases

Uses a separated architecture with:

* `LoginPage.js` — Login selectors, actions, and validation methods
* `DashboardPage.js` — Dashboard verification and logout actions
* `loginData.json` — Centralized login test data and configuration

---

### 2. Directory Feature Suite

**Location:** `cypress/e2e/pom/directory_pom.cy.js`
**Coverage:** 8 Test Cases

* **TC-DIR-01** — View directory list and intercept `GET /api/v2/directory/employees`
* **TC-DIR-02** — Filter directory by Job Title and verify query parameter `jobTitleId`
* **TC-DIR-03** — Filter directory by Location and verify query parameter `locationId`
* **TC-DIR-04** — Search directory with unregistered name and verify inline validation error
* **TC-DIR-05** — Reset directory filter form fields to default state
* **TC-DIR-06** — Intercept Directory API and verify request header (`host`)
* **TC-DIR-07** — Intercept and stub empty mock response (`data: []`) for empty state
* **TC-DIR-08** — Intercept Directory API with simulated response delay

---

### 3. Recruitment Feature Suite

**Location:** `cypress/e2e/pom/recruitment_pom.cy.js`
**Coverage:** 8 Test Cases

* **TC-REC-01** — View candidates list and intercept `GET /api/v2/recruitment/candidates`
* **TC-REC-02** — Filter candidates by Job Title and verify request URL parameters
* **TC-REC-03** — Add new candidate and intercept `POST /api/v2/recruitment/candidates`
* **TC-REC-04** — Navigate to Vacancies tab (`/viewJobVacancy`) and intercept vacancies API
* **TC-REC-05** — Reset recruitment search filter form fields
* **TC-REC-06** — Intercept Candidates API and verify request headers
* **TC-REC-07** — Intercept and stub custom empty mock response for candidates
* **TC-REC-08** — Intercept Candidates API with forced HTTP 500 Server Error mock

---

## 🔐 Test Credentials & Fixtures

Test data is stored centrally in JSON fixtures under `cypress/fixtures/`.

### Default OrangeHRM Credentials

```text
Username: Admin
Password: admin123
```

### Available Fixtures

* `loginData.json` — Login credentials, URLs, error messages, and social media domains
* `directoryData.json` — Directory search criteria
* `recruitmentData.json` — Candidate and vacancy test data

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

### Interactive Mode — Cypress Test Runner

```bash
npx cypress open
```

### Headless Mode — Run All Test Suites

```bash
npx cypress run
```

### Run Specific Spec Files

#### Login Basic E2E

```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

#### Login Network Intercept

```bash
npx cypress run --spec "cypress/e2e/intercept/orangehrm_login_intercept.cy.js"
```

#### Login POM

```bash
npx cypress run --spec "cypress/e2e/pom/login_pom.cy.js"
```

#### Directory POM

```bash
npx cypress run --spec "cypress/e2e/pom/directory_pom.cy.js"
```

#### Recruitment POM

```bash
npx cypress run --spec "cypress/e2e/pom/recruitment_pom.cy.js"
```

#### API Test

```bash
npx cypress run --spec "cypress/e2e/api-test/categories.cy.js"
```

---

## 👨‍💻 Author

**Ghifari Tristan Fadli**
QA / Software Quality Assurance Enthusiast

**GitHub:**
https://github.com/GhifariTristanF
