# Casos de prueba
Los casos de prueba diseñados para este proyecto se agruparán en suites. Cada suite contendrá los casos de prueba de un módulo o caso de uso en particular.

> **NOTA**: Datos de entrada para todos los TC se encuentran en: [config.ts](/e2e/config.tsx)

## Suites de pruebas
La primera suite de pruebas a nivel general es la siguiente
#### Login de usuarios
- [TC-LU-01](login/TC-LU-01.md): Login sin completar campos obligatorios.
- [TC-LU-02](login/TC-LU-02.md): Login con legajo incorrecto.
- [TC-LU-03](login/TC-LU-03.md): Login con contraseña incorrecta.
- [TC-LU-04](login/TC-LU-04.md): Login exitoso (admin).
- [TC-LU-05](login/TC-LU-05.md): Login exitoso (empleado).
- [TC-LU-06](login/TC-LU-06.md): Login exitoso (coordinador).

A continuacion se agruparán suites de prueba de acuerdo a los roles de usuario:

#### Rol de administrador
- **TS: Partes diarios**
    - [TC-PD-01](admin/TC-PD-01.md): Visualizar titulo de inexistencia de partes diarios para un área.
    - [TC-PD-02](admin/TC-PD-02.md): Visualizar titulo de existencia de partes diarios para un área en la fecha actual.
    - [TC-PD-03](admin/TC-PD-03.md): Visualizar un mensaje de éxito cuando se añade una nota como novedad.
    - [TC-PD-04](admin/TC-PD-04.md): Deshabilitar el botón "enviar nota" si ya existe una.

- **TS: Generar esquema de trabajo**
    - [TC-GET-01](admin/TC-GET-01.md): Visualizar el mes para el cual se está por generar el esquema de trabajo.
    - [TC-GET-02](admin/TC-GET-02.md): Mostrar mensajes de inexistencia de solicitudes de descanso para un área y sector en particular.
    - [TC-GET-03](admin/TC-GET-03.md): Visualizar solicitudes de descanso para un área y sector en particular.
    - [TC-GET-04](admin/TC-GET-04.md): Visualizar los empleados a diagramar.
    - [TC-GET-05](admin/TC-GET-05.md): La tabla del esquema de trabajo muestra los días del mes a diagramar.
    - [TC-GET-06](admin/TC-GET-06.md): Cambios en el esquema y guardado de los mismos.
    - [TC-GET-07](admin/TC-GET-07.md): Visualizar los cambios realizados en el esquema de trabajo.

- **TS: Visualizar esquemas de trabajo**
    - [TC-LET-01](admin/TC-LET-01.md): Mostrar listado de esquemas de trabajo.
    - [TC-LET-02](admin/TC-LET-02.md): Ver detalle de un esquema de trabajo.
    - [TC-LET-03](admin/TC-LET-03.md): Se muestran correctamente los dias de Agosto en el detalle de un esquema.
    - [TC-LET-04](admin/TC-LET-04.md): Se muestran los empleados en el detalle del esquema del mes de Agosto.

- **TS: Visualizar novedades mensuales**
    - [TC-NM-01](admin/TC-NM-01.md): Mensaje indicando que no existen novedades.
    - [TC-NM-02](admin/TC-NM-02.md): Visualizar novedades de un área y sector.
    - [TC-NM-03](admin/TC-NM-03.md): Visualizar novedades de un empleado para un mes en particular.

#### Rol de coordinador
- **TS: partes diarios**
    - [TC-PD-01](coordinador/TC-PD-01.md): Visualizar titulo de inexistencia de partes diarios para un área.
    - [TC-PD-02](coordinador/TC-PD-02.md): Visualizar titulo de existencia de partes diarios para un área en la fecha actual.
    - [TC-PD-03](coordinador/TC-PD-03.md): Visualizar un mensaje de éxito cuando se añade una nota como novedad.
    - [TC-PD-04](coordinador/TC-PD-04.md): Deshabilitar el botón "enviar nota" si ya existe una.

#### Rol de empleado
- **TS: solicitudes de descansos**
    - [TC-SD-01](empleado/TC-SD-01.md): Visualizar nombre completo y legajo del empleado.
    - [TC-SD-02](empleado/TC-SD-02.md): Visualizar titulo de mes para el cual se solicitaran descansos.
    - [TC-SD-03](empleado/TC-SD-03.md): Visualizar un cuadro de solicitud de descanso luego de iniciar sesión.
    - [TC-SD-04](empleado/TC-SD-04.md): Visualizar dos cuadros de solicitud de descanso al agregar una fecha.
    - [TC-SD-05](empleado/TC-SD-05.md): Visualizar tres cuadros de solicitud de descanso al agregar dos fechas.
    - [TC-SD-06](empleado/TC-SD-06.md): Visualizar cuatro cuadros de solicitud de descanso al agregar tres fechas.
    - [TC-SD-07](empleado/TC-SD-07.md): Visualizar cinco cuadros de solicitud de descanso al agregar cuatro fechas.
    - [TC-SD-08](empleado/TC-SD-08.md): Visualizar seis cuadros de solicitud de descanso al agregar cinco fechas.
    - [TC-SD-09](empleado/TC-SD-09.md): Visualizar siete cuadros de solicitud de descanso al agregar seis fechas.
    - [TC-SD-10](empleado/TC-SD-10.md): Eliminar un cuadro de solicitud de descanso.
    - [TC-SD-11](empleado/TC-SD-11.md): Se deshabilita el botón de eliminar un cuadro de solicitud de descanso.
    - [TC-SD-12](empleado/TC-SD-12.md): Se deshabilita el botón de "Agregar Fecha" cuando hay siete cuadros de solicitudes de descanso.
    - [TC-SD-13](empleado/TC-SD-13.md): Ingresar solicitud de descanso antes del 15 del mes actual.
    - [TC-SD-14](empleado/TC-SD-14.md): Ingresar solicitud de descanso después del 15 del mes actual.

- **TS: visualizar el esquema mensual (calendario)**
    - [TC-VET-01](empleado/TC-VET-01.md): Listado de esquemas de trabajo.
    - [TC-VET-02](empleado/TC-VET-02.md): Visualizar título que indica el mes para el cual se genera el esquema.
    - [TC-VET-03](empleado/TC-VET-03.md): Comprobar que la cantidad de días del mes es correcta.
    - [TC-VET-04](empleado/TC-VET-04.md): Se muestra el último esquema de trabajo confirmado.