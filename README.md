# Playwright E2E Test Automation Suite

This repository contains an end-to-end automated testing suite written with **Playwright** and **JavaScript**, targeting key user flows and web application functionalities.

## 🧪 Included Test Scenarios

The test suite covers core functional areas located in the `tests/` directory:

* **`login.spec.js`** — Authentication flows, credential validations, and session handling.
* **`main.spec.js`** — Primary dashboard UI verification and main application navigation.
* **`users.spec.js`** — User administration, role validations, and data table interactions.

## 🏗 Key Framework Highlights

* **Native Async Handling:** Uses standard `async/await` patterns alongside Playwright's auto-waiting features to ensure test stability.
* **Declarative Assertions:** Leverages built-in `expect` matchers for precise state and visual outcome checks.
* **Targeted UI Locators:** Uses resilient CSS, XPath, and attribute-based selectors for reliable element interactions.

## 📁 Repository Structure

```text
LisaPlaywright/
├── tests/
│   ├── login.spec.js       # Authentication & login test cases
│   ├── main.spec.js        # Main interface navigation & UI checks
│   └── users.spec.js       # User management workflows
├── playwright.config.js    # Browser runner & execution configurations
└── package.json            # Node.js dependencies and script shortcuts