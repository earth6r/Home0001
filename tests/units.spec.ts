import { test, expect, Page } from '@playwright/test'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || ('' as string)
// const baseURL = 'https://www.home0001.com/'

test('TOWNHOUSE 5', async ({ page }) => {
  await testUnits(page, 'townhouse-5')
})

test('UNIT 4A', async ({ page }) => {
  await testUnits(page, 'unit-4a')
})

const testUnits = async (page: Page, route: any) => {
  await page.goto(baseURL + 'unit/' + route)

  //   Image Swiper
  await page.waitForFunction(() => {
    const images = Array.from(document.querySelectorAll('.swiper-wrapper img'))

    return images.every((img: any) => img.complete)
  })

  const drawerButton = await page
    .locator('button:has-text("View Fact Sheet")')
    .first()
  await drawerButton.click()

  const drawerCloseButton = await page
    .locator('button:has-text("Close")')
    .first()
  await drawerCloseButton.click()

  //   Inquire modal test
  const inquireButtonContainers = await page
    .locator('[datatype="inquire-button"]')
    .all()

  let currentButton
  for (const buttonContainer of inquireButtonContainers) {
    if (await buttonContainer.isVisible()) {
      currentButton = buttonContainer
    }
  }

  const inquireButton = await currentButton.locator('button').first()
  await inquireButton.click()

  await await page.locator('#header').getByPlaceholder('FIRST NAME').click()
  await page.locator('#header').getByPlaceholder('FIRST NAME').fill('test')
  await page.locator('#header').getByPlaceholder('LAST NAME').click()
  await page.locator('#header').getByPlaceholder('LAST NAME').fill('test')
  await page.locator('#header').getByPlaceholder('YOUR EMAIL').click()
  await page
    .locator('#header')
    .getByPlaceholder('YOUR EMAIL')
    .fill('test@gmail.com')
  await page.locator('#header').getByPlaceholder('Phone Number').click()
  await page
    .locator('#header')
    .getByPlaceholder('Phone Number')
    .fill('00000000000')
  await page.locator('#header').getByRole('button', { name: 'Submit' }).click()

  await expect(
    page.getByRole('heading', { name: "YOU'RE ON THE WAITLIST! And" })
  ).toBeVisible()

  await page.getByRole('button', { name: 'Close' }).click()
}
