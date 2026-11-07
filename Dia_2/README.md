# Día 2 — Code Editor a fondo y el salto a Python

**Martes 10 de noviembre · 9:00-15:00**

El día de más contenido de análisis del curso: se trabaja de verdad con colecciones,
series temporales y estadísticas zonales, primero en JavaScript y después **el mismo
análisis en Python**, para ver que es la misma herramienta con dos pieles.

## 🎯 Objetivos

- Construir series temporales regulares a partir de colecciones irregulares.
- Calcular estadísticas por zona sobre muchos polígonos sin que reviente.
- Reescribir en Python con geemap lo hecho en JavaScript, y saber cuándo compensa.
- Reconocer y arreglar los tres errores de memoria y tiempo que todo el mundo se come.

## 📚 Contenidos

### 1. Colecciones y series temporales (JavaScript, ~2 h)

- Filtrar por fecha, por zona y por metadatos; enmascarar nubes bien.
- **Rejillas temporales**: componer por mes, estación o año con `map` sobre una lista de
  fechas, en vez de a mano.
- Qué reductor usar y qué hace cada uno cuando un periodo se queda sin imágenes.
- **Tendencias**: `ee.Reducer.linearFit` y `ee.Reducer.sensSlope`, y la pendiente en
  unidades por año, que es el error clásico.
- Un vistazo a la **estacionalidad**: amplitud y fase con un ajuste armónico, que es lo
  que luego enseñará la app del jueves.

### 2. Estadísticas zonales (JavaScript, ~1 h)

- `reduceRegion` contra `reduceRegions`: cuándo usar cada uno y por qué el segundo escala.
- Reductores combinados y agrupados: media, desviación y percentiles en una sola pasada.
- `scale` manda sobre el resultado: explícito siempre.
- Exportar la tabla a Drive o a *asset*, que es como sale el dato del curso al mundo real.

### 3. Optimización (~45 min)

- El **Profiler** del Code Editor: leer la tabla y encontrar quién se come el tiempo.
- Los tres errores: `User memory limit exceeded`, `Computation timed out` y
  `Too many concurrent aggregations`. Qué palanca tocar en cada uno.
- `scale`, `maxPixels`, `bestEffort` y `tileScale`: qué hace cada uno de verdad.

### 4. Python: geemap y Colab (~2 h)

- El mismo análisis, traducido: equivalencias y lo que cambia de verdad.
- **Colab** como entorno por defecto, sin instalar nada; autenticación y proyecto.
- `geemap`: mapa interactivo, capas, inspector, y `ee_to_df` para caer en pandas, que es
  donde el análisis se vuelve cómodo.
- Opcional, para quien quiera: el mismo cuaderno desde **VS Code** o **Antigravity**.

## 💻 Scripts del día

| Script | Qué enseña |
|---|---|
| `ndvi_estacional.js` | Composición estacional |
| `ndvi_estacional_decades.js` | La misma idea por décadas |
| `mndwi_decades.js` | MNDWI por décadas sobre las lagunas de Doñana |
| `07_srtm_munis.js` | Estadísticas zonales por municipio |
| `GEE_CSIC_2025_1.ipynb` | Introducción a geemap |
| `series_rejilla_temporal.js` | Rejilla temporal mensual con los huecos declarados, tendencia en unidades/año y estacionalidad armónica |
| `zonales_reduceregions.ipynb` | `reduceRegions` en Python: reductores combinados y agrupados, salida a pandas y las palancas de memoria y tiempo |

## ✅ Ejercicio del día

Una serie temporal de un índice a elegir sobre una zona propia, con su tendencia, y una
tabla de estadísticas por zona exportada a CSV. En JavaScript **o** en Python, a gusto.

## 🎯 Deberes para el último día

Mañana no hay clase (huelga general) y el jueves y el viernes van de aplicaciones. Así
que **entre mañana y el fin de semana, elige el repositorio al que quieres contribuir el
lunes**: puede ser [Ndvi2Gif](https://github.com/Digdgeo/Ndvi2Gif), el de este curso, o
cualquier proyecto de código abierto que uses. Mira sus *issues* y trae una idea.

## 📖 Para profundizar

- [Reducing a FeatureCollection](https://developers.google.com/earth-engine/guides/reducers_reduce_regions)
- [Best practices](https://developers.google.com/earth-engine/guides/best_practices)
- [geemap](https://geemap.org/) · [Tutoriales](https://geemap.org/tutorials/)
