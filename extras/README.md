# Extras — el cajón de los comodines

Scripts que **no están en el programa de ningún día** pero que están listos para
abrirse si la clase los pide, si sobra media hora o si una pregunta lleva justo ahí.
Vienen de ediciones anteriores del curso (2022-2025) y se han tocado lo justo para que
**corran al pegarlos en el Code Editor**, sin dibujar geometrías ni cargar *assets*.

Esto es contenido de Earth Engine. Para el repaso de **JavaScript** desde cero, que es
otra cosa, está [`Dia_1/repaso_js/`](../Dia_1/repaso_js/).

| Script | Qué enseña | Cuándo sacarlo |
|---|---|---|
| [`ndvi_estacional_manual.js`](ndvi_estacional_manual.js) | El NDVI estacional escrito a mano, una variable por estación y por año | Junto a `Dia_2/scripts/ndvi_estacional.js`: el antes y el después de refactorizar |
| [`ndvi_zonas_mde.js`](ndvi_zonas_mde.js) | `.where()` en cadena para reclasificar, y **el reductor agrupado** (`mean().group(1)`) | Día 2, bloque de estadísticas zonales. Es lo que nadie encuentra en la API |
| [`barcos_sentinel1.js`](barcos_sentinel1.js) | Radar: el máximo de VH como mapa de tráfico marítimo, 2019 contra 2020 | Cuando haga falta despertar al aula. Funciona siempre |

## Qué NO está aquí, y por qué

Hubo un cuarto script, `mndwi_decadas_landsat.js`, y se ha borrado: era el mismo análisis
que `Dia_2/scripts/mndwi_decades.js` y no tenía sentido mantener dos. Lo que valía de él
—la nota sobre el *offset* de la Colección 2 y la de `reproject()` dentro de un `map()`—
está ahora dentro del script del día 2, junto al código al que se refiere.

## De dónde sale cada uno

Los tres vienen de los scripts del Code Editor de Diego usados en 2024 y 2025. El del NDVI
estacional tiene una versión refactorizada en `Dia_2/scripts/`, y aquí se guarda **la
versión de clase** a propósito: la que se lee de arriba abajo sin funciones de por medio.
El de las zonas con reductor agrupado no tiene equivalente en el repositorio, y el de los
barcos tampoco: su hermano mayor, cuatro veces más largo, está en el
[curso de 2025](https://github.com/Digdgeo/GEE_Course_2025/blob/main/Dia_3/scripts/sentinel1_ships.js).
