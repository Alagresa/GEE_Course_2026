# El entorno de trabajo: conda y VS Code

**Día 1 · Curso «Análisis geoespacial avanzado con Google Earth Engine» — CSIC / EBD, 2026**

---

## Antes de empezar: ¿hace falta esto para el curso?

**No.** El curso entero se puede seguir desde el navegador: el Code Editor para
JavaScript y Google Colab para Python, sin instalar nada. Si solo quieres seguir las
clases, cierra esta guía y no te pierdes nada.

Esto es para **después**, y para tres casos concretos:

1. **Tus datos no están en la nube.** Un rásteres tuyo, un *shape* del proyecto, un CSV
   del laboratorio. Subirlos a Colab cada vez cansa; en local ya están.
2. **La aplicación del día 4.** `solara` se despliega desde un entorno propio. En Colab
   se puede probar, pero no servir.
3. **Tu trabajo de verdad.** Colab se apaga a las doce horas y se lleva por delante todo
   lo que no hayas guardado. Para un análisis que dura semanas, eso no vale.

La inversión son unos 40 minutos la primera vez, y vale para todo el Python que escribas
a partir de ahora, no solo para GEE.

---

## 1. conda: por qué, y Anaconda contra Miniconda

El problema que resuelve conda es viejo y muy concreto: **el geoespacial en Python no es
Python**. Debajo de `geopandas` y `rasterio` hay librerías escritas en C —GDAL, PROJ,
GEOS— que hay que compilar e instalar en el sistema, con sus versiones encajando entre
sí. `pip` no sabe nada de eso, y de ahí vienen las tardes perdidas con
`error: Microsoft Visual C++ 14.0 is required`.

conda instala **los dos lados**: el paquete de Python y las librerías de sistema que
necesita, ya compiladas. Por eso en geoespacial se usa conda y no otra cosa.

| | Anaconda | **Miniconda** |
|---|---|---|
| Tamaño | ~3 GB | ~100 MB |
| Trae | Python + 300 librerías + interfaz gráfica | Solo Python + conda |
| Para | Quien quiere todo puesto y no mirar más | **Quien quiere un entorno por proyecto** |

**Usa Miniconda.** Lo de Anaconda es cómodo el primer día y estorba el resto: 300
librerías que no vas a usar, y la tentación de trabajar en el entorno `base`, que es el
origen del 90 % de los problemas de este mundo. Si ya tienes Anaconda instalado, no lo
desinstales: `conda` es el mismo y todo lo de aquí funciona igual.

> Existe también **mamba**, que es conda reescrito para resolver dependencias mucho más
> rápido (`mamba install` en vez de `conda install`, mismo resto). Las versiones nuevas de
> conda ya traen ese resolvedor dentro, así que no hace falta — pero si ves `mamba` en una
> guía por ahí, es esto.

### Instalación

**Windows**

1. Descarga el instalador de
   [Miniconda](https://www.anaconda.com/download/success) (sección *Miniconda
   Installers*, Windows 64-bit).
2. Ejecuta el `.exe`. Dos opciones importan:
   - **Instalar solo para el usuario actual** — no pide administrador.
   - **NO marcar «Add Miniconda to my PATH»**. Parece lo cómodo y rompe cosas: deja a
     conda por delante del Python del sistema y de cualquier otro que tengas. Usarás el
     **Anaconda Prompt** en su lugar.
3. Abre **Anaconda Prompt** desde el menú de inicio. Esa es tu terminal para conda, no el
   `cmd` normal.

**macOS**

```bash
# Apple Silicon (M1/M2/M3/M4) — la mayoría de los Mac actuales
curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-arm64.sh
bash Miniconda3-latest-MacOSX-arm64.sh

# Intel
curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh
bash Miniconda3-latest-MacOSX-x86_64.sh
```

Acepta la licencia, deja la ruta por defecto (`~/miniconda3`) y **di sí a que inicialice
tu shell**. Después, cierra y abre la terminal.

**Linux**

```bash
curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh
```

Igual: licencia, ruta por defecto, sí a la inicialización, y reabre la terminal.

**Comprobar**

```bash
conda --version
# conda 24.x.x  (o superior)
```

Si dice «command not found», cierra y abre la terminal otra vez. Si sigue, en Windows
estás en el `cmd` en lugar del Anaconda Prompt.

---

## 2. Entornos: la idea entera

Un **entorno** es una instalación de Python aislada, con sus propias librerías y sus
propias versiones. Ni más ni menos.

```
base        ← el que viene puesto. NO TRABAJES AQUÍ.
gee2026     ← el de este curso
otra_cosa   ← un proyecto con geopandas 0.14 porque un script viejo lo necesita
```

