# Solicitud de descansos (empleado)

**Escenario:** como usuario con rol de **empleado**, validar que el sistema muestra un titulo indicando el mes para el cual se solicitaran descansos.

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba                                                                        | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | -------------------------------------------------------------------------------------------- | ------------------- | ----------------- |
| **TC-SD-02**          | Solicitudes de Descanso | Verificar que el sistema muestra el titulo indicando el mes en el cual serán solicitados los descansos. | 1.0                 | 22/07/2023        |

## Pre-requisitos de la prueba:

1. Se ha iniciado sesión como usuario con el rol de **empleado**.

## Pasos de la prueba:

| Paso | Acción                                                                 | Resultado esperado                                                                                                                                                               |
| ---- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Ingresar al menú de solicitudes de descanso. | El sistema muestra un titulo indicando el mes para el cual se harán las solicitudes de descanso. |

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
test('should show message indicate the month of rest request', async ({
  page
}) => {
  const { dateMinCalendar } = getRangeDateRequest()

  const date = new Date(dateMinCalendar)
  const dateForMessage = new Date(
    Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDay(), 3, 0, 0)
  )
  const message = dateForMessage
    .toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })
    .toUpperCase()

  const textMonth = page.getByRole('heading', {
    level: 3,
    name: `El pedido de descanso que solicitará será para el mes de: ${message}`
  })
  await expect(textMonth).toBeVisible()
})
```

> **Nota:** para mayor comprensión, el código completo de la prueba se encuentra en el archivo [ts-rest-req.spec.ts](/e2e/menu_employee/ts-rest-req.spec.ts).