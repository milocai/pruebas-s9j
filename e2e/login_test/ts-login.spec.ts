import { test, expect } from '@playwright/test'
import { URL_LOCAL } from '../config'
import { LABEL_BUTTON, PAGE_LOGIN_REDIRECT, REDIRECT_FROM_COORDINATOR_TO_PAGE, REDIRECT_FROM_EMPLOYEE_TO_PAGE } from '../../src/utils/constants'

test.beforeEach(async ({ page }) => {
  await page.goto(URL_LOCAL)
})

test('must show an error message when the inputs are empty', async ({
  page
}) => {
  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')

  await expect(inputRecord).toContainText('')
  await expect(inputPassword).toContainText('')

  await page.getByRole('button', { name: LABEL_BUTTON.login }).click()

  await expect(page.getByText('El legajo es requerido')).toBeVisible()
  await expect(page.getByText('La contraseña es requerido')).toBeVisible()
})

test('must show an error message when entering a wrong record', async ({
  page
}) => {
  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')

  await inputRecord.fill('4690200')
  await inputPassword.fill('Passw0rd.1234')
  await page.getByRole('button', { name: LABEL_BUTTON.login }).click()

  const textError = page.getByText('Se ha producido un problema al iniciar sesión. Comprueba el legajo y la contraseña')
  await expect(textError).toBeVisible()
})

test('must show an error message when entering a wrong password', async ({
  page
}) => {
  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')

  await inputRecord.fill('1234')
  await inputPassword.fill('Passw0rd.123')
  await page.getByRole('button', { name: LABEL_BUTTON.login }).click()

  const textError = page.getByText('Se ha producido un problema al iniciar sesión. Comprueba el legajo y la contraseña')
  await expect(textError).toBeVisible()
})

test('must be a successful login as admin user', async ({ page }) => {
  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')

  await inputRecord.fill('1234')
  await inputPassword.fill('Passw0rd.1234')
  await page.getByRole('button', { name: LABEL_BUTTON.login }).click()

  await expect(page).toHaveURL(`${URL_LOCAL}${PAGE_LOGIN_REDIRECT.Admin}`)
})

test('must be a successful login as employee user', async ({ page }) => {
  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')

  await inputRecord.fill('1235')
  await inputPassword.fill('Passw0rd.1234')
  await page.getByRole('button', { name: LABEL_BUTTON.login }).click()

  await expect(page).toHaveURL(`${URL_LOCAL}${REDIRECT_FROM_EMPLOYEE_TO_PAGE.restRequest}`)
})

test('must be a successful login as coordinator user', async ({ page }) => {
  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')

  await inputRecord.fill('2140')
  await inputPassword.fill('Passw0rd.1234')
  await page.getByRole('button', { name: LABEL_BUTTON.login }).click()

  await expect(page).toHaveURL(`${URL_LOCAL}${REDIRECT_FROM_COORDINATOR_TO_PAGE.dailyPart}`)
})
