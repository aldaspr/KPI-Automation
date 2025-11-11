import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { ActivityPage } from '../pages/activityPage.js';
import { TugasKerjaPage } from '../pages/tugasKerjaPage.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  activityPage: async ({ page }, use) => {
    await use(new ActivityPage(page));
  },
  tugasKerjaPage: async ({ page }, use) => {
    await use(new TugasKerjaPage(page));
  }
});

export const expect = base.expect;