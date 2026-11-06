# Día 1 — Puesta a punto profesional: cuentas, GitHub y primeros scripts

**Lunes 9 de noviembre · 9:00-15:00**

El día de dejar el entorno listo y de entender **qué estás usando y quién lo paga**. Se
sale de aquí con cuenta de Earth Engine, cuenta de GitHub y los primeros scripts
corriendo en el Code Editor.

## 🎯 Objetivos

- Tener una cuenta de Earth Engine activa sobre un proyecto propio de Google Cloud.
- Saber **qué tipo de cuenta tienes, qué límites trae y cuándo empieza a costar dinero**.
- Tener cuenta de GitHub y entender el flujo que usaremos el último día.
- Escribir y ejecutar los primeros scripts en el Code Editor, ya con buenos hábitos.

## 📚 Contenidos

### 1. Cuenta de Earth Engine y Google Cloud (~90 min)

- Crear el proyecto en Google Cloud y registrarlo en Earth Engine, paso a paso, en clase.
  Guía completa en [CONFIGURACION.md](../CONFIGURACION.md).
- Qué es un **proyecto de Cloud** y por qué GEE lo exige desde 2025: la cuota va asociada
  al proyecto, no a tu cuenta de Google.
- **Tipos de acceso y precios**, que es lo que nadie explica:
  - Uso **no comercial** (investigación, docencia, ONG, administración): gratuito, previa
    aprobación del registro.
  - Uso **comercial**: de pago, con tarifa por cómputo y por almacenamiento.
  - Qué es una **EECU**, cómo se consume y dónde se mira el consumo.
  - Cuotas de concurrencia y de exportación: los límites que notarás antes que el dinero.
  - El caso del CSIC: a qué figura nos acogemos y qué implica para publicar una App.
- Dónde ver lo que has gastado y cómo poner una alerta.

### 2. GitHub (~90 min)

No es un adorno: el código del curso está en GitHub, y **el ejercicio final es
contribuir a un repositorio de verdad**.

- Crear la cuenta. Qué es un repositorio, un *commit*, una rama, un *fork* y un
  *pull request*, explicado con el repositorio de este curso delante.
- El flujo que usaremos: *fork* → rama → cambio → *pull request* → revisión → *merge*.
- **Todo desde el navegador**: se puede editar, hacer *commit* y abrir un PR sin instalar
  git. Quien quiera hacerlo en local, lo vemos también.
- Por qué importa para la ciencia: código citable, DOI con Zenodo, y la diferencia entre
  «el script que me funcionó» y «código que alguien más puede correr».

### 3. Editores de código (~30 min, demostración)

- **VS Code** y **Antigravity** (el IDE de Google): para qué sirven cuando sales del Code
  Editor, extensión de Python, cuadernos integrados y control de versiones.
- `github.dev`: VS Code en el navegador pulsando `.` sobre cualquier repositorio, sin
  instalar nada.
- Esta parte es opcional y se hace solo si el bloque de cuentas ha ido rápido.

### 4. Primeros scripts en el Code Editor (~90 min)

Y ya con el pie en el nivel del curso: no «esto es un mapa», sino **cómo piensa GEE**.

- La interfaz: editor, consola, inspector, *assets*, tareas.
- Objetos **cliente** y objetos **servidor**: por qué `ee.Number(3)` no es un `3`.
- Evaluación perezosa: nada se calcula hasta que algo lo pide (`print`, pintar, exportar).
- El primer buen hábito: **`getInfo()` es caro y casi siempre se puede evitar**.
- Imagen, colección, filtro, índice y visualización: el camino corto a algo que se ve.

## 💻 Scripts del día

| Script | Qué enseña |
|---|---|
| `03_intro_js_client_server.js` | La frontera cliente/servidor |
| *(por escribir)* `01_primeros_pasos.js` | Imagen, colección, filtro, índice, visualización |
| *(por escribir)* `02_coste_getinfo.js` | El mismo cálculo con y sin `getInfo`, con tiempos |

## ✅ Ejercicio del día

1. Cuenta de Earth Engine activa y un script propio guardado y compartido.
2. Cuenta de GitHub creada y **un *pull request* de prueba al repositorio del curso**,
   añadiendo tu nombre y tu usuario al fichero `PARTICIPANTES.md`. Es un PR de una línea:
   lo importante es haber recorrido el flujo entero una vez.

## 📖 Para profundizar

- [Precios de Earth Engine](https://earthengine.google.com/noncommercial/) · [Planes comerciales](https://earthengine.google.com/commercial/)
- [Client vs server](https://developers.google.com/earth-engine/guides/client_server)
- [GitHub: hello world](https://docs.github.com/es/get-started/quickstart/hello-world)
- [Zenodo + GitHub](https://docs.github.com/es/repositories/archiving-a-github-repository/referencing-and-citing-content)
