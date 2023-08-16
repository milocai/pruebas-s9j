# Generar esquemas de trabajo (admin)

**Escenario:** como usuario con rol de **administrador**, deben visualizarse una tabla con los empleados a diagramar para el área "Economato" y el sector "Cocina".

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba                                                                        | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | -------------------------------------------------------------------------------------------- | ------------------- | ----------------- |
| **TC-GET-04**          | Generar Esquema de Trabajo | Verificar que el sistema muestra la tabla de empleados a diagramar para el área "Economato" y el sector "Cocina"| 1.0                 | 22/07/2023        |

## Pre-requisitos de la prueba:

1. Se ha iniciado sesión como usuario con el rol de **administrador**.
2. Existen 5 empleados en el área "Economato" pertenecientes el sector "Cocina".

## Pasos de la prueba:

| Paso | Acción                                                                 | Resultado esperado                                                                                                                                                               |
| ---- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Seleccionar _"Economato"_ en el desplegable que solicita "elegir area" y seleccionar _"Cocina"_ en el desplegable que solicita "elegir sector" | Se muestran "Economato" y "Cocina" como opciones seleccionadas.|
| 2    | Hacer click en el botón _"Buscar"_ | Se muestra la tabla con 5 empleados a diagramar. |

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
test('should select "economato" as the area and "cocina" as the sector and display a table with employee to diagram', async ({
  page
}) => {
  const selects = page.getByTestId('container-select')

  const selectArea = selects.getByRole('combobox').nth(0)
  await selectArea.click()
  await selectArea.selectOption({ value: VALUE_OPTION_AREA_SELECT.Economato })

  const selectSector = selects.getByRole('combobox').nth(1)
  await selectSector.click()
  await selectSector.selectOption({ value: VALUE_OPTION_SECTOR_SELECT.cocina })

  await page.getByRole('button', { name: LABEL_BUTTON.search }).click()
  await page.waitForTimeout(1000)

  const containerTables = page.getByTestId(
    'container-tables-rest-request-and-diagram'
  )
  const tableRestRequest = containerTables.getByRole('table').nth(1)

  const countTr = await tableRestRequest.getByRole('row').count()
  const trEmployee = countTr - 1

  expect(trEmployee).toEqual(5)
})
```

> **Nota:** para mayor comprensión, el código completo de la prueba se encuentra en el archivo [ts-generate-ws.spec.ts]().