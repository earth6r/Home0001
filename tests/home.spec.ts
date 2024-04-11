import { test, expect } from '@playwright/test'

const baseURL = process.env.NEXT_PUBLIC_PLAYWRIGHT_BASE_URL || ('' as string)

test('Home Page Animated Blocks', async ({ page }) => {
  await page.goto(baseURL)

  const animatingBlock = await page.locator(
    '[datatype="animating-block-content"]'
  )

  await expect(animatingBlock).toBeVisible()

  await page.waitForFunction(() => {
    const images = Array.from(
      document.querySelectorAll('[datatype="animating-block-content"] img')
    )

    return images.every((img: any) => img.complete)
  })
})

test('Available Properties Block', async ({ page }) => {
  await page.goto(baseURL)

  const availablePropertiesBlock = await page.locator(
    '[datatype="properties-block-content"]'
  )

  await expect(availablePropertiesBlock).toBeVisible()

  await page.waitForFunction(() => {
    const images = Array.from(
      document.querySelectorAll('[datatype="properties-block-content"] img')
    )

    return images.every((img: any) => img.complete)
  })

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
