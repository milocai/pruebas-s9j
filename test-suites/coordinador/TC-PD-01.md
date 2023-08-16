# Partes diarios (coordinador)

**Escenario:** como usuario con rol de **coordinador**, visualizar titulo que indique la inexistencia de partes diarios para un área.

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba                                                                                           | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | --------------------------------------------------------------------------------------------------------------- | ------------------- | ----------------- |
| **TC-PD-01**          | Partes diarios | Verificar que el sistema muestra un título que indica que no existen partes diarios para un área en particular. | 1.0                 | 21/07/2023        |

## Pre-requisitos de la prueba:

1. Se ha iniciado sesión como usuario con el rol de **coordinador**.
2. No existen partes diarios para el área de **Enfermeria**.

## Pasos de la prueba:

| Paso | Acción                                                                  | Resultado esperado                                                                                                |
| ---- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 1    | Seleccionar _"Enfermeria"_ en el desplegable que solicita "elegir area" | Se muestra "Enfermeria" como la opción seleccionada.                                                              |
| 2    | Cliquear el botón _"buscar"_                                            | El sistema muestra un mensaje indicando que no existen partes diarios del área "Enfermeria" para la fecha actual. |

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

Finalmente, la prueba:

```typescript
test('should select nursing as the area and display a label to indicating that there are no daily parts for that area', async ({
  page
}) => {
  const areaSelect = page.getByRole('combobox')
  const searchButton = page.getByRole('button', { name: LABEL_BUTTON.search })

  await areaSelect.click()
  await areaSelect.selectOption({ value: VALUE_OPTION_AREA_SELECT.Enfermeria })
  await searchButton.click()

  const dateToday = new Date()
  const month = dateToday.getMonth() + 1
  const formatMonth = month < 10 ? `0${month}` : month
  const formatDay = dateToday.getDate() < 10 ? `0${dateToday.getDate()}` : dateToday.getDate()

  const message = `${dateToday.getFullYear()}-${formatMonth}-${formatDay}`

  const label = page.getByRole('heading', {
    level: 2,
    name: `No hay partes diarios para el area: ENFERMERIA en la fecha: ${message}`
  })

  await expect(label).toBeVisible()
})
```

> **Nota:** para mayor comprensión, el código completo de la prueba se encuentra en el archivo [ts-daily-part.spec.ts]().
