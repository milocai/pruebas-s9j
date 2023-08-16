# Partes diarios (coordinador)

**Escenario:** como usuario con rol de **coordinador**, el botón de enviar nota debe estar deshabilitado si ya existe una.

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba                                                                        | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | -------------------------------------------------------------------------------------------- | ------------------- | ----------------- |
| **TC-PD-04**          | Partes diarios | Verificar que el botón de enviar nota se deshabilita si ya existe una nota. | 1.0                 | 21/07/2023        |

## Pre-requisitos de la prueba:

1. Se ha iniciado sesión como usuario con el rol de **coordinador**.
2. Existen partes diarios para el área de **Economato**.

## Pasos de la prueba:

| Paso | Acción                                                                 | Resultado esperado                                                                                                                                                               |
| ---- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Seleccionar _"Economato"_ en el desplegable que solicita "elegir area" | Se muestra "Economato" como la opción seleccionada. |
| 2    | Cliquear el botón _"buscar"_                                           | El sistema muestra un mensaje indicando que existen partes diarios del área "Economato" para la fecha actual, seguido de un listado de los sectores que contienen partes diarios |
| 3 | Seleccionar el sector "Cocina" | Se despliega el parte diario correspondiente al sector cocina. |
| 4 | Cliquear el botón _"Agregar nota"_ correspondiente a un empleado | Se muestra el formulario para agregar una nota al empleado seleccionado, pero con sus elementos deshabilitados |


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

  await inputRecord.fill(recordUserCoordinator)
  await inputPassword.fill(passwordDefault)
  await page.getByRole('button', { name: LABEL_BUTTON.login }).click()
})
```

Finalmente, la **prueba**:

```typescript
test('send note button should be disabled if textbox have a note', async ({
  page
}) => {
  const selectArea = page.getByRole('combobox')
  await selectArea.click()
  await selectArea.selectOption({ value: VALUE_OPTION_AREA_SELECT.Economato })

  await page.getByRole('button', { name: LABEL_BUTTON.search }).click()
  await page.getByRole('button', { name: 'Sector Cocina' }).click()

  const containerArticlesEmp = page.getByTestId('container-sector-daily-part')
  const articlesEmp = containerArticlesEmp.getByRole('article')
  const firstArticleEmp = articlesEmp.nth(0)
  const modal = firstArticleEmp.getByRole('button', { name: LABEL_BUTTON.addNote })
  await modal.click()

  const textboxDisabled = modal.getByRole('textbox', { disabled: true })
  const buttonDisabled = modal.getByRole('button', {
    name: LABEL_BUTTON.sendNote,
    disabled: true
  })

  expect(textboxDisabled).toBeTruthy()
  expect(buttonDisabled).toBeTruthy()
})
```

> **Nota:** para mayor comprensión, el código completo de la prueba se encuentra en el archivo [ts-daily-part.spec.ts](/e2e/menu_coordinator/ts-daily-part.spec.ts).
