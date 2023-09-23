import { test, expect } from '@playwright/test';

test('Site renders a kanji character', async ({ page }) => {
    await page.goto('localhost:3000');
  
    // Expect a title "to contain" a substring.
    await expect(page.getByText(/[\x3400-\x4DB5\x4E00-\x9FCB\xF900-\xFA6A]/)).toBeVisible();
  });