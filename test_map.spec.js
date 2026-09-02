import { test } from '@playwright/test';

test('capture solo world map screen', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.click('button:has-text("WORLD MAP")');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'solo_world_map_screen.png' });
});
