/**
 * Día 3 · Base del caso práctico: afloramientos de algas en embalses andaluces
 * Curso «Análisis geoespacial avanzado con Google Earth Engine» — CSIC / EBD, 2026
 *
 * ESTE SCRIPT NO ES LA APLICACIÓN. Es el análisis que la aplicación va a
 * envolver: sin un solo `ui.*`, para poder discutir primero si el análisis se
 * sostiene y montar la interfaz después, encima de algo que ya funciona.
 * Es el orden que conviene siempre, y el que no se sigue nunca.
 *
 * QUÉ HACE
 *   1. Seis embalses de Andalucía con historial de «sopa verde».
 *   2. La lámina de agua la pone el JRC Global Surface Water, no una geometría
 *      dibujada: así el análisis solo mira agua, y se adapta a cada embalse.
 *   3. Sentinel-2 L2A, con nubes fuera, convertido a reflectividad.
 *   4. Dos índices: NDCI (clorofila en el agua) y FAI (algas que flotan).
 *   5. Serie temporal por embalse y mapa de una fecha concreta.
 *
 * Y LO QUE NO HACE, que está en el §7 y conviene leer antes que el mapa: esto
 * detecta pigmento verde en el agua. No distingue cianobacterias de un algar
 * inocuo, y la corrección atmosférica de Sentinel-2 sobre agua continental es
 * mala. Sirve para decir «aquí está pasando algo, hay que ir a mirar», que es
 * mucho; no sirve para un informe sanitario.
 */

// ===========================================================================
// 1. LOS EMBALSES
// ===========================================================================

/*
 * Los contornos salen del asset propio, subido desde el shapefile de embalses
 * de la DERA (Datos Espaciales de Referencia de Andalucía, capa
 * `03_06_Embalse`): 611 polígonos, de los que aquí van los 100 que pasan de
 * 50 ha, reproyectados a EPSG:4326 y con los campos `nombre`, `cuenca`,
 * `codigo` y `area_ha`.
 *
 * Esto es mejor que dibujar cajas a mano por tres razones: el contorno es el
 * real y no un rectángulo, trae los atributos para filtrar (por cuenca, por
 * tamaño), y **es cartografía oficial y citable**, que es la diferencia entre un
 * ejercicio y un trabajo.
 */
var ASSET_EMBALSES = 'projects/ndvitimelapse-1553424632859/assets/embalses_andalucia';

var todos = ee.FeatureCollection(ASSET_EMBALSES);

print('Embalses en el asset:', todos.size());
print('Cuencas:', todos.aggregate_array('cuenca').distinct());

// Los seis con historial de «sopa verde» que se usan de ejemplo. Los nombres
// son los de la DERA, en mayúsculas y con su puntuación: 'BREÑA II, LA' no es
// un error, es como viene.
var seleccion = ['BORNOS', 'ARCOS', 'IZNAJAR',
                 'BREÑA II, LA', 'GUADALHORCE', 'GERGAL'];

var embalses = todos.filter(ee.Filter.inList('nombre', seleccion));

print('Seleccionados:', embalses.aggregate_array('nombre'));

// Si algún nombre no aparece en la lista de arriba, está escrito distinto en la
// DERA. Para encontrarlo sin adivinar, descomenta esto y busca en la consola:
// print('Todos los nombres:', todos.aggregate_array('nombre').sort());

/*
 * ALTERNATIVAS, las dos de una línea, y las dos buenas para la aplicación:
 *
 *   // todos los de más de 500 ha:
 *   var embalses = todos.filter(ee.Filter.gt('area_ha', 500));
 *
 *   // todos los de una cuenca:
 *   var embalses = todos.filter(ee.Filter.eq('cuenca', 'Guadalete-Barbate'));
 */

// El periodo de trabajo. Un año entero para ver el ciclo; en la app será un
// deslizador de fechas.
var fechaInicio = '2024-01-01';
var fechaFin    = '2024-12-31';

Map.centerObject(embalses, 8);
Map.addLayer(embalses.style({color: 'yellow', fillColor: '00000000', width: 2}),
             {}, 'Contorno de los embalses');

// ===========================================================================
// 2. LA LÁMINA DE AGUA, SIN DIBUJAR NADA
// ===========================================================================

/*
 * El JRC Global Surface Water trae, para cada píxel, el porcentaje de veces que
 * se vio agua entre 1984 y 2021. Con `occurrence >= 80` se queda el vaso
 * permanente del embalse y se van los bordes que entran y salen.
 *
 * Umbral alto (90) = solo el centro, muy seguro, pierde las colas donde
 * justamente se acumulan las algas. Umbral bajo (50) = entra orilla y vegetación
 * palustre, que tiene NDCI altísimo y arruina la media. 80 es el compromiso, y
 * es el primer número que merece la pena cambiar para ver qué pasa.
 */
var umbralAgua = 80;

var aguaPermanente = ee.Image('JRC/GSW1_4/GlobalSurfaceWater')
                       .select('occurrence')
                       .gte(umbralAgua)
                       .selfMask();

Map.addLayer(aguaPermanente, {palette: ['0b3d91']}, 'Agua permanente (JRC)', false);

