# Login de usuarios: Inicio de sesión no válido
**Escenario:** campos vacíos.

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | --------------------- | ------------------- | ----------------- |
| **TC-LU-01**          | Log-in de usuarios | Verificar que el sistema impide el acceso y muestra un mensaje de error cuando no se completan los campos requeridos | 1.0 | 27/05/2023 |

## Pre-requisitos de la prueba:
1. Se accede a la URL del sistema.

## Pasos de la prueba:
| Paso | Acción | Resultado esperado |
| ---- | ------ | ------------------ |
| 1 | Cliquear el botón *"Ingresar"* | El sistema señala que los campos obligatorios deben ser completados mediante los mensajes: "El legajo es requerido", "La contraseña es requerida" |

## Datos de prueba
| Campo | Valor |
| ----- | ----- |
| URL del sitio | https://localhost:3000 |

## Implementación
La prueba automatizada end-to-end necesita las siguientes **dependencias**: 
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
```typescript
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
```
