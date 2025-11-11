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

test.describe('Add Stock Opname', () => {
  test.beforeEach(async ({ page, loginPage, tugasKerjaPage }) => {
    await loginPage.login('0002611', '1234567');
    await tugasKerjaPage.menuTugasKerja.click();
    await tugasKerjaPage.buttonStockOpname.click();
    await page.getByRole('button', { name: 'Go to page 4' }).click();
    await page.locator('.inline-flex.items-center.justify-center.gap-2.text-sm.font-medium.ring-offset-background.transition-colors.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.bg-pgi-primary.text-primary-foreground.hover\\:bg-pgi-primary\\/90.h-8').nth(2).click();
    // await page.getByRole('button').filter({ hasText: /^$/ }).nth(0).click();
  });

  test('Add Excel Stock', async ({ page }) => {
    await page.locator('.iconify.i-ri\\:file-excel-2-line').click();
    await page.locator('input[type="file"]').nth(0).setInputFiles('src/fixtures/pdf-testing.pdf');
    await expect(page.getByText('Berhasil memperbarui lampiran')).toBeVisible();
  });
  
  test('Add Summary Scan', async ({ page }) => {
    await page.locator('.iconify.i-mdi\\:file').click();
    await page.locator('input[type="file"]').nth(1).setInputFiles('src/fixtures/pdf-testing.pdf');
    await expect(page.getByText('Berhasil memperbarui lampiran')).toBeVisible();
  });

  test('Add Lampiran', async ({ page }) => {
    await page.locator('.iconify.i-clarity\\:add-line.w-6').click();
    await page.locator('input[type="file"]').nth(2).setInputFiles('src/fixtures/bukti.png');
    await expect(page.getByText('Berhasil memperbarui lampiran')).toBeVisible();
  });

  test('Add Compliance', async ({ page }) => {
    await page.getByRole('button', { name: 'Tambah' }).click();
    await page.getByRole('combobox', { name: 'Pemeriksaan' }).click();
    await page.getByRole('option', { name: 'Compliance' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('combobox', { name: 'Temuan' }).click();
    await page.getByRole('option', { name: 'Barang Gadai Inventaris Organisasi', exact: true }).click();
    await page.getByRole('combobox', { name: 'Pilih Karyawan' }).click();
    await page.getByRole('option', { name: '- Roby Fadly' }).click();
    await page.getByRole('textbox', { name: 'Catatan' }).click();
    await page.getByRole('textbox', { name: 'Catatan' }).fill('1');
    await page.getByRole('button', { name: 'Submit' }).click();
  });

  test('Add Human Resource', async ({ page }) => {
    await page.getByRole('button', { name: 'Tambah' }).click();
    await page.getByRole('combobox', { name: 'Pemeriksaan' }).click();
    await page.getByRole('option', { name: 'Human Resource' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('combobox', { name: 'Temuan' }).click();
    await page.getByRole('option', { name: 'Terlambat Datang Ke Kantor', exact: true }).click();
    await page.getByRole('combobox', { name: 'Pilih Karyawan' }).click();
    await page.getByRole('option', { name: '- Roby Fadly' }).click();
    await page.getByRole('textbox', { name: 'Catatan' }).click();
    await page.getByRole('textbox', { name: 'Catatan' }).fill('2');
    await page.getByRole('button', { name: 'Submit' }).click();
    // await expect(page.getByText('Sukses menambah data')).toBeVisible();
  });

    test('Add General Affair', async ({ page }) => {
    await page.getByRole('button', { name: 'Tambah' }).click();
    await page.getByRole('combobox', { name: 'Pemeriksaan' }).click();
    await page.getByRole('option', { name: 'General Affair' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('combobox', { name: 'Temuan' }).click();
    await page.getByRole('option', { name: 'Banner Kotor', exact: true }).click();
    await page.getByRole('combobox', { name: 'Pilih Karyawan' }).click();
    await page.getByRole('option', { name: '- Roby Fadly' }).click();
    await page.getByRole('textbox', { name: 'Catatan' }).click();
    await page.getByRole('textbox', { name: 'Catatan' }).fill('3');
    await page.getByRole('button', { name: 'Submit' }).click();
  });

  test('Add Cash Opname', async ({ page }) => {
    await page.getByRole('button', { name: 'Tambah' }).click();
    await page.getByRole('combobox', { name: 'Pemeriksaan' }).click();
    await page.getByRole('option', { name: 'Cash Opname' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('combobox', { name: 'Temuan' }).click();
    await page.getByRole('option', { name: 'Penggelapan Kas Besar Outlet', exact: true }).click();
    await page.getByRole('combobox', { name: 'Pilih Karyawan' }).click();
    await page.getByRole('option', { name: '- Roby Fadly' }).click();
    await page.getByRole('textbox', { name: 'Catatan' }).click();
    await page.getByRole('textbox', { name: 'Catatan' }).fill('4');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Close toast' }).click();
  });

  test('Add Gadai Elektronik', async ({ page }) => {
    await page.getByRole('button', { name: 'Tambah' }).click();
    await page.getByRole('combobox', { name: 'Pemeriksaan' }).click();
    await page.getByRole('option', { name: 'Gadai Elektronik' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('combobox', { name: 'Temuan' }).click();
    await page.getByRole('option', { name: 'Barang Replika (Pidana)', exact: true }).click();
    await page.getByRole('combobox', { name: 'Pilih Karyawan' }).click();
    await page.getByRole('option', { name: '- Roby Fadly' }).click();
    await page.getByRole('textbox', { name: 'Catatan' }).click();
    await page.getByRole('textbox', { name: 'Catatan' }).fill('5');
    await page.getByRole('button', { name: 'Submit' }).click();
    // await expect(page.getByText('Sukses menambah data')).toBeVisible();
  });

  test('Add Gadai BPKB', async ({ page }) => {
    await page.getByRole('button', { name: 'Tambah' }).click();
    await page.getByRole('combobox', { name: 'Pemeriksaan' }).click();
    await page.getByRole('option', { name: 'Gadai BPKB' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('combobox', { name: 'Temuan' }).click();
    await page.getByRole('option', { name: 'Selisih Kurang BPKB (Pidana)', exact: true }).click();
    await page.getByRole('combobox', { name: 'Pilih Karyawan' }).click();
    await page.getByRole('option', { name: '- Roby Fadly' }).click();
    await page.getByRole('textbox', { name: 'Catatan' }).click();
    await page.getByRole('textbox', { name: 'Catatan' }).fill('6');
    await page.getByRole('button', { name: 'Submit' }).click();
    // await expect(page.getByText('Sukses menambah data')).toBeVisible();
  });
   
  test('Add Administrasi', async ({ page }) => {
    await page.getByRole('button', { name: 'Tambah' }).click();
    await page.getByRole('combobox', { name: 'Pemeriksaan' }).click();
    await page.getByRole('option', { name: 'Administrasi' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('combobox', { name: 'Temuan' }).click();
    await page.getByRole('option', { name: 'Nominal Berbeda', exact: true }).click();
    await page.getByRole('combobox', { name: 'Pilih Karyawan' }).click();
    await page.getByRole('option', { name: '- Roby Fadly' }).click();
    await page.getByRole('textbox', { name: 'Catatan' }).click();
    await page.getByRole('textbox', { name: 'Catatan' }).fill('7');
    await page.getByRole('button', { name: 'Submit' }).click();
    // await expect(page.getByText('Sukses menambah data')).toBeVisible();
  });

  test('Add Gadai Emas', async ({ page }) => {
    await page.getByRole('button', { name: 'Tambah' }).click();
    await page.getByRole('combobox', { name: 'Pemeriksaan' }).click();
    await page.getByRole('option', { name: 'Gadai Emas' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('combobox', { name: 'Temuan' }).click();
    await page.getByRole('option', { name: 'Input Tidak Sesuai Fisik', exact: true }).click();
    await page.getByRole('combobox', { name: 'Pilih Karyawan' }).click();
    await page.getByRole('option', { name: '- Roby Fadly' }).click();
    await page.getByRole('textbox', { name: 'Catatan' }).click();
    await page.getByRole('textbox', { name: 'Catatan' }).fill('8');
    await page.getByRole('button', { name: 'Submit' }).click();
    // await expect(page.getByText('Sukses menambah data')).toBeVisible();
  });
 
  test('Submit Stock Opname', async ({ page }) => {
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'YA, Submit' }).click();
    await expect(page.getByText('Berhasil submit data')).toBeVisible();
  });

});