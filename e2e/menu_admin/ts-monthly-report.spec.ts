import { LABEL_BUTTON } from '../../src/utils/constants'
import { test, expect } from '@playwright/test'
import {
  URL_LOCAL,
  passwordDefault,
  recordUserAdmin,
  VALUE_OPTION_AREA_SELECT
} from '../config'

test.beforeEach(async ({ page }) => {
  await page.goto(URL_LOCAL)

  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')

  await inputRecord.fill(recordUserAdmin)
  await inputPassword.fill(passwordDefault)
  await page.getByRole('button', { name: LABEL_BUTTON.login }).click()

  const asideMenu = page.getByRole('complementary')
  await asideMenu.getByRole('link').nth(3).click()
  await page.waitForTimeout(1000)

  const selects = page.getByTestId('container-select')

  const selectMonth = selects.getByRole('combobox').nth(1)
  await selectMonth.click()
  await selectMonth.selectOption({ value: 'agosto' })

  const selectYear = selects.getByRole('combobox').nth(2)
  await selectYear.click()
  await selectYear.selectOption({ value: '2023' })
})

test('should select "Enfermeria" as the area, august as the month and 2023 as year and display a label to indicating that there are no novelties for that area', async ({
  page
}) => {
  const selects = page.getByTestId('container-select')

  const selectArea = selects.getByRole('combobox').nth(0)
  await selectArea.click()
  await selectArea.selectOption({ value: VALUE_OPTION_AREA_SELECT.Enfermeria })

  await page.getByRole('button', { name: LABEL_BUTTON.search }).click()

  const label = page.getByRole('heading', {
    level: 2,
    name: 'No se encontraron novedades para mes: Agosto de 2023 para el area: Enfermeria'
  })

  await expect(label).toBeVisible()
})

test('should select "Economato" as the area, august as the month and 2023 as year and display indicating that there are novelties for month selected', async ({
  page
}) => {
  const selects = page.getByTestId('container-select')

  const selectArea = selects.getByRole('combobox').nth(0)
  await selectArea.click()
  await selectArea.selectOption({ value: VALUE_OPTION_AREA_SELECT.Economato })

  await page.getByRole('button', { name: LABEL_BUTTON.search }).click()

  const buttonAccordion = page.getByRole('button', { name: 'Sector Cocina' })
  await buttonAccordion.click()

  const articlesEmployee = await page.getByRole('article').count()

  expect(articlesEmployee).toBeGreaterThan(0)
})

test('should select "Economato" as the area, august as the month and 2023 as year and display select an employee for see novelty', async ({
  page
}) => {
  const selects = page.getByTestId('container-select')

  const selectArea = selects.getByRole('combobox').nth(0)
  await selectArea.click()
  await selectArea.selectOption({ value: VALUE_OPTION_AREA_SELECT.Economato })

  await page.getByRole('button', { name: LABEL_BUTTON.search }).click()

  const buttonAccordion = page.getByRole('button', { name: 'Sector Cocina' })
  await buttonAccordion.click()

  const containerArticlesEmp = page.getByTestId('container-report-employee')
  const articlesEmp = containerArticlesEmp.getByRole('article')
  const firstArticleEmp = articlesEmp.nth(0)
  const modal = firstArticleEmp.getByRole('button', { name: LABEL_BUTTON.detail })
  await modal.click()

  const table = page.getByRole('table')
  await expect(table).toBeVisible()

  await page.getByRole('button', { name: LABEL_BUTTON.removeRequest }).click()
})
