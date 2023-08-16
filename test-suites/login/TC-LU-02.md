# Login de usuarios: Inicio de sesión erróneo
**Escenario:** legajo incorrecto.

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | --------------------- | ------------------- | ----------------- |
| **TC-LU-02**          | Log-in de usuarios | Verificar que el sistema impide el acceso y muestra un mensaje de error cuando el legajo ingresado no es correcto  | 1.0 | 27/05/2023 |

## Pre-requisitos de la prueba:
N/A.

## Pasos de la prueba:
| Paso | Acción | Resultado esperado |
| ---- | ------ | ------------------ |
| 1 | Acceder a _https://localhost:3000_ | Se debe mostrar en el navegador la pantalla de _inicio de sesión de usuarios_.  |
| 2 | Tipear *"4690200"* en el campo **Legajo** | El sistema debe mostrar el legajo ingresado en el campo **Legajo** |
| 3 | Tipear *"Passw0rd.1234"* en el campo **Contraseña** | El sistema debe mostrar de forma oculta la contraseña ingresada en el campo **Contraseña** |
| 4 | Cliquear el botón **Ingresar** | El sistema muestra el mensaje *"Se ha producido un problema al iniciar sesión. Comprueba el legajo y la contraseña"* |
<!-- | 4 | cliquear en el botón "Cancelar" | Se debe cancelar la creación del parte diario y volver a la pantalla anterior |

ESTO ES FLUJO ALTERNO -->

## Datos de prueba
| Campo | Valor |
| ----- | ----- |
| URL del sitio | https://localhost:3000 |
| Legajo | 4690200 |
| Contraseña | Passw0rd.1234 |


## Implementación
La prueba automatizada end-to-end necesita las siguientes dependencias: 
```javascript
import { test, expect } from '@playwright/test'
```
El test se implementa de la siguiente manera:
```javascript
test('must show an error message when entering a wrong record', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')
  const textError = page.getByTestId('error-message')

  await inputRecord.fill('4690200')
  await inputPassword.fill('Passw0rd.1234')
  await page.getByRole('button', { name: /ingresar/i }).click()

  expect(textError).toBeVisible()
  expect(textError).toHaveText('Se ha producido un problema al iniciar sesión. Comprueba el legajo y la contraseña')
})
```