# Login de usuarios: Inicio de sesión válido
**Escenario:** con un usuario con el rol de **coordinador**.

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | --------------------- | ------------------- | ----------------- |
| **TC-LU-06**          | Log-in de usuarios | Verificar que el sistema permite el acceso y redirige a la ruta establecida para el usuario con el rol de coordinador  | 1.0 | 27/05/2023 |

## Pre-requisitos de la prueba:
1. Se ha accedido a la URL del sitio.

## Pasos de la prueba:
| Paso | Acción | Resultado esperado |
| ---- | ------ | ------------------ |
| 1 | Tipear *"2140"* en el campo **Legajo** | Se muestra el legajo ingresado en el campo **Legajo** |
| 2 | Tipear *"Passw0rd.1234"* en el campo **Contraseña** | Se muestra de forma oculta la contraseña ingresada en el campo **Contraseña** |
| 3 | Cliquear el botón **Ingresar** | El sistema redirige a la ruta *http://localhost:3000/coordinator/daily-part* y muestra el contenido de la página correspondiente |


## Datos de prueba
| Campo | Valor |
| ----- | ----- |
| URL del sitio | https://localhost:3000 |
| Legajo | 2140 |
| Contraseña | Passw0rd.1234 |


## Implementación
La prueba automatizada end-to-end necesita las siguientes dependencias: 
```javascript
import { test, expect } from '@playwright/test'
```
Las **precondiciones** se implementan de la siguiente manera:
```typescript
test.beforeEach(async ({ page }) => {
  await page.goto(URL_LOCAL)
})
```
El test se implementa de la siguiente manera:
```javascript
test('must be a successful login as coordinator user', async ({ page }) => {
  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')

  await inputRecord.fill('2140')
  await inputPassword.fill('Passw0rd.1234')
  await page.getByRole('button', { name: LABEL_BUTTON.login }).click()

  await expect(page).toHaveURL(`${URL_LOCAL}${REDIRECT_FROM_COORDINATOR_TO_PAGE.dailyPart}`)
})
```
> **Nota:** para mayor comprensión, el código completo de la prueba se encuentra en el archivo [ts-login.spec.ts](/e2e/login_test/ts-login.spec.ts).