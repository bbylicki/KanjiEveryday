import { test, expect } from '@playwright/test';

test('Site renders a kanji character in the Kanji titled border', async ({ page }) => {
    await page.goto('localhost:3000');
  
    // Expect a title "to contain" a substring.
    await expect(page.getByLabel('Kanji-TitledBorder').getByLabel("kanji-stack").getByText(/[\x3400-\x4DB5\x4E00-\x9FCB\xF900-\xFA6A]/)).toBeVisible();
  });

test('Site renders an english translation for the Kanji character in the Kanji titled border', async ({ page }) => {
    await page.goto('localhost:3000');

    const translationText = await page.getByLabel("Kanji-TitledBorder").getByLabel("translation-text").textContent();

    await expect(translationText?.length).toBeGreaterThan(0);
});

test('Site renders Kunyomi reading(s) for the Kanji character in the Readings and Translations titled border', async ({ page }) => {
  await page.goto('localhost:3000');

  const translationText = await page.getByLabel("Readings and Translations-TitledBorder").getByLabel("kunyomiReadings").textContent();

  await expect(translationText?.length).toBeGreaterThan(0);
});

test('Site renders Kunyomi Romaji reading(s) for the Kanji character in the Readings and Translations titled border', async ({ page }) => {
  await page.goto('localhost:3000');

  const translationText = await page.getByLabel("Readings and Translations-TitledBorder").getByLabel("kunyomiRomajiReadings").textContent();

  await expect(translationText?.length).toBeGreaterThan(0);
});

test('Site renders Onyomi reading(s) for the Kanji character in the Readings and Translations titled border', async ({ page }) => {
  await page.goto('localhost:3000');

  const translationText = await page.getByLabel("Readings and Translations-TitledBorder").getByLabel("onyomiReadings").textContent();

  await expect(translationText?.length).toBeGreaterThan(0);
});

test('Site renders Onyomi Romaji reading(s) for the Kanji character in the Readings and Translations titled border', async ({ page }) => {
  await page.goto('localhost:3000');

  const translationText = await page.getByLabel("Readings and Translations-TitledBorder").getByLabel("onyomiRomajiReadings").textContent();

  await expect(translationText?.length).toBeGreaterThan(0);
});

test('Site renders a japanese phrase for the Kanji character in the Readings and Translations titled border', async ({ page }) => {
  await page.goto('localhost:3000');

  const translationText = await page.getByLabel("Readings and Translations-TitledBorder").getByLabel("exampleJapanese").textContent();

  await expect(translationText?.length).toBeGreaterThan(0);
});

test('Site renders an english translation for the japanese example in the Readings and Translations titled border', async ({ page }) => {
  await page.goto('localhost:3000');

  const translationText = await page.getByLabel("Readings and Translations-TitledBorder").getByLabel("exampleEnglish").textContent();

  await expect(translationText?.length).toBeGreaterThan(0);
});