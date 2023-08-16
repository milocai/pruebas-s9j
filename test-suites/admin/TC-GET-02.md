# Generar esquemas de trabajo (admin)

**Escenario:** como usuario con rol de **administrador**, deben visualizarse mensajes de inexistencia de solicitudes de descanso para el área "Enfermeria" e inexistencia de  empleados para el sector "Torre 25".

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba                                                                        | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | -------------------------------------------------------------------------------------------- | ------------------- | ----------------- |
| **TC-GET-02**          | Generar Esquema de Trabajo | Verificar que el sistema muestra mensajes de inexistencia de solicitudes de descanso para el área "Enfermería" e inexistencia de empleados para el Sector "Torre 25" | 1.0                 | 22/07/2023        |

## Pre-requisitos de la prueba:

1. Se ha iniciado sesión como usuario con el rol de **administrador**.

## Pasos de la prueba:

| Paso | Acción                                                                 | Resultado esperado                                                                                                                                                               |
| ---- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Seleccionar _"Enfermeria"_ en el desplegable que solicita "elegir area" y seleccionar _"Torre 25"_ en el desplegable que solicita "seleccionar sector" | Se muestran "Enfermeria" y "Torre 25" como opciones seleccionadas.|
| 2    | Hacer click en el botón _"Buscar"_ | Se muestran los mensajes "No hay solicitudes de descansos" y "No hay empleados en este sector". |

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
test('should select "Enfermeri­a" as the area and "Torre 25" as the sector and display a label to indicating that "No hay solicitudes de descansos" and "No hay empleados en este sector"', async ({
  page
}) => {
  const selects = page.getByTestId('container-select')

  const selectArea = selects.getByRole('combobox').nth(0)
  await selectArea.click()
  await selectArea.selectOption({ value: VALUE_OPTION_AREA_SELECT.Enfermeria })

  const selectSector = selects.getByRole('combobox').nth(1)
  await selectSector.click()
  await selectSector.selectOption({
    value: VALUE_OPTION_SECTOR_SELECT.torres_25
  })

  await page.getByRole('button', { name: LABEL_BUTTON.search }).click()
  await page.waitForTimeout(1000)

  const titleNotRestRequest = page.getByRole('heading', {
    level: 2,
    name: /No hay solicitudes de descansos/i
  })
  const titleNotEmployees = page.getByRole('row', {
    name: /No hay empleados en este sector/i
  })

  await expect(titleNotRestRequest).toBeVisible()
  await expect(titleNotEmployees).toBeVisible()
})
```

> **Nota:** para mayor comprensión, el código completo de la prueba se encuentra en el archivo [ts-generate-ws.spec.ts]().