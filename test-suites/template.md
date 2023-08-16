# Test cases template
## Nomenclatura para nombrar los archivos:  

_**TC**-**PD**-**01**_  
  
Donde:
- **TC** indica que es un test case
- **PD** indica que pertenece al caso de uso/módulo de partes diarios.
- **01** indica el número de test case.  

## Encabezado del caso de prueba:

| ID del caso de prueba | C. Uso/ Módulo | Objetivo de la prueba | Versión del sistema | Fecha de creación |
| --------------------- | -------------- | --------------------- | ------------------- | ----------------- |
| **TC-PD-01**          | Partes Diarios | Verificar que el sistema permita crear un parte diario | 1.0 | 01/01/2021 |

## Pre-requisitos de la prueba:
1. El usuario debe estar logueado en el sistema.
2. El usuario debe tener permisos para crear partes diarios.
3. etc.

## Pasos de la prueba:
| Paso | Acción | Resultado esperado |
| ---- | ------ | ------------------ |
| 1 | cliquear en el botón "Nuevo Parte Diario" | Se debe abrir el formulario para crear un nuevo parte diario |
| 2 | completar los [campos obligatorios](#datos-de-prueba) | Se debe poder completar los campos obligatorios |
| 3 | cliquear en el botón "Guardar" | Se debe guardar el parte diario y mostrar un mensaje de éxito |

## Datos de prueba
| Campo | Valor |
| ----- | ----- |
| Fecha | 01/01/2021 |
| Hora de inicio | 08:00 |