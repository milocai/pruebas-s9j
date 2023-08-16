import { test, expect } from '@playwright/test'
import { LABEL_BUTTON } from '../../src/utils/constants'
import { URL_LOCAL, recordUserEmployee, passwordDefault } from '../config'

test.beforeEach(async ({ page }) => {
  await page.goto(URL_LOCAL)

  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')

  await inputRecord.fill(recordUserEmployee)
  await inputPassword.fill(passwordDefault)
  await page.getByRole('button', { name: LABEL_BUTTON.login }).click()

  const asideMenu = page.getByRole('complementary')
  await asideMenu.getByRole('link').nth(1).click()
})

test('should show list of work schemes', async ({ page }) => {
  const articles = await page.getByRole('article').count()
  expect(articles).toBeGreaterThan(0)
})

test('should show title', async ({ page }) => {
  const articles = page.getByRole('article')
  test.skip((await articles.count()) === 0)

  const firstArticles = articles.nth(0)
  await firstArticles.getByRole('link', { name: LABEL_BUTTON.detail }).click()

  const title = page.getByRole('heading', { level: 1, name: /esquema de trabajo para el mes: AGOSTO/i })
  await expect(title).toBeVisible()
})

test('should have the same days which they are visible in detail scheme month', async ({
  page
}) => {
  const articles = page.getByRole('article')
  test.skip((await articles.count()) === 0)

  const firstArticles = articles.nth(0)
  await firstArticles.getByRole('link', { name: LABEL_BUTTON.detail }).click()

  const amountOfDaysAugust = new Date(2023, 8, 0).getDate()
  const containerSchemeMonth = page.getByRole('gridcell', { name: String(amountOfDaysAugust) })

  await expect(containerSchemeMonth).toBeVisible()
})

test('should show last work scheme confirmed', async ({ page }) => {
  const lastArticles = page.getByRole('article').last()
  await lastArticles.getByRole('link', { name: LABEL_BUTTON.detail }).click()

  const title = page.getByRole('heading', { level: 1, name: /esquema de trabajo para el mes: /i })
  await expect(title).toBeVisible()
})
