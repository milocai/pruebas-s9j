# Partes diarios (admin)

**Escenario:** como usuario con rol de **administrador**, visualizar titulo que indique la existencia de partes diarios para un área en la fecha actual.

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba                                                                                                                | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------- | ----------------- |
| **TC-PD-02**          | Partes diarios | Verificar que el sistema muestra un título que indica la existencia de partes diarios para un área en particular en la fecha actual. | 1.0                 | 21/07/2023        |

## Pre-requisitos de la prueba:

1. Se ha iniciado sesión como usuario con el rol de **administrador**.
2. Existen partes diarios para el área de **Economato**.
3. Se accede al módulo de **partes diarios**.

## Pasos de la prueba:

| Paso | Acción                                                                 | Resultado esperado                                                                                            |
| ---- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 1    | Seleccionar _"Economato"_ en el desplegable que solicita "elegir area" | Se muestra "Economato" como la opción seleccionada.                                                           |
| 2    | Cliquear el botón _"buscar"_                                           | El sistema muestra un mensaje indicando que existen partes diarios del área "Economato" para la fecha actual. |

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
test('should select "Economato" as the area and display a label indicating that there are daily parts for the current date', async ({
  page,
}) => {
  const areaSelect = page.getByRole("combobox");
  const searchButton = page.getByRole("button", { name: LABEL_BUTTON.search });

  await areaSelect.click();
  await areaSelect.selectOption({ value: VALUE_OPTION_AREA_SELECT.Economato });
  await searchButton.click();

  const dateToday = new Date();
  const dateForMessage = new Date(
    Date.UTC(
      dateToday.getFullYear(),
      dateToday.getMonth(),
      dateToday.getDate(),
      3,
      0,
      0
    )
  );
  const message = dateForMessage
    .toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();

  const label = page.getByRole("heading", {
    level: 2,
    name: `Fecha: ${message}`,
  });

  await expect(label).toBeVisible();
});
```

> **Nota:** para mayor comprensión, el código completo de la prueba se encuentra en el archivo [ts-daily-part.spec.ts]().