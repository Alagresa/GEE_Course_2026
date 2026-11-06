/**
 * Día 1 · Primeros pasos en el Code Editor
 * Curso «Análisis geoespacial avanzado con Google Earth Engine» — CSIC / EBD, 2026
 *
 * El camino corto desde una cuenta recién creada hasta algo que se ve en el mapa:
 * una imagen, una colección, un filtro, un índice y una visualización.
 *
 * Todo lo que empieza por `ee.` vive en los servidores de Google. Aquí solo
 * escribimos la receta; el cálculo pasa allí.
 */

// ---------------------------------------------------------------------------
// 1. Dónde miramos
// ---------------------------------------------------------------------------

var donana = ee.Geometry.Rectangle([-6.55, 36.85, -6.15, 37.15]);
Map.centerObject(donana, 11);

// ---------------------------------------------------------------------------
// 2. Una imagen suelta
// ---------------------------------------------------------------------------

// Un modelo digital del terreno: una sola imagen, sin tiempo.
var mdt = ee.Image('USGS/SRTMGL1_003');
print('El MDT es un objeto del servidor:', mdt);          // no es un número: es una receta
print('Sus bandas:', mdt.bandNames());                     // esto sí baja un dato pequeño

Map.addLayer(mdt.clip(donana), {min: 0, max: 120, palette: ['#2b303a', '#92dce5', '#eee5e9']},
             'MDT (SRTM)', false);

// ---------------------------------------------------------------------------
// 3. Una colección: muchas imágenes con fecha
// ---------------------------------------------------------------------------

var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED');
print('Escenas en todo el archivo (no lo imprimas entero):', s2.size());  // tarda: es enorme

// ---------------------------------------------------------------------------
// 4. Filtrar: el paso que decide si tu script tarda 3 s o 3 min
// ---------------------------------------------------------------------------

var coleccion = s2
  .filterBounds(donana)                                  // dónde
  .filterDate('2026-03-01', '2026-06-01')                // cuándo
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));  // qué calidad

print('Escenas que quedan tras filtrar:', coleccion.size());
print('La primera, para ver sus metadatos:', coleccion.first());

// ---------------------------------------------------------------------------
// 5. Quitar las nubes
// ---------------------------------------------------------------------------

/**
 * Enmascara nubes, sombras y cirros usando la banda SCL de Sentinel-2 L2A.
 * Clases que se descartan: 3 sombra, 8 nube media, 9 nube alta, 10 cirro.
 */
function sinNubes(imagen) {
  var scl = imagen.select('SCL');
  var mala = scl.eq(3).or(scl.eq(8)).or(scl.eq(9)).or(scl.eq(10));
  return imagen.updateMask(mala.not())
               .divide(10000)                 // a reflectancia 0-1
               .copyProperties(imagen, ['system:time_start']);
}

var limpia = coleccion.map(sinNubes);   // `map` aplica la función EN EL SERVIDOR

// ---------------------------------------------------------------------------
// 6. Un compuesto y un índice
// ---------------------------------------------------------------------------

var compuesto = limpia.median().clip(donana);

Map.addLayer(compuesto, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.25}, 'Color natural');
Map.addLayer(compuesto, {bands: ['B8', 'B4', 'B3'], min: 0, max: 0.4}, 'Falso color', false);

var ndvi = compuesto.normalizedDifference(['B8', 'B4']).rename('NDVI');
Map.addLayer(ndvi, {min: -0.2, max: 0.8, palette: ['#a6611a', '#f5f5f5', '#1a9641']}, 'NDVI');

// ---------------------------------------------------------------------------
// 7. Un número que resuma: la media de NDVI en la zona
// ---------------------------------------------------------------------------

var media = ndvi.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: donana,
  scale: 20,          // SIEMPRE explícito: el resultado depende de esta línea
  maxPixels: 1e9
});
print('NDVI medio de la zona:', media.get('NDVI'));

// ---------------------------------------------------------------------------
// EJERCICIO
// ---------------------------------------------------------------------------
// 1. Cambia la zona por una que te interese (dibújala con la herramienta del mapa).
// 2. Cambia las fechas a tu estación del año preferida.
// 3. Añade el MNDWI —(B3 - B11) / (B3 + B11)— y compáralo con el NDVI.
// 4. ¿Qué pasa si subes el filtro de nubes al 80 %? Mira el compuesto, no el número.