**La regla, y es la única que importa: nunca instales nada en `base`.** `base` es la
instalación de conda; si la rompes, rompes conda. Un entorno roto se borra y se vuelve a
crear en cinco minutos, y eso es precisamente para lo que están.

### El entorno del curso

En la raíz del repositorio hay un `environment.yml` con todo lo que se usa estos cinco
días. Desde esa carpeta:

```bash
conda env create -f environment.yml
conda activate gee2026
```

La primera vez tarda, entre cinco y quince minutos: está resolviendo el puzle de
versiones y descargando GDAL y compañía. Cuando acabe, el nombre del entorno aparece al
principio del prompt, y eso es lo que te dice dónde estás:

```
(gee2026) usuario@equipo:~$
```

**Si el prompt no dice `(gee2026)`, no estás en el entorno**, y nada de lo que instales o
ejecutes va donde crees. Es el primer sitio donde mirar cuando algo no funciona.

### Los seis comandos que se usan

```bash
conda env list                              # qué entornos tengo
conda activate gee2026                      # entrar
conda deactivate                            # salir
conda install -c conda-forge nombre         # instalar algo (con el entorno activo)
conda env update -f environment.yml --prune # actualizar si cambia el fichero
conda env remove -n gee2026                 # borrarlo y empezar de cero
```

`-c conda-forge` es el canal: **conda-forge** es el repositorio comunitario, más
actualizado y con muchísimo más geoespacial que el canal por defecto. En el
`environment.yml` ya va declarado, así que dentro del entorno del curso puedes omitirlo.

### conda y pip en el mismo entorno

Puedes usar los dos, y a veces hay que hacerlo. Lo que hay que saber:

- **conda sabe lo que instaló pip, pero pip no sabe lo que instaló conda.** Si instalas
  con pip algo que conda ya había resuelto, pip puede sustituirlo por una versión
  incompatible sin que conda se entere, y el entorno queda sutilmente roto.
- Por eso, en un `environment.yml`, **primero todo lo de conda y el bloque `pip:` al
  final**, solo con lo que no exista en conda-forge.

| Qué quieres instalar | Con qué |
|---|---|
| Cualquier cosa geoespacial (GDAL, rasterio, fiona, geopandas) | **Siempre conda** |
| Algo que está en conda-forge | conda |
| Algo que solo está en PyPI | pip, con el entorno activo |
| Algo recién salido | pip (a PyPI llegan antes) |

Regla práctica: **conda siempre que puedas, pip como último recurso, y nunca los dos para
el mismo paquete.**

---

## 3. VS Code

