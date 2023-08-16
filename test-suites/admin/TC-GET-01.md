# Generar esquemas de trabajo (admin)

**Escenario:** como usuario con rol de **administrador**, debe visualizarse el mes para el cual se está por generar el esquema de trabajo.

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba                                                                        | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | -------------------------------------------------------------------------------------------- | ------------------- | ----------------- |
| **TC-GET-01**          | Generar Esquema de Trabajo | Verificar que el sistema muestra correctamente el mes para el cual se está por generar el esquema de trabajo. | 1.0                 | 22/07/2023        |

## Pre-requisitos de la prueba:

1. Se ha iniciado sesión como usuario con el rol de **administrador**.

## Pasos de la prueba:

| Paso | Acción                                                                 | Resultado esperado                                                                                                                                                               |
| ---- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Seleccionar _"Economato"_ en el desplegable que solicita "elegir area" y seleccionar _"Cocina"_ en el desplegable que solicita "seleccionar sector" | Se muestran "Economato" y "Cocina" como opciones seleccionadas.|
| 2    | Hacer click en el botón _"Buscar"_ | Se muestra un título con el mes para el cual se está por generar el esquema de trabajo. |

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
  await page.goto(URL_LOCAL);

  const inputRecord = page.getByTestId("input-record");
  const inputPassword = page.getByTestId("input-password");

  await inputRecord.fill(recordUserAdmin);
  await inputPassword.fill(passwordDefault);
  await page.getByRole("button", { name: LABEL_BUTTON.login }).click();

  const asideMenu = page.getByRole("complementary");
  await asideMenu.getByRole("link").nth(2).click();
  await page.waitForTimeout(1000);
});
```

Finalmente, la **prueba**:

```typescript
test('must show the month for which the work scheme is to be generated', async ({
  page
}) => {
  const asideMenu = page.getByRole('complementary')
  await asideMenu.getByRole('link').nth(0).click()

  const areaSelect = page.getByRole('combobox').nth(0)
  await areaSelect.click()
  await areaSelect.selectOption({ value: VALUE_OPTION_AREA_SELECT.Economato })

  const sectorSelect = page.getByRole('combobox').nth(1)
  await sectorSelect.click()
  await sectorSelect.selectOption({ value: VALUE_OPTION_SECTOR_SELECT.cocina })

  const searchButton = page.getByRole('button', { name: LABEL_BUTTON.search })
  await searchButton.click()

  const dateToday = new Date()
  const dateNext = new Date(dateToday)
  dateNext.setMonth(dateToday.getMonth() + 1)
  const month = dateNext.toLocaleString('es-ES', { month: 'long' })

  await expect(
    page.getByRole('heading', {
      name: `Esquema de trabajo para el mes de: ${month}`
    })
  ).toBeVisible()
})
```

> **Nota:** para mayor comprensión, el código completo de la prueba se encuentra en el archivo [ts-generate-ws.spec.ts]().