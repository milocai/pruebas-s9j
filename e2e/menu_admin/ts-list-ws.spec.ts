import { test, expect } from '@playwright/test'
import { LABEL_BUTTON } from '../../src/utils/constants'
import {
  URL_LOCAL,
  recordUserAdmin,
  passwordDefault,
  VALUE_OPTION_AREA_SELECT,
  VALUE_OPTION_SECTOR_SELECT
} from '../config'

test.beforeEach(async ({ page }) => {
  await page.goto(URL_LOCAL)

  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')

  await inputRecord.fill(recordUserAdmin)
  await inputPassword.fill(passwordDefault)
  await page.getByRole('button', { name: LABEL_BUTTON.login }).click()

  const asideMenu = page.getByRole('complementary')
  await asideMenu.getByRole('link').nth(1).click()
  await page.waitForTimeout(1000)
})

test('should show list of work schemes', async ({ page }) => {
  const selects = page.getByTestId('container-select')

  const selectArea = selects.getByRole('combobox').nth(0)
  await selectArea.click()
  await selectArea.selectOption({ value: VALUE_OPTION_AREA_SELECT.Economato })

  const selectSector = selects.getByRole('combobox').nth(1)
  await selectSector.click()
  await selectSector.selectOption({ value: VALUE_OPTION_SECTOR_SELECT.cocina })

  await page.getByRole('button', { name: LABEL_BUTTON.search }).click()
  await page.waitForTimeout(1000)

  const articles = await page.getByRole('article').count()
  expect(articles).toBeGreaterThan(0)
})

test('should click button detail and show title by area and sector selected', async ({
  page
}) => {
  const selects = page.getByTestId('container-select')

  const selectArea = selects.getByRole('combobox').nth(0)
  await selectArea.click()
  await selectArea.selectOption({ value: VALUE_OPTION_AREA_SELECT.Economato })

  const selectSector = selects.getByRole('combobox').nth(1)
  await selectSector.click()
  await selectSector.selectOption({ value: VALUE_OPTION_SECTOR_SELECT.cocina })

  await page.getByRole('button', { name: LABEL_BUTTON.search }).click()
  await page.waitForTimeout(1000)

  const articles = page.getByRole('article')
  test.skip((await articles.count()) === 0)

  const firstArticles = articles.nth(0)
  await firstArticles.getByRole('link', { name: LABEL_BUTTON.detail }).click()

  const title = page.getByRole('heading', { level: 1, name: /Area Economato sector Cocina/i })
  await expect(title).toBeVisible()
})

test('should click button detail and show the same amount of day of August', async ({
  page
}) => {
  const selects = page.getByTestId('container-select')

  const selectArea = selects.getByRole('combobox').nth(0)
  await selectArea.click()
  await selectArea.selectOption({ value: VALUE_OPTION_AREA_SELECT.Economato })

  const selectSector = selects.getByRole('combobox').nth(1)
  await selectSector.click()
  await selectSector.selectOption({ value: VALUE_OPTION_SECTOR_SELECT.cocina })

  await page.getByRole('button', { name: LABEL_BUTTON.search }).click()
  await page.waitForTimeout(1000)

  const articles = page.getByRole('article')
  test.skip((await articles.count()) === 0)

  const firstArticles = articles.nth(0)
  await firstArticles.getByRole('link', { name: LABEL_BUTTON.detail }).click()
  await page.waitForTimeout(1000)

  const countDayAugust = new Date(2023, 8, 0).getDate()

  const table = page.getByRole('table')
  const countTh = table.getByRole('columnheader')
  const countThDay = (await countTh.count()) - 2

  expect(countThDay).toEqual(countDayAugust)
})

test('should click button detail and show more than one employee', async ({
  page
}) => {
  const selects = page.getByTestId('container-select')

  const selectArea = selects.getByRole('combobox').nth(0)
  await selectArea.click()
  await selectArea.selectOption({ value: VALUE_OPTION_AREA_SELECT.Economato })

  const selectSector = selects.getByRole('combobox').nth(1)
  await selectSector.click()
  await selectSector.selectOption({ value: VALUE_OPTION_SECTOR_SELECT.cocina })

  await page.getByRole('button', { name: LABEL_BUTTON.search }).click()
  await page.waitForTimeout(1000)

  const articles = page.getByRole('article')
  test.skip((await articles.count()) === 0)

  const firstArticles = articles.nth(0)
  await firstArticles.getByRole('link', { name: LABEL_BUTTON.detail }).click()
  await page.waitForTimeout(1000)

  const table = page.getByRole('table')
  const countTr = table.getByRole('row')
  const countTrEmployee = (await countTr.count()) - 1

  expect(countTrEmployee).toBeGreaterThan(0)
})
