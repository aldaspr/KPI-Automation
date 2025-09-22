// @ts-check
import { expect } from '@playwright/test';

export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = this.page.getByPlaceholder('username');
    this.passwordInput = this.page.getByPlaceholder('kata sandi');
    this.loginButton = this.page.getByRole('button', { name: /Masuk/i });
    this.logoutButton = this.page.getByRole('button', { name: /Logout/i });
  }

  async gotoUrl() {
    await this.page.goto('https://trial-approval.pgindonesia.com/login');
  }

  async login(username, password) {
    await this.gotoUrl();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    
  }
  async logout() {
    await this.logoutButton.click();
  }
}