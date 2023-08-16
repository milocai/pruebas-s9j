import { LABEL_BUTTON } from '../../src/utils/constants'
import { test, expect } from '@playwright/test'
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
})

test('must show the month for which the work scheme is to be generated', async ({
  page
}) => {
  const asideMenu = page.getByRole('complementary')
  await asideMenu.getByRole('link').nth(0).click()

  const areaSelect = page.getByRole('combobox').nth(0)
  await areaSelect.click()
  await areaSelect.selectOption({ value: VALUE_OPTION_AREA_SELECT.Economato })

  const sectorSelect = page.getByRole('combobox').nth(1)
  await sectorSelect.click()
  await sectorSelect.selectOption({ value: VALUE_OPTION_SECTOR_SELECT.cocina })

  const searchButton = page.getByRole('button', { name: LABEL_BUTTON.search })
  await searchButton.click()

  const dateToday = new Date()
  const dateNext = new Date(dateToday)
  dateNext.setMonth(dateToday.getMonth() + 1)
  const month = dateNext.toLocaleString('es-ES', { month: 'long' })

  await expect(
    page.getByRole('heading', {
      name: `Esquema de trabajo para el mes de: ${month}`
    })
  ).toBeVisible()
})

test('should select "Enfermeri­a" as the area and "Torre 25" as the sector and display a label to indicating that "No hay solicitudes de descansos" and "No hay empleados en este sector"', async ({
  page
}) => {
  const selects = page.getByTestId('container-select')

  const selectArea = selects.getByRole('combobox').nth(0)
  await selectArea.click()
  await selectArea.selectOption({ value: VALUE_OPTION_AREA_SELECT.Enfermeria })

  const selectSector = selects.getByRole('combobox').nth(1)
  await selectSector.click()
  await selectSector.selectOption({
    value: VALUE_OPTION_SECTOR_SELECT.torres_25
  })

  await page.getByRole('button', { name: LABEL_BUTTON.search }).click()
  await page.waitForTimeout(1000)

  const titleNotRestRequest = page.getByRole('heading', { level: 2, name: /No hay solicitudes de descansos/i })
  const titleNotEmployees = page.getByRole('row', { name: /No hay empleados en este sector/i })

  await expect(titleNotRestRequest).toBeVisible()
  await expect(titleNotEmployees).toBeVisible()
})

test('should select "Economato" as the area and "cocina" as the sector and display a table with employee sent rest request', async ({
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

  const containerTables = page.getByTestId('container-tables-rest-request-and-diagram')
  const tableRestRequest = containerTables.getByRole('table').nth(0)

  const countTr = await tableRestRequest.getByRole('row').count()
  const trEmployee = countTr - 1

  expect(trEmployee).toBeGreaterThan(0)
})

test('should select "economato" as the area and "cocina" as the sector and display a table with employee to diagram', async ({
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

  const containerTables = page.getByTestId('container-tables-rest-request-and-diagram')
  const tableRestRequest = containerTables.getByRole('table').nth(1)

  const countTr = await tableRestRequest.getByRole('row').count()
  const trEmployee = countTr - 1

  expect(trEmployee).toEqual(5)
})

test('should select "economato" as the area and "cocina" as the sector and display a table with the same amount of day of month to diagram', async ({
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

  const dateToday = new Date()
  const currentMonth = dateToday.getMonth() + 1
  const monthToDiagram = currentMonth + 1
  const amountDayOfMonth = new Date(dateToday.getFullYear(), monthToDiagram, 0).getDate()

  const containerTables = page.getByTestId('container-tables-rest-request-and-diagram')
  const tableRestRequest = containerTables.getByRole('table').nth(1)
  const countTh = tableRestRequest.getByRole('columnheader')
  const countThDay = (await countTh.count()) - 2

  expect(countThDay).toEqual(amountDayOfMonth)
})

test('should select "economato" as the area and "cocina" as the sector and change two turn day and show message success', async ({
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

  const dayFirstChange = page.locator('select[name="day-1-3"]')
  const daySecondChange = page.locator('select[name="day-1-4"]')

  await dayFirstChange.click()
  await dayFirstChange.selectOption({ value: 'I' })
  await daySecondChange.click()
  await daySecondChange.selectOption({ value: 'I' })

  const buttonValidateAndSave = page.getByRole('button', {
    name: LABEL_BUTTON.generateWs
  })
  await buttonValidateAndSave.click()
  await page.waitForTimeout(1000)

  await expect(page.getByText('Diagrama validado')).toBeVisible()
  await expect(
    page.getByText('Se generó el diagrama correctamente')
  ).toBeVisible()
})

test('should select "economato" as the area and "cocina" as the sector and show last change(previous test)', async ({
  page
}) => {
  const asideMenu = page.getByRole('complementary')
  await asideMenu.getByRole('link').nth(1).click()
  await page.waitForTimeout(1000)

  const selects = page.getByTestId('container-select')
  const selectArea = selects.getByRole('combobox').nth(0)
  await selectArea.click()
  await selectArea.selectOption({ value: VALUE_OPTION_AREA_SELECT.Economato })

  const selectSector = selects.getByRole('combobox').nth(1)
  await selectSector.click()
  await selectSector.selectOption({ value: VALUE_OPTION_SECTOR_SELECT.cocina })

  await page.getByRole('button', { name: LABEL_BUTTON.search }).click()
  await page.waitForTimeout(1000)

  const lastArticle = page.getByRole('article').last()
  await lastArticle.getByRole('link', { name: LABEL_BUTTON.detail }).click()
  await page.waitForTimeout(1000)

  const firstDayChanged = page.locator('td:nth-child(5) > .px-4').first()
  const secondDayChanged = page.locator('td:nth-child(6) > .px-4').first()

  await expect(firstDayChanged).toHaveText('I')
  await expect(secondDayChanged).toHaveText('I')
})
