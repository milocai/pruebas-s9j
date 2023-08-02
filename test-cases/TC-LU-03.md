# Login de usuarios: Inicio de sesión erróneo
**Escenario:** contraseña incorrecta.

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | --------------------- | ------------------- | ----------------- |
| **TC-LU-03**          | Log-in de usuarios | Verificar que el sistema impide el acceso y muestra un mensaje de error cuando la contraseña ingresada no es correcta  | 1.0 | 27/05/2023 |

## Pre-requisitos de la prueba:
N/A.
<!-- Existe un usuario con legajo *"1234"* y contraseña *"Passw0rd.1234"*. -->

## Pasos de la prueba:
| Paso | Acción | Resultado esperado |
| ---- | ------ | ------------------ |
| 1 | Acceder a _https://localhost:3000_ | Se muestra en el navegador la pantalla de _inicio de sesión de usuarios_.  |
| 2 | Tipear *"1234"* en el campo **Legajo** | Se muestra el legajo ingresado en el campo **Legajo** |
| 3 | Tipear *"Passw0rd.123"* en el campo **Contraseña** | Se muestra de forma oculta la contraseña ingresada en el campo **Contraseña** |
| 4 | Cliquear el botón **Ingresar** | El sistema muestra el mensaje *"Se ha producido un problema al iniciar sesión. Comprueba el legajo y la contraseña"* |


## Datos de prueba
| Campo | Valor |
| ----- | ----- |
| URL del sitio | https://localhost:3000 |
| Legajo | 1234 |
| Contraseña | Passw0rd.123 |


## Implementación
La prueba automatizada end-to-end necesita las siguientes dependencias: 
```javascript
import { test, expect } from '@playwright/test'
```
El test se implementa de la siguiente manera:
```javascript
test('must show an error message when entering a wrong password', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')
  const textError = page.getByTestId('error-message')

  await inputRecord.fill('1234')
  await inputPassword.fill('Passw0rd.123')
  await page.getByRole('button', { name: /ingresar/i }).click()

  expect(textError).toBeVisible()
  expect(textError).toHaveText('Se ha producido un problema al iniciar sesión. Comprueba el legajo y la contraseña')
})
```