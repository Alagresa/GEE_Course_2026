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

### Antes de las cinco: git y GitHub no son lo mismo

Es la confusión más común de todas, y deshacerla cuesta diez segundos. **Son dos cosas
distintas, de autores distintos y de épocas distintas:**

| | Qué es | Dónde está |
|---|---|---|
| **git** | Un **programa** que lleva la cuenta de los cambios de una carpeta. Lo escribió Linus Torvalds en 2005 para el núcleo de Linux | **En tu ordenador**, y hay que instalarlo: [GUIA_ENTORNO.md](GUIA_ENTORNO.md) §3 |
| **GitHub** | Una **web** donde se guardan repositorios de git y se trabaja sobre ellos entre varios. Es una empresa, de 2008, hoy de Microsoft | En internet. Solo hace falta una cuenta |

GitHub está construido **encima** de git, y no es el único: existen GitLab, Codeberg,
Bitbucket y los GitLab que montan muchas instituciones. El programa de debajo es el mismo
en todos.

De ahí salen tres consecuencias que son las que de verdad importan hoy:

- **Se puede usar GitHub sin git.** Todo el §4 de esta guía —tu primer *pull request*
  incluido— se hace desde el navegador, sin instalar nada. Es lo que vamos a hacer en clase.
- **Y se puede usar git sin GitHub**: historial completo de tu trabajo en tu disco, sin
  cuenta y sin internet. Para un análisis tuyo que no quieres publicar todavía, sobra.
- **Tener cuenta de GitHub no instala git, y git no tiene cuentas.** Esto explica una cosa
  que si no desconcierta: cuando en el §5.1 configures `user.name` y `user.email`, **no
  estás creando ninguna cuenta ni metiendo ninguna contraseña** — le estás diciendo a un
  programa de tu ordenador con qué nombre firmar. Que ese correo coincida con el de tu
  cuenta de GitHub es lo que luego hace que los *commits* salgan como tuyos allí, y es el
  único punto en que las dos cosas se tocan.

### Y ahora las cinco

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
   Ajustes → *Password and authentication* → *Two-factor authentication*.

   **No te bloquea hoy**, que es la duda habitual: GitHub no la pide al crear la cuenta ni
   al abrir un *pull request*. Selecciona a la gente por su actividad, avisa por correo y da
   **45 días** para configurarla (más una semana de margen con aviso diario). Así que el PR
   de hoy sale igual.

   Dos consejos que ahorran el disgusto de verdad, que nunca es activarla sino perder el
   acceso dos años después:

   - **El segundo factor puede vivir en tu gestor de contraseñas** (Bitwarden, 1Password,
     el del navegador) en vez de en una app del móvil. Sobrevive a perder el teléfono y lo
     tienes en todas tus máquinas. Una app del móvil también vale, pero entonces lee el
     punto siguiente dos veces.
   - **Guarda los códigos de recuperación en un sitio que no sea el móvil.** Son la única
     puerta de atrás si pierdes el teléfono, y no se pueden volver a ver después.
5. Mientras estás ahí: **Settings → Emails → «Keep my email addresses private»**. Si no,
   tu correo queda visible en el historial público de cada *commit* que hagas.

