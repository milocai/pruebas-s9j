# Listar esquemas de trabajo

**Escenario:** como usuario con rol de **administrador**, validar que se puede acceder a ver en detalle un esquema de trabajo.

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba                                                                        | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | -------------------------------------------------------------------------------------------- | ------------------- | ----------------- |
| **TC-LET-02**          | Visualización de Esquemas de Trabajo | Verificar que el sistema permite visualizar en detalle un esquema de trabajo. | 1.0                 | 22/07/2023        |

## Pre-requisitos de la prueba:

1. Se ha iniciado sesión como usuario con el rol de **administrador**.
2. Se ha accedido al menú de visualización de esquemas de trabajo.

## Pasos de la prueba:

| Paso | Acción                                                                 | Resultado esperado                                                                                                                                                               |
| ---- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Seleccionar el área de _"Economato"_ y el sector de _"Cocina"_. | Se muestra "Economato" y "Cocina" como opciones seleccionadas para el área y sector respectivamente. |
| 2 | Hacer click en el botón _"Buscar"_. | Se muestra un listado de esquemas de trabajo confirmados hasta la fecha actual para el área y el sector seleccionado. |
| 3 | Hacer click en el botón "Ver detalle". | Se muestra el detalle del esquema de trabajo seleccionado y un título que indica el área y sector seleccionado |

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
  await asideMenu.getByRole('link').nth(1).click()
  await page.waitForTimeout(1000)
})
```

Finalmente, la **prueba**:

```typescript
test('should click button detail and show title by area and sector selected', async ({
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

  const articles = page.getByRole('article')
  test.skip((await articles.count()) === 0)

  const firstArticles = articles.nth(0)
  await firstArticles.getByRole('link', { name: LABEL_BUTTON.detail }).click()

  const title = page.getByRole('heading', {
    level: 1,
    name: /Area Economato sector Cocina/i
  })
  await expect(title).toBeVisible()
})
```

> **Nota:** para mayor comprensión, el código completo de la prueba se encuentra en el archivo [ts-list-ws.spec.ts](/e2e/menu_admin/ts-list-ws.spec.ts).