/*
 * El control de calidad que SÍ hay que hacer: comparar el agua que ve el JRC con
 * la superficie del polígono de la DERA. El polígono es el vaso **a cota
 * máxima**; el JRC con `occurrence >= 80` es el **núcleo permanente**, lo que
 * tuvo agua al menos el 80 % de las veces entre 1984 y 2021.
 *
 * El cociente entre los dos no es «lo lleno que está hoy», cuidado: es qué parte
 * del vaso es lámina estable. El resto se inunda solo en años buenos o ya no se
 * inunda. Y eso **es un resultado**, no un error del dato.
 *
 * Lo que sale, para saber si va bien: Arcos 79 %, Breña II 68 %, Iznájar 47 %,
 * Guadalhorce 45 %, Gergal 42 % y Bornos 34 %.
 */
var areaAgua = aguaPermanente.multiply(ee.Image.pixelArea()).divide(1e4)
  .reduceRegions({
    collection: embalses,
    reducer: ee.Reducer.sum().setOutputs(['ha_agua_jrc']),
    scale: 30
  }).map(function(f) {
    return f.set('pct_lleno',
      ee.Number(f.get('ha_agua_jrc')).divide(ee.Number(f.get('area_ha'))).multiply(100));
  });

print('Agua permanente (JRC) frente al vaso de la DERA:',
      areaAgua.select(['nombre', 'area_ha', 'ha_agua_jrc', 'pct_lleno']));

// ===========================================================================
// 3. SENTINEL-2: NUBES FUERA Y A REFLECTIVIDAD
// ===========================================================================

/*
 * Se usa la banda SCL (Scene Classification Layer) del producto L2A, que viene
 * con una clase por píxel. Fuera: sombra de nube (3), nube media y alta (8, 9),
 * cirros (10) y nieve (11).
 *
 * NO se usa QA60, que era lo habitual hasta hace poco: desde enero de 2022 esa
 * banda viene VACÍA en los productos con baseline 04.00, así que la máscara
 * parece funcionar y no hace absolutamente nada. Merece la pena comprobarlo,
 * porque es un buen ejemplo de código que no da ningún error y está roto.
 */
function enmascararYEscalar(imagen) {
  var scl = imagen.select('SCL');
  var mala = scl.eq(3).or(scl.eq(8)).or(scl.eq(9)).or(scl.eq(10)).or(scl.eq(11));

  return imagen.divide(10000)                 // a reflectividad 0-1
               .updateMask(mala.not())        // sin nubes ni sombras
               .updateMask(aguaPermanente)    // solo agua
               .copyProperties(imagen, ['system:time_start']);
}

var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(embalses)
  .filterDate(fechaInicio, fechaFin)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 40))
  .map(enmascararYEscalar);

print('Escenas disponibles:', s2.size());

// ===========================================================================
// 4. LOS ÍNDICES
// ===========================================================================

/*
 * NDCI — Normalized Difference Chlorophyll Index (Mishra & Mishra, 2012)
 *
 *   NDCI = (B5 − B4) / (B5 + B4)        B5 = 705 nm, B4 = 665 nm
 *
 * Por qué funciona: la clorofila absorbe en el rojo (665 nm) y el agua con
 * mucha carga de algas tiene un pico de reflectancia justo después, en el borde
 * rojo (705 nm). Cuanto más alto el NDCI, más pigmento. Es el índice que
 * aprovecha la banda que Landsat no tiene, y la razón de usar Sentinel-2 aquí.
 *
 * FAI — Floating Algae Index (Hu, 2009)
 *
 * El NDCI mide algas EN el agua; cuando el afloramiento forma nata en
 * superficie, la firma se parece más a la de la vegetación. El FAI compara el
 * NIR con la línea de base entre el rojo y el SWIR: si el NIR se levanta por
 * encima de esa línea, hay materia flotante.
 */
var LAMBDA = {red: 665, nir: 842, swir: 1610};
var factorFAI = (LAMBDA.nir - LAMBDA.red) / (LAMBDA.swir - LAMBDA.red);  // ≈ 0.187

function anadirIndices(imagen) {
  var ndci = imagen.normalizedDifference(['B5', 'B4']).rename('NDCI');

  var red  = imagen.select('B4');
  var nir  = imagen.select('B8');
  var swir = imagen.select('B11');
  var linea = red.add(swir.subtract(red).multiply(factorFAI));
  var fai = nir.subtract(linea).rename('FAI');

  // Clorofila-a estimada, SOLO orientativa: el polinomio de Mishra & Mishra se
  // ajustó en otras aguas. Sirve para dar un orden de magnitud en la leyenda de
  // la app, nunca para un valor que alguien vaya a citar.
  var chl = ndci.polynomial([14.039, 86.115, 194.325]).rename('chla_aprox');

  return imagen.addBands([ndci, fai, chl]);
}

var conIndices = s2.map(anadirIndices);

// ===========================================================================
// 5. MAPA DE UNA FECHA
// ===========================================================================

/*
 * Esta función es la que la aplicación llamará cuando se mueva el deslizador de
 * fechas: le entra un día y le sale una capa. Escrita así desde el principio,
 * montar la interfaz encima es casi mecánico.
 */