Y si te corresponde, pide la **cuenta académica**:
[education.github.com](https://education.github.com/) reconoce el correo institucional. Ojo
con qué da y qué no: **los repositorios privados ya son gratis para todo el mundo** desde
2020, así que eso no es la ventaja. Lo que aporta es **Copilot Pro sin pagar**, las
funciones de GitHub Pro y una tanda de ofertas de terceros. Hay dos vías, *Student* y
*Teacher*, y las dos piden **justificar la condición** —matrícula o contrato docente—, así
que no es un trámite de un minuto ni se aprueba al instante: puede tardar días. Si estás de
predoctoral entras por *Student*; si no das clase ni estás matriculado, probablemente no
te corresponda, y no pasa nada: **nada de este curso lo necesita**.

---

## 4. Tu primer *pull request*, sin instalar nada

Esto es el ejercicio del día. **Se hace entero desde el navegador**: no hace falta git, ni
terminal, ni editor. Son nueve clics y conviene hacerlos despacio una vez, porque es el
mismo camino que seguirás luego para cosas grandes.

Vas a rellenar tu hueco en el fichero `PARTICIPANTES.md` de este repositorio.

### 4.1. Abre el fichero

Entra en el repositorio del curso y haz clic en **`PARTICIPANTES.md`**. Verás el hueco
**00** ya relleno —el mío— y dieciséis huecos numerados vacíos debajo.

### 4.2. Dale al lápiz

Arriba a la derecha del contenido del fichero hay un **lápiz** (*Edit this file*).
Al pulsarlo, GitHub te dirá algo parecido a:

> *You're making changes in a project you don't have write access to. We've created a fork
> of this project for you to commit your proposed changes to.*

Eso es GitHub **haciéndote el *fork* solo**. No tienes permiso de escritura en mi
repositorio —y es correcto que no lo tengas—, así que te crea tu copia y te deja editar
ahí. Es el mismo *fork* del día 5, hecho por el camino corto.

### 4.3. Rellena tu hueco

**Coge un hueco vacío, el que quieras**, y escribe en su línea —sin tocar ninguna otra—
copiando el formato del 00:

```markdown
**07.** Nombre Apellido · [@tuusuario](https://github.com/tuusuario) · Lo que te gustaría llevarte del curso
```

Lo tercero no es relleno: lo leeré antes del día 2 para ajustar los ejemplos a lo que haya
pedido la gente. Sé concreto — «series temporales de NDVI en mis parcelas» sirve mucho más
que «aprender GEE».

> **Y la única regla:** toca **solo tu línea**. No reordenes, no quites huecos vacíos, no
> arregles nada de nadie. Si cambias líneas que no son tuyas, tu *pull request* choca con
> el de otro y hay que resolverlo a mano (§4.7).

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

### 4.7. Si GitHub te dice que hay un conflicto

Puede pasar, y **no has roto nada**: significa que alguien cogió tu mismo hueco antes de
que entrara tu PR, y git no sabe cuál de los dos quieres. Tiene arreglo en un minuto y lo
haces tú, desde el navegador:

1. En tu *pull request*, abajo, verás **«This branch has conflicts that must be resolved»**.
   Pulsa **Resolve conflicts**.
2. Se abre un editor con tu fichero y, en la zona del choque, unas marcas que git escribe
   para enseñarte las dos versiones:

   ```
   <<<<<<< main
   **07.** Ana López · [@analopez](https://github.com/analopez) · Series temporales
   =======
   **07.** Bruno Ruiz · [@bruno](https://github.com/bruno) · Clasificación
   >>>>>>> anade-bruno-ruiz
   ```

   Arriba, entre `<<<<<<<` y `=======`, lo que ya está en `main`. Abajo, entre `=======` y
   `>>>>>>>`, lo tuyo.
3. **Deja el fichero como quieres que quede y borra las tres líneas de marcas.** Aquí, lo
   razonable: la línea del otro se queda en el 07 y la tuya se va a un hueco libre.

   ```
   **07.** Ana López · [@analopez](https://github.com/analopez) · Series temporales
   ```

   ...y tu línea, en el hueco vacío que elijas más abajo.
4. **Mark as resolved** → **Commit merge**. El PR vuelve a estar limpio y ya se puede
   aceptar.

**Resolver un conflicto es exactamente esto**: decidir tú lo que la máquina no puede
decidir, y quitar las marcas. No es un error del sistema ni una avería; es git negándose a
inventar.

---

## 5. Lo mismo en local, cuando compensa

Todo lo de arriba se hace desde el navegador, y para un cambio de una línea el navegador
**es la herramienta correcta**. En local compensa cuando: son varios ficheros a la vez,
quieres ejecutar lo que cambias antes de proponerlo, o estás sin conexión.

Y para eso necesitas **git instalado en tu ordenador**, que como se vio en el §2 es un
programa aparte y no viene con la cuenta de GitHub. En Linux y Mac suele estar ya; **en
Windows no viene puesto**. La instalación está en la otra guía del día,
[GUIA_ENTORNO.md](GUIA_ENTORNO.md) §3, junto con la de VS Code. Aquí solo lo que es de
GitHub y no del editor.

### 5.1. Quién eres: la configuración que sí sigue haciendo falta

Antes de nada, dos líneas que se escriben **una vez en la vida de cada ordenador**:

```bash
git config --global user.name  "Tu Nombre"
git config --global user.email "tu@correo.es"
```

Sin esto, el primer `git commit` se planta con *«Please tell me who you are»*. No es un
resto del pasado: **sigue siendo obligatorio y lo será siempre**, porque el nombre y el
correo se graban dentro de cada *commit* y son los que aparecen en el historial.

Y aquí está la confusión que conviene deshacer: **esto no es tu contraseña ni tiene nada
que ver con entrar en GitHub.** Git no comprueba nada de lo que pongas ahí; es una
etiqueta. Lo que sí desapareció es la contraseña para subir código, y de eso va el §5.2.
La contraseña **nunca** se puso con `git config`.

**El detalle que importa y que casi nadie sabe:** ese correo es lo que hace que un *commit*
aparezca como tuyo en GitHub, con tu foto y contando en tu perfil. Tiene que ser un correo
**registrado en tu cuenta**. Si en el §3 activaste «Keep my email addresses private», el que
hay que poner no es el tuyo de verdad sino el que GitHub te da para eso, de la forma
`12345678+tuusuario@users.noreply.github.com`, y lo encuentras en **Settings → Emails**. Si
pones otro, pasa una de dos: o tu correo real queda escrito para siempre en un historial
público, o GitHub te rechaza el *push* con un error `GH007`.

Ya que estás, estas tres ahorran avisos y disgustos:

```bash
git config --global init.defaultBranch main   # o seguirá creando ramas "master"
git config --global pull.rebase false         # o git te regaña cada vez que diverja
git config --global core.autocrlf input       # en Windows: true
```

La última es la de los **finales de línea**, y en un grupo con Windows, Mac y Linux a la vez
es la que evita que un día aparezca un *pull request* con «todas las líneas cambiadas» sin
que nadie haya tocado nada.

Para ver qué tienes puesto: `git config --global --list`.

### 5.2. La autenticación: tu contraseña no vale

Desde 2021 GitHub **no acepta la contraseña de la cuenta** para operaciones de git. Es el
primer tropiezo de todo el mundo. Hay tres caminos, y conviene cogerlos en este orden.

**1. El navegador (lo normal, y lo que hay que intentar primero)**

No se copia nada ni se guarda nada a mano. La primera vez que hagas `git push`, git abre
una ventana del navegador, le das a *Authorize* y se acabó.

- **Windows**: no hay que instalar nada. El instalador de Git for Windows trae el **Git
  Credential Manager**, y la credencial queda guardada en el almacén de Windows.
- **Linux y Mac**: eso no viene puesto, así que se usa el programa `gh` de GitHub, que
  tampoco viene puesto y se instala con `sudo apt install gh` o `brew install gh`. Después:

  ```bash
  gh auth login     # elige: GitHub.com → HTTPS → Login with a web browser
  ```

  `gh` se deja configurado como ayudante de credenciales y git deja de preguntar.

Si ves **«me pide usuario y contraseña y la contraseña no vale»**, casi nunca es que te
falte un token: es que se cerró la ventana del navegador, o que ese ayudante no está.

**2. Token, cuando no hay navegador donde corre git**

Un servidor, Colab, una máquina remota por `ssh`: sitios donde no hay navegador que abrir.

Settings → Developer settings → Personal access tokens → *Fine-grained tokens* →
*Generate new token*. Dale acceso solo a los repositorios que necesites, caducidad de 90
días, y **cópialo en ese momento**: no se vuelve a mostrar nunca. Cuando git te pida la
contraseña, pega el token.

Dos avisos: **caduca**, y el día que caduque parecerá que se ha roto git; y un token es una
contraseña, así que no va en un chat, ni en un cuaderno, ni en un commit.

**3. Clave SSH, para tu ordenador de todos los días**

La que mejor envejece: una vez montada no se toca en años, no caduca y no pregunta nada.
Pero son cuatro pasos más que los de arriba, así que **no es por donde se empieza** —y en
algunas redes de centro el puerto 22 está cerrado, lo que se arregla pero cuesta un rato.

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

**¿Funciona igual en Windows, Linux y Mac?** Sí. `ssh-keygen` es el mismo programa en los
tres: Windows 10 y 11 traen OpenSSH de serie, así que vale en PowerShell, en cmd y en Git
Bash sin instalar nada.

> **En Windows, hazlo en Git Bash.** Las tres valen, pero en Git Bash el comando y las
> rutas son idénticos a los de Mac y Linux —`~/.ssh/id_ed25519.pub`, con barras normales—,
> así que puedes seguir cualquier tutorial sin traducir nada. Y viene con git, que ya lo
> tienes instalado.
>
> Un detalle por si algún día te desconcierta: Git Bash trae **su propio `ssh`**, distinto
> del de Windows. La clave es la misma para los dos, porque los dos usan
> `C:\Users\tu-usuario\.ssh`; lo que no se comparte es el `ssh-agent`, así que un
> `ssh-add` hecho en Git Bash no lo ve PowerShell. Solo importa si le pusiste contraseña a
> la clave.

Lo único que cambia es cómo leer el fichero para copiarlo:

| | Leer la clave pública | Copiarla al portapapeles |
|---|---|---|
| **Linux** | `cat ~/.ssh/id_ed25519.pub` | `xclip -sel clip < ~/.ssh/id_ed25519.pub` (o `wl-copy <` en Wayland) |
| **Mac** | `cat ~/.ssh/id_ed25519.pub` | `pbcopy < ~/.ssh/id_ed25519.pub` |
| **Windows** (PowerShell) | `cat ~\.ssh\id_ed25519.pub` | `Get-Content ~\.ssh\id_ed25519.pub \| Set-Clipboard` |

En Windows la carpeta `~/.ssh` es `C:\Users\tu-usuario\.ssh`, y Git Bash usa esa misma,
así que no hay dos sitios.

Y cuatro cosas que sí se tuercen alguna vez:

- **La clave es de la máquina, no tuya.** Es el malentendido más común. Si trabajas en el
  portátil y en el ordenador del despacho, son **dos claves**, y las dos se añaden a la
  misma cuenta de GitHub — admite todas las que quieras. Copiar la clave privada de una
  máquina a otra funciona, pero es mala costumbre: si una se compromete, las pierdes todas.
- **El `ssh-agent`**, que es quien recuerda la contraseña de la clave si le pusiste una. En
  Linux suele estar en marcha; en **Windows es un servicio parado por defecto** y hay que
  arrancarlo (`Set-Service ssh-agent -StartupType Automatic` desde PowerShell como
  administrador, y luego `ssh-add`); en **Mac** conviene `ssh-add --apple-use-keychain` para
  que lo guarde el llavero. Si le diste a Enter sin contraseña, nada de esto hace falta.
- **Permisos, solo en Linux y Mac**: si `ssh` se queja de que la clave está demasiado
  abierta, `chmod 600 ~/.ssh/id_ed25519`. En Windows no pasa, porque usa otro sistema de
  permisos.
- **El puerto 22, cerrado en la red del centro.** Pasa en bastantes institutos: `ssh -T
  git@github.com` se queda colgado y acaba en *Connection timed out*. No es tu clave.
  GitHub escucha también en el 443, el de las webs, que no lo cierra nadie. En
  `~/.ssh/config` (o `C:\Users\tu-usuario\.ssh\config`):

  ```
  Host github.com
    Hostname ssh.github.com
    Port 443
    User git
  ```

  Y vuelve a probar con `ssh -T git@github.com`.

**Nada de esto hace falta para este curso**: el PR del día 1 y el del día 5 se hacen desde
el navegador. Esto es para cuando trabajes en local, y ahí el resumen es corto: **empieza
por el navegador**, que en Windows ya viene con git; guarda el token para las máquinas sin
navegador; y monta la clave SSH cuando sepas que ese ordenador va a ser el tuyo durante
años. Las tres valen a la vez, y se puede cambiar de una a otra cuando quieras.

### 5.3. El ciclo local, cinco comandos

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
| `git: command not found` / VS Code dice que no encuentra git | git no está instalado. La cuenta de GitHub no lo instala (§2) | [GUIA_ENTORNO.md](GUIA_ENTORNO.md) §3. En Windows no viene puesto |
| `Please tell me who you are` al hacer *commit* | Git no sabe tu nombre ni tu correo | Las dos líneas de `git config --global` (§5.1). Pasa en cada ordenador nuevo |
| `Support for password authentication was removed` | Metiste la contraseña | Token o SSH (§5.2) |
| `GH007: Your push would publish a private email address` | Tienes el correo en privado y `user.email` es el real | Pon el `@users.noreply.github.com` de **Settings → Emails** (§5.1) |
| Tus *commits* salen en gris, sin tu foto, y no cuentan en tu perfil | El `user.email` no es ninguno de los de tu cuenta de GitHub | Corrígelo con `git config --global user.email` (§5.1). Los ya hechos se quedan así |
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
| Decirle a git quién soy (una vez por ordenador) | — | `git config --global user.name "..."` y `user.email "..."` |
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
