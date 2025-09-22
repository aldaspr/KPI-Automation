export class TugasKerjaPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.menuTugasKerja = this.page.getByRole('link', { name: 'Tugas Kerja', exact: true });
    this.buttonSosialisasiSE = this.page.getByRole('row', { name: 'Melakukan Sosialisasi SE / PP' }).getByRole('button');
    this.buttonTambahAktivitas = this.page.getByRole('button', { name: 'Aktivitas' });
    this.tanggalAktivitas = this.page.getByRole('textbox', { name: 'Tanggal' });
    this.uploadFile = this.page.getByRole('button', { name: 'File' });
    this.uploadLampiran = this.page.locator('label input[type="file"]');
    this.keteranganField = this.page.getByRole('textbox', { name: 'Keterangan' });
    this.buttonSubmit = this.page.getByRole('button', { name: 'Submit' });
    this.buttonCoachingKaryawan = this.page.getByRole('row', { name: 'Coaching Karyawan September' }).getByRole('button');
    this.buttonPilihTeam = this.page.getByRole('combobox', { name: 'Team' });
    this.buttonKompetensiDiri = this.page.getByRole('row', { name: 'Kompetensi Diri September' }).getByRole('button');
    this.waktuPengerjaan = this.page.getByRole('spinbutton', { name: 'Waktu pengerjaan' });
    this.buttonStockOpname = this.page.getByRole('row', { name: 'Stock Opname' }).getByRole('button');
    this.unitElektronikField = page.getByRole('spinbutton', { name: 'Unit Elektronik' });
    this.unitBPKBField = page.getByRole('spinbutton', { name: 'Unit BPKB' });
    this.unitEmasField = page.getByRole('spinbutton', { name: 'Unit emas' });
    this.cashOpnameField = page.getByRole('textbox', { name: 'Cash Opname' });
  }


async addSosialisasiSE(date) {
  await this.buttonSosialisasiSE.click();
  await this.buttonTambahAktivitas.click();
  await this.tanggalAktivitas.fill(date);
  await this.uploadFile.setInputFiles('src/fixtures/bukti.png');
  await this.uploadLampiran.setInputFiles('src/fixtures/lampiran.png');
  await this.keteranganField.fill('test automate');
  await this.buttonSubmit.click();
  }

  async addCoachingKaryawan(date) {
    await this.buttonCoachingKaryawan.click();
    await this.buttonTambahAktivitas.click();
    await this.tanggalAktivitas.fill(date);
    await this.buttonPilihTeam.click();
    await this.page.getByText('- Muhamad Ramadan').click();
    await this.uploadFile.setInputFiles('src/fixtures/bukti.png');
    await this.uploadLampiran.setInputFiles('src/fixtures/lampiran.png');
    await this.keteranganField.fill('test automate');
    await this.buttonSubmit.click();
  }
  
  async addKompetensiDiri(date) {
    await this.buttonKompetensiDiri.click();
    await this.buttonTambahAktivitas.click();
    await this.tanggalAktivitas.fill(date);
    await this.waktuPengerjaan.fill('120');
    await this.uploadFile.setInputFiles('src/fixtures/bukti.png');
    await this.uploadLampiran.setInputFiles('src/fixtures/lampiran.png');
    await this.keteranganField.fill('test automate');
    await this.buttonSubmit.click();
  }

  async addStockOpname(date, unitElektronik, unitBPKB, unitEmas, cashOpname) {
    await this.buttonStockOpname.click();
    await this.buttonTambahAktivitas.click();
    await this.tanggalAktivitas.fill(date);
    await this.page.getByRole('combobox', { name: 'Cabang' }).click();
    await this.page.getByRole('option', { name: '- CJR003' }).click();
    await this.unitElektronikField.fill(unitElektronik);
    await this.unitBPKBField.fill(unitBPKB);
    await this.unitEmasField.fill(unitEmas);
    await this.cashOpnameField.fill(cashOpname);
    await this.keteranganField.fill('test automate');
  }
}