const {test, expect} = require('@playwright/test')
require('dotenv').config();

const loginUrl = process.env.LOGIN_URL;
const testUsername = process.env.TEST_USERNAME;
const testPassword = process.env.TEST_PASSWORD;

test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
});

test('Login - Valid Credentials', async ({page})=> 
{
        const avatar = page.locator('img.MuiAvatar-img.css-45do71');
        await page.locator('#Username').fill("testUsername");
        await page.locator('#Password').fill("testPassword");
        await page.locator('[name="button"]').click();
        await expect(avatar).toBeVisible();

});

test('Login - Invalid Credentials', async ({page})=> 
{
        const errorMessage = page.locator('.validation-summary-errors');    
        await page.locator('#Username').fill("testUsername");
        await page.locator('#Password').fill("testPassword");
        await page.locator('[name="button"]').click();
        await expect(errorMessage).toContainText('Inactive user and/or tenant')
        
});

test('Login - Empty Credentials', async ({page})=> 
{
        const errorMessage = page.locator('.validation-summary-errors');    
        await page.locator('[name="button"]').click();
        await expect(errorMessage).toContainText('The Username field is required.','The Password field is required.');

});

test('Login - Empty Username', async ({page})=> 
{
        const errorMessage = page.locator('.validation-summary-errors');    
        await page.locator('#Password').fill("testPassword");
        await page.locator('[name="button"]').click();
        await expect(errorMessage).toContainText('The Username field is required.');

});

test('Login - Empty Password', async ({page})=> 
{
        const errorMessage = page.locator('.validation-summary-errors');    
        await page.locator('#Username').fill("testUsername");
        await page.locator('[name="button"]').click();
        await expect(errorMessage).toContainText('The Password field is required.');

});

test('Login - Verify User is able to Logout', async ({page})=> 
{
        const welcomeMessage = page.getByText('Welcome');
        await page.locator('#Username').fill("testUsername");
        await page.locator('#Password').fill("testPassword");
        await page.locator('[name="button"]').click();
        await page.locator('.MuiAvatar-img.css-45do71').click();
        await page.getByLabel('Sign out').click();
        await expect(welcomeMessage).toBeVisible();

});