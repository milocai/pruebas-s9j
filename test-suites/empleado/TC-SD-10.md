# Solicitud de descansos (empleado)

**Escenario:** como usuario con rol de **empleado**, validar que el sistema elimina un cuadro de solicitud de descanso.

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba                                                                        | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | -------------------------------------------------------------------------------------------- | ------------------- | ----------------- |
| **TC-SD-10**          | Solicitudes de Descanso | Verificar que el sistema elimina un cuadro de solicitud de descanso cuando se pulsa el botón "✕" | 1.0                 | 22/07/2023        |

## Pre-requisitos de la prueba:

1. Se ha iniciado sesión como usuario con el rol de **empleado**.

## Pasos de la prueba:

| Paso | Acción                                                                 | Resultado esperado                                                                                                                                                               |
| ---- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Ingresar al menú de solicitudes de descanso. | El sistema muestra un titulo indicando el mes para el cual se harán las solicitudes de descanso, seguido de un formulario que contiene un cuadro de solicitud de descanso. |
| 2 | Oprimir el botón "Agregar fecha". | El sistema muestra un segundo cuadro de solicitud de descanso. |
| 3 | Oprimir el botón "Agregar fecha". | El sistema muestra un tercer cuadro de solicitud de descanso. |
| 4 | Oprimir el botón "✕" | El sistema elimina el tercer cuadro de solicitud de descanso. |


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
test('should subtract an article when click on button ✕', async ({ page }) => {
  const buttonAdd = page.getByRole('button', { name: LABEL_BUTTON.addDate })
  await buttonAdd.click()
  await buttonAdd.click()

  const buttonRemove = page
    .getByRole('button', { name: LABEL_BUTTON.removeRequest })
    .first()
  await buttonRemove.click()

  const articles = await page.getByRole('article').count()
  expect(articles).toEqual(2)
})
```

> **Nota:** para mayor comprensión, el código completo de la prueba se encuentra en el archivo [ts-rest-req.spec.ts](/e2e/menu_employee/ts-rest-req.spec.ts).