function compuestoDe(inicio, fin) {
  return conIndices.filterDate(inicio, fin).median();
}

var visNDCI = {
  min: -0.1, max: 0.4,
  palette: ['2c7bb6', 'abd9e9', 'ffffbf', 'fdae61', 'd7191c']  // azul = limpio, rojo = brote
};

var visFAI = {min: -0.02, max: 0.08, palette: ['000000', '00ff00']};

// Verano de 2024, que es cuando aparecen los afloramientos.
var verano = compuestoDe('2024-07-01', '2024-09-30');

/*
 * Qué debería salir, para comprobar que no se ha roto nada: con 139 escenas en
 * ese trimestre, el NDCI medio sobre la lámina deja **El Gergal destacado en
 * +0.144** y el resto entre −0.06 y +0.02. El Gergal es pequeño, abastece a
 * Sevilla y tiene historial de problemas de calidad del agua, así que el índice
 * está señalando donde hay que mirar. Tampoco hay que leerlo como más de lo que
 * es: 0.144 no es una medida de toxicidad, es pigmento (ver §7).
 */

Map.addLayer(verano.select('NDCI'), visNDCI, 'NDCI verano 2024');
Map.addLayer(verano.select('FAI'),  visFAI,  'FAI verano 2024', false);

// El invierno, para comparar: la misma paleta debería salir azul entera.
Map.addLayer(compuestoDe('2024-01-01', '2024-03-31').select('NDCI'),
             visNDCI, 'NDCI invierno 2024', false);

// ===========================================================================
// 6. LA SERIE TEMPORAL: EL GRÁFICO QUE IRÁ EN LA APP
// ===========================================================================

var serie = ui.Chart.image.seriesByRegion({
  imageCollection: conIndices.select('NDCI'),
  regions: embalses,
  reducer: ee.Reducer.mean(),
  band: 'NDCI',
  scale: 20,                      // B5 es de 20 m: pedir 10 no añade información
  xProperty: 'system:time_start',
  seriesProperty: 'nombre'
}).setOptions({
  title: 'NDCI medio sobre la lámina de agua, 2024',
  vAxis: {title: 'NDCI'},
  hAxis: {title: 'Fecha'},
  lineWidth: 2,
  pointSize: 3,
  interpolateNulls: false        // los huecos son nubes: no se inventan
});

print(serie);

// ===========================================================================
// 7. LÍMITES — ESTO SE CUENTA ANTES DE ENSEÑAR EL MAPA
// ===========================================================================

/*
 * 1. Mide PIGMENTO, no especie. Un NDCI alto puede ser una cianobacteria
 *    tóxica, un alga verde inofensiva o lenteja de agua. Para hablar de
 *    toxicidad hace falta el laboratorio; el satélite dice dónde y cuándo
 *    mirar.
 * 2. La corrección atmosférica de L2A está pensada para tierra, no para agua.
 *    Sobre lámina oscura los errores relativos son grandes, y la reflexión de
 *    las orillas (efecto de adyacencia) contamina los primeros píxeles: por eso
 *    el umbral del JRC va a 80 y no a 50.
 * 3. Un embalse en sequía deja de coincidir con la máscara del JRC, que mira
 *    1984-2021, ni con el polígono de la DERA, que es el vaso a cota máxima.
 *    Con los niveles de los últimos años esto se nota: parte del vaso
 *    «permanente» es hoy tierra, y ahí el índice no significa nada. El
 *    `pct_lleno` del §2 está para verlo antes de interpretar nada.
 * 4. 20 m de píxel: una balsa pequeña o una cola estrecha no se resuelven.
 * 5. El umbral de alerta hay que calibrarlo con datos de campo del embalse
 *    concreto. Cualquier número que se ponga en la leyenda sin eso es decorado.
 */

// ===========================================================================
// 8. DE AQUÍ A LA APLICACIÓN (día 3, bloque 4)
// ===========================================================================

/*
 * Lo que falta es solo interfaz, y encaja pieza por pieza con los componentes
 * `ui.*` del primer bloque del día:
 *
 *   - `ui.Select` con los nombres de los embalses → centra el mapa y recalcula
 *     la serie. La lista sale de `todos.aggregate_array('nombre').sort()`, y con
 *     el asset completo son 100 embalses sin escribir ni uno.
 *   - `ui.DateSlider` para el compuesto → llama a `compuestoDe()`, que ya está
 *     escrita para eso.
 *   - `ui.Chart` con la serie del §6, dentro de un panel lateral.
 *   - `ui.Slider` con el umbral de NDCI → pinta solo lo que lo supera, que es
 *     la capa de «alerta».
 *   - `Map.onClick` → NDCI del píxel pinchado y su serie, que es lo que de
 *     verdad pide quien gestiona el embalse.
 *
 * Y el aviso de rendimiento: la serie del §6 recorre un año de escenas de seis
 * embalses. En una aplicación eso NO puede recalcularse en cada clic. O se
 * precalcula a un asset, o se calcula solo para el embalse seleccionado.
 */
