/**
 * Extra · NDVI estacional, año a año y a mano (2016-2020)
 * Curso «Análisis geoespacial avanzado con Google Earth Engine» — CSIC / EBD, 2026
 *
 * Este es el script tal y como se escribió la primera vez: una variable por
 * estación y por año, repetida quince veces. Funciona perfectamente y se lee
 * sin saber nada de funciones.
 *
 * Su pareja es `Dia_2/scripts/ndvi_estacional.js`, que hace lo mismo con una
 * función y un bucle. Los dos juntos son el ejercicio de refactorización más
 * útil del curso: **esto** es lo que hay que saber escribir primero, y **eso**
 * es en lo que se convierte cuando te cansas de copiar y pegar.
 *
 * Lo único que se ha tocado: la geometría, que antes se dibujaba a mano y
 * ahora está definida abajo para que el script corra al pegarlo.
 */

// ---------------------------------------------------------------------------
// La zona de estudio. Antes era un rectángulo dibujado en el mapa; si
// prefieres dibujarlo, bórralo y llama `geometry` al que dibujes.
// ---------------------------------------------------------------------------

var geometry = ee.Geometry.Rectangle([-6.55, 36.80, -6.05, 37.25]);  // marisma del Guadalquivir

var coleccion = 'LANDSAT/COMPOSITES/C02/T1_L2_32DAY_NDVI';

// Año 2016

var inv_16 = ee.ImageCollection(coleccion)
                  .filterDate('2016-01-01', '2016-03-31')
                  .select('NDVI').max();

var prim_16 = ee.ImageCollection(coleccion)
                  .filterDate('2016-04-01', '2016-06-30')
                  .select('NDVI').max();

var ver_16 = ee.ImageCollection(coleccion)
                  .filterDate('2016-07-01', '2016-09-30')
                  .select('NDVI').max();

// Año 2017

var inv_17 = ee.ImageCollection(coleccion)
                  .filterDate('2017-01-01', '2017-03-31')
                  .select('NDVI').max();

var prim_17 = ee.ImageCollection(coleccion)
                  .filterDate('2017-04-01', '2017-06-30')
                  .select('NDVI').max();

var ver_17 = ee.ImageCollection(coleccion)
                  .filterDate('2017-07-01', '2017-09-30')
                  .select('NDVI').max();

// Año 2018

var inv_18 = ee.ImageCollection(coleccion)
                  .filterDate('2018-01-01', '2018-03-31')
                  .select('NDVI').max();

var prim_18 = ee.ImageCollection(coleccion)
                  .filterDate('2018-04-01', '2018-06-30')
                  .select('NDVI').max();

var ver_18 = ee.ImageCollection(coleccion)
                  .filterDate('2018-07-01', '2018-09-30')
                  .select('NDVI').max();

// Año 2019

var inv_19 = ee.ImageCollection(coleccion)
                  .filterDate('2019-01-01', '2019-03-31')
                  .select('NDVI').max();

var prim_19 = ee.ImageCollection(coleccion)
                  .filterDate('2019-04-01', '2019-06-30')
                  .select('NDVI').max();

var ver_19 = ee.ImageCollection(coleccion)
                  .filterDate('2019-07-01', '2019-09-30')
                  .select('NDVI').max();

// Año 2020 — este sí lleva los nombres puestos, y por eso es el que se visualiza

var inv_20 = ee.ImageCollection(coleccion)
                  .filterDate('2020-01-01', '2020-03-31')
                  .select('NDVI').max()
                  .rename('invierno');

var prim_20 = ee.ImageCollection(coleccion)
                  .filterDate('2020-04-01', '2020-06-30')
                  .select('NDVI').max()
                  .rename('primavera');

var ver_20 = ee.ImageCollection(coleccion)
                  .filterDate('2020-07-01', '2020-09-30')
                  .select('NDVI').max()
                  .rename('verano');

var oto_20 = ee.ImageCollection(coleccion)
                  .filterDate('2020-10-01', '2020-12-31')
                  .select('NDVI').max()
                  .rename('otono');

// ---------------------------------------------------------------------------
// Una imagen multibanda por año: cada banda es una estación
// ---------------------------------------------------------------------------

var year16 = ee.Image.cat(inv_16, prim_16, ver_16).clip(geometry);
var year17 = ee.Image.cat(inv_17, prim_17, ver_17).clip(geometry);
var year18 = ee.Image.cat(inv_18, prim_18, ver_18).clip(geometry);
var year19 = ee.Image.cat(inv_19, prim_19, ver_19).clip(geometry);
var year20 = ee.Image.cat(inv_20, prim_20, ver_20, oto_20).clip(geometry);

// Máscara: solo donde hay vegetación activa de media en el año.
var media = year20.reduce(ee.Reducer.mean());
var mask = media.gt(0.20);
var year_2020_masked = year20.mask(mask);

// ---------------------------------------------------------------------------
// Visualización
// ---------------------------------------------------------------------------

Map.centerObject(geometry, 9);

// Sin `bands`, el Code Editor pinta las TRES PRIMERAS bandas como R, G y B.
// En `year20` eso es invierno-primavera-verano, y otoño no se ve: está en la
// imagen y entra en la máscara, pero no en el color. Para verlo, cambia la
// combinación a mano: {bands: ['otono', 'primavera', 'invierno'], ...}
Map.addLayer(year20, {min: 0.1, max: 0.7}, '2020');
Map.addLayer(year_2020_masked, {min: 0.25, max: 0.7}, '2020 enmascarado');

// Los otros años quedan listos para comparar; descoméntalos de uno en uno.
// Map.addLayer(year16, {min: 0.1, max: 0.7}, '2016');
// Map.addLayer(year17, {min: 0.1, max: 0.7}, '2017');
// Map.addLayer(year18, {min: 0.1, max: 0.7}, '2018');
// Map.addLayer(year19, {min: 0.1, max: 0.7}, '2019');

// ---------------------------------------------------------------------------
// Cómo se lee el color
// ---------------------------------------------------------------------------

print('Rojo: la vegetación da su máximo en INVIERNO');
print('Verde: máximo en PRIMAVERA');
print('Azul: máximo en VERANO');
print('Amarillo: invierno y primavera');
print('Cian: primavera y verano');
print('Magenta: invierno y verano');
print('Blanco: activa todo el año — regadío, casi siempre');
print('Negro: nunca pasa del umbral — agua, suelo desnudo, urbano');

// ---------------------------------------------------------------------------
// El ejercicio
// ---------------------------------------------------------------------------

/*
 * Cuenta las líneas que hay que tocar para añadir 2021. Luego abre
 * `Dia_2/scripts/ndvi_estacional.js` y cuenta las de allí. Esa diferencia es
 * todo el argumento a favor de escribir funciones; no hay que creérselo por fe.
 */
