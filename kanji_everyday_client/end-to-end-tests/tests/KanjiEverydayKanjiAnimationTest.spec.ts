import { test, expect } from '@playwright/test';

test('Site renders video for how to write the Kanji of the day', async ({ page }) => {
  await page.goto('localhost:3000');

  // Expect a Kanji container to contain the video
  await expect(page.getByLabel('Kanji-TitledBorder').getByLabel("KanjiAnimation")).toBeVisible;
});

test('Site auto-plays video for how to write the Kanji of the day', async ({ page }) => {
  await page.goto('localhost:3000');

  await page.waitForTimeout(3000);

  const videoElement = page.getByLabel('Kanji-TitledBorder').getByLabel("KanjiAnimation")

  const isPaused = await videoElement.evaluate((video: HTMLVideoElement) => video.paused)

  // Expect the Kanji video to NOT be paused

  await expect(isPaused).toEqual(false);
});