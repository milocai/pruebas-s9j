import { test, expect } from '@playwright/test'

test('test empty inputs login', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')

  await expect(inputRecord).toContainText('')
  await expect(inputPassword).toContainText('')
  await page.getByRole('button', { name: /ingresar/i }).click()

  await expect(page.getByText('El legajo es requerido')).toBeVisible()
  await expect(page.getByText('La contraseña es requerido')).toBeVisible()
})

test('test wrong record', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')
  const textError = page.getByTestId('error-message')

  await inputRecord.fill('4690200')
  await inputPassword.fill('Passw0rd.1234')
  await page.getByRole('button', { name: /ingresar/i }).click()

  expect(
    textError.getByText(
      'Se ha producido un problema al iniciar sesión. Comprueba el legajo y la contraseña'
    )
  )
})

test('test wrong password', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')
  const textError = page.getByTestId('error-message')

  await inputRecord.fill('1234')
  await inputPassword.fill('Passw0rd.123')
  await page.getByRole('button', { name: /ingresar/i }).click()

  expect(
    textError.getByText(
      'Se ha producido un problema al iniciar sesión. Comprueba el legajo y la contraseña'
    )
  )
})

test('should successfull login admin', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')

  await inputRecord.fill('1234')
  await inputPassword.fill('Passw0rd.1234')
  await page.getByRole('button', { name: /ingresar/i }).click()

  // add timeout { timeout: 10000 }
  await expect(page).toHaveURL(
    'http://localhost:3000/economato/adm/generate-scheme'
  )
})

test('should successfull login employee', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')

  await inputRecord.fill('1235')
  await inputPassword.fill('Passw0rd.1234')
  await page.getByRole('button', { name: /ingresar/i }).click()

  // add timeout { timeout: 10000 }
  await expect(page).toHaveURL(
    'http://localhost:3000/economato/employee/rest-request'
  )
})

test('should successfull login coordinator', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')

  await inputRecord.fill('2140')
  await inputPassword.fill('Passw0rd.1234')
  await page.getByRole('button', { name: /ingresar/i }).click()

  await expect(page).toHaveURL(
    'http://localhost:3000/economato/coordinator/daily-part',
    { timeout: 10000 }
  )
})