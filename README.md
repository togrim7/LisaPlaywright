# Playwright Test Automation Project

This repository serves as a hands-on automation codebase demonstrating functional end-to-end testing using **Playwright** and **JavaScript**.

## 🏗 Key Automation Highlights

* **Direct E2E Workflow Testing:** Functional coverage targeting core application workflows, authentication, and user navigation.
* **Resilient Element Selection:** Utilizes a mixture of explicit attributes (`data-test`), unique IDs, and structured CSS/XPath locators for reliable UI interaction.
* **Asynchronous Flow Management:** Clean execution using Playwright's native `async/await` pattern and auto-waiting mechanisms.
* **Declarative Assertions:** Built-in Playwright `expect` matchers for clear outcome validation.

## 📁 Repository Structure

```text
LisaPlaywright/
├── tests/                  # End-to-end test specifications and scenarios
├── playwright.config.js    # Execution, browser, and environment settings
└── package.json            # Project configuration and Node.js dependencies