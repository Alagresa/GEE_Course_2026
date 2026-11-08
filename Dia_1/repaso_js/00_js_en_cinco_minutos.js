/**
 * Repaso de JavaScript · 0. JavaScript en cinco minutos
 * Curso «Análisis geoespacial avanzado con Google Earth Engine» — CSIC / EBD, 2026
 *
 * Material de repaso, opcional. Si has programado antes en cualquier lenguaje,
 * sáltatelo: no hay nada aquí que no sepas. Si no, con esto y el siguiente script
 * tienes todo el JavaScript que el curso usa de verdad.
 *
 * Pégalo entero en el Code Editor y dale a «Run». Lo que salga en la consola
 * (panel derecho) es la respuesta.
 */

// Esto es un comentario de una línea: el intérprete lo ignora.

/*
   Y esto es un comentario de varias líneas.
   Sirve para anular un trozo de código sin borrarlo.
*/

// ---------------------------------------------------------------------------
// 1. Imprimir
// ---------------------------------------------------------------------------

// print() escribe en la consola del Code Editor. Es la herramienta con la que
// se depura en GEE: casi todo se resuelve imprimiendo a ver qué hay dentro.
print('Hola, mundo GEE');

// Admite varios argumentos: el primero suele usarse como etiqueta.
print('Una etiqueta y un valor:', 42);

// ---------------------------------------------------------------------------
// 2. Variables
// ---------------------------------------------------------------------------

// Se declaran con `var` y no se declara el tipo: lo pone el valor.
var numero = 99;
var texto = 'Doñana';
var verdadero = true;

print('numero:', numero);
print('texto:', texto);
print('verdadero:', verdadero);

// El tipo se puede preguntar. Esto importará en el script de cliente/servidor.
print('typeof numero:', typeof numero);   // number
print('typeof texto:', typeof texto);     // string
print('typeof verdadero:', typeof verdadero);  // boolean

// Los textos se pegan con `+`, y al pegar un número a un texto se convierte solo.
print('La marisma de ' + texto + ' tiene ' + numero + ' lagunas (o no)');

// Comillas simples o dobles, da igual; lo que importa es no mezclarlas.
print("Así se mete 'una cita' dentro de un texto");

// ---------------------------------------------------------------------------
// 3. Listas (arrays)
// ---------------------------------------------------------------------------

// Una lista es una secuencia ordenada. Se indexa desde CERO.
var lista = [0, 1, 2, 3, 4, 5];
print('La lista entera:', lista);
print('El primer elemento:', lista[0]);        // 0
print('El tercero:', lista[2]);                // 2
print('Cuántos hay:', lista.length);           // 6

// Las listas se pueden juntar...
var otra = [6, 7, 8, 9, 10];
print('Concatenadas:', lista.concat(otra));

// ...y crecer por el final.
var bandas = ['B2', 'B3', 'B4'];
bandas.push('B8');
print('Bandas tras el push:', bandas);

// Pueden mezclar tipos, aunque casi nunca interese.
print('Una lista mezclada:', ['Doñana', 1984, true]);

// ---------------------------------------------------------------------------
// 4. Recorrer una lista
// ---------------------------------------------------------------------------

// Forma clásica: un bucle for.
for (var i = 0; i < 3; i++) {
  print('Vuelta del for número ' + i);
}

// Forma idiomática: forEach, que aplica una función a cada elemento.
// Fíjate bien en esta forma: es la misma idea que .map() sobre colecciones
// de Earth Engine, que es como se trabaja de verdad en GEE.
lista.forEach(function(elemento) {
  print('forEach: ' + elemento + ' + 1 = ' + (elemento + 1));
});

// ---------------------------------------------------------------------------
// 5. Condicionales
// ---------------------------------------------------------------------------

var ndvi = 0.62;

if (ndvi > 0.5) {
  print('Verde: NDVI = ' + ndvi);
} else if (ndvi > 0.2) {
  print('Regular');
} else {
  print('Suelo desnudo o agua');
}

// ---------------------------------------------------------------------------
// 6. Funciones
// ---------------------------------------------------------------------------

// Una función es un trozo de código con nombre que recibe cosas y devuelve una.
var saludar = function(nombre) {
  return 'Hola, ' + nombre;
};
print(saludar('Doñana'));

// Puede recibir varios argumentos.
var area = function(ancho, alto) {
  return ancho * alto;
};
print('Área de 30 x 30 m:', area(30, 30));

// Y esta es la forma que más vas a escribir en el curso: una función que recibe
// una imagen, le añade algo y la devuelve. Aquí está escrita en seco, sin datos;
// en el día 2 es exactamente el patrón de los índices sobre una colección.
var anadirNdvi = function(imagen) {
  var ndvi = imagen.normalizedDifference(['B8', 'B4']).rename('NDVI');
  return imagen.addBands(ndvi);
};
print('La función existe, aunque aquí no la usemos:', typeof anadirNdvi);

// ---------------------------------------------------------------------------
// 7. Lo único que hay que llevarse
// ---------------------------------------------------------------------------

/*
 * 1. `var` para declarar, `print()` para mirar dentro.
 * 2. Las listas empiezan en 0.
 * 3. Una función se guarda en una variable y se llama con paréntesis.
 * 4. Pasar una función a .map() o .forEach() es normal, no es brujería:
 *    es la forma de decir «haz esto con cada elemento».
 *
 * Lo demás —punto y coma, llaves, indentación— se coge mirando código.
 */
