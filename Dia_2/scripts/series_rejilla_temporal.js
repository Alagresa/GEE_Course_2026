// ============================================================================
// SERIES TEMPORALES SOBRE REJILLA: UNA SERIE MENSUAL BIEN CONSTRUIDA
// Día 2 · Script de referencia
// ============================================================================
// Una colección de satélite es IRREGULAR: tiene las fechas que tiene, con
// huecos por nubes, por órbita y por lo que se le ocurra al sensor. Casi todo
// el análisis temporal, en cambio, necesita una serie REGULAR: un valor por
// mes, siempre el mismo paso.
//
// Este script hace ese paso con cuidado, y sobre todo enseña la parte que
// normalmente se salta: QUÉ PASA CON LOS MESES SIN IMÁGENES. Un hueco que no
// se declara se convierte en una línea recta que une dos meses lejanos, y esa
// línea recta tiene toda la pinta de ser un dato. No lo es.
//
// Lo que se practica:
//   - construir la rejilla temporal con map() sobre una lista de fechas
//   - dejar los meses vacíos EN la serie, enmascarados y contados
//   - tendencias con linearFit y sensSlope, y la pendiente en unidades/año
//   - estacionalidad: amplitud y fase con un ajuste armónico

// ----------------------------------------------------------------------------
// 1. CONFIGURACIÓN
// ----------------------------------------------------------------------------

// Zona de trabajo. Aquí va definida en código para que el script corra tal
// cual; sustitúyela por tu propia geometría dibujada o por un asset.
// Esto es un trozo de la marisma de Doñana.
var zona = ee.Geometry.Rectangle([-6.40, 36.95, -6.25, 37.05]);

// Periodo completo del análisis
var anioInicio = 2019;
var anioFin    = 2024;

var fechaInicio = ee.Date.fromYMD(anioInicio, 1, 1);
var fechaFin    = ee.Date.fromYMD(anioFin, 12, 31);

// Paso de la rejilla, en meses. 1 = mensual, 3 = trimestral.
var pasoMeses = 1;

// Escala de trabajo. SIEMPRE explícita: 'scale' manda sobre el resultado,
// y si no la pones GEE elige por ti la del primer band, que rara vez es la
// que querías.
var escala = 100;

// Fecha de referencia para el eje temporal. La tendencia se calcula contra
// este origen, así que basta con que sea fija y conocida.
var origen = ee.Date.fromYMD(anioInicio, 1, 1);

// ----------------------------------------------------------------------------
// 2. LA COLECCIÓN Y LA MÁSCARA DE NUBES
// ----------------------------------------------------------------------------

// Máscara de nubes de Sentinel-2 a partir de la banda SCL (clasificación de
// escena). No es la mejor máscara que existe, pero es la que viene en el
// producto y no hace falta unir colecciones para usarla.
//   3 = sombra de nube, 8 = nube probable, 9 = nube muy probable,
//   10 = cirros, 11 = nieve
function quitarNubes(img) {
  var scl = img.select('SCL');
  var mala = scl.eq(3)
    .or(scl.eq(8)).or(scl.eq(9)).or(scl.eq(10)).or(scl.eq(11));
  return img.updateMask(mala.not())
            .divide(10000)            // a reflectancia 0-1
            .copyProperties(img, ['system:time_start']);
}

// NDVI a partir de las bandas de Sentinel-2
function anadirNDVI(img) {
  var ndvi = img.normalizedDifference(['B8', 'B4']).rename('NDVI');
  return img.addBands(ndvi);
}

var coleccion = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(zona)
  .filterDate(fechaInicio, fechaFin)
  // Filtro de metadatos: descartar de entrada las escenas inservibles ahorra
  // mucho tiempo, porque esas imágenes ni se leen.
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 80))
  .map(quitarNubes)
  .map(anadirNDVI)
  .select('NDVI');

print('Imágenes disponibles tras filtrar:', coleccion.size());

// ----------------------------------------------------------------------------
// 3. EL CAMINO CORTO, Y POR QUÉ ENGAÑA
// ----------------------------------------------------------------------------

