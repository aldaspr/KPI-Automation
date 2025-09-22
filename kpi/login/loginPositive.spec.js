// kpi/login.spec.js
const { test, expect } = require('../../src/fixtures/basePage');

test('Login to Trial Approval', async ({ page, loginPage }) => {
  await loginPage.login('0002611', '1234567');
  await expect(page.getByText('Selamat')).toBeVisible();
  await page.waitForTimeout(5000);
    // await page.screenshot({ path: 'screenshots/login_success.png', fullPage: true });
});

test('Logout to Trial Approval Homepage', async ({ page, loginPage }) => {
  await loginPage.login('0002611', '1234567');
  await expect(page.getByText('Selamat')).toBeVisible();
  await page.waitForTimeout(3000);
  await loginPage.logout();
  await expect(page.getByText('Masuk')).toBeVisible();
  // await page.screenshot({ path: 'screenshots/logout_success.png', fullPage: true });
});