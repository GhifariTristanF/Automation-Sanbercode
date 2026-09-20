# OrangeHRM Login Automation

Automated testing project for the **OrangeHRM Login Feature** using **Cypress**.

This project was created as part of the Sanbercode QA Automation assignment and covers positive and negative login scenarios based on the prepared test cases and element selectors.

## 🔗 Application Under Test

**OrangeHRM Demo:**
https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

## 🛠️ Tools & Technologies

* **Cypress** — End-to-end test automation
* **JavaScript** — Programming language
* **Node.js** — Runtime environment
* **Git & GitHub** — Version control and repository management

## 📂 Project Structure

```text
Automation-Sanbercode/
├── cypress/
│   ├── e2e/
│   │   └── login.cy.js
│   ├── fixtures/
│   └── support/
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

## 🧪 Test Coverage

The automation covers **12 login test cases**:

| Test Case | Scenario                                | Type        |
| --------- | --------------------------------------- | ----------- |
| TC-LOG-01 | Successful login with valid credentials | Positive    |
| TC-LOG-02 | Invalid username with valid password    | Negative    |
| TC-LOG-03 | Valid username with invalid password    | Negative    |
| TC-LOG-04 | Invalid username with invalid password  | Negative    |
| TC-LOG-05 | Empty username with valid password      | Negative    |
| TC-LOG-06 | Valid username with empty password      | Negative    |
| TC-LOG-07 | Empty username and password             | Negative    |
| TC-LOG-08 | Password input masking                  | UI/Security |
| TC-LOG-09 | Password case sensitivity               | Negative    |
| TC-LOG-10 | Login using Enter key                   | Positive    |
| TC-LOG-11 | Forgot Password link redirection        | Functional  |
| TC-LOG-12 | Social media footer link verification   | Functional  |

## 🔐 Test Credentials

The test uses the default OrangeHRM demo credentials:

```text
Username: Admin
Password: admin123
```

> These credentials are provided by the OrangeHRM demo application and are used only for testing purposes.

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/GhifariTristanF/Automation-Sanbercode.git
```

Navigate to the project directory:

```bash
cd Automation-Sanbercode
```

Install the required dependencies:

```bash
npm install
```

## ▶️ Running the Tests

### Open Cypress Test Runner

```bash
npx cypress open
```

Then select:

```text
E2E Testing
→ Choose Browser
→ login.cy.js
```

### Run Tests in Headless Mode

```bash
npx cypress run
```

### Run Specific Test File

```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

## 📋 Testing Approach

The test automation validates:

* Successful login with valid credentials
* Invalid credential handling
* Required field validation
* Password input masking
* Password case sensitivity
* Keyboard-based login using the Enter key
* Forgot Password navigation
* Footer social media link
* Dashboard redirection after successful authentication

## 👨‍💻 Author

**Ghifari Tristan Fadli**

QA / Software Quality Assurance Enthusiast

GitHub:
https://github.com/GhifariTristanF