// Lo que casi todo el mundo hace el primer día: graficar la colección tal cual.
// Sale una serie con un punto por escena, con los puntos apelotonados donde
// hubo buen tiempo y vacíos donde no. Sirve para mirar, no para analizar:
// el paso no es constante, así que cualquier media, tendencia o correlación
// sobre esa serie está pesada por el clima, no por el fenómeno.
var graficoCrudo = ui.Chart.image.series({
  imageCollection: coleccion,
  region: zona,
  reducer: ee.Reducer.mean(),
  scale: escala
}).setOptions({
  title: '1) Colección cruda: un punto por escena, paso irregular',
  vAxis: {title: 'NDVI'},
  pointSize: 3,
  lineWidth: 0
});
print(graficoCrudo);

// ----------------------------------------------------------------------------
// 4. LA REJILLA TEMPORAL
// ----------------------------------------------------------------------------

// Número de pasos que caben en el periodo
var nMeses = fechaFin.difference(fechaInicio, 'month').divide(pasoMeses).floor();
var pasos  = ee.List.sequence(0, nMeses);

print('Pasos de la rejilla:', pasos.size());

// Imagen vacía con el NOMBRE DE BANDA CORRECTO y todos los píxeles
// enmascarados. Es la pieza clave: un mes sin imágenes no se cae de la
// colección, entra como esto. Así la rejilla conserva su longitud y el hueco
// queda visible en lugar de desaparecer.
var imagenVacia = ee.Image.constant(0).rename('NDVI').selfMask().toFloat();

// Para cada paso de la rejilla, un compuesto
var mensual = ee.ImageCollection.fromImages(
  pasos.map(function(n) {
    n = ee.Number(n);

    var desde = fechaInicio.advance(n.multiply(pasoMeses), 'month');
    var hasta = desde.advance(pasoMeses, 'month');

    var trozo = coleccion.filterDate(desde, hasta);
    var cuantas = trozo.size();

    // La MEDIANA aguanta mejor que la media los píxeles de nube que la
    // máscara no pilló: un valor raro no arrastra el compuesto.
    // Si el mes está vacío, trozo.median() devolvería una imagen SIN BANDAS,
    // que luego rompe cualquier select(). De ahí el If.
    var compuesto = ee.Image(
      ee.Algorithms.If(cuantas.gt(0), trozo.median(), imagenVacia)
    ).rename('NDVI');

    // El eje temporal, en AÑOS DECIMALES. Esta es la decisión que hace que
    // la pendiente salga luego en unidades/año y no en unidades/milisegundo.
    var tAnios = desde.difference(origen, 'year');

    return compuesto
      .set('system:time_start', desde.millis())
      .set('fecha',   desde.format('YYYY-MM'))
      .set('t_anios', tAnios)
      .set('n_imagenes', cuantas)          // cuántas escenas hay detrás
      .set('vacio', cuantas.eq(0));        // bandera del hueco
  })
);

// Cuántos meses de la rejilla se han quedado sin una sola imagen
var huecos = mensual.filter(ee.Filter.eq('vacio', true));
print('Meses sin ninguna imagen:', huecos.size());
print('Qué meses son:', huecos.aggregate_array('fecha'));

// Y los meses flacos: con una o dos escenas el compuesto existe, pero es
// prácticamente una imagen suelta. Conviene saber cuáles son antes de
// interpretar un pico.
var flacos = mensual.filter(ee.Filter.and(
  ee.Filter.gt('n_imagenes', 0),
  ee.Filter.lte('n_imagenes', 2)
));
print('Meses con 1-2 imágenes (pico sospechoso):',
      flacos.aggregate_array('fecha'));

// ----------------------------------------------------------------------------
// 5. LA SERIE, CON LOS HUECOS DECLARADOS
// ----------------------------------------------------------------------------

// Un valor por paso de la rejilla. Los meses vacíos están enmascarados, así
// que reduceRegion devuelve null para ellos: el hueco viaja CON el dato.
var serie = ee.FeatureCollection(mensual.map(function(img) {
  var media = img.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: zona,
    scale: escala,
    maxPixels: 1e9
  }).get('NDVI');

  return ee.Feature(null, {
    fecha:      img.get('fecha'),
    t_anios:    img.get('t_anios'),
    n_imagenes: img.get('n_imagenes'),
    ndvi:       media                  // null si el mes está vacío
  });
}));

print('Serie mensual (mira la columna ndvi: hay nulls):', serie.limit(24));

