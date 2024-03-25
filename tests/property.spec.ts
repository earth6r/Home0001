import { test, expect, Page } from '@playwright/test'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || ('' as string)
// const baseURL = 'https://www.home0001.com/'

test('Lower East Side', async ({ page }) => {
  await testPropertyPage(page, 'lower-east-side')
})

test('Echo Park Side', async ({ page }) => {
  await testPropertyPage(page, 'echo-park')
})

const testPropertyPage = async (page: Page, slug: string) => {
  await page.goto(baseURL + 'property/' + slug)

  //   Para Toggle Buttons
  const readMoreButtons = await page.locator('span:has-text("Read More")').all()
  for (const buttonContainer of readMoreButtons) {
    const button = await buttonContainer
    await button.click()

    // Check that the button class includes "opacity-0"
    const buttonClass = await button.getAttribute('class')
    await expect(buttonClass).toContain('opacity-0')

    await button.click()
  }

  //   Image Swiper
  await page.waitForFunction(() => {
    const images = Array.from(document.querySelectorAll('.swiper-wrapper img'))

    return images.every((img: any) => img.complete)
  })
}
