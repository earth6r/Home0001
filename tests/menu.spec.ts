import { test } from '@playwright/test'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || ('' as string)
// const baseURL = 'https://www.home0001.com/'

test('Menu', async ({ page }) => {
  await page.goto(baseURL)
  await page.getByRole('button', { name: 'Menu' }).click()
  await page.getByRole('link', { name: 'About', exact: true }).click()
  await page.getByRole('button', { name: 'Menu' }).click()
  await page.getByRole('button', { name: 'Close', exact: true }).click()
})