// Gráfico de la serie completa. Los nulls se dibujan como interrupciones de
// la línea: el hueco se ve.
var graficoBien = ui.Chart.feature.byFeature(serie, 't_anios', ['ndvi'])
  .setOptions({
    title: '2) Rejilla mensual completa: los huecos se ven',
    hAxis: {title: 'Años desde ' + anioInicio},
    vAxis: {title: 'NDVI'},
    pointSize: 4,
    interpolateNulls: false      // <- lo importante de este gráfico
  });
print(graficoBien);

// El mismo gráfico con interpolateNulls: true es exactamente la mentira que
// hay que evitar: une los dos lados del hueco con una recta que parece dato.
var graficoMentira = ui.Chart.feature.byFeature(serie, 't_anios', ['ndvi'])
  .setOptions({
    title: '3) La misma serie interpolando los huecos (NO hagas esto sin decirlo)',
    hAxis: {title: 'Años desde ' + anioInicio},
    vAxis: {title: 'NDVI'},
    pointSize: 4,
    interpolateNulls: true
  });
print(graficoMentira);

// ----------------------------------------------------------------------------
// 6. TENDENCIA
// ----------------------------------------------------------------------------

// Para ajustar hay que quitar los nulls, y eso está bien SIEMPRE QUE se haga
// a la vista: el ajuste usa los meses que hay, no los que debería haber.
var serieValida = serie.filter(ee.Filter.notNull(['ndvi']));
print('Meses usados en el ajuste:', serieValida.size());

// --- linearFit: mínimos cuadrados, x primero, y después -------------------
var ajuste = serieValida.reduceColumns({
  reducer: ee.Reducer.linearFit(),
  selectors: ['t_anios', 'ndvi']      // ¡el orden importa: x, y!
});
print('linearFit (pendiente en NDVI/año):', ajuste);

// --- sensSlope: pendiente de Theil-Sen, no paramétrica --------------------
// Mucho más robusta frente a valores extremos que los mínimos cuadrados, que
// es justo lo que quieres en series de satélite.
var sens = serieValida.reduceColumns({
  reducer: ee.Reducer.sensSlope(),
  selectors: ['t_anios', 'ndvi']
});
print('sensSlope (NDVI/año):', sens);

// --- EL ERROR CLÁSICO -----------------------------------------------------
// La pendiente sale en unidades de y por unidad de x. Si el eje temporal son
// milisegundos desde 1970 —que es lo que hay en system:time_start— la
// pendiente sale en NDVI por milisegundo: un número con quince ceros detrás
// que parece "sin tendencia". No es que no haya tendencia: es que la unidad
// es absurda. Para verlo:
var serieMs = serieValida.map(function(f) {
  return f.set('t_ms', ee.Date.parse('YYYY-MM', f.getString('fecha')).millis());
});
var ajusteMs = serieMs.reduceColumns({
  reducer: ee.Reducer.linearFit(),
  selectors: ['t_ms', 'ndvi']
});
print('El mismo ajuste con el eje en milisegundos:', ajusteMs);
print('Un año tiene 31557600000 ms: multiplica esa pendiente por ese número ' +
      'y recuperas la de arriba.');

// ----------------------------------------------------------------------------
// 7. ESTACIONALIDAD: AMPLITUD Y FASE
// ----------------------------------------------------------------------------
// Un ajuste armónico separa la serie en tres cosas: un nivel, una tendencia
// y un ciclo anual. El ciclo se resume en dos números por píxel:
//   amplitud -> cuánto oscila a lo largo del año
//   fase     -> en qué momento del año tiene el máximo
// Esto es lo que mostrará la app del jueves, así que conviene verlo antes
// con el dato en bruto.

function anadirArmonicos(img) {
  var t = ee.Number(img.get('t_anios'));
  var radianes = t.multiply(2 * Math.PI);
  return img
    .addBands(ee.Image.constant(1).rename('constante').toFloat())
    .addBands(ee.Image.constant(t).rename('t').toFloat())
    .addBands(ee.Image.constant(radianes.cos()).rename('cos').toFloat())
    .addBands(ee.Image.constant(radianes.sin()).rename('sin').toFloat())
    .set('system:time_start', img.get('system:time_start'));
}

var conArmonicos = mensual.map(anadirArmonicos);