[Visual Studio Code](https://code.visualstudio.com/) es un editor gratuito de Microsoft, y
es el estándar de hecho: si aprendes uno, que sea este. Lo que te da sobre el Code Editor
de GEE y sobre Colab: tus ficheros locales, tu entorno de conda, cuadernos y scripts en la
misma ventana, git integrado y una terminal dentro.

### Instalación

- **Windows / macOS**: descarga de [code.visualstudio.com](https://code.visualstudio.com/)
  y siguiente, siguiente. En Windows, marca **«Add to PATH»** (aquí sí) y las dos de
  «Open with Code» del menú contextual, que son muy cómodas.
- **Linux (Debian/Ubuntu)**: descarga el `.deb` de la misma página, o `sudo snap install
  code --classic`.

### Las tres extensiones

`Ctrl+Shift+X` (`Cmd+Shift+X` en Mac) abre el panel de extensiones. Instala:

| Extensión | Para qué |
|---|---|
| **Python** (`ms-python.python`, de Microsoft) | Entornos, depurador, autocompletado. Arrastra Pylance con ella |
| **Jupyter** (`ms-toolsai.jupyter`, de Microsoft) | Abrir y ejecutar `.ipynb` dentro del editor |
| **GitHub Pull Requests** (`GitHub.vscode-pull-request-github`) | Ver y revisar PRs sin salir del editor. Útil el día 5 |

Con esas tres vas sobrado. Resiste la tentación de instalar veinte: cada una es código que
corre en tu editor.

### El paso que todo el mundo se salta

**Decirle a VS Code qué Python usar.** Esto es el origen del
`ModuleNotFoundError: No module named 'geemap'` que te va a salir si no lo haces, con el
paquete perfectamente instalado y a la vista:

1. `Ctrl+Shift+P` (`Cmd+Shift+P`) → escribe **`Python: Select Interpreter`** → Enter.
2. En la lista, elige el que diga **`gee2026`** (aparece como
   `Python 3.11 ('gee2026')` o con la ruta `.../envs/gee2026/bin/python`).
3. Abajo a la izquierda, en la barra de estado, debe quedar puesto `gee2026`.

Que el paquete esté instalado y que **tu editor esté mirando al entorno donde está
instalado** son dos cosas distintas. Casi todos los problemas del primer día son esta.

> VS Code recuerda el intérprete **por carpeta**, no globalmente. Cada proyecto nuevo
> vuelve a pedirlo: es a propósito, y es lo que quieres.

### Cuadernos

Abre cualquier `.ipynb` del curso y se ve igual que en Colab, pero local.

- **Arriba a la derecha: `Select Kernel`.** Es lo mismo que el intérprete, otra vez, para
  el cuaderno. Elige `gee2026`. Si no aparece en la lista, es que al entorno le falta
  `ipykernel` — está en el `environment.yml`, así que no debería pasar.
- `Shift+Enter` ejecuta la celda y pasa a la siguiente. `Ctrl+Enter` ejecuta y se queda.
- El panel de **variables** (el icono `{x}` de la barra del cuaderno) muestra lo que hay
  en memoria, con los *DataFrames* explorables en una tabla. Esto Colab no lo tiene y se
  echa de menos en cuanto te acostumbras.
- **El kernel seleccionado manda sobre todo lo demás.** Si una celda dice que no encuentra
  una librería, mira el kernel antes que nada.

### La terminal de dentro

`Ctrl+ñ` (en teclado español; `Ctrl+`` ` `` en otros) abre una terminal en la carpeta del
proyecto, y **con el entorno de conda ya activado** si has seleccionado el intérprete.
Ahí van los `conda install`, los `git` y los `solara run` del día 4.

### Git, con botones

El icono de las ramitas en la barra lateral (`Ctrl+Shift+G`) es el panel de *Source
Control*, y es exactamente lo de la [guía de GitHub](GUIA_GITHUB.md) §5.3 con otra cara:

| En el panel | El comando que es |
|---|---|
| El `+` junto a un fichero cambiado | `git add` |
| El cuadro de mensaje y el `✓` | `git commit -m "..."` |
| *Sync Changes* / las flechas de la barra de abajo | `git push` / `git pull` |
| El nombre de la rama, abajo a la izquierda | `git checkout` |

Y pulsando sobre un fichero cambiado se abre el **diff en dos columnas**, lo viejo contra
lo nuevo. Mirar eso antes de cada *commit* es el mejor hábito que puedes coger hoy.

### VS Code sin instalar nada: github.dev

`github.dev` es **VS Code completo dentro del navegador**, de GitHub, gratis y sin
instalar nada. No es el truco de `github1s.com`, que es de un tercero y sirve para leer:
en github.dev puedes **editar, hacer *commit*, crear una rama y abrir un *pull request***,
y funciona con tus repositorios privados.

Dos formas de abrirlo, y conviene conocer las dos:

1. **La URL** — cambia `github.com` por `github.dev`:
   ```
   https://github.dev/Digdgeo/GEE_Course_2026
   ```
   Esta funciona siempre. Es la que hay que usar si la otra falla.

2. **La tecla `.`** — pulsa el punto mientras ves un repositorio, una rama, un fichero o
   un PR, y esa misma pestaña se convierte en el editor, abierto justo donde estabas.
   Con `>` (`Shift+.`) se abre en una pestaña nueva.

> **Si la tecla `.` no hace nada**, es casi siempre una de estas tres, en este orden:
> 1. Tienes **desactivados los atajos de una tecla** en tu cuenta:
>    [github.com/settings/accessibility](https://github.com/settings/accessibility) →
>    *Keyboard shortcuts* → **«Enable character key shortcuts»**.
> 2. El **foco estaba en un cuadro de texto** (el buscador de arriba se come la
>    pulsación). Clic en un hueco vacío de la página y otra vez.
> 3. **No estás identificado** en esa pestaña.
>
> Si la URL del punto 1 tampoco abre el editor, entonces el problema no es la tecla:
> será la sesión, un bloqueador o la red.

Lo que **no** tiene es terminal ni ejecución: no hay Python ni git de línea de comandos
detrás, porque no hay máquina, solo el editor. Para editar varios ficheros a la vez y
dejarlo en un PR es una maravilla; para ejecutar código, VS Code en local.

Pruébalo ahora mismo con el repositorio del curso.

### La prueba de fuego

Cuaderno nuevo, kernel `gee2026`, y esta celda. Si sale el mapa, el entorno está bien y ya
no necesitas esta guía:

```python
import ee, geemap

ee.Authenticate()                        # se abre el navegador, solo la primera vez
ee.Initialize(project='tu-proyecto-id')  # el proyecto de CONFIGURACION.md

Map = geemap.Map(center=[37.0, -6.35], zoom=10)
Map.add_layer(ee.Image('CGIAR/SRTM90_V4'),
              {'min': 0, 'max': 500, 'palette': ['green', 'yellow', 'brown']},
              'Elevación')
Map
```

---

## 4. Y Antigravity, ¿qué?

[Antigravity](https://antigravity.google/) es el editor de Google, y por debajo **es un
VS Code**: mismo aspecto, mismos atajos, y las extensiones de VS Code funcionan ahí. Lo
que añade es trabajar con agentes de Gemini dentro del editor — no solo autocompletar,
sino encargarles una tarea que toca varios ficheros y revisar después lo que han hecho.

Para lo de este curso, **todo lo de arriba vale igual**: conda es conda, el intérprete se
elige igual y el panel de git es el mismo.

Mi consejo para hoy: **aprende VS Code primero**. No porque Antigravity sea peor, sino
porque es nuevo y se mueve rápido, y porque cuando el agente se equivoca —y se equivoca—
hay que saber leer el código para darte cuenta. Ese criterio se coge escribiéndolo tú.
Cuando lo tengas, el salto es de media hora y el camino de vuelta también.

Si aun así quieres probarlo, descárgalo de [antigravity.google](https://antigravity.google/),
y mira su documentación en vez de esta guía para la parte de agentes: es lo que más cambia
de una versión a otra.

---

## 5. Cuando algo no funciona

| Lo que ves | Qué pasa | Arreglo |
|---|---|---|
| `conda: command not found` | La terminal no conoce conda | Reabre la terminal. En Windows, usa el **Anaconda Prompt** |
| `ModuleNotFoundError` con el paquete instalado | El editor mira a otro Python | `Python: Select Interpreter` → `gee2026` (§3) |
| El kernel `gee2026` no sale en la lista del cuaderno | Falta `ipykernel` en el entorno | `conda activate gee2026 && conda install ipykernel` |
| `conda env create` lleva veinte minutos | Normal la primera vez | Esperar. Si pasa de media hora, `Ctrl+C` y repetir |
| `PackagesNotFoundError` | El paquete no está en los canales declarados | `conda install -c conda-forge nombre`, y si no está, `pip install nombre` |
| `EEException: Earth Engine client library not initialized` | Falta `ee.Initialize(project=...)` | Añádelo, con **tu** ID de proyecto |
| `ee.Initialize` se queja del proyecto | El proyecto no tiene GEE habilitado | [CONFIGURACION.md](../CONFIGURACION.md) §2.5 |
| Todo iba y de pronto nada | Entorno roto, casi siempre por un `pip install` | `conda env remove -n gee2026` y crearlo otra vez. Cuesta diez minutos y es la solución buena |

Ese último es el motivo de tener entornos: **tirarlos es gratis**. Si llevas una hora
peleando con un entorno, bórralo.

---

## 6. Chuleta

| Acción | Cómo |
|---|---|
| Crear el entorno del curso | `conda env create -f environment.yml` |
| Entrar / salir | `conda activate gee2026` / `conda deactivate` |
| ¿En qué entorno estoy? | Mira el `(gee2026)` del prompt |
| Instalar algo | `conda install -c conda-forge nombre` |
| Qué hay instalado | `conda list` |
| Borrar y empezar de cero | `conda env remove -n gee2026` |
| Elegir el Python de VS Code | `Ctrl+Shift+P` → `Python: Select Interpreter` |
| Elegir el kernel de un cuaderno | Arriba a la derecha → `Select Kernel` |
| Terminal dentro de VS Code | `Ctrl+ñ` |
| Panel de git | `Ctrl+Shift+G` |
| VS Code en el navegador | `github.com` → `github.dev` en la URL, o pulsar `.` sobre el repo |

---

## 7. Para profundizar

- [Guía de conda](https://docs.conda.io/projects/conda/en/stable/user-guide/index.html) · [Hoja de referencia oficial](https://docs.conda.io/projects/conda/en/stable/user-guide/cheatsheet.html)
- [conda-forge](https://conda-forge.org/) — el canal donde está el geoespacial
- [Python en VS Code](https://code.visualstudio.com/docs/python/python-tutorial) · [Cuadernos en VS Code](https://code.visualstudio.com/docs/datascience/jupyter-notebooks)
- [Instalación de la API de Python de GEE](https://developers.google.com/earth-engine/guides/python_install)
- [geemap](https://geemap.org/) · [Tutoriales en vídeo](https://geemap.org/tutorials/)
- Y la guía de Anaconda del curso de GeoPython, más larga y con más detalle sobre Jupyter:
  [`Geopython_2026/dia_2/introduccion_anaconda.md`](https://github.com/Digdgeo/Geopython_2026/blob/main/dia_2/introduccion_anaconda.md)
