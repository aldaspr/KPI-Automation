const { test, expect } = require('../../src/fixtures/basePage');

test('login invalid nik', async ({ page, loginPage }) => {
  await loginPage.login('0002610', '1234567');
  await expect(page.getByText('Username atau kata sandi salah')).toBeVisible();
});

test('login invalid password', async ({ page, loginPage }) => {
  await loginPage.login('0002610', '123456');
  await expect(page.getByText('Username atau kata sandi salah')).toBeVisible();
});

test('login empty fields', async ({ page, loginPage }) => {
  await loginPage.login('', '');
  await expect(page.getByText('Username wajib diisi')).toBeVisible();
});