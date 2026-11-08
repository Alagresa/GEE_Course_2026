# Día 3 — Una aplicación desde el Code Editor

**Jueves 12 de noviembre · 9:00-15:00**
*(la sesión del miércoles 11 se trasladó por la huelga general)*

De un script a algo que puede usar alguien que no programa. Hoy se monta y se **publica**
una aplicación entera en JavaScript.

## 🎯 Objetivos

- Construir una interfaz con los componentes `ui.*` del Code Editor.
- Conectar la interfaz al análisis sin recalcularlo todo en cada clic.
- Publicar una App y entender qué implica: quién entra, quién paga, qué se versiona.
- Salir con una aplicación propia publicada y con enlace.

## 📚 Contenidos

### 1. Los componentes (~1 h 30)

- `ui.Panel`, `ui.Label`, `ui.Button`, `ui.Select`, `ui.Slider`, `ui.Textbox`.
- Diseño: paneles anidados, estilos, `ui.SplitPanel` para comparar dos fechas.
- `ui.Chart` dentro de la interfaz, alimentado por la serie temporal del día 2.
- Eventos: `onClick`, `onChange`, `Map.onClick`.

### 2. Que no vaya lenta (~1 h)

- El error clásico: recalcular la colección entera en cada evento.
- Qué guardar en el estado de la aplicación y qué recalcular.
- Precalcular a *asset* lo que no cambia, y por qué una App que tarda 30 s no la usa nadie.

### 3. Publicar (~1 h)

- De script a **App**: el flujo, el nombre, el enlace, quién puede verla.
- **La App corre con tu cuota**, no con la del visitante — enlaza con los precios del día 1.
- *Assets* privados: lo que tú ves y tus visitantes no.
- Versionado: la App apunta a una copia del código, no a tu script vivo.

### 4. Caso práctico: visor de inundación de la marisma (~2 h)

Se monta entre todos una aplicación de verdad, la que se usa en el LAST-EBD reducida a lo
que cabe en una mañana: selector de fecha, máscara de inundación sobre la ortofoto,
cortinilla para comparar dos fechas y una gráfica de superficie inundada.

**Segundo caso, de repuesto: [`algas_embalses_base.js`](scripts/algas_embalses_base.js).**
Afloramientos de algas en embalses andaluces. El análisis está escrito y comentado, y la
interfaz **no**: eso es justamente el ejercicio. Se usa si el visor de inundación sale más
rápido de lo previsto, o como alternativa para quien prefiera un caso que no sea Doñana.
El propio script termina con la lista de qué `ui.*` va en cada sitio.

Se monta en este orden a propósito —primero el análisis, luego la interfaz—, que es el que
nunca se sigue y el que evita descubrir que lo que ibas a envolver no funcionaba.

## 💻 Scripts del día

| Script | Qué enseña |
|---|---|
| *(por escribir)* `app_01_panel_basico.js` | Panel, etiquetas y un botón que hace algo |
| *(por escribir)* `app_02_selector_fechas.js` | Selector de fecha y capa que se actualiza |
| *(por escribir)* `app_03_splitpanel.js` | Comparar dos fechas con cortinilla |
| *(por escribir)* `app_04_inundacion.js` | El visor completo |
| [`algas_embalses_base.js`](scripts/algas_embalses_base.js) | **El análisis antes de la interfaz**: afloramientos de algas en seis embalses andaluces, con NDCI y FAI sobre la lámina de agua del JRC. Sin un solo `ui.*` |

## ✅ Ejercicio del día

Una App propia publicada, con enlace que se pueda abrir desde el móvil. Se valora que
**funcione y se entienda sin explicación**, no que tenga muchos botones.

## 📖 Para profundizar

- [Earth Engine Apps](https://developers.google.com/earth-engine/guides/apps)
- [ui.Panel](https://developers.google.com/earth-engine/apidocs/ui-panel)
