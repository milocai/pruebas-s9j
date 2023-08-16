# Novedades mensuales

**Escenario:** como usuario con rol de **administrador**, visualizar un mensaje indicando que no existen novedades.

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba                                                                        | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | -------------------------------------------------------------------------------------------- | ------------------- | ----------------- |
| **TC-NM-01**          | Visualización de Novedades mensuales | Verificar que el sistema muestra un mensaje indicando que no hay novedades para el mes de agosto del año 2023 para el área Enfermeria. | 1.0                 | 22/07/2023        |

## Pre-requisitos de la prueba:

1. Se ha iniciado sesión como usuario con el rol de **administrador**.
2. Se ha accedido al menú de visualización novedades mensuales.
3. Se ha seleccionado el mes de agosto del 2023.
4. No existen novedades para agosto del 2023 para el área de Enfermeria.

## Pasos de la prueba:

| Paso | Acción                                                                 | Resultado esperado                                                                                                                                                               |
| ---- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Seleccionar el área de _"Enfermería"_ | Se muestra la selección realizada |
| 2 | Hacer click en el botón _"Buscar"_. | Se muestra el mensaje: "No existen novedades para el mes: Agosto de 2023 para el área: Enfermeria." |

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

  await inputRecord.fill(recordUserAdmin)
  await inputPassword.fill(passwordDefault)
  await page.getByRole('button', { name: LABEL_BUTTON.login }).click()

  const asideMenu = page.getByRole('complementary')
  await asideMenu.getByRole('link').nth(3).click()
  await page.waitForTimeout(1000)

  const selects = page.getByTestId('container-select')

  const selectMonth = selects.getByRole('combobox').nth(1)
  await selectMonth.click()
  await selectMonth.selectOption({ value: 'agosto' })

  const selectYear = selects.getByRole('combobox').nth(2)
  await selectYear.click()
  await selectYear.selectOption({ value: '2023' })
})
```

Finalmente, la **prueba**:

```typescript
test('should select "Enfermeria" as the area, august as the month and 2023 as year and display a label to indicating that there are no news/notes for that area', async ({
  page
}) => {
  const selects = page.getByTestId('container-select')

  const selectArea = selects.getByRole('combobox').nth(0)
  await selectArea.click()
  await selectArea.selectOption({ value: VALUE_OPTION_AREA_SELECT.Enfermeria })

  await page.getByRole('button', { name: LABEL_BUTTON.search }).click()

  const label = page.getByRole('heading', {
    level: 2,
    name: 'No se encontraron novedades para mes: Agosto de 2023 para el area: Enfermeria'
  })

  await expect(label).toBeVisible()
})
```

> **Nota:** para mayor comprensión, el código completo de la prueba se encuentra en el archivo [ts-monthly-report.spec.ts]().