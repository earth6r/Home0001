import { test, expect } from '@playwright/test'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || ('' as string)
// const baseURL = 'https://www.home0001.com/'

test('Home Page Animated Blocks', async ({ page }) => {
  await page.goto(baseURL)

  const animatingBlock = await page.locator(
    '[datatype="animating-block-content"]'
  )

  await expect(animatingBlock).toBeVisible()

  const images = await animatingBlock.locator('img').all()

  for (const image of images) {
    await expect(image).toBeVisible()
  }
})

test('Available Properties Block', async ({ page }) => {
  await page.goto(baseURL)

  const availablePropertiesBlock = await page.locator(
    '[datatype="properties-block-content"]'
  )

  await expect(availablePropertiesBlock).toBeVisible()

  const properties = await availablePropertiesBlock.locator('a').all()

  for (const property of properties) {
    // Press and check that the page is navigated to the property
    const href = await property.getAttribute('href')
    await property.click()
    await page.waitForNavigation()
    await expect(page.url()).toBe(baseURL + href?.substring(1))
    await page.goBack()
    await page.waitForNavigation()
  }
})
