# Plan de Pruebas

**Identificación del documento:** TP-S9J  
**Versión:** 1.0  
**Emitido por:** Sergio Rubino  
**Fecha de emisión:**  20/07/2023  
**Autoridad de aprobación:**  Jordan Funes  
**Historial de cambios:**  se visualiza en este repositorio.

---
## Contenido
- [Introducción](#introducción)
    - [Alcance](#alcance)
    - [Referencias](#referencias)
    - [Glosario](#glosario)
- [Contexto de las pruebas](#contexto-de-las-pruebas)
    - [Elementos de prueba](#elementos-de-prueba)
    - [Suposiciones y restricciones](#suposiciones-y-restricciones)
    - [Riesgos y contingencias](#riesgos-y-contingencias)
    - [Estrategia de prueba](#estrategia-de-prueba)
    - [Entregables de prueba](#entregables-de-prueba)
    - [Criterios de finalización de prueba](#criterios-de-finalización-de-prueba)
    - [Métricas por recopilar](#métricas-por-recopilar)
    - [Datos de prueba](#datos-de-prueba)
    - [Ambiente de prueba](#ambiente-de-prueba)
    - [Criterios de suspensión y reanudación](#criterios-de-suspensión-y-reanudación)
    - [Dotación de personal: roles y responsabilidades](#dotación-de-personal-roles-y-responsabilidades)
- [Diseño de las pruebas](#diseño-de-las-pruebas)
    - [Enfoque de pruebas](#enfoque-de-pruebas)
    - [Casos de prueba](#casos-de-prueba)
    - [Suites de prueba](#suites-de-prueba)
    - [Defectos](#defectos)

___
## Introducción
Se expone el **plan de pruebas** correspondiente al **Sistema de gestión de esquemas de trabajo** para el Sanatorio 9 de Julio S.A. El documento sigue ciertos lineamientos establecidos por la IEEE 29119-3.  

El plan de acción que permitirá realizar las pruebas pertinentes al producto.

Acompañado de los artefactos pertinentes que brindan detalles sobre el alcance, el contexto, el cronograma y el diseño de las pruebas a implementar.

### Alcance
Se abarcarán las pruebas de los módulos **_core_** del sistema:
- Solicitud de descansos.
- Generación de esquemas de trabajo.
- Generación de partes diarios.
- Visualización de esquemas de trabajo.
- Visualización de partes diarios.
- Visualización de cronograma de trabajo para los empleados.
- Visualización de novedades mensuales.

Quedarán, por lo tanto, excluidos módulos que ya fueron probados como:
- Gestión de usuarios.
- Gestión de empleados.
- Gestión de áreas y sectores.

### Glosario
Se presentan las siguientes definiciones, acrónimos y abreviaturas utilizadas:
- **S9J**: Sanatorio 9 de Julio S.A.
- **Tester**: persona encargada de realizar las pruebas.
- **Suite de pruebas**: conjunto de casos de prueba.
- **Caso de prueba**: conjunto de pasos a seguir para probar un requerimiento.
- **Reporte de defecto**: documento que describe un defecto encontrado en el sistema.
- **Defecto**: error en el sistema.
- **CRUD**: acrónimo de _Create, Read, Update, Delete_.
- **Esquema de trabajo**: conjunto de turnos de trabajo para un empleado.
- **TC**: abreviatura de Test Case (caso de prueba en español).
- **TS**: abreviatura de Test Suite (suite de prueba en español).
---
## Contexto de las pruebas
### Elementos de prueba
El propósito es probar cada uno de los requerimientos funcionales. Para ello se diseñaron casos de prueba.

Cada **módulo** será probado de acuerdo a lo establecido en el presente documento. Particularmente los de partes diarios y los de esquemas de trabajo.
### Suposiciones y restricciones
1. Se asume que el sistema se encuentra en un estado estable y que no se realizarán cambios en el mismo durante el proceso de pruebas.
2. No existirán limitaciones de tiempo para la realización de las pruebas.
3. Se cuenta con los recursos humanos y materiales necesarios para efectuar las pruebas.
4. Se cuenta con las herramientas previstas para cada una de las fases del proceso de testing.
5. Las herramientas por utilizar serán de uso gratuito.
6. El S9J proporcionará un espacio físico en el cual se construirá el ambiente de pruebas.

### Riesgos y contingencias
| Riesgo | Impacto | Probabilidad | Acción recomendada |
| --- | --- | --- | --- |
| Incompatibilidades de herramientas | Alto | Media | Mitigar el riesgo cerciorándose de la compatibilidad con sistemas operativos, requerimientos de hardware, paquetes de servicios, etc. |
| Personal insuficiente | Alto | Media | Reducir el riesgo asegurando la permanencia del personal que conforma el equipo de pruebas y/o definiendo/contemplando suplantaciones. |
| Contingencias de hardware | Alto | Baja | Efectuar un mantenimiento preventivo y revisiones de los equipos afectados por el proceso de prueba. |
| Dependencia de herramientas de terceros para el reporte y tratamiento de defectos | Medio | Baja |Hacer uso de herramientas de código abierto. |
| Carencia de conocimiientos en uso de plataformas web por parte de los testers | Alto | Baja | Ignorar el riesgo |
| Instalaciones no disponibles | Medio | Alto | Mitigar el riesgo generando el compromiso con las autoridades correspondientes. Alternativamente, preparar instalaciones provisorias para efectuar las pruebas en un ambiente lo más similar, dentro de lo posible, al de producción. |
### Estrategia de prueba
Se adopta una estrategia de **pruebas de caja negra**.

El fuerte del proceso aplicado sera la automatización de las **pruebas _end-to-end_** mediante el uso de [Playwright](https://playwright.dev/).

Se realizarán pruebas de **regresión** para asegurar que los cambios realizados no afecten el funcionamiento de los módulos ya probados.

>Aquellas pruebas automatizadas que fallen, se reproducirán manualmente para poder reportar el defecto.

### Entregables de prueba
1. Plan de pruebas.
2. Especificación de Diseño de pruebas.
3. Casos de prueba.
4. Reporte de preparación de datos de prueba.
5. Reporte de preparación de ambiente de prueba.
6. Informes de ejecución de pruebas.
7. Reportes de defectos.
8. Reporte de cierre de pruebas.
### Criterios de finalización de prueba
Se presentan las condiciones bajo las cuales el equipo de pruebas considera que las actividades de prueba han finalizado:
- Se han ejecutado todos los casos de prueba y, por tanto, cubierto todos los requerimientos.
- El número de defectos de severidad **alta** y **media** es cero.
- El número de defectos de severidad **baja** está por debajo del 15% del total de defectos reportados.
- Se han ejecutado todas las suite de pruebas.
### Métricas por recopilar
Se deben monitorear:
- Tiempo de respuesta en resolución de bugs.
- Cantidad de casos de prueba ejecutados por día.
- Tiempo promedio de ejecución de casos de prueba.
- Cantidad de defectos agrupados por nivel de severidad.
- Cantidad de defectos abiertos, cerrados, en curso.


### Datos de prueba
Los requisitos de datos de prueba relevantes para la actividad de pruebas deben cumplirse, de manera tal que se cuente con una base de datos tanto para el uso de la herramientas que apoyan a la gestión de pruebas, como para acceder a datos que conformen precondiciones de los casos de prueba diseñados.

El **volumen de datos** de prueba puede estar conformado, en cierta proporción, por datos reales pertenecientes al S9J, siempre que no sean datos sensibles o confidenciales.

Si bien es deseable la generación de datos de prueba, no resulta indispensable para este sistema.

### Ambiente de prueba
El ambiente de prueba debe contar con los dispositivos pertinentes (computadoras cliente y servidor, incluso smartphones o tablets como clientes). Es importante desplegar todo lo necesario para recrear un ambiente similar al de producción, como así también realizar una correcta configuración del hardware y / o dispositivos de red utilizados.

Será necesario configurar dispositivos con el siguiente software, según corresponda:

- Sistemas operativos Windows (Windows 10, WS) o distribuciones Linux (Debian o Ubuntu).
- Navegadores web ([Chrome](https://www.google.com/intl/es_es/chrome/) o [Firefox](https://www.mozilla.org/es-AR/firefox/new/)).
- Gestor de Base de Datos ([MySQL](https://www.mysql.com/)).
- Administradores de paquetes ([npm](https://www.npmjs.com/) o [pnpm](https://pnpm.io/es/)).

### Criterios de suspensión y reanudación
En condiciones normales, se suspenderán al final de la jornada. Toda la documentación debe ser almacenada. Las pruebas se reanudarán al incio de la jornada siguiente.

Las pruebas se suspenderán en los siguientes casos:
- Una falla de severidad alta es observada.
- Ocurre alguna falla en el entorno.
- Ocurren fallas de hardware en el ambiente.
- Ocurren fallas en operaciones básicas (CRUD).
- Ocurren fallas en la comunicación entre el cliente y el servidor.

Si el defecto que causa la falla del sistema es resuelto, se ejecutarán las pruebas de regresión a la nueva versión. Si la nueva versión de prueba pasa la prueba de regresión, entonces puede reanudarse la ejecución de pruebas.

>En caso de fallas de hardware o de entorno, el tester notificará al área correspondiente y comenzará sus pruebas pendientes cuando las reparaciones se hayan efectuado. Las pruebas deben reanudarse desde el principio.

### Dotación de personal: roles y responsabilidades
#### Líder del equipo de pruebas
Responsable de la **supervisión** de las pruebas en el proyecto. También es responsable de los procesos utilizados para **garantizar la calidad** en la entrega. Asume la responsabilidad general y el liderazgo.

Se encarga de la **planificación y definición de estrategias** de prueba basándose en el objetivo de la prueba, los riesgos, el tiempo, esfuerzo y recursos disponibles.

Por ello una de sus tareas es la creación de los planes de prueba y la coordinación con los involucrados en el proyecto. Así como también el monitoreo y control de las pruebas. El líder puede ser un jefe de proyecto, el jefe de desarrollo o jefe de QA.

En síntesis:
- Planifica las actividades de prueba.
- Realiza estimaciones de tiempo, esfuerzo y costos de las pruebas.
- Construye el equipo de pruebas.
- Define los niveles y ciclos de pruebas (nivel de componentes, sistemas, aceptación, si utilizamos ciclos iterativos, incrementales, un modelo V o un modelo híbrido).
- Gestiona los defectos.
- Redacta y actualiza los planes de prueba.
- Coordina el plan de prueba.
- Inicia el proceso de pruebas (análisis, diseño, ejecución y control).
- Monitorea y controla el avance de las pruebas.
- Realiza informes de avance y de resumen de prueba.
- Apoya en la configuración de herramientas de pruebas.
- Participa en la elección de herramientas de pruebas.
- Participa en la creación de ambientes de prueba.
- Promueve el uso de buenas prácticas.

#### Tester
Es la persona que apoya y **ejecuta** las actividades de prueba definidas en el Plan de prueba. Los testers pueden ser desarrolladores, expertos de negocio, auditores / adm. De sistemas.

- Revisa y contribuye en la construcción de los planes de prueba.
- Durante el análisis, revisa y evalúa la base de prueba (requisitos, historias de usuarios, criterios de aprobación, etc. Revisa que estén completos y que sean factibles de probar).
- Durante el diseño e implementación, identifica y documenta condiciones de prueba, implementa casos de prueba.
- Captura la trazabilidad entre bases de prueba, condiciones y casos de prueba
- Prepara el entorno de prueba.
- Diseña e implementa casos y procedimientos de prueba.
- Prepara los datos de prueba.
- Crea el calendario de ejecución y ejecuta las pruebas.
- Evalúa características funcionales y no funcionales (desempeño, fiabilidad, usabilidad, seguridad, compatibilidad y portabilidad).
- Utiliza herramientas de pruebas.
- Participa en la revisión de pruebas.

#### Necesidades de contratación
Entre los requisitos específicos para el personal de prueba adicional que llegase a participar del proceso de prueba, se encuentran:

- Conocimientos sobre el uso de sistemas web.
- Proactividad.
- Buena comunicación.
- Conocimientos básicos de desarrollo de software.
- Manejo de herramientas de pruebas (manuales o automatizadas)
- Experiencia trabajando en equipo y con metodologías ágiles.

>La dotación de personal puede lograrse mediante transferencia interna, contratación externa, consultores o subcontratistas.

---
## Cronograma de pruebas


| Módulo a probar | Inicio | Fin | Duración |
| --- | --- | --- | --- |
| Solicitud de descansos | 31/07/23 | 03/08/23 | 4 días |
| Generación de esquemas de trabajo | 03/08/23 | 09/08/23 | 6 días |
| Generación de partes diarios | 09/08/23 | 14/08/23 | 5 días |
| Visualización de esquemas de trabajo | 14/08/23 | 16/08/23 | 2 días |
| Visualización de partes diarios | 16/08/23 | 18/08/23 | 2 días |
| Visualización de cronograma de trabajo para los empleados | 18/08/23 | 23/08/23 | 5 días |
| Visualización de novedades mensuales | 23/08/23 | 28/08/23 | 5 días |

>El tiempo de duración comprende la **implementación** en código para ser automatizada, la **ejecución** de la suite de pruebas correspondiente al módulo y la **confección del informe** de resultados.

---
## Diseño de las pruebas
### Enfoque de pruebas
Se adopta el enfoque del _**"camino feliz"**_ en la automatización de las pruebas. Se han de probar los casos de prueba que representen el flujo de trabajo normal del sistema.

En flujos alternativos se probarán manualmente adoptando un enfoque **_negativo_**, es decir, buscando la falla del sistema.

### Casos de prueba
Los casos de prueba diseñados se encuentran en el siguiente [repositorio](test-suites).

### Formato de casos de prueba

Se seguirá el formato de la [plantilla de casos de prueba](/test-cases/template.md).


### Suites de prueba
El criterio adoptado para la creación de las suites de prueba
es el de agrupar los casos de prueba por **_módulo_** teniendo en cuenta los **_roles de usuario_**.

### Defectos
#### Graduación
- **Crítico:** defecto extremadamente importante y
requiere inmediata atención.
- **Alto:** defecto importante y debería ser resuelto
cuanto antes, después de los ítems críticos.
- **Medio:** defecto importante pero se puede resolver
en un plazo razonable, porque existe trabajo pendiente.
- **Bajo:** el defecto no es crítico y puede ser resuelto cuando
el tiempo y los recursos lo permitan.
#### Formato de reporte de defectos
Seguir el formato de la [plantilla de defectos](/reports/bug-report-template.md).