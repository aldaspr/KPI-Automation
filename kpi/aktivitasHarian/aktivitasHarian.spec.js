// kpi/aktivitasHarian.spec.js
const { test, expect } = require('../../src/fixtures/basePage');

test.describe('Create Activity E2E Flow', () => {
  test.beforeEach(async ({ page, loginPage, activityPage }) => {
    await loginPage.login('0002611', '1234567');
    await activityPage.clickTambahAktivitas();
    await activityPage.fillForm({
      date: new Date().toISOString().split('T')[0],
      branch: '- CJR003',
      activity: 'Pembuatan Internal Memo'
    });
    await activityPage.clickSubmitButton();
    await expect(page.getByText('Sukses menambah data')).toBeVisible();
  });

  test('Delete Activity', async ({ page, activityPage }) => {
    await activityPage.menuAktivitasHarian.click();
    await activityPage.clickDeleteActivity();
    await page.waitForTimeout(3000);
    await expect(page.getByText('Aktivitas berhasil dibatalkan')).toBeVisible();
  });

  test('Confirm Activity', async ({ page, activityPage }) => {
    await activityPage.menuAktivitasHarian.click();
    await activityPage.confirmActivity();
    await page.waitForTimeout(3000);
    await expect(page.getByText('Sukses merubah data Aktivitas')).toBeVisible();
  });
});

// test('create activity', async ({ page, loginPage, activityPage }) => {
//   await loginPage.login('0002611', '1234567');
//   await activityPage.clickTambahAktivitas();
//   await activityPage.fillForm({
//       date: new Date().toISOString().split('T')[0],
//       branch: '- CJR003',
//       activity: 'Pembuatan Internal Memo'
//     });
//   await activityPage.clickSubmitButton();
//   await expect(page.getByText('Sukses menambah data')).toBeVisible();
// });
