// @ts-check
import { expect } from '@playwright/test';

export class ActivityPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.menuAktivitasHarian = this.page.locator('(//p[@class="truncate"])[text()="Aktivitas Harian"]');
    this.buttonTambahAktivitas = this.page.locator('(//button[span[text()="Aktivitas Harian"]])[1]');
    this.freeClick = this.page.getByRole('dialog', { name: 'Tambah Aktivitas' });
    this.buttonSubmit = this.page.getByRole('button', { name: 'Submit' });
    this.buttonDelete = this.page.locator('button.bg-destructive');
    this.acceptCancelButton = this.page.getByRole('button', { name: 'YA, Batalkan' });
    this.confirmButton = this.page.locator('button.bg-green-600.text-white');
    this.waktuMulaiField = this.page.getByRole('textbox', { name: 'Waktu Mulai' });
    this.waktuSelesaiField = this.page.getByRole('textbox', { name: 'Waktu Selesai' });
    this.catatanField = this.page.getByRole('textbox', { name: 'Catatan' });
    this.buktiField = this.page.locator('div').filter({ hasText: /^Pilih file atau ambil foto$/ }).nth(1);
    this.uploadGambar = this.page.locator('input[type="file"]');
    this.buttonSimpan = this.page.getByRole('button', { name: 'Simpan' });
    this.rekapAktivitasBulanan = this.page.getByRole('button', { name: 'Rekap Aktivitas Bulanan' });
    this.closeIcon = this.page.locator('svg:has(path[d="M18 6L6 18M6 6l12 12"])');
    this.refreshButton = this.page.locator('form').getByRole('button').nth(1);
    this.rekapAktivitasHarian = this.page.getByRole('button', { name: 'Rekap Aktivitas Harian' });
    this.cabangDropdown = this.page.locator('#v-0-20-form-item-multiselect-option-152');
  }

  async clickTambahAktivitas() {
    await this.menuAktivitasHarian.click();
    await this.page.waitForTimeout(1000);
    await this.buttonTambahAktivitas.click();
  }

  async fillForm({ date, branch, activity }) {
    await this.page.getByRole('textbox', { name: 'Tanggal' }).fill(date);
    await this.page.getByRole('combobox', { name: 'Cabang' }).click();
    await this.page.getByRole('option', { name: (branch) }).click();
    await this.page.getByRole('combobox', { name: 'Aktivitas' }).click();
    await this.page.getByRole('option', { name: (activity) }).click();
    await this.freeClick.click();
  }

  async clickSubmitButton() {
    await this.buttonSubmit.click();
  }

  async clickDeleteActivity() {
    await this.buttonDelete.click();
    await this.acceptCancelButton.click();
  }

  async confirmActivity() {
    await this.confirmButton.click();
    await this.waktuMulaiField.fill('10:00');
    await this.waktuSelesaiField.fill('10:10');
    await this.catatanField.fill('test');
    await this.buktiField.click();
    await this.uploadGambar.setInputFiles('src/fixtures/bukti.png');
    await this.buttonSimpan.click();
  }

  async ambilDurasiBulanBerjalan() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' });
    const currentMonth = formatter.format(now);

    const row = this.page.locator(`//td[contains(., "${currentMonth}")]//parent::tr`);
    const durasiPlan = await row.locator('td').nth(1).innerText();
    const durasiRealisasi = await row.locator('td').nth(2).innerText();

    console.log(`Durasi Plan bulan ${currentMonth}: ${durasiPlan}`);
    console.log(`Durasi Realisasi bulan ${currentMonth}: ${durasiRealisasi}`);

    await expect(durasiPlan).not.toBe('');
    await expect(durasiRealisasi).not.toBe('');
    await this.page.waitForTimeout(5000);
    
  }
}