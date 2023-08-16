# Login de usuarios: Inicio de sesión erróneo
**Escenario:** legajo incorrecto.

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | --------------------- | ------------------- | ----------------- |
| **TC-LU-02**          | Log-in de usuarios | Verificar que el sistema impide el acceso y muestra un mensaje de error cuando el legajo ingresado no es correcto  | 1.0 | 27/05/2023 |

## Pre-requisitos de la prueba:
1. Se ha accedido a la URL del sitio.

## Pasos de la prueba:
| Paso | Acción | Resultado esperado |
| ---- | ------ | ------------------ |
| 1 | Tipear *"4690200"* en el campo **Legajo** | El sistema debe mostrar el legajo ingresado en el campo **Legajo** |
| 2 | Tipear *"Passw0rd.1234"* en el campo **Contraseña** | El sistema debe mostrar de forma oculta la contraseña ingresada en el campo **Contraseña** |
| 3 | Cliquear el botón **Ingresar** | El sistema muestra el mensaje *"Se ha producido un problema al iniciar sesión. Comprueba el legajo y la contraseña"* |


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
Las **precondiciones** se implementan de la siguiente manera:
```typescript
test.beforeEach(async ({ page }) => {
  await page.goto(URL_LOCAL)
})
```
El test se implementa de la siguiente manera:
```javascript
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
```
> **Nota:** para mayor comprensión, el código completo de la prueba se encuentra en el archivo [ts-login.spec.ts](/e2e/login_test/ts-login.spec.ts).