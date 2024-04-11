import { test, expect, Page } from '@playwright/test'

const baseURL = process.env.NEXT_PUBLIC_PLAYWRIGHT_BASE_URL || ('' as string)

test('FAQs', async ({ page }) => {
  await testToggles(page, 'faq')
})
test('How it works', async ({ page }) => {
  await testToggles(page, 'how-it-works')
})

const testToggles = async (page: Page, route: any) => {
  await page.goto(baseURL + route)

  const accordionBlock = await page.locator('[datatype="accordion-block"]')

  await expect(accordionBlock).toBeVisible()

  const accordionButtons = await accordionBlock.locator('button').all()

  for (const button of accordionButtons) {
    await button.click()
    await expect(button).toHaveAttribute('aria-expanded', 'true')

    await button.click()
    await expect(button).toHaveAttribute('aria-expanded', 'false')
  }
}
