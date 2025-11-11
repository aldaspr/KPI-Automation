// @ts-check
import { expect } from '@playwright/test';

export class ActivityPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.menuAktivitasHarian1 = this.page.getByRole('button', { name: 'Aktivitas Harian' });
    this.menuAktivitasHarian2 = this.page.getByRole('link', { name: 'Aktivitas' });
    this.buttonTambahAktivitas = this.page.getByRole('main').getByRole('button', { name: 'Aktivitas Harian', exact: true });
    this.tanggalField = this.page.getByRole('textbox', { name: 'Tanggal' });
    this.cabangField = this.page.getByRole('combobox', { name: 'Cabang' });
    this.tickAnalisaReject = this.page.getByRole('row', { name: 'Analisa Reject Book 30 menit' }).getByRole('checkbox');
    this.tickApprovalGadai = this.page.getByRole('row', { name: 'Approval Gadai Pugindo 45' }).getByRole('checkbox');
    this.tickBriefingPagi = this.page.getByRole('row', { name: 'Briefing Pagi 30 menit' }).getByRole('checkbox');
    this.buttonSubmit = this.page.getByRole('button', { name: 'Submit' });
    this.confirmSubmit = this.page.getByRole('button', { name: 'YA, Buat Aktivitas' });
    this.buttonDeleteAll = this.page.getByRole('row', { name: 'Tanggal Cabang Aktivitas' }).getByRole('checkbox'); 
    this.buttonDeleteDiatas = this.page.getByRole('button', { name: 'Hapus' }).nth(1);
    this.confirmDelete = this.page.getByRole('button', { name: 'YA, Batalkan' });
    this.buttonDelete = this.page.locator('button.bg-destructive');
    this.acceptCancelButton = this.page.getByRole('button', { name: 'YA, Batalkan' });
    this.realizeButton = this.page.locator('.inline-flex.items-center.justify-center.gap-2.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.bg-green-600.text-white.hover\\:bg-green-600\\/90.h-8').first();
    this.confirmPopUpRealisasi = this.page.getByRole('button', { name: 'YA, Realisasikan' });
    this.waktuMulaiField = this.page.getByRole('textbox', { name: 'Waktu Mulai' });
    this.waktuSelesaiField = this.page.getByRole('textbox', { name: 'Waktu Selesai' });
    this.catatanField = this.page.getByRole('textbox', { name: 'Catatan' });
    this.buktiField = this.page.locator('.iconify.i-clarity\\:add-line.w-6');
    this.uploadGambar = this.page.locator('input[type="file"]').first();
    this.buttonSimpan = this.page.getByRole('button', { name: 'Simpan' });
    this.rekapAktivitasBulanan = this.page.getByRole('button', { name: 'Rekap Aktivitas Bulanan' });
    this.closeIcon = this.page.getByRole('button', { name: 'Close' });
    this.refreshButton = this.page.locator('form').getByRole('button').nth(1);
    this.rekapAktivitasHarian = this.page.getByRole('button', { name: 'Rekap Aktivitas Harian' });
    this.cabangDropdown = this.page.locator('#v-0-20-form-item-multiselect-option-152');
  }

  async clickTambahAktivitas() {
    await this.menuAktivitasHarian2.click();
    await this.buttonTambahAktivitas.click();
  }

  // @ts-ignore
  async fillForm({ date, branch }) {
    await this.tanggalField.fill(date);
    await this.cabangField.click();
    await this.page.getByRole('option', { name: (branch) }).click();
  }

  async clickSubmitButton() {
    await this.buttonSubmit.click();
  }

  async clickDeleteActivity() {
    await this.buttonDelete.click();
    await this.acceptCancelButton.click();
  }

  async confirmActivity() {
    await this.realizeButton.click();
    await this.waktuMulaiField.fill('10:00');
    await this.waktuSelesaiField.fill('10:10');
    await this.catatanField.fill('test automate');
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