import { test, expect } from '@playwright/test'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || ('' as string)
// const baseURL = 'https://www.home0001.com/'

test('Contact Us', async ({ page }) => {
  await page.goto(baseURL)
  await page.getByRole('link', { name: 'contact us' }).click()
  await page.waitForNavigation()

  await page.getByPlaceholder('FIRST NAME').click()
  await page.getByPlaceholder('FIRST NAME').fill('test')
  await page.getByPlaceholder('LAST NAME').click()
  await page.getByPlaceholder('LAST NAME').fill('test')
  await page.getByPlaceholder('YOUR EMAIL').click()
  await page.getByPlaceholder('YOUR EMAIL').fill('test@test.com')
  await page.getByLabel('I am interested in purchasing').check()
  await page.getByPlaceholder('LEAVE US A MESSAGE').click()
  await page.getByPlaceholder('LEAVE US A MESSAGE').fill('test message')
  await page.getByRole('button', { name: 'Submit' }).click()
  await expect(
    page.getByText('Thanks for reaching out. We’ll be in touch soon.')
  ).toBeVisible()
})
