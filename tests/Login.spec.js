const {test, expect} = require('@playwright/test')
const loginUrl = "https://test-identity.mylisa.aero/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dlisa_dev_webapp%26redirect_uri%3Dhttps%253A%252F%252Ftest.mylisa.aero%252Fsignin-oidc%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520roles%2520identity.api%2520lisa.api%2520offline_access%26state%3D078c2c4c49e14560bcb3248841420023%26code_challenge%3DxrvWGBeHuiKqMzjRU9VdM3ZlR-e4WM-hd3vTH0cmCZQ%26code_challenge_method%3DS256%26response_mode%3Dquery";

test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
});

test('Login - Valid Credentials', async ({page})=> 
{
        const avatar = page.locator('img.MuiAvatar-img.css-45do71');
        await page.locator('#Username').fill("marko.jankovic@amrosinnovations.aero");
        await page.locator('#Password').fill("markotest123");
        await page.locator('[name="button"]').click();
        await expect(avatar).toBeVisible();

});

test('Login - Invalid Credentials', async ({page})=> 
{
        const errorMessage = page.locator('.validation-summary-errors');    
        await page.locator('#Username').fill("marko.jankovic.aero");
        await page.locator('#Password').fill("123");
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
        await page.locator('#Password').fill("markotest123");
        await page.locator('[name="button"]').click();
        await expect(errorMessage).toContainText('The Username field is required.');

});

test('Login - Empty Password', async ({page})=> 
{
        const errorMessage = page.locator('.validation-summary-errors');    
        await page.locator('#Username').fill("marko.jankovic@amrosinnovations.aero");
        await page.locator('[name="button"]').click();
        await expect(errorMessage).toContainText('The Password field is required.');

});

test('Login - Verify User is able to Logout', async ({page})=> 
{
        const welcomeMessage = page.getByText('Welcome');
        await page.locator('#Username').fill("marko.jankovic@amrosinnovations.aero");
        await page.locator('#Password').fill("markotest123");
        await page.locator('[name="button"]').click();
        await page.locator('.MuiAvatar-img.css-45do71').click();
        await page.getByLabel('Sign out').click();
        await expect(welcomeMessage).toBeVisible();

});