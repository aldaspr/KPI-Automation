const { test, expect } = require('../../src/fixtures/basePage');

test('Rekap Aktivitas Harian', async ({ page, loginPage, activityPage }) => {
  await loginPage.login('0002611', '1234567');
  await activityPage.buttonAktivitasHarian.click();
  await activityPage.rekapAktivitasHarian.click();
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' });
  const currentMonth = formatter.format(now);
  const row = page.locator(`//td[contains(., "${currentMonth}")]//parent::tr`);
  const durasiPlanAwal = parseInt(await row.locator('td').nth(1).innerText());
  const durasiRealisasiAwal = parseInt(await row.locator('td').nth(2).innerText());
  console.log(`(Awal) Plan: ${durasiPlanAwal}, Realisasi: ${durasiRealisasiAwal}`);
  await activityPage.closeIcon.click();

  const today = new Date().toISOString().split('T')[0];
  await activityPage.clickTambahAktivitas();
  await activityPage.fillForm({
      date: new Date().toISOString().split('T')[0],
      branch: '- CJR003',
      activity: 'Pembuatan Internal Memo'
  });
  await activityPage.clickSubmitButton();
  await expect(page.getByText('Sukses menambah data')).toBeVisible();

  await activityPage.buttonAktivitasHarian.click();
  await activityPage.confirmActivity();
  await page.waitForTimeout(3000);
  await expect(page.getByText('Sukses merubah data Aktivitas')).toBeVisible();
  await activityPage.refreshButton.click();

  // --- Ambil nilai aktivitas yang baru saja ditambahkan (estimasi durasi atas sendiri) ---
  const durasiText = await page.locator('td:nth-child(5) > .text-start').first().innerText();
  const durasiBaru = parseInt(durasiText);
  console.log(`Durasi aktivitas baru: ${durasiBaru}`);

  // --- Ambil nilai harian terbaru ---
  await activityPage.rekapAktivitasHarian.click();
  const durasiPlanAkhir = parseInt(await row.locator('td').nth(1).innerText());
  const durasiRealisasiAkhir = parseInt(await row.locator('td').nth(2).innerText());

  console.log(`(Akhir) Plan: ${durasiPlanAkhir}, Realisasi: ${durasiRealisasiAkhir}`);

  // --- Assertion: nilai terbaru = nilai awal + aktivitas baru ---
  expect(durasiPlanAkhir).toBe(durasiPlanAwal + durasiBaru);
  expect(durasiRealisasiAkhir).toBe(durasiRealisasiAwal + durasiBaru);
});