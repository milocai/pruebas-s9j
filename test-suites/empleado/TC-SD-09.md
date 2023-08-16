# Solicitud de descansos (empleado)

**Escenario:** como usuario con rol de **empleado**, validar que el sistema muestra siete cuadros de solicitud de descanso al agregar seis fechas.

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba                                                                        | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | -------------------------------------------------------------------------------------------- | ------------------- | ----------------- |
| **TC-SD-09**          | Solicitudes de Descanso | Verificar que el sistema muestra siete cuadros de solicitud de descanso luego de oprimir seis veces el botón "Agregar fecha" | 1.0                 | 22/07/2023        |

## Pre-requisitos de la prueba:

1. Se ha iniciado sesión como usuario con el rol de **empleado**.

## Pasos de la prueba:

| Paso | Acción                                                                 | Resultado esperado                                                                                                                                                               |
| ---- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Ingresar al menú de solicitudes de descanso. | El sistema muestra un titulo indicando el mes para el cual se harán las solicitudes de descanso, seguido de un formulario que contiene un cuadro de solicitud de descanso. |
| 2 | Oprimir el botón "Agregar fecha". | El sistema muestra un segundo cuadro de solicitud de descanso. |
| 3 | Oprimir el botón "Agregar fecha". | El sistema muestra un tercer cuadro de solicitud de descanso. |
| 4 | Oprimir el botón "Agregar fecha". | El sistema muestra un cuarto cuadro de solicitud de descanso. |
| 5 | Oprimir el botón "Agregar fecha". | El sistema muestra un quinto cuadro de solicitud de descanso. |
| 6 | Oprimir el botón "Agregar fecha". | El sistema muestra un sexto cuadro de solicitud de descanso. |
| 7 | Oprimir el botón "Agregar fecha". | El sistema muestra un séptimo cuadro de solicitud de descanso. |


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
})
```

Finalmente, la **prueba**:

```typescript
test('should six times on button add date and show seven articles', async ({
  page
}) => {
  const buttonAdd = page.getByRole('button', { name: LABEL_BUTTON.addDate })

  for (let i = 0; i < 6; i++) {
    await buttonAdd.click()
  }

  const articles = await page.getByRole('article').count()
  expect(articles).toEqual(7)
})
```

> **Nota:** para mayor comprensión, el código completo de la prueba se encuentra en el archivo [ts-rest-req.spec.ts](/e2e/menu_employee/ts-rest-req.spec.ts).