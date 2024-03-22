import { test, expect } from '@playwright/test'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || ('' as string)
// const baseURL = 'https://www.home0001.com/'

test('Are you a realtor?', async ({ page }) => {
  await page.goto(baseURL)
  await page.getByRole('button', { name: 'Menu' }).click()
  await page
    .getByRole('menuitem', { name: 'Are you a realtor?' })
    .getByRole('button')
    .click()
  await page.locator('#header').getByPlaceholder('FIRST NAME').click()
  await page.locator('#header').getByPlaceholder('FIRST NAME').fill('test')
  await page.locator('#header').getByPlaceholder('LAST NAME').click()
  await page.locator('#header').getByPlaceholder('LAST NAME').fill('test')
  await page.locator('#header').getByPlaceholder('YOUR EMAIL').click()
  await page
    .locator('#header')
    .getByPlaceholder('YOUR EMAIL')
    .fill('test@test.com')
  await page.locator('#header').getByRole('button', { name: 'Submit' }).click()
  await expect(page.getByText("We'll be in touch with more")).toBeVisible()
  await page.getByRole('button', { name: 'Close' }).click()
})
