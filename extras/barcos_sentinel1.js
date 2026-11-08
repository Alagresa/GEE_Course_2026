/**
 * Extra · Tráfico marítimo con Sentinel-1: 2019 contra 2020
 * Curso «Análisis geoespacial avanzado con Google Earth Engine» — CSIC / EBD, 2026
 *
 * Radar que ve barcos. La idea entera cabe en una línea: en una imagen SAR el
 * agua en calma es casi negra y un casco metálico devuelve muchísima señal, así
 * que **el máximo de una serie de imágenes es un mapa de todo lo que pasó por
 * ahí**. No hace falta detectar nada: los barcos salen solos.
 *
 * Y comparar abril-mayo de 2019 con abril-mayo de 2020 enseña la otra mitad:
 * 2020 es el confinamiento. El tráfico se ve caer sin análisis ninguno.
 *
 * Versión corta (100 líneas). Hay otra mucho más larga y comentada en el
 * repositorio de 2025 (`Dia_3/scripts/sentinel1_ships.js`), con estadísticas y
 * tabla de decibelios, si alguien quiere tirar del hilo.
 */

// ---------------------------------------------------------------------------
// 1. Zona de estudio
// ---------------------------------------------------------------------------

// El estrecho de Gibraltar, que es el sitio con más tráfico que tenemos cerca.
// Si quieres otro, borra esto y dibuja un rectángulo que se llame `geometry`.
var geometry = ee.Geometry.Rectangle([-5.75, 35.85, -5.20, 36.20]);

Map.centerObject(geometry, 10);

// ---------------------------------------------------------------------------
// 2. Máscara de nubes de Landsat 8, Colección 2 nivel 2
// ---------------------------------------------------------------------------

function maskL8sr(image) {
  // En la C02 la banda QA_PIXEL lleva un bit por problema:
  // bit 1 = nube dilatada, 2 = cirros, 3 = nube, 4 = sombra de nube.
  var dilatedCloudBitMask = 1 << 1;
  var cirrusBitMask       = 1 << 2;
  var cloudsBitMask       = 1 << 3;
  var cloudShadowBitMask  = 1 << 4;

  var qa = image.select('QA_PIXEL');

  var mask = qa.bitwiseAnd(dilatedCloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0))
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0))
      .and(qa.bitwiseAnd(cloudShadowBitMask).eq(0));

  // Factores de escala de la C02: de números enteros a reflectividad 0-1.
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);

  return image.addBands(opticalBands, null, true)
      .updateMask(mask)
      .select('SR_B.*')
      .copyProperties(image, ['system:time_start']);
}

// Un compuesto óptico para el contexto: la tierra y los puertos.
var composite = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterDate('2020-01-01', '2020-12-31')
    .filterBounds(geometry)
    .map(maskL8sr)
    .median();

// ---------------------------------------------------------------------------
// 3. Máscara tierra / agua
// ---------------------------------------------------------------------------

// El dataset de Hansen trae una banda `datamask`: 0 = sin datos, 1 = tierra,
// 2 = agua permanente.
var datamask = ee.Image('UMD/hansen/global_forest_change_2015').select('datamask');

var land  = datamask.eq(1);
var water = datamask.eq(2);   // ojo: `land.not()` metería también el 0 (sin datos)

// Enmascarar cada una consigo misma quita los ceros y deja solo lo que interesa.
land  = land.selfMask();
water = water.selfMask();

// ---------------------------------------------------------------------------
// 4. Sentinel-1: el máximo de VH sobre el agua
// ---------------------------------------------------------------------------

var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(geometry)
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filter(ee.Filter.eq('instrumentMode', 'IW'));

// VH y no VV: el oleaje ensucia menos la polarización cruzada.
// Y las dos órbitas juntas, porque cada una pasa a una hora distinta y ve
// barcos distintos.
function traficoMaximo(inicio, fin) {
  return sentinel1
    .filterDate(inicio, fin)
    .select('VH')
    .max()
    .updateMask(water);
}

var radar_2019 = traficoMaximo('2019-04-01', '2019-05-30');
var radar_2020 = traficoMaximo('2020-04-01', '2020-05-30');

print('Escenas abril-mayo 2019:', sentinel1.filterDate('2019-04-01', '2019-05-30').size());
print('Escenas abril-mayo 2020:', sentinel1.filterDate('2020-04-01', '2020-05-30').size());

// ---------------------------------------------------------------------------
// 5. Visualización
// ---------------------------------------------------------------------------

// Valores en decibelios. Por debajo de −20 dB es agua tranquila; de −5 a 0,
// un barco grande o una estructura metálica.
var visRadar = {min: -15, max: 0};

Map.addLayer(composite.updateMask(land),
             {bands: ['SR_B5', 'SR_B4', 'SR_B3'], min: 0, max: 0.3},
             'Landsat 8 (solo tierra)');

Map.addLayer(radar_2019, visRadar, 'Tráfico abril-mayo 2019');
Map.addLayer(radar_2020, visRadar, 'Tráfico abril-mayo 2020');

// ---------------------------------------------------------------------------
// 6. Qué mirar, y qué no creerse
// ---------------------------------------------------------------------------

/*
 * - Las líneas blancas son rutas, no barcos sueltos: cada punto es un paso.
 * - Los puntos fijos y muy brillantes suelen ser boyas, diques o acuicultura.
 * - El oleaje fuerte también devuelve señal: hay falsos positivos, y con `.max()`
 *   un solo día de mar gruesa contamina los dos meses. Probar `.percentile([95])`
 *   en lugar del máximo es el primer ejercicio evidente.
 * - Un barco de madera o de fibra se ve mucho peor que uno de acero.
 *
 * Ejercicio: cambia las fechas a marzo-abril de 2020 (confinamiento duro en
 * España) y compáralo con 2019. Y luego prueba el canal de la Mancha, que es
 * donde el efecto se vio más claro.
 */
