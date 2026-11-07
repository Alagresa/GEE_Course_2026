# GitHub desde cero, para quien escribe código científico

**Día 1 · Curso «Análisis geoespacial avanzado con Google Earth Engine» — CSIC / EBD, 2026**

Esta guía cubre lo que hace falta para el **día 1**: entender las cinco palabras, tener la
cuenta y haber recorrido una vez el camino entero con un cambio de una línea.

El flujo completo de contribución a un proyecto ajeno —*issue*, *fork*, revisión,
conflictos— es el **día 5**, y va en `Dia_5/GUIA_PR.md`. Aquí solo llegamos hasta tu
primer *pull request* a este repositorio, que es el ejercicio de hoy.

---

## 1. Por qué esto está en un curso de teledetección

Porque la diferencia entre **«el script que me funcionó»** y **«código que alguien más
puede correr»** es casi todo lo que separa un análisis de un resultado publicable.

Tres cosas concretas que GitHub te da y una carpeta en el escritorio no:

- **Historial.** Qué cambió, cuándo y por qué. Cuando un revisor pregunta por una cifra de
  hace ocho meses, la respuesta está en el repositorio y no en tu memoria.
- **Un sitio al que apuntar.** Los artículos citan código. Un repositorio con un DOI de
  Zenodo es una cita; un `.zip` por correo no lo es.
- **Colaboración sin pisarse.** Dos personas sobre el mismo fichero, cada una en su rama,
  y el sistema avisa si choca algo en lugar de machacarlo en silencio.

Y una práctica, que es la que notarás antes: **`script_v3_bueno_FINAL_este_si.js` deja de
existir**. Hay un fichero y su historia.

---

## 2. Las cinco palabras

Con el repositorio del curso delante, que es el que vas a usar hoy mismo.

| Palabra | Qué es | En este curso |
|---|---|---|
| **Repositorio** (*repo*) | Una carpeta con historial. Ficheros + todos sus cambios | `GEE_Course_2026`: el material que estás leyendo |
| ***Commit*** | Una foto del repositorio en un momento, con un mensaje que dice qué cambió | «Añadir mi línea a PARTICIPANTES» |
| **Rama** (*branch*) | Una línea de trabajo paralela. `main` es la principal | `anade-maria-gomez`, con tu cambio y nada más |
| ***Fork*** | Tu copia de un repositorio ajeno, en tu cuenta. Puedes hacer lo que quieras en ella | El día 5, para contribuir a Ndvi2Gif |
| ***Pull request*** (PR) | La propuesta: «tengo estos cambios en mi rama, ¿los metes en la tuya?» | Tu PR de hoy, con tu línea |

**La que cuesta entender es la rama**, y la idea es simple: si trabajas directamente sobre
`main` y a mitad de camino te das cuenta de que la has liado, no hay sitio limpio al que
volver. Una rama es exactamente eso, un sitio limpio al que volver. Es gratis, se crea en
un segundo y se tira cuando se ha usado.

> **El orden importa y es siempre el mismo:**
> rama → cambios → *commit* → *pull request* → revisión → *merge* → borrar la rama.

---

## 3. La cuenta