// linearRegression con 4 variables de entrada y 1 de salida. El orden de las
// bandas en el select() es el orden de los coeficientes en la salida.
var regresion = conArmonicos
  .select(['constante', 't', 'cos', 'sin', 'NDVI'])
  .reduce(ee.Reducer.linearRegression({numX: 4, numY: 1}));

var coefs = regresion.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([['constante', 't', 'cos', 'sin']]);

var amplitud = coefs.select('cos').hypot(coefs.select('sin')).rename('amplitud');
// atan2 devuelve radianes en [-pi, pi]; pasado a fracción de año es más legible
var fase = coefs.select('sin').atan2(coefs.select('cos'))
  .divide(2 * Math.PI).rename('fase');
var tendenciaPixel = coefs.select('t').rename('tendencia');

Map.centerObject(zona, 11);
Map.addLayer(zona, {color: 'red'}, 'Zona de trabajo', false);
Map.addLayer(mensual.median().clip(zona),
  {min: 0, max: 0.8, palette: ['white', 'khaki', 'green']},
  'NDVI mediano del periodo');
Map.addLayer(amplitud.clip(zona),
  {min: 0, max: 0.4, palette: ['white', 'orange', 'red']},
  'Amplitud estacional', false);
Map.addLayer(fase.clip(zona),
  {min: -0.5, max: 0.5, palette: ['blue', 'green', 'yellow', 'red', 'blue']},
  'Fase (momento del máximo)', false);
Map.addLayer(tendenciaPixel.clip(zona),
  {min: -0.05, max: 0.05, palette: ['red', 'white', 'blue']},
  'Tendencia por píxel (NDVI/año)', false);

// ----------------------------------------------------------------------------
// 8. SACAR EL DATO FUERA
// ----------------------------------------------------------------------------
// La serie completa, con huecos y con el recuento de imágenes de cada mes.
// Esa columna n_imagenes es media hoja de metadatos: quien reciba el CSV
// sabrá qué meses son sólidos y cuáles no.
Export.table.toDrive({
  collection: serie,
  description: 'serie_mensual_ndvi_' + anioInicio + '_' + anioFin,
  folder: 'GEE_Curso_2026',
  fileFormat: 'CSV',
  selectors: ['fecha', 't_anios', 'n_imagenes', 'ndvi']
});

// ----------------------------------------------------------------------------
// 9. LO QUE HAY QUE RECORDAR
// ----------------------------------------------------------------------------
/*
1. La rejilla se construye con map() sobre una LISTA DE FECHAS, no sobre la
   colección. Así la longitud de la serie la decides tú y no el sensor.
2. Un periodo sin imágenes necesita una imagen enmascarada con el nombre de
   banda correcto. Sin eso, median() de una colección vacía devuelve una
   imagen sin bandas y el script revienta más adelante, en otro sitio y con
   un mensaje que no dice nada.
3. Guarda siempre el recuento de imágenes del periodo. Es lo que distingue un
   pico real de un pico de una sola escena medio nublada.
4. Quitar los nulls para ajustar está bien; esconderlos, no.
5. La pendiente va en las unidades del eje x. Eje en años -> unidades/año.
6. Para tendencias en datos de satélite, sensSlope antes que linearFit.

PARA PROFUNDIZAR
   https://developers.google.com/earth-engine/tutorials/community/time-series-modeling
   https://developers.google.com/earth-engine/guides/charts_image_collection
*/

// ----------------------------------------------------------------------------
// 10. EJERCICIO
// ----------------------------------------------------------------------------
/*
1. Cambia 'pasoMeses' a 3 y mira cuántos huecos quedan. ¿Compensa perder
   resolución temporal a cambio de una serie sin huecos?
2. Sustituye el NDVI por el MNDWI (B3 y B11) sobre la misma zona. La serie
   del agua tiene huecos en sitios distintos: ¿por qué?
3. Monta la serie sobre tu propia zona y compara linearFit con sensSlope.
   Si las dos pendientes se parecen, la serie está limpia; si no, busca el
   mes que las separa — estará en la lista de meses flacos.
4. Avanzado: en vez de dejar el hueco, rellénalo con la media de los mismos
   meses de los otros años (la "climatología del mes") y añade una columna
   que diga qué valores son medidos y cuáles rellenados.
*/
