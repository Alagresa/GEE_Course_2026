/**
 * Extra · Zonificación: NDVI máximo, MDE reclasificado y estadísticas agrupadas
 * Curso «Análisis geoespacial avanzado con Google Earth Engine» — CSIC / EBD, 2026
 *
 * De los scripts de ediciones anteriores, este es el único que no tiene
 * equivalente en el repositorio de 2026, y el único que corría al pegarlo sin
 * tocar nada: la geometría ya estaba definida en código.
 *
 * Enseña tres cosas que no están juntas en ningún otro sitio del curso:
 *
 *   1. `.where()` en cadena para reclasificar por umbrales, que es la
 *      alternativa a `.expression()` y mucho más legible.
 *   2. Una máscara de mar hecha con el propio MDE (`elevation.neq(0)`), que es
 *      el truco sucio que funciona y que conviene conocer antes de pasar a las
 *      máscaras de agua decentes.
 *   3. **El reductor agrupado**: `ee.Reducer.mean().group(1)` — la media de una
 *      banda calculada por clases de otra. Es la tabla de estadísticas por zona
 *      sin salir de la imagen, y es lo que casi nadie encuentra en la API.
 */

// ---------------------------------------------------------------------------
// 1. Zona de estudio: un punto y su entorno
// ---------------------------------------------------------------------------

var geometry2 = ee.Geometry.Point([-6.302875, 37.44111]);   // Villamanrique / Aznalcázar
var region = geometry2.buffer(30000);                        // 30 km alrededor

// ---------------------------------------------------------------------------
// 2. NDVI máximo del año a partir de Landsat 8
// ---------------------------------------------------------------------------

var landsat = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterDate('2023-01-01', '2024-01-01')
    .filterBounds(geometry2);

var ndvi = landsat.map(function(image) {
  var result = image.normalizedDifference(['SR_B5', 'SR_B4']).rename('ndvi');
  return image.addBands(result);
});

var maxNDVI = ndvi.max().select('ndvi');

// NOTA: el NDVI es un cociente normalizado, así que los factores de
// escala de la Colección 2 (×0.0000275 − 0.2) no cambian el resultado... casi.
// El factor se cancela, pero el OFFSET de −0.2 no: sobre números sin escalar el
// índice sale parecido pero no igual. Aquí, para un máximo anual que solo se
// mira, da igual; si el número va a un paper, hay que escalar antes. La nota
// larga sobre esto está en `Dia_2/scripts/mndwi_decades.js`.

// ---------------------------------------------------------------------------
// 3. Modelo digital del terreno
// ---------------------------------------------------------------------------

var elevation = ee.Image('USGS/SRTMGL1_003');

// Máscara de mar casera: en el SRTM el mar vale exactamente 0.
var mascara = elevation.neq(0);

// ---------------------------------------------------------------------------
// 4. Reclasificar por umbrales con .where()
// ---------------------------------------------------------------------------

// Cada `.where()` se aplica sobre el resultado del anterior, así que el ORDEN
// importa: hay que ir de menor a mayor para que el último gane.
var zones = ee.Image.constant(1)
    .where(maxNDVI.gt(0.1), 1)
    .where(maxNDVI.gt(0.2), 2)
    .where(maxNDVI.gt(0.3), 3)
    .where(maxNDVI.gt(0.4), 4)
    .updateMask(mascara)
    .clip(region);

var elevation_reclass = ee.Image(0)
    .where(elevation.gt(5), 1)
    .where(elevation.gt(10), 2)
    .where(elevation.gt(100), 3)
    .where(elevation.gt(500), 4)
    .where(elevation.gt(1000), 5)
    .updateMask(mascara)
    .clip(geometry2.buffer(75000));

var masked_ndvi = maxNDVI.updateMask(mascara);

// ---------------------------------------------------------------------------
// 5. Visualización
// ---------------------------------------------------------------------------

Map.centerObject(geometry2, 10);

Map.addLayer(mascara, {min: 0, max: 1, palette: ['000000', 'ffffff']}, 'Máscara de tierra', false);
Map.addLayer(masked_ndvi, {min: 0, max: 0.75}, 'NDVI máximo 2023');
Map.addLayer(elevation_reclass, {min: 0, max: 5,
             palette: ['cyan', 'green', 'orange', 'brown', 'purple', 'white']}, 'Zonas de elevación');
Map.addLayer(zones, {min: 1, max: 4, palette: ['white', 'c7e9c0', '74c476', '238b45']}, 'Zonas de NDVI');
Map.addLayer(region, {color: 'yellow'}, 'Región (30 km)', false);

// ---------------------------------------------------------------------------
// 6. El reductor agrupado: la media de elevación POR CLASE de NDVI
// ---------------------------------------------------------------------------

// `group(1)` significa «agrupa por la banda de índice 1», que aquí es `zones`
// porque la imagen se construyó como [elevation, zones]. El índice es
// posicional, así que si cambias el orden de las bandas, cambia el grupo.
var stats = elevation.addBands(zones).reduceRegion({
  reducer: ee.Reducer.mean().group(1),
  geometry: region,
  scale: 30,
  maxPixels: 1e11
});

print('Elevación media por clase de NDVI:', stats);

// ---------------------------------------------------------------------------
// 7. Para seguir
// ---------------------------------------------------------------------------

/*
 * 1. Cambia `ee.Reducer.mean()` por `ee.Reducer.count()` y mira cuántos
 *    píxeles hay en cada clase: es el histograma de la zonificación.
 * 2. Invierte los grupos (agrupa el NDVI por clases de elevación) cambiando el
 *    orden de las bandas en el `addBands`. El `group(1)` sigue valiendo.
 * 3. Sustituye la máscara `elevation.neq(0)` por una de verdad —el
 *    `occurrence` del JRC Global Surface Water, por ejemplo— y compara.
 */
