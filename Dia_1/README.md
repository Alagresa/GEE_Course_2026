# Día 1 — Puesta a punto profesional: cuentas, GitHub y primeros scripts

**Lunes 9 de noviembre · 9:00-15:00**

El día de dejar el entorno listo y de entender **qué estás usando y quién lo paga**. Se
sale de aquí con cuenta de Earth Engine, cuenta de GitHub, un *pull request* propio ya
abierto y los primeros scripts corriendo en el Code Editor.

Hay dos guías para seguir este día por tu cuenta, y las dos se quedan para después del
curso: **[GUIA_GITHUB.md](GUIA_GITHUB.md)** y **[GUIA_ENTORNO.md](GUIA_ENTORNO.md)**.

> 🧰 **Si no has programado nunca**, hay un anexo de repaso de JavaScript en
> [`repaso_js/`](repaso_js/). No entra en el programa y no ocupa tiempo de clase: son
> cinco scripts para correr por tu cuenta en media hora, antes del curso o después de
> la primera sesión. Quien venga de R, Python o MATLAB no lo necesita.

## 🎯 Objetivos

- Tener una cuenta de Earth Engine activa sobre un proyecto propio de Google Cloud.
- Saber **qué tipo de cuenta tienes, qué límites trae y cuándo empieza a costar dinero**.
- Tener cuenta de GitHub y **haber abierto un *pull request* propio**, que es el flujo
  entero del último día recorrido una vez con un cambio de una línea.
- Saber montar un entorno de Python en local con conda y trabajarlo desde VS Code, para
  cuando el navegador se quede corto.
- Escribir y ejecutar los primeros scripts en el Code Editor, ya con buenos hábitos.

## 📚 Contenidos

### 1. Cuenta de Earth Engine y Google Cloud (~75 min)

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

**Guía del bloque: [GUIA_GITHUB.md](GUIA_GITHUB.md)** — con el primer PR paso a paso.

- Crear la cuenta, con las dos cosas que conviene dejar bien desde el principio: la
  verificación en dos pasos y el correo privado.
- Las cinco palabras —repositorio, *commit*, rama, *fork*, *pull request*— explicadas con
  el repositorio de este curso delante, no en abstracto.
- **El PR de hoy, hecho en clase y entero desde el navegador**: tu línea en
  `PARTICIPANTES.md`, cada uno en su hueco. Sin git, sin terminal, sin editor. GitHub hace
  el *fork* solo.
- Qué pasa después: revisión, cambios pedidos sobre la misma rama, *merge*, borrar la rama.
- Y lo mismo en local, para quien quiera: autenticación (la contraseña ya no vale: token o
  SSH) y el ciclo de cinco comandos.
- Por qué importa para la ciencia: licencia, DOI con Zenodo, `CITATION.cff`, y la
  diferencia entre «el script que me funcionó» y «código que alguien más puede correr».

### 3. El entorno local: conda y VS Code (~60 min)

**El curso entero se puede seguir desde el navegador** —Code Editor y Colab—, así que
este bloque no es un requisito. Es para los tres casos en que el navegador se queda
corto: tus datos no están en la nube, la aplicación del día 4 hay que servirla, y Colab
se apaga a las doce horas y se lleva lo que no hayas guardado.

> **git y GitHub no son lo mismo**, y es la confusión más común: git es un programa que va
> en tu ordenador y hay que instalar; GitHub es la web donde se guardan los repositorios.
> Se puede usar GitHub sin git —el PR de hoy se hace entero desde el navegador— y git sin
> GitHub. Y **tener cuenta no instala git**: en Windows no viene puesto.
> Está en [GUIA_GITHUB.md](GUIA_GITHUB.md) §2 y se instala en
> [GUIA_ENTORNO.md](GUIA_ENTORNO.md) §3.

**Guía del bloque: [GUIA_ENTORNO.md](GUIA_ENTORNO.md)** — instalación y solución de
problemas, para seguirla en casa con calma.

- **Miniconda** antes que Anaconda, y por qué: en geoespacial, debajo de `geopandas` y
  `rasterio` hay GDAL, PROJ y GEOS, que son C y hay que compilar. conda instala los dos
  lados; `pip` no sabe nada de eso.
