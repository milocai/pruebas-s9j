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
  await asideMenu.getByRole('link').nth(2).click()
  await page.waitForTimeout(1000)
})

test('should select "Enfermeria" as the area and display a label to indicating that there are no daily parts for that area', async ({
  page
}) => {
  const areaSelect = page.getByRole('combobox')
  const searchButton = page.getByRole('button', { name: LABEL_BUTTON.search })

  await areaSelect.click()
  await areaSelect.selectOption({ value: VALUE_OPTION_AREA_SELECT.Enfermeria })
  await searchButton.click()

  const dateToday = new Date()
  const month = dateToday.getMonth() + 1
  const formatMonth = month < 10 ? `0${month}` : month
  const formatDay =
    dateToday.getDate() < 10 ? `0${dateToday.getDate()}` : dateToday.getDate()

  const message = `${dateToday.getFullYear()}-${formatMonth}-${formatDay}`

  const label = page.getByRole('heading', {
    level: 2,
    name: `No hay partes diarios para el area: ENFERMERIA en la fecha: ${message}`
  })

  await expect(label).toBeVisible()
})

test('should select "Economato" as the area and display a label indicating that there are daily parts for the current date', async ({
  page
}) => {
  const areaSelect = page.getByRole('combobox')
  const searchButton = page.getByRole('button', { name: LABEL_BUTTON.search })

  await areaSelect.click()
  await areaSelect.selectOption({ value: VALUE_OPTION_AREA_SELECT.Economato })
  await searchButton.click()

  const dateToday = new Date()
  const dateForMessage = new Date(Date.UTC(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate(), 3, 0, 0))
  const message = dateForMessage.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()

  const label = page.getByRole('heading', { level: 2, name: `Fecha: ${message}` })

  await expect(label).toBeVisible()
})

test('should display success message when add a note', async ({ page }) => {
  const areaSelect = page.getByRole('combobox')
  await areaSelect.click()
  await areaSelect.selectOption({ value: VALUE_OPTION_AREA_SELECT.Economato })

  await page.getByRole('button', { name: LABEL_BUTTON.search }).click()
  await page.getByRole('button', { name: 'Sector Cocina' }).click()

  const containerArticlesEmp = page.getByTestId('container-sector-daily-part')
  const articlesEmp = containerArticlesEmp.getByRole('article')
  const firstArticleEmp = articlesEmp.nth(0)
  const modal = firstArticleEmp.getByRole('button', {
    name: LABEL_BUTTON.addNote
  })
  await modal.click()

  await page.getByRole('textbox').fill('Falta justificada por enfermedad - Admin')
  await page.getByRole('button', { name: LABEL_BUTTON.sendNote }).click()
  await page.getByRole('button', { name: LABEL_BUTTON.removeRequest }).click()

  const messageSuccess = page.getByText('Novedad enviada correctamente')
  await expect(messageSuccess).toBeVisible()
})

test('shouldn`t be disabled button send note if textbox have a note', async ({
  page
}) => {
  const selectArea = page.getByRole('combobox')
  await selectArea.click()
  await selectArea.selectOption({ value: VALUE_OPTION_AREA_SELECT.Economato })

  await page.getByRole('button', { name: LABEL_BUTTON.search }).click()
  await page.getByRole('button', { name: 'Sector Cocina' }).click()

  const containerArticlesEmp = page.getByTestId('container-sector-daily-part')
  const articlesEmp = containerArticlesEmp.getByRole('article')
  const firstArticleEmp = articlesEmp.nth(0)
  const modal = firstArticleEmp.getByRole('button', {
    name: LABEL_BUTTON.addNote
  })
  await modal.click()

  const textboxDisabled = modal.getByRole('textbox', { disabled: false })
  const buttonDisabled = modal.getByRole('button', {
    name: LABEL_BUTTON.sendNote,
    disabled: false
  })
  await page.getByRole('button', { name: LABEL_BUTTON.removeRequest }).click()

  expect(textboxDisabled).toBeTruthy()
  expect(buttonDisabled).toBeTruthy()
})
