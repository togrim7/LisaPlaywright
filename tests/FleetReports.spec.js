const { test, expect } = require('@playwright/test')
const loginUrl = "https://test-identity.mylisa.aero/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dlisa_dev_webapp%26redirect_uri%3Dhttps%253A%252F%252Ftest.mylisa.aero%252Fsignin-oidc%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520roles%2520identity.api%2520lisa.api%2520offline_access%26state%3D078c2c4c49e14560bcb3248841420023%26code_challenge%3DxrvWGBeHuiKqMzjRU9VdM3ZlR-e4WM-hd3vTH0cmCZQ%26code_challenge_method%3DS256%26response_mode%3Dquery";
const username = "marko.jankovic@amrosinnovations.aero";
const password = "markotest123"

test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
    await page.locator('#Username').fill(username);
    await page.locator('#Password').fill(password);
    await page.locator('[name="button"]').click();
});

test('Verify Fleet Reports page loads correctly', async ({ page }) => {
    await page.getByText('Fleet Reports').click();
    await expect(page).toHaveURL('https://test.mylisa.aero/globalreports');
    await expect(page.locator('div.MuiBox-root.css-vz67ck')).toBeVisible();
})

test('Verify Fleet Reports page elements', async ({ page }) => {
    await page.getByText('Fleet Reports').click();
    await expect(page.getByText('FLEET SIZE')).toBeVisible();
    await expect(page.getByText('AIRCRAFT TYPES')).toBeVisible();
    await expect(page.getByText('OPEN WPs')).toBeVisible();
    await expect(page.getByText('OPEN WOs')).toBeVisible();
    await expect(page.getByText('OPEN ITEMS', { exact: true })).toBeVisible();
    await expect(page.getByText('MISSING DFPs')).toBeVisible();
    await expect(page.getByText('Open items per month')).toBeVisible();
    await expect(page.getByText('Open items overview')).toBeVisible();
    await expect(page.getByText('Open items by Priority')).toBeVisible();
    await expect(page.getByText('Open items by type')).toBeVisible();
    await expect(page.getByText('WP Status')).toBeVisible();
    await expect(page.getByText('WO Status')).toBeVisible();
    await expect(page.getByText('Asset Status')).toBeVisible();
})