- **Lo de Windows, que es la mayoría de la clase**: el **Anaconda Prompt** y no el `cmd`,
  no trabajar dentro de OneDrive, rutas cortas y sin acentos, y que **git se instala
  aparte** porque no viene puesto. Todo con su caja en la guía.
- **Entornos**: qué son, y la única regla que hay que recordar — en `base` no se trabaja.
  El entorno del curso sale de un fichero: `conda env create -f environment.yml`.
- **VS Code**: instalación, las tres extensiones que hacen falta y ni una más, y **el paso
  que todo el mundo se salta**, elegir el intérprete — que es el origen del
  `ModuleNotFoundError` con el paquete instalado y a la vista.
- Cuadernos en el editor, el kernel, la terminal integrada y el panel de git, que es la
  [guía de GitHub](GUIA_GITHUB.md) con botones en vez de comandos.
- `github.dev`: VS Code completo en el navegador pulsando `.` sobre cualquier
  repositorio, sin instalar nada.
- **Antigravity**, el editor de Google, es un VS Code por debajo y todo lo anterior le
  vale igual. Se menciona y se deja apuntado; aprender uno primero, y que sea VS Code.

### 4. Primeros scripts en el Code Editor (~75 min)

Y ya con el pie en el nivel del curso: no «esto es un mapa», sino **cómo piensa GEE**.

- La interfaz: editor, consola, inspector, *assets*, tareas.
- Objetos **cliente** y objetos **servidor**: por qué `ee.Number(3)` no es un `3`.
- Evaluación perezosa: nada se calcula hasta que algo lo pide (`print`, pintar, exportar).
- El primer buen hábito: **`getInfo()` es caro y casi siempre se puede evitar**.
- Imagen, colección, filtro, índice y visualización: el camino corto a algo que se ve.

## 💻 Material del día

| Fichero | Qué es |
|---|---|
| [`GUIA_GITHUB.md`](GUIA_GITHUB.md) | GitHub desde cero: las cinco palabras, la cuenta y el primer PR paso a paso |
| [`GUIA_ENTORNO.md`](GUIA_ENTORNO.md) | conda y VS Code: instalación, entornos, el intérprete y qué hacer cuando falla |
| [`environment.yml`](../environment.yml) | El entorno del curso, en la raíz del repositorio |
| `01_primeros_pasos.js` | Imagen, colección, filtro, índice y visualización: el camino corto a algo que se ve |
| `02_coste_getinfo.js` | El mismo cálculo con y sin `getInfo()`, cronometrado y leído con el Profiler |
| `03_intro_js_client_server.js` | La frontera cliente/servidor |
| [`repaso_js/`](repaso_js/) | **Anexo opcional**, fuera de programa: repaso de JavaScript en cinco scripts, para quien llegue sin haber programado |

## ✅ Ejercicio del día

1. Cuenta de Earth Engine activa y un script propio guardado y compartido.
2. Cuenta de GitHub creada y **un *pull request* al repositorio del curso**, añadiendo tu
   nombre y tu usuario a [`PARTICIPANTES.md`](../PARTICIPANTES.md), **en un hueco libre y
   tocando solo esa línea**. Es un PR de una línea:
   lo importante es haber recorrido el flujo entero una vez. El paso a paso está en
   [GUIA_GITHUB.md](GUIA_GITHUB.md) §4.
3. **Opcional, y se puede terminar en casa**: el entorno `gee2026` creado y la celda de
   prueba de [GUIA_ENTORNO.md](GUIA_ENTORNO.md) §3 pintando un mapa.
4. **Solo si te hace falta**: los cinco scripts de [`repaso_js/`](repaso_js/), corridos
   en el Code Editor. Media hora, y el curso se sigue mucho mejor.

## 📖 Para profundizar

- [Precios de Earth Engine](https://earthengine.google.com/noncommercial/) · [Planes comerciales](https://earthengine.google.com/commercial/)
- [Client vs server](https://developers.google.com/earth-engine/guides/client_server)
- [GitHub Skills](https://skills.github.com/) · [Oh Shit, Git!?!](https://ohshitgit.com/)
- [Guía de conda](https://docs.conda.io/projects/conda/en/stable/user-guide/index.html) · [Python en VS Code](https://code.visualstudio.com/docs/python/python-tutorial)
- [Zenodo + GitHub](https://docs.github.com/es/repositories/archiving-a-github-repository/referencing-and-citing-content)
