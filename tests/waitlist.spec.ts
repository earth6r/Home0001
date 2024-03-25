import { test, expect } from '@playwright/test'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || ('' as string)
// const baseURL = 'https://www.home0001.com/'

test('Header Waitlist', async ({ page }) => {
  await page.goto(baseURL)
  await page.getByRole('button').first().click()
  await page.locator('#header').getByPlaceholder('FIRST NAME').click()
  await page.locator('#header').getByPlaceholder('FIRST NAME').fill('test')
  await page.locator('#header').getByPlaceholder('LAST NAME').click()
  await page.locator('#header').getByPlaceholder('LAST NAME').fill('test')
  await page.locator('#header').getByPlaceholder('YOUR EMAIL').click()
  await page
    .locator('#header')
    .getByPlaceholder('YOUR EMAIL')
    .fill('test@gmail.com')
  await page.locator('#header').getByRole('button', { name: 'Submit' }).click()
  await page.getByLabel('Somewhere else').check()
  await page.getByLabel('Mexico City').check()
  await page.locator('#header').getByRole('button', { name: 'Submit' }).click()
  await page.getByLabel('Not sure yet').check()
  await page.locator('#header').getByRole('button', { name: 'Submit' }).click()
  await page.getByLabel('Depends').check()
  await page.getByRole('button', { name: 'Join waitlist' }).click()

  await expect(
    page.getByRole('heading', { name: "You're on the waitlist!" })
  ).toBeVisible()
})

test('Bottom Waitlist', async ({ page }) => {
  await page.goto(baseURL)
  await page.getByPlaceholder('FIRST NAME').click()
  await page.getByPlaceholder('FIRST NAME').fill('test')
  await page.getByPlaceholder('LAST NAME').click()
  await page.getByPlaceholder('LAST NAME').fill('test')
  await page.getByPlaceholder('YOUR EMAIL').click()
  await page.getByPlaceholder('YOUR EMAIL').fill('test@gmail.com')
  await page.getByRole('button', { name: 'Submit' }).click()
  await page.getByLabel('Berlin').check()
  await page.getByRole('button', { name: 'Submit' }).click()
  await page.getByLabel('Immediately').check()
  await page.getByRole('button', { name: 'Submit' }).click()
  await page.getByLabel('Bedrooms +').check()
  await page.getByRole('button', { name: 'Join waitlist' }).click()

  await expect(
    page.getByRole('heading', { name: "You're on the waitlist!" })
  ).toBeVisible()
})
