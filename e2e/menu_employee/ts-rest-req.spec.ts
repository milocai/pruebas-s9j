/* eslint-disable @typescript-eslint/comma-dangle */
import { test, expect } from '@playwright/test'
import { LABEL_BUTTON } from '../../src/utils/constants'
import { getRangeDateRequest } from '../../src/utils/getLimitMonthDate'
import {
  URL_LOCAL,
  fullNameEmployeeTest,
  passwordDefault,
  recordUserEmployee
} from '../config'

const date = new Date()
const YEAR = date.getFullYear()
const DAY = date.getDate()
const MONTH = date.getMonth() + 1

test.beforeEach(async ({ page }) => {
  await page.goto(URL_LOCAL)

  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')

  await inputRecord.fill(recordUserEmployee)
  await inputPassword.fill(passwordDefault)
  await page.getByRole('button', { name: LABEL_BUTTON.login }).click()
})

test('should show fullname and record from employee', async ({ page }) => {
  const textMonth = page.getByRole('heading', {
    level: 4,
    name: `${fullNameEmployeeTest} - ${recordUserEmployee}`
  })
  await expect(textMonth).toBeVisible()
})

test('should show message indicate the month of rest request', async ({
  page
}) => {
  const { dateMinCalendar } = getRangeDateRequest()

  const date = new Date(dateMinCalendar)
  const dateForMessage = new Date(
    Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDay(), 3, 0, 0)
  )
  const message = dateForMessage.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' }).toUpperCase()

  const textMonth = page.getByRole('heading', { level: 3, name: `El pedido de descanso que solicitará será para el mes de: ${message}` })
  await expect(textMonth).toBeVisible()
})

test('should show one article after login', async ({ page }) => {
  const articles = page.getByRole('article')
  await expect(articles).toBeVisible()
})

test('should click once on button add date and show two articles', async ({
  page
}) => {
  const buttonAdd = page.getByRole('button', { name: LABEL_BUTTON.addDate })
  await buttonAdd.click()

  const articles = await page.getByRole('article').count()
  expect(articles).toEqual(2)
})

test('should click twice on button add date and show three articles', async ({
  page
}) => {
  const buttonAdd = page.getByRole('button', { name: LABEL_BUTTON.addDate })

  for (let i = 0; i < 2; i++) {
    await buttonAdd.click()
  }

  const articles = await page.getByRole('article').count()
  expect(articles).toEqual(3)
})

test('should click three times on button add date and show four articles', async ({
  page
}) => {
  const buttonAdd = page.getByRole('button', { name: LABEL_BUTTON.addDate })

  for (let i = 0; i < 3; i++) {
    await buttonAdd.click()
  }

  const articles = await page.getByRole('article').count()
  expect(articles).toEqual(4)
})

test('should click four times on button add date and show five articles', async ({
  page
}) => {
  const buttonAdd = page.getByRole('button', { name: LABEL_BUTTON.addDate })

  for (let i = 0; i < 4; i++) {
    await buttonAdd.click()
  }

  const articles = await page.getByRole('article').count()
  expect(articles).toEqual(5)
})

test('should click five times on button add date and show six articles', async ({
  page
}) => {
  const buttonAdd = page.getByRole('button', { name: LABEL_BUTTON.addDate })

  for (let i = 0; i < 5; i++) {
    await buttonAdd.click()
  }

  const articles = await page.getByRole('article').count()
  expect(articles).toEqual(6)
})

test('should six times on button add date and show seven articles', async ({
  page
}) => {
  const buttonAdd = page.getByRole('button', { name: LABEL_BUTTON.addDate })

  for (let i = 0; i < 6; i++) {
    await buttonAdd.click()
  }

  const articles = await page.getByRole('article').count()
  expect(articles).toEqual(7)
})

test('should subtract an article when click on button ✕', async ({ page }) => {
  const buttonAdd = page.getByRole('button', { name: LABEL_BUTTON.addDate })
  await buttonAdd.click()
  await buttonAdd.click()

  const buttonRemove = page.getByRole('button', { name: LABEL_BUTTON.removeRequest }).first()
  await buttonRemove.click()

  const articles = await page.getByRole('article').count()
  expect(articles).toEqual(2)
})

test('should show an article and the remove button is disabled', async ({
  page
}) => {
  const articles = page.getByRole('article')
  const buttonRemove = page.getByRole('button', { name: LABEL_BUTTON.removeRequest }).first()

  await expect(articles).toBeVisible()
  await expect(buttonRemove).toBeDisabled()
})

test('should disable add date button when there are seven articles', async ({
  page
}) => {
  const buttonAdd = page.getByRole('button', { name: LABEL_BUTTON.addDate })

  for (let i = 0; i < 6; i++) {
    await buttonAdd.click()
  }

  await expect(buttonAdd).toBeDisabled()
})

test('should show message success when insert date before fifteen', async ({
  page
}) => {
  test.skip(DAY > 15)

  const buttonAdd = page.getByRole('button', { name: LABEL_BUTTON.addDate })
  await buttonAdd.click()

  const monthRequest = MONTH + 1
  const formatMonth = MONTH < 10 ? `0${monthRequest}` : monthRequest

  const articles = await page.getByRole('article').all()

  for (const [i, article] of articles.entries()) {
    const inputDate = article.getByLabel(`Fecha-${i + 1}`)
    await inputDate.fill(`${YEAR}-${formatMonth}-${i + 10}`)
    const inputText = article.getByLabel(`Razón-${i + 1}`)
    await inputText.fill(`Certificado ${i + 1}`)
  }

  await page.getByRole('button', { name: LABEL_BUTTON.sendRequest }).click()
  await expect(page.getByText('Solicitud enviada correctamente')).toBeVisible()
})

test('should show message success when insert date after fifteen', async ({
  page
}) => {
  test.skip(DAY <= 15)

  const buttonAdd = page.getByRole('button', { name: LABEL_BUTTON.addDate })
  await buttonAdd.click()

  const monthRequest = MONTH + 2
  const formatMonth = MONTH < 10 ? `0${monthRequest}` : monthRequest

  const articles = await page.getByRole('article').all()

  for (const [i, article] of articles.entries()) {
    const inputDate = article.getByLabel(`Fecha-${i + 1}`)
    await inputDate.fill(`${YEAR}-${formatMonth}-${i + 17}`)
    const inputText = article.getByLabel(`Razón-${i + 1}`)
    await inputText.fill(`Certificado ${i + 1}}`)
  }

  await page.getByRole('button', { name: LABEL_BUTTON.sendRequest }).click()
  await expect(page.getByText('Solicitud enviada correctamente')).toBeVisible()
})
