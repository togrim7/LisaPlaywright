# Lisa Playwright Tests

Automated end-to-end test suite for the **LISA (Lisa Intelligent Systems Architecture)** web application using Playwright.

## Overview

This project contains automated UI and functional tests for the Lisa identity and authentication flow. The suite validates user access, required field handling, and core application navigation across several areas, including:

- Login with valid credentials
- Login with invalid credentials
- Empty username and password validation
- Logout flow
- Dashboard access
- Fleet reports
- Fleet search

## Technologies

- **Playwright** — end-to-end testing framework
- **Node.js** — JavaScript runtime
- **dotenv** — environment variable configuration

## Project Structure

```text
├── tests/
│   ├── Dashboard.spec.js
│   ├── FleetReports.spec.js
│   ├── FleetSearch.spec.js
│   └── Login.spec.js
├── package.json
├── package-lock.json
├── .gitignore
├── .env
├── README.md
└── playwright.config.js