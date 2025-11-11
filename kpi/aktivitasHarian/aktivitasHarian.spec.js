// kpi/aktivitasHarian.spec.js
const { test, expect } = require('../../src/fixtures/basePage');

test('Create Activity', async ({ page, loginPage, activityPage }) => {
  await loginPage.login('0002611', '1234567');
  await activityPage.clickTambahAktivitas();
  await activityPage.fillForm({
      date: new Date().toISOString().split('T')[0],
      branch: '- CJR003',
      });
  await page.waitForTimeout(3000);
  await activityPage.tickAnalisaReject.click();
  await activityPage.tickApprovalGadai.click();
  await activityPage.tickBriefingPagi.click();
  await page.waitForTimeout(1000);
  await activityPage.buttonSubmit.click();
  await activityPage.confirmSubmit.click();
  await expect(page.getByText('Sukses menambah data Aktivitas Harian')).toBeVisible();
});

test('Delete All Planned Activity', async ({ page, loginPage, activityPage }) => {
    await loginPage.login('0002611', '1234567');
    await activityPage.menuAktivitasHarian2.click();
    await activityPage.buttonDeleteAll.click();
    await activityPage.buttonDeleteDiatas.click();
    await activityPage.confirmDelete.click();
    await page.waitForTimeout(3000);
    await expect(page.getByText('Aktivitas berhasil dibatalkan')).toBeVisible();
  });

test('Realize Planned Activity', async ({ page, loginPage, activityPage }) => {
    await loginPage.login('0002611', '1234567');
    await activityPage.menuAktivitasHarian2.click();
    await activityPage.confirmActivity();
    await page.waitForTimeout(3000);
    await activityPage.confirmPopUpRealisasi.click();
    await expect(page.getByText('Sukses merubah data Aktivitas')).toBeVisible();
  });