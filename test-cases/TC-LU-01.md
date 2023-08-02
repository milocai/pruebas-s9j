# Login de usuarios: Inicio de sesión no válido
**Escenario:** campos vacíos.

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | --------------------- | ------------------- | ----------------- |
| **TC-LU-01**          | Log-in de usuarios | Verificar que el sistema impide el acceso y muestra un mensaje de error cuando no se completan los campos requeridos | 1.0 | 27/05/2023 |

## Pre-requisitos de la prueba:
N/A.

## Pasos de la prueba:
| Paso | Acción | Resultado esperado |
| ---- | ------ | ------------------ |
| 1 | Acceder a _https://localhost:3000_ | Se debe mostrar en el navegador la pantalla de _inicio de sesión de usuarios_.  |
| 2 | Cliquear el botón *"Ingresar"* | El sistema señala que los campos obligatorios deben ser completados mediante los mensajes: "El legajo es requerido", "La contraseña es requerida" |
<!-- | 4 | cliquear en el botón "Cancelar" | Se debe cancelar la creación del parte diario y volver a la pantalla anterior |

ESTO ES FLUJO ALTERNO -->

## Datos de prueba
| Campo | Valor |
| ----- | ----- |
| URL del sitio | https://localhost:3000 |

## Implementación
La prueba automatizada end-to-end necesita las siguientes dependencias: 
```javascript
import { test, expect } from '@playwright/test'
```
El test se implementa de la siguiente manera:
```javascript
test('must show an error message when the inputs are empty', async ({ page }) => {
  // 1. Acceder a https://localhost:3000
  await page.goto('http://localhost:3000/')

  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')

  // Espera que los campos estén vacíos
  await expect(inputRecord).toContainText('')
  await expect(inputPassword).toContainText('')

  // 2. Cliquear el botón "Ingresar"
  await page.getByRole('button', { name: /ingresar/i }).click()

  // 3. Se espera mensajes de que los campos obligatorios deben ser completados
  await expect(page.getByText('El legajo es requerido')).toBeVisible()
  await expect(page.getByText('La contraseña es requerido')).toBeVisible()
})
```
