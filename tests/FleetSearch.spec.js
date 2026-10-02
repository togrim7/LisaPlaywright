const { test, expect } = require('@playwright/test')
const loginUrl = "https://test-identity.mylisa.aero/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dlisa_dev_webapp%26redirect_uri%3Dhttps%253A%252F%252Ftest.mylisa.aero%252Fsignin-oidc%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520roles%2520identity.api%2520lisa.api%2520offline_access%26state%3D078c2c4c49e14560bcb3248841420023%26code_challenge%3DxrvWGBeHuiKqMzjRU9VdM3ZlR-e4WM-hd3vTH0cmCZQ%26code_challenge_method%3DS256%26response_mode%3Dquery";
const username = "marko.jankovic@amrosinnovations.aero";
const password = process.env.TEST_PASSWORD

test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
    await page.locator('#Username').fill(username);
    await page.locator('#Password').fill(password);
    await page.locator('[name="button"]').click();
    await page.getByText('Fleet Search').click();
});

test('Verify Fleet Search page loads without errors', async ({ page }) => {
    await expect(page).toHaveURL('https://test.mylisa.aero/globalsearch');
    await expect(page.getByPlaceholder('Find document...')).toBeVisible();
    await expect(page.locator('div.drawerOpen.newLayout.MuiBox-root.css-1svwesu')).toBeVisible();
    await expect(page.getByRole('combobox').nth(0)).toBeVisible();
    await expect(page.getByLabel('Filters')).toBeVisible();
});

// test('Verify filter dropdowns display correctly when Filters are enabled', async ({ page }) => {
//     const toggle = page.locator('input.MuiSwitch-input');
//         if (!await toggle.isEnabled()) {
//             await toggle.click();
//      }

// });
