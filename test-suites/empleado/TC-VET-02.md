# Visualización de esquemas de trabajo

**Escenario:** como usuario con rol de **empleado**, validar que el sistema muestra un título indicando el mes del esquema de trabajo seleccionado para ver.

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba                                                                        | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | -------------------------------------------------------------------------------------------- | ------------------- | ----------------- |
| **TC-VET-02**          | Visualización de Esquemas de Trabajo | Verificar que el sistema muestra un título indicando el mes del esquema de trabajo seleccionado para ver. | 1.0                 | 22/07/2023        |

## Pre-requisitos de la prueba:

1. Se ha iniciado sesión como usuario con el rol de **empleado**.
2. Se ha accedido al menú de visualización de esquemas de trabajo.
3. Existen esquemas de trabajo que involucran al empleado que inició sesión.

## Pasos de la prueba:

| Paso | Acción                                                                 | Resultado esperado                                                                                                                                                               |
| ---- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Ingresar al menú de visualización de esquemas de trabajo. | El sistema muestra el listado de esquemas de trabajo confirmados hasta la fecha actual. |
| 2 | Seleccionar un esquema de trabajo del mes de agosto de 2023. | El sistema muestra una interfaz que contiene el título indicando el mes del esquema de trabajo seleccionado para ver. |

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

  const asideMenu = page.getByRole('complementary')
  await asideMenu.getByRole('link').nth(1).click()
})
```

Finalmente, la **prueba**:

```typescript
test('should show title', async ({ page }) => {
  const articles = page.getByRole('article')
  test.skip((await articles.count()) === 0)

  const firstArticles = articles.nth(0)
  await firstArticles.getByRole('link', { name: LABEL_BUTTON.detail }).click()

  const title = page.getByRole('heading', {
    level: 1,
    name: /esquema de trabajo para el mes: AGOSTO/i
  })
  await expect(title).toBeVisible()
})
```

> **Nota:** para mayor comprensión, el código completo de la prueba se encuentra en el archivo [ts-month-scheme.spec.ts]().