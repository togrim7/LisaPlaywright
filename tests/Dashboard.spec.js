const { test, expect } = require('@playwright/test')
const loginUrl = "https://test-identity.mylisa.aero/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dlisa_dev_webapp%26redirect_uri%3Dhttps%253A%252F%252Ftest.mylisa.aero%252Fsignin-oidc%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520roles%2520identity.api%2520lisa.api%2520offline_access%26state%3D078c2c4c49e14560bcb3248841420023%26code_challenge%3DxrvWGBeHuiKqMzjRU9VdM3ZlR-e4WM-hd3vTH0cmCZQ%26code_challenge_method%3DS256%26response_mode%3Dquery";
const username = "marko.jankovic@amrosinnovations.aero";
const password = "markotest123"

test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
    await page.locator('#Username').fill(username);
    await page.locator('#Password').fill(password);
    await page.locator('[name="button"]').click();
    await page.getByRole('button', { name: 'Dashboard' }).click();

});

test('Verify Dashboard page loads correctly', async ({ page }) => {
    await expect(page.locator('#root')).toBeVisible();
    await expect(page.locator('ul:visible')).toBeVisible();
    await expect(page.locator('.drawerOpen')).toBeVisible();
})

test('Verify user is able to select asset from My asset tab', async ({ page }) => {
    await page.getByRole('tab', { name: 'My assets' }).click();
    await page.getByRole('button', { expanded: false }).first().click();
    await page.locator('span').first();
    await expect(page.locator('span.MuiAccordionSummary-content.Mui-expanded.MuiAccordionSummary-contentGutters.css-1b8uc0m')).toBeVisible();
})

test('Verify asset search works correctly - Valid Search', async ({ page }) => {
    await page.getByRole('tab', { name: 'My assets' }).click();
    await page.getByPlaceholder('Find Asset').fill("demo");
    await page.locator('button[aria-label="search"]').click();
    await expect.poll(async () => {
        return await page.locator('text=demo').count();
    }).toBeGreaterThan(0);
})

test('Verify asset search returns no results - Invalid Search', async ({ page }) => {
    await page.getByRole('tab', { name: 'My assets' }).click();
    await page.getByPlaceholder('Find Asset').fill("invalid_search_123");
    await page.locator('button[aria-label="search"]').click();
    await expect(page.getByText('No entities')).toBeVisible();
});

test('Verify Entity, User, and Sort filter dropdowns function', async ({ page }) => {
    await page.getByRole('tab', { name: 'My assets' }).click();
    await page.getByText('All entities').click();
    await page.getByText('AMROS', { exact: true }).click();
    await expect(page.locator("button[id='1d88b781-f26a-4b77-a077-3c60876d2423-header']")).toBeVisible();
    await page.getByText('Reset').click();
    await page.getByRole('combobox').nth(1).click();
    await page.getByText('Lisa Test').click();
    await expect(page.getByRole('button', { name: 'Smoke test plane' })).toBeVisible();
    await page.getByText('Reset').click();
    await page.getByRole('combobox').nth(2).click();
    await page.getByText('Oldest first').click();
    await expect(page.getByLabel('Oldest first')).toBeVisible();
})

test('Verify entity expansion shows assets with count badges', async ({ page }) => {
    await page.getByRole('tab', { name: 'My assets' }).click();

    const entityHeader = page
        .locator('.MyTransitions-projectName')
        .filter({ hasText: 'Smoke test plane' });

    await expect(entityHeader).toBeVisible();

    const badge = entityHeader.locator('.transitionCount');
    const badgeCount = parseInt((await badge.textContent()).trim());
    expect(badgeCount).toBe(3);

    await entityHeader.click();

    const assetRow = page.locator('.TransitionsDataTable-bodyRow');
    await expect(assetRow).toHaveCount(1);
    await expect(assetRow.first()).toBeVisible();
    await expect(assetRow.first()).toBeEnabled();

    const subAssetsAccordion = page.locator('.MuiTypography-body2', { hasText: 'Sub-Assets (2)' });
    await expect(subAssetsAccordion).toBeVisible();

    await subAssetsAccordion.click();

    const subAssetRows = page.locator('.TransitionsDataTable-subassetRow');
    await expect(subAssetRows).toHaveCount(2);

    for (let i = 0; i < 2; i++) {
        await expect(subAssetRows.nth(i)).toBeVisible();
        await expect(subAssetRows.nth(i)).toBeEnabled();
    }

    const totalRows = await page.locator('.TransitionsDataTable-bodyRow, .TransitionsDataTable-subassetRow').count();
    expect(totalRows).toBe(badgeCount);

    await entityHeader.click();
    await expect(assetRow.first()).not.toBeVisible();
    await expect(subAssetsAccordion).not.toBeVisible();
});

test('Verify Reset button clears all filters', async ({ page }) => {
    await page.getByRole('tab', { name: 'My assets' }).click();
    await page.getByRole('combobox').nth(0).click();
    await page.getByText('AMROS', { exact: true }).click();
    await page.getByRole('combobox').nth(1).click();
    await page.getByText('Lisa Test', { exact: true }).click();
    await page.getByRole('combobox').nth(2).click();
    await page.getByText('Oldest first', { exact: true }).click();
    await page.getByText('Reset').click();
    await expect(page.locator('#mui-component-select-project')).toHaveText('All entities');
    await expect(page.locator('input[role="combobox"]')).toHaveValue('All users');
    await expect(page.locator('#mui-component-select-sort')).toHaveText('Newest first');
});

test('Verify user can navigate to New queries tab', async ({ page }) => {
    await page.getByRole('tab', { name: 'My assets' }).click();
    await page.getByText('New queries').click();
    await expect(page).toHaveURL('https://test.mylisa.aero/dashboard/new-queries');
});