# Solicitud de descansos (empleado)

**Escenario:** como usuario con rol de **empleado**, validar que el sistema muestra un mensaje de éxito cuando se ingresa una solicitud de descanso después del 15 del mes actual.

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba                                                                        | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | -------------------------------------------------------------------------------------------- | ------------------- | ----------------- |
| **TC-SD-14**          | Solicitudes de Descanso | Verificar que el sistema muestra un mensaje de éxito cuando se ingresa una solicitud de descanso después del 15 del mes actual. | 1.0                 | 22/07/2023        |

## Pre-requisitos de la prueba:

1. Se ha iniciado sesión como usuario con el rol de **empleado**.
2. La fecha actual es mayor al día 15 del mes actual.

## Pasos de la prueba:

| Paso | Acción                                                                 | Resultado esperado                                                                                                                                                               |
| ---- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Ingresar al menú de solicitudes de descanso. | El sistema muestra un titulo indicando el mes para el cual se harán las solicitudes de descanso, seguido de un formulario que contiene un cuadro de solicitud de descanso. |
| 2 | Oprimir el botón de "Agregar Fecha". | El sistema muestra dos cuadros de solicitud de descanso. |
| 3 | En el primer cuadro de solicitud de descanso: seleccionar el día 17 del mes siguiente y completar el campo _"Razón"_ con el texto _"Certificado 1"_ . | El sistema muestra el día seleccionado en el cuadro de solicitud de descanso completado y los respectivos datos ingresados. |
| 4 | En el segundo cuadro de solicitud de descanso: seleccionar el día 18 del mes siguiente y completar el campo _"Razón"_ con el texto _"Certificado 2"_ . | El sistema muestra el día seleccionado en el cuadro de solicitud de descanso completado y los respectivos datos ingresados. |
| 5 | Oprimir el botón de "Enviar Solicitud" | El sistema muestra un mensaje de éxito indicando que la solicitud de descanso ha sido enviada. |



## Datos de prueba

N/A.

## Implementación

La prueba automatizada end-to-end necesita las siguientes **dependencias**:

```typescript
import { test, expect } from "@playwright/test";
```

Las **precondiciones** se implementan de la siguiente manera:

```typescript
test.beforeEach(async ({ page }) => {
  await page.goto(URL_LOCAL)

  const inputRecord = page.getByTestId('input-record')
  const inputPassword = page.getByTestId('input-password')

  await inputRecord.fill(recordUserEmployee)
  await inputPassword.fill(passwordDefault)
  await page.getByRole('button', { name: LABEL_BUTTON.login }).click()
})
```

Finalmente, la **prueba**:

```typescript
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
  await expect(page.getByRole('status')).toBeVisible()
})
```

> **Nota 1:** la prueba se omite si la fecha actual es inferior al día 15 del mes actual.

> **Nota 2:** para mayor comprensión, el código completo de la prueba se encuentra en el archivo [ts-rest-req.spec.ts](/e2e/menu_employee/ts-rest-req.spec.ts).