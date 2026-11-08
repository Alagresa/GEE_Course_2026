/**
 * Repaso de JavaScript · 3. Geometrías, Features y operaciones espaciales
 * Curso «Análisis geoespacial avanzado con Google Earth Engine» — CSIC / EBD, 2026
 *
 * Material de repaso, opcional. El vector en GEE: geometría (solo forma),
 * Feature (forma + atributos) y FeatureCollection (muchos Features), más las
 * operaciones espaciales clásicas.
 *
 * A diferencia de la versión de 2025, aquí las geometrías están DEFINIDAS EN EL
 * CÓDIGO y no dibujadas a mano con la herramienta del mapa: el script se pega y
 * corre tal cual. Dibujarlas en el mapa es el ejercicio del final.
 */

// ---------------------------------------------------------------------------
// 1. Geometrías: solo forma, sin atributos
// ---------------------------------------------------------------------------

var huelva  = ee.Geometry.Point([-6.9447, 37.2614]);
var sevilla = ee.Geometry.Point([-5.9845, 37.3891]);

// Un rectángulo sobre la marisma del Guadalquivir: [oeste, sur, este, norte].
var marisma = ee.Geometry.Rectangle([-6.45, 36.90, -6.10, 37.20]);

Map.centerObject(marisma, 8);
Map.addLayer(marisma, {color: 'cyan'}, 'Marisma');

// ---------------------------------------------------------------------------
// 2. Buffers: un área de influencia alrededor de una geometría
// ---------------------------------------------------------------------------

var huelvaBuffer  = huelva.buffer(50000);    // 50 km de radio, en METROS
var sevillaBuffer = sevilla.buffer(50000);

Map.addLayer(huelvaBuffer,  {color: 'red'},  'Buffer de Huelva');
Map.addLayer(sevillaBuffer, {color: 'blue'}, 'Buffer de Sevilla');

// ---------------------------------------------------------------------------
// 3. Operaciones espaciales
// ---------------------------------------------------------------------------

// Intersección: lo que comparten las dos.
var interseccion = huelvaBuffer.intersection(sevillaBuffer, 1);  // el 1 es el error máximo en m
Map.addLayer(interseccion, {color: '00FF00'}, 'Intersección', false);

// Unión: las dos en una sola geometría.
var union = huelvaBuffer.union(sevillaBuffer, 1);
Map.addLayer(union, {color: 'FF00FF'}, 'Unión', false);

// Recortar la unión con la marisma: la forma habitual de limitar un análisis
// a la zona de estudio.
var unionRecortada = union.intersection(marisma, 1);
Map.addLayer(unionRecortada, {color: 'green'}, 'Unión recortada por la marisma', false);

// Diferencia: lo que está en la primera y no en la segunda.
var diferencia = huelvaBuffer.difference(sevillaBuffer, 1);
Map.addLayer(diferencia, {color: 'FFFF00'}, 'Huelva menos Sevilla', false);

// Diferencia simétrica: lo que está en una o en otra, pero no en las dos.
var difSimetrica = huelvaBuffer.symmetricDifference(sevillaBuffer, 1);
Map.addLayer(difSimetrica, {color: 'black'}, 'Diferencia simétrica', false);

// ---------------------------------------------------------------------------
// 4. Propiedades geométricas
// ---------------------------------------------------------------------------

// El área sale en METROS CUADRADOS, siempre. Dividir entre 1e6 para km².
print('Área de la marisma (km²):', marisma.area().divide(1e6));
print('Centroide de la marisma:', marisma.centroid());
print('Rectángulo envolvente:', marisma.bounds());

Map.addLayer(marisma.centroid(), {color: 'red'}, 'Centroide', false);

// ---------------------------------------------------------------------------
// 5. Feature: geometría + atributos
// ---------------------------------------------------------------------------

var puntoSevilla = ee.Feature(
  ee.Geometry.Point([-5.9845, 37.3891]),       // la geometría
  {nombre: 'Sevilla', poblacion: 688711}       // las propiedades, un objeto de JavaScript
);

print('Un Feature:', puntoSevilla);
print('Una propiedad suelta:', puntoSevilla.get('nombre'));

// ---------------------------------------------------------------------------
// 6. FeatureCollection: muchos Features
// ---------------------------------------------------------------------------

var ciudades = ee.FeatureCollection([
  ee.Feature(ee.Geometry.Point([-5.9845, 37.3891]), {nombre: 'Sevilla',       poblacion: 688711}),
  ee.Feature(ee.Geometry.Point([-6.9447, 37.2614]), {nombre: 'Huelva',        poblacion: 144258}),
  ee.Feature(ee.Geometry.Point([-6.0839, 37.3404]), {nombre: 'Mairena',       poblacion:  27493}),
  ee.Feature(ee.Geometry.Point([-6.3074, 37.2563]), {nombre: 'Villamanrique', poblacion:  21076})
]);

print('La colección:', ciudades);
print('Cuántas hay:', ciudades.size());

// Filtrar por atributo: el mismo `ee.Filter` que se usa con las imágenes.
print('Las de más de 100.000 habitantes:',
      ciudades.filter(ee.Filter.gt('poblacion', 100000)).aggregate_array('nombre'));

// Filtrar por posición: las que caen dentro de la marisma.
print('Dentro de la marisma:',
      ciudades.filterBounds(marisma).aggregate_array('nombre'));

// ---------------------------------------------------------------------------
// 7. Estilo por atributo
// ---------------------------------------------------------------------------

// Una función que recibe un Feature y devuelve el mismo Feature con una
// propiedad `style` añadida. Esto es `.map()` otra vez: la misma idea del
// script 0, ahora sobre una FeatureCollection.
var estilo = function(feature) {
  var nombre = ee.String(feature.get('nombre'));

  // `ee.Algorithms.If` es el if del SERVIDOR. Un `if` de JavaScript no sirve
  // aquí, porque `nombre` no es un texto: es una receta para obtener un texto.
  var color = ee.Algorithms.If(
    nombre.equals('Sevilla'), 'red',
    ee.Algorithms.If(
      nombre.equals('Huelva'), 'green',
      'blue'
    )
  );

  return feature.set({style: {color: color, pointSize: 10}});
};

Map.addLayer(ciudades.map(estilo).style({styleProperty: 'style'}), {}, 'Ciudades con estilo');

// ---------------------------------------------------------------------------
// 8. Ejercicio
// ---------------------------------------------------------------------------

/*
 * 1. Con la herramienta de geometrías del mapa (arriba a la izquierda), dibuja
 *    un polígono sobre la marisma y llámalo `miMarisma`. Verás que aparece un
 *    bloque de «Imports» en la cabecera del script: las geometrías dibujadas
 *    entran al código por ahí. Sustituye `marisma` por `miMarisma` y vuelve a
 *    correrlo.
 * 2. Cambia el radio de los buffers a 30 km y mira si la intersección sigue
 *    existiendo.
 * 3. Añade dos ciudades más a la colección, con su población real.
 *
 * Chuleta de lo usado:
 *   buffer(m) · intersection() · union() · difference() · symmetricDifference()
 *   area() · centroid() · bounds()
 *   ee.Feature(geometria, propiedades) · get() · set()
 *   ee.FeatureCollection([...]) · filter() · filterBounds() · aggregate_array()
 */
