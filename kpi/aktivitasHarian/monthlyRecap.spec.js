const { test, expect } = require('../../src/fixtures/basePage');

test('Rekap Aktivitas Bulanan', async ({ page, loginPage, activityPage }) => {
  await loginPage.login('0002611', '1234567');
  await activityPage.menuAktivitasHarian2.click();
  
  // mencari bulan berjalan
  await activityPage.rekapAktivitasBulanan.click();
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' });
  const currentMonth = formatter.format(now);

  // ambil nilai awal sebelum menambah aktivitas
  const row = page.locator(`//td[contains(., "${currentMonth}")]//parent::tr`);
  const durasiPlanAwal = parseInt(await row.locator('td').nth(1).innerText());
  const durasiRealisasiAwal = parseInt(await row.locator('td').nth(2).innerText());
  console.log(`(Awal) Plan: ${durasiPlanAwal}, Realisasi: ${durasiRealisasiAwal}`);
  await activityPage.closeIcon.click();

   // tambah aktivitas baru
  await activityPage.buttonTambahAktivitas.click();
  await activityPage.fillForm({
      date: new Date().toISOString().split('T')[0],
      branch: '- CJR003',
      });
  await page.waitForTimeout(3000);
  await activityPage.tickApprovalGadai.click();
  await page.waitForTimeout(1000);
  await activityPage.buttonSubmit.click();
  await activityPage.confirmSubmit.click();
  await expect(page.getByText('Sukses menambah data Aktivitas Harian')).toBeVisible();

  // realisasikan aktivitas yang baru saja ditambahkan
  await activityPage.confirmActivity();
  await page.waitForTimeout(3000);
  await activityPage.confirmPopUpRealisasi.click();
  await expect(page.getByText('Sukses merubah data Aktivitas')).toBeVisible();

  // refresh kemudian cek rekap aktivitas bulan berjalan setelah menambah aktivitas
  await activityPage.refreshButton.click();

  // ambil nilai aktivitas yang baru saja ditambahkan (estimasi durasi atas sendiri)
  const durasiText = await page.locator('td:nth-child(6) > .text-start').first().innerText();
  const durasiBaru = parseInt(durasiText);
  console.log(`Durasi aktivitas baru: ${durasiBaru}`);

  // ambil nilai bulanan terbaru
  await activityPage.rekapAktivitasBulanan.click();
  const durasiPlanAkhir = parseInt(await row.locator('td').nth(1).innerText());
  const durasiRealisasiAkhir = parseInt(await row.locator('td').nth(2).innerText());

  console.log(`(Akhir) Plan: ${durasiPlanAkhir}, Realisasi: ${durasiRealisasiAkhir}`);

  // assertion: nilai terbaru = nilai awal + aktivitas baru
  expect(durasiPlanAkhir).toBe(durasiPlanAwal + durasiBaru);
  expect(durasiRealisasiAkhir).toBe(durasiRealisasiAwal + durasiBaru);
});