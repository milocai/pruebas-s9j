# Generar esquemas de trabajo (admin)

**Escenario:** como usuario con rol de **administrador**, validar que el sistema muestran mensajes de éxito cuando se cambian dos turnos y se guarda el esquema de trabajo.

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba                                                                        | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | -------------------------------------------------------------------------------------------- | ------------------- | ----------------- |
| **TC-GET-06**          | Generar Esquema de Trabajo | Verificar que el sistema muestran mensajes de éxito y guarda los cambios realizados en un esquema de trabajo | 1.0                 | 22/07/2023        |

## Pre-requisitos de la prueba:

1. Se ha iniciado sesión como usuario con el rol de **administrador**.
2. Existen 5 empleados en el área "Economato" pertenecientes el sector "Cocina".

## Pasos de la prueba:

| Paso | Acción                                                                 | Resultado esperado                                                                                                                                                               |
| ---- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Seleccionar _"Economato"_ en el desplegable que solicita "elegir area" y seleccionar _"Cocina"_ en el desplegable que solicita "elegir sector" | Se muestran "Economato" y "Cocina" como opciones seleccionadas.|
| 2    | Hacer click en el botón _"Buscar"_ | Se muestra la tabla con 5 empleados a diagramar y con la cantidad de columnas igual a la cantidad de dias del mes a diagramar. |
| 3 | Seleccionar, para el primer empleado, el turno "I" para los selectores de los días en las columnas 3 y 4. | Se muestran los selectores de los días en las columnas 3 y 4 con el turno "I" seleccionado. |
| 4 | Cliquear el botón _"Validar y Guardar"_ | Se muestra los mensajes de éxito: "Diagrama validado" y "Se generó el diagrama correctamente". |

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
test('should select "economato" as the area and "cocina" as the sector and change two turn day and show message success', async ({
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

  const dayFirstChange = page.locator('select[name="day-1-3"]')
  const daySecondChange = page.locator('select[name="day-1-4"]')

  await dayFirstChange.click()
  await dayFirstChange.selectOption({ value: 'I' })
  await daySecondChange.click()
  await daySecondChange.selectOption({ value: 'I' })

  const buttonValidateAndSave = page.getByRole('button', {
    name: LABEL_BUTTON.generateWs
  })
  await buttonValidateAndSave.click()
  await page.waitForTimeout(1000)

  await expect(page.getByText('Diagrama validado')).toBeVisible()
  await expect(
    page.getByText('Se generó el diagrama correctamente')
  ).toBeVisible()
})
```

> **Nota:** para mayor comprensión, el código completo de la prueba se encuentra en el archivo [ts-generate-ws.spec.ts](/e2e/menu_admin/ts-generate-ws.spec.ts).