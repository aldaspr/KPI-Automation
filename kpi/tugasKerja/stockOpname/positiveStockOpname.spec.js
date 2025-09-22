const { test, expect } = require('../../../src/fixtures/basePage');

test('Create Stock Opname', async ({ page, loginPage, tugasKerjaPage }) => {
  await loginPage.login('0002611', '1234567');
  await tugasKerjaPage.menuTugasKerja.click();
  await tugasKerjaPage.addStockOpname(new Date().toISOString().split('T')[0], '1', '1', '1', '134500');
  await tugasKerjaPage.buttonSubmit.click();
  await page.waitForTimeout(5000);
  await expect(page.getByText('Sukses menambah data Aktivitas')).toBeVisible();
    // await page.screenshot({ path: 'screenshots/login_success.png', fullPage: true });
});

// belum isi data stock opname