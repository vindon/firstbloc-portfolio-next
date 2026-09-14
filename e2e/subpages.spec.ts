import { test, expect } from '@playwright/test';

const pages = [
  { name: 'My Stack', path: '/mystack', heading: 'My Stack' },
  { name: 'Roadmap', path: '/myroadmap', heading: 'Roadmap' },
  { name: 'Field Notes', path: '/fieldnotes', heading: 'Field Notes' },
];

test.describe('Sub-pages', () => {
  for (const { name, path, heading } of pages) {
    test(`${name} loads with nav, footer, and no console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });

      await page.goto(path);

      await expect(page.locator('header.nav')).toBeVisible();
      await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
      await expect(page.locator('footer#contact')).toBeVisible();

      expect(errors).toEqual([]);
    });

    test(`${name} has the expected page title`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(new RegExp(`${heading} .+ firstbloc`));
    });
  }
});