1. En [github.com](https://github.com) → **Sign up**.
2. **El nombre de usuario se va a ver**, en cada *commit* y en cada PR, durante años.
   Algo que puedas poner en un artículo. Tu nombre, o tu nombre con un apellido, antes que
   un apodo de 2009.
3. Usa el **correo institucional** si quieres que el trabajo quede asociado al CSIC, y
   actívalo también como correo secundario si usas otro para entrar.
4. **Verificación en dos pasos.** GitHub la exige a quien sube código, así que tendrás que
   configurarla en algún momento: mejor hoy y con calma que el día 5 con prisa.
   Ajustes → *Password and authentication* → *Two-factor authentication*. **Ten el móvil
   a mano en clase** y guarda los códigos de recuperación en algún sitio que no sea el
   propio móvil.
5. Mientras estás ahí: **Settings → Emails → «Keep my email addresses private»**. Si no,
   tu correo queda visible en el historial público de cada *commit* que hagas.

Y pide la **cuenta académica**: [education.github.com](https://education.github.com/)
reconoce el correo institucional y da gratis los repositorios privados sin límite y el
Copilot, que de otro modo se pagan.

---

## 4. Tu primer *pull request*, sin instalar nada

Esto es el ejercicio del día. **Se hace entero desde el navegador**: no hace falta git, ni
terminal, ni editor. Son nueve clics y conviene hacerlos despacio una vez, porque es el
mismo camino que seguirás luego para cosas grandes.

Vas a añadir tu línea al fichero `PARTICIPANTES.md` de este repositorio.

### 4.1. Abre el fichero

Entra en el repositorio del curso y haz clic en **`PARTICIPANTES.md`**. Verás una tabla
con una fila ya puesta, la mía.

### 4.2. Dale al lápiz

Arriba a la derecha del contenido del fichero hay un **lápiz** (*Edit this file*).
Al pulsarlo, GitHub te dirá algo parecido a:

> *You're making changes in a project you don't have write access to. We've created a fork
> of this project for you to commit your proposed changes to.*

Eso es GitHub **haciéndote el *fork* solo**. No tienes permiso de escritura en mi
repositorio —y es correcto que no lo tengas—, así que te crea tu copia y te deja editar
ahí. Es el mismo *fork* del día 5, hecho por el camino corto.

### 4.3. Escribe tu línea

Añade una fila a la tabla, **en orden alfabético por nombre**, copiando el formato de la
que ya está:

```markdown
| Nombre Apellido | [@tuusuario](https://github.com/tuusuario) | Lo que te gustaría llevarte del curso |
```

La tercera columna no es relleno: la leeré antes del día 2 para ajustar los ejemplos a lo
que haya pedido la gente. Sé concreto — «series temporales de NDVI en mis parcelas» sirve
mucho más que «aprender GEE».

### 4.4. *Commit changes...*

Botón verde arriba a la derecha. Se abre un cuadro con dos campos:

- **El título del *commit***: una línea, en presente, diciendo qué hace el cambio.
  `Añadir Nombre Apellido a PARTICIPANTES`. No `cambios`, no `update`, no `asdf`.
- **La descripción**: opcional, y aquí sobra.

Debajo verás **«Create a new branch for this commit and start a pull request»**, ya
marcado y con un nombre de rama propuesto. Déjalo marcado. Puedes mejorar el nombre:
`anade-nombre-apellido` dice más que `patch-1`.

→ **Propose changes**.

### 4.5. Abre el PR

GitHub te lleva a la pantalla de *pull request*. Comprueba las dos flechas de arriba, que
es lo único que se suele equivocar:

```
base: Digdgeo/GEE_Course_2026  main   ←   compare: tuusuario/GEE_Course_2026  tu-rama
```

**`base` es a dónde va** (mi repositorio) y **`compare` de dónde viene** (tu rama). Si
están al revés, el PR no tiene sentido.

El título ya viene puesto con el del *commit*. En la descripción, una línea basta:
*«Mi línea en PARTICIPANTES. Vengo del día 1.»*

→ **Create pull request**. Ya está. Eso es un *pull request*.

### 4.6. Qué pasa después

Te llegará un correo cuando lo revise. Pueden pasar tres cosas, y las tres son normales:

- **Se acepta** (*merge*): tu línea entra en `main` y tu nombre queda en el historial del
  repositorio, con tu *commit* y tu autoría. Ya has contribuido a un proyecto público.
- **Te pido un cambio**: lo comento en línea, sobre la línea exacta. Lo arreglas **en la
  misma rama** —con el mismo lápiz— y el PR se actualiza solo. No se abre otro PR.
- **Hay conflicto**: alguien tocó esa misma zona de la tabla antes que tú. GitHub te lo
  dice y se resuelve en el navegador. Lo vemos en clase si pasa, que con 16 personas
  editando la misma tabla pasará.

Cuando se acepte, GitHub te ofrecerá **borrar la rama**. Bórrala: ya cumplió. Tu *commit*
no se va con ella.

---

## 5. Lo mismo en local, cuando compensa

Todo lo de arriba se hace desde el navegador, y para un cambio de una línea el navegador
**es la herramienta correcta**. En local compensa cuando: son varios ficheros a la vez,
quieres ejecutar lo que cambias antes de proponerlo, o estás sin conexión.

Para eso necesitas git instalado y VS Code, y eso va en la **otra guía del día**:
[GUIA_ENTORNO.md](GUIA_ENTORNO.md). Aquí solo lo que es de GitHub y no del editor.

### 5.1. La autenticación: tu contraseña no vale

Desde 2021 GitHub **no acepta la contraseña de la cuenta** para operaciones de git. Es el
primer tropiezo de todo el mundo, así que: dos opciones, elige una.

**Token (más fácil de empezar)**

Settings → Developer settings → Personal access tokens → *Fine-grained tokens* →
*Generate new token*. Dale acceso solo a los repositorios que necesites, caducidad de 90
días, y **cópialo en ese momento**: no se vuelve a mostrar nunca. Cuando git te pida la
contraseña, pega el token.

**Clave SSH (más cómoda a la larga)**

```bash
ssh-keygen -t ed25519 -C "tu@correo.es"     # Enter a todo
cat ~/.ssh/id_ed25519.pub                   # copia esta línea entera
```

Y pégala en GitHub → Settings → SSH and GPG keys → *New SSH key*. Comprueba:

```bash
ssh -T git@github.com
# Hi tuusuario! You've successfully authenticated...
```

El fichero **`id_ed25519` sin `.pub` es la clave privada y no sale de tu ordenador
nunca**. Se sube la que termina en `.pub`.

### 5.2. El ciclo local, cinco comandos

```bash
git clone https://github.com/tuusuario/GEE_Course_2026.git
cd GEE_Course_2026

git checkout -b mi-rama        # rama nueva, SIEMPRE antes de tocar nada
# ... editas ficheros ...
git add .                      # marcar qué entra en el commit
git commit -m "Mensaje que dice qué hace"
git push -u origin mi-rama     # subir la rama
```

El `push` te devuelve un enlace para abrir el PR. Y en VS Code esos cinco comandos son el
panel de *Source Control*, con los mismos nombres: no es otra cosa, es lo mismo con
botones.

---

## 6. Los errores del primer día

| Lo que ves | Qué pasó | Arreglo |
|---|---|---|
| `Support for password authentication was removed` | Metiste la contraseña | Token o SSH (§5.1) |
| `Permission denied` al hacer *push* | Intentas subir a mi repositorio, no al tuyo | Haz *fork* y trabaja en tu copia |
| Has hecho *commit* en `main` sin querer | Falta el `checkout -b` | `git branch mi-rama && git reset --hard origin/main` desde `main`, y sigues en la rama |
| `This branch is out of date` | `main` avanzó mientras tú trabajabas | *Sync fork* en el navegador, o `git pull origin main` en tu rama |
| `Your branch is ahead of 'origin/main' by 1 commit` | Tienes *commit* local sin subir | `git push` |
| El PR muestra 300 ficheros cambiados | Ramas cruzadas, o has hecho *commit* de un entorno o de datos | Mira las flechas `base`/`compare` (§4.5) y el `.gitignore` |

Y una regla que ahorra disgustos: **en un repositorio de código no se suben datos**. Ni
rásters, ni `.zip`, ni el entorno de conda, ni las salidas. GitHub corta en 100 MB por
fichero, pero el problema no es el límite: es que el historial se vuelve ilegible. Para
datos, Zenodo; para rutas, un fichero de configuración.

---

## 7. Lo que esto te da en la ciencia

- **Licencia.** Un repositorio sin licencia es, legalmente, «todos los derechos
  reservados»: nadie puede usar tu código, aunque esté a la vista. Añadir una (MIT, o
  GPL-3.0 si quieres que las mejoras vuelvan) es un fichero y es lo que convierte «está
  publicado» en «se puede usar».
- **DOI con Zenodo.** Conectas el repositorio a [Zenodo](https://zenodo.org/), publicas
  una *release* y Zenodo le da un DOI citable, con su versión congelada. Eso es lo que se
  pone en un artículo, no la URL de GitHub — la URL cambia y el DOI no.
- **`CITATION.cff`.** Un fichero de diez líneas en la raíz, y GitHub muestra un botón
  *Cite this repository* que escupe la cita en BibTeX. Media hora bien invertida.
- **Issues como cuaderno de laboratorio.** Un *issue* por cada problema abierto, con lo
  que probaste y lo que descartaste. Dentro de un año es lo único que recordará por qué
  aquella decisión se tomó así.

---

## 8. Chuleta

| Quiero... | Navegador | Terminal |
|---|---|---|
| Copiar un repo ajeno a mi cuenta | *Fork* | — |
| Traérmelo al ordenador | — | `git clone <url>` |
| Rama nueva | Selector de rama → escribir nombre | `git checkout -b nombre` |
| Ver qué he cambiado | Pestaña del PR | `git status` / `git diff` |
| Guardar el cambio | *Commit changes* | `git add . && git commit -m "..."` |
| Subirlo | (automático) | `git push` |
| Proponerlo | *Create pull request* | el enlace que da el `push` |
| Traer lo nuevo de los demás | *Sync fork* | `git pull` |
| Ver la historia | Pestaña *Commits* | `git log --oneline --graph` |

---

## 9. Para profundizar

- [GitHub: Hello World](https://docs.github.com/es/get-started/start-your-journey/hello-world) — el tutorial oficial, 15 minutos
- [GitHub Skills](https://skills.github.com/) — cursos cortos que se hacen *dentro* de GitHub
- [Pro Git](https://git-scm.com/book/es/v2) — el libro, en español y gratis. Los capítulos 1-3 son todo lo que se usa el 95 % del tiempo
- [Oh Shit, Git!?!](https://ohshitgit.com/) — qué hacer cuando ya la has liado. Impagable
- [Citar software con Zenodo](https://docs.github.com/es/repositories/archiving-a-github-repository/referencing-and-citing-content)
- [Choose a License](https://choosealicense.com/) — elegir licencia en dos preguntas
