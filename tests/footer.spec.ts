import { test, expect } from '@playwright/test'

const baseURL = process.env.NEXT_PUBLIC_PLAYWRIGHT_BASE_URL || ('' as string)

test('Footer', async ({ page }) => {
  await page.goto(baseURL)
  await page.getByRole('link', { name: 'about' }).click()
  await page.waitForNavigation()
  await expect(page.url()).toBe(baseURL + 'about')

  await page.getByRole('link', { name: 'how it works' }).click()
  await page.waitForNavigation()
  await expect(page.url()).toBe(baseURL + 'how-it-works')

  await page.getByRole('link', { name: 'contact us' }).click()
  await page.waitForNavigation()
  await expect(page.url()).toBe(baseURL + 'contact')

  await page.getByRole('link', { name: 'legal' }).click()
  await page.waitForNavigation()
  await expect(page.url()).toBe(baseURL + 'legal')
})
