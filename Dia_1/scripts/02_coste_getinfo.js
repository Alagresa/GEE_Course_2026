/**
 * Día 1 · Lo que cuesta `getInfo()`
 * Curso «Análisis geoespacial avanzado con Google Earth Engine» — CSIC / EBD, 2026
 *
 * El mismo resultado, calculado de dos maneras. La diferencia no es de estilo:
 * es de uno o varios viajes de ida y vuelta a los servidores de Google.
 *
 * Ejecuta el script y mira la consola. Después ejecútalo con el Profiler
 * (la flechita junto a «Run» → «Run with profiler»).
 */

var donana = ee.Geometry.Rectangle([-6.55, 36.85, -6.15, 37.15]);

function ndviMensual(anio, mes) {
  var inicio = ee.Date.fromYMD(anio, mes, 1);
  var col = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(donana)
    .filterDate(inicio, inicio.advance(1, 'month'))
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 40));
  return col.median().normalizedDifference(['B8', 'B4'])
            .reduceRegion({reducer: ee.Reducer.mean(), geometry: donana,
                           scale: 100, maxPixels: 1e9})
            .get('nd');
}

// ---------------------------------------------------------------------------
// MAL: un getInfo() por cada mes. Doce viajes de ida y vuelta.
// ---------------------------------------------------------------------------

var t0 = Date.now();
var malos = [];
for (var m = 1; m <= 12; m++) {
  malos.push(ee.Number(ndviMensual(2025, m)).getInfo());   // ← aquí se para todo
}
var tMal = Date.now() - t0;
print('MAL  · doce getInfo()', malos);
print('MAL  · milisegundos', tMal);

// ---------------------------------------------------------------------------
// BIEN: la lista se construye en el servidor y se baja una sola vez.
// ---------------------------------------------------------------------------

var t1 = Date.now();
var buenos = ee.List.sequence(1, 12).map(function (m) {
  return ndviMensual(2025, ee.Number(m));
}).getInfo();                                              // ← un solo viaje
var tBien = Date.now() - t1;
print('BIEN · un getInfo()', buenos);
print('BIEN · milisegundos', tBien);

print('Veces más rápido:', (tMal / tBien).toFixed(1));

// ---------------------------------------------------------------------------
// MEJOR TODAVÍA: no bajarlo. Si el destino es una gráfica o una exportación,
// el dato no tiene por qué pasar por tu navegador.
// ---------------------------------------------------------------------------

var serie = ee.FeatureCollection(ee.List.sequence(1, 12).map(function (m) {
  m = ee.Number(m);
  return ee.Feature(null, {mes: m, ndvi: ndviMensual(2025, m)});
}));

print(ui.Chart.feature.byFeature(serie, 'mes', ['ndvi'])
        .setOptions({title: 'NDVI medio mensual, 2025',
                     hAxis: {title: 'mes'}, vAxis: {title: 'NDVI'}}));

// ---------------------------------------------------------------------------
// LO QUE HAY QUE RECORDAR
// ---------------------------------------------------------------------------
// · `getInfo()` bloquea: tu navegador se queda esperando a Google.
// · Dentro de un `map()` está prohibido, y con razón.
// · Si vas a pintar, graficar o exportar, no bajes el dato: pásalo tal cual.
// · El único `getInfo()` bueno es el que no escribes.
//
// EJERCICIO: haz lo mismo con 36 meses (2023-2025) y mide. ¿Crece igual el
// tiempo en las dos versiones? ¿Por qué?
