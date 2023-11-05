import { test, expect } from '@playwright/test';

test('Site renders button for starting example audio file', async ({ page }) => {
  await page.goto('localhost:3000');

  // Expect a button to be rendered
  await expect(page.getByRole("button", { name: "example-play-button"})).toBeVisible()
});

test('Site does not auto-play example audio file', async ({ page }) => {
  await page.goto('localhost:3000');

  const audioElement = page.getByLabel('example-audio')

  const isPaused = await audioElement.evaluate((audio: HTMLAudioElement) => audio.paused)

  // Expect the Kanji video to NOT be paused

  await expect(isPaused).toEqual(true);
});

test('Pressing the play button starts example audio file', async ({ page }) => {
  await page.goto('localhost:3000');

  await page.getByRole("button", { name: "example-play-button"}).click()

  await page.waitForTimeout(1000);

  const audioElement = page.getByLabel('example-audio')

  const isPaused = await audioElement.evaluate((audio: HTMLAudioElement) => audio.paused)

  // Expect the Kanji video to NOT be paused

  await expect(isPaused).toEqual(false);
});