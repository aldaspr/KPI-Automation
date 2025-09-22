const { test, expect } = require('../../../src/fixtures/basePage');

test('Input date more than current date', async ({ page, loginPage, tugasKerjaPage }) => {
  await loginPage.login('0002611', '1234567');
  await tugasKerjaPage.menuTugasKerja.click();
    const besok = new Date();
    besok.setDate(besok.getDate() + 1);
  await tugasKerjaPage.addSosialisasiSE(besok.toISOString().split('T')[0]);
  await page.waitForTimeout(5000);
  await expect(page.getByText('Tanggal tidak boleh lebih dari hari ini')).toBeVisible();
    // await page.screenshot({ path: 'screenshots/login_success.png', fullPage: true });
});

test('Input all blank fields', async ({ page, loginPage, tugasKerjaPage }) => {
  await loginPage.login('0002611', '1234567');
  await tugasKerjaPage.menuTugasKerja.click();
  await tugasKerjaPage.buttonSosialisasiSE.click();
  await tugasKerjaPage.buttonTambahAktivitas.click();
  await tugasKerjaPage.buttonSubmit.click();
  await page.waitForTimeout(5000);
  await expect(page.getByText('Field tidak boleh kosong')).toHaveCount(3);
    // await page.screenshot({ path: 'screenshots/login_success.png', fullPage: true });
});