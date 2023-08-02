# Login de usuarios: Inicio de sesión válido
**Escenario:** con un usuario con el rol de **empleado**.

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | --------------------- | ------------------- | ----------------- |
| **TC-LU-05**          | Log-in de usuarios | Verificar que el sistema permite el acceso y redirige a la ruta establecida para el usuario con el rol de empleado  | 1.0 | 27/05/2023 |

## Pre-requisitos de la prueba:
N/A.
<!-- Existe un usuario con legajo *"1234"* y contraseña *"Passw0rd.1234"*. -->

## Pasos de la prueba:
| Paso | Acción | Resultado esperado |
| ---- | ------ | ------------------ |
| 1 | Acceder a _https://localhost:3000_ | Se muestra en el navegador la pantalla de _inicio de sesión de usuarios_.  |
| 2 | Tipear *"1235"* en el campo **Legajo** | Se muestra el legajo ingresado en el campo **Legajo** |
| 3 | Tipear *"Passw0rd.1234"* en el campo **Contraseña** | Se muestra de forma oculta la contraseña ingresada en el campo **Contraseña** |
| 4 | Cliquear el botón **Ingresar** | El sistema redirige a la ruta *http://localhost:3000/economato/employee/rest-request* y muestra el contenido de la página correspondiente |


## Datos de prueba
| Campo | Valor |
| ----- | ----- |
| URL del sitio | https://localhost:3000 |
| Legajo | 1235 |
| Contraseña | Passw0rd.1234 |


## Implementación
La prueba automatizada end-to-end necesita las siguientes dependencias: 
```javascript
import { test, expect } from '@playwright/test'
```
El test se implementa de la siguiente manera:
```javascript
test('must be a successful login as employee user', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')

  await inputRecord.fill('1235')
  await inputPassword.fill('Passw0rd.1234')
  await page.getByRole('button', { name: /ingresar/i }).click()

  await expect(page).toHaveURL(
    'http://localhost:3000/economato/employee/rest-request'
  )
})
```