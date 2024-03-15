import { test, expect } from '@playwright/test'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || ('' as string)
// const baseURL = 'https://www.home0001.com/'

test('Lower East Side', async ({ page }) => {
  await testPropertyPage(page, 'lower-east-side')
})

test('Echo Park Side', async ({ page }) => {
  await testPropertyPage(page, 'echo-park')
})

const testPropertyPage = async (page: any, slug: string) => {
  await page.goto(baseURL + 'property/' + slug)

  //   Para Toggle Buttons
  const readMoreButtons = await page.locator('span:has-text("Read More")').all()
  for (const button of readMoreButtons) {
    await button.click()

    // Check that the button class includes "opacity-0"
    const buttonClass = await button.getAttribute('class')
    await expect(buttonClass).toContain('opacity-0')

    await button.click()
  }

  //   Image Swiper
  const swipers = await page.locator('.swiper-wrapper').all()
  for (const swiper of swipers) {
    const images = await swiper.locator('img').all()
    for (const image of images) {
      await expect(image).toBeVisible()
    }
  }
}
