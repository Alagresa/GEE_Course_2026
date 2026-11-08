# Repaso de JavaScript

**Esto no entra en el programa.** Es material de apoyo para quien llegue al curso sin
haber programado antes, y está aquí por una razón concreta: el curso es de nivel
medio/avanzado, pero los requisitos de la convocatoria dicen *«deseable algo de
programación, no indispensable»*, así que puede que llegues sin haber escrito nunca una
línea de código. Si es tu caso, esto es para ti y no te va a costar más de media hora.

Si has programado en cualquier lenguaje —R, Python, MATLAB, IDL, hasta macros de Excel—,
**no necesitas nada de esto**: lee el script 0 en diagonal, salta al
[`03_intro_js_client_server.js`](../scripts/03_intro_js_client_server.js) del día 1 y
sigue el curso.

## Cómo se usa

No ocupa tiempo de clase, y no hace falta llevarlo hecho. Dos momentos en que viene bien:

- **Antes de empezar**, si ya sabes que la programación no es lo tuyo: los cinco scripts
  corridos por tu cuenta en el Code Editor, media hora.
- **Después del primer día**, si te has visto peleando con las llaves y los paréntesis más
  que con Earth Engine. Esa es la señal de que lo que falta es esto y no lo otro.

Cada fichero se pega entero en el [Code Editor](https://code.earthengine.google.com/) y
se ejecuta con **Run**. Lo que sale en la consola de la derecha es la respuesta; no hay
que instalar nada ni descargar datos.

## Los scripts, en orden

| Fichero | Qué repasa | Para qué sirve en el curso |
|---|---|---|
| [`00_js_en_cinco_minutos.js`](00_js_en_cinco_minutos.js) | Comentarios, `print`, variables, textos, listas, bucles, condicionales y funciones | Lo mínimo para leer cualquier script del curso sin perderse |
| [`01_operadores.js`](01_operadores.js) | Aritméticos, de asignación, de comparación, lógicos y el ternario | Las comparaciones son los filtros; el ternario aparece en los estilos |
| [`02_objetos_y_diccionarios.js`](02_objetos_y_diccionarios.js) | Objetos `{clave: valor}`, acceso, anidamiento, y `ee.Dictionary` | Los parámetros de visualización y las propiedades de un Feature **son** objetos |
| [`03_geometrias_y_features.js`](03_geometrias_y_features.js) | Geometrías, buffers, operaciones espaciales, `ee.Feature` y `ee.FeatureCollection` | Todo el vector del día 2 (zonales) y de los días 3 y 4 (apps) |
| [`04_estilos_por_atributo.js`](04_estilos_por_atributo.js) | `.map()` sobre una colección y `styleProperty` para pintar según un atributo | El patrón de simbolización de las apps |

La frontera **cliente/servidor** no está aquí: es contenido del curso, no repaso, y vive
en [`../scripts/03_intro_js_client_server.js`](../scripts/03_intro_js_client_server.js).
Es el salto conceptual que de verdad cuesta, y el que conviene dar despierto.

## Procedencia

Los scripts 1, 2 y 4 vienen del día 1 del [curso de 2025](https://github.com/Digdgeo/GEE_Course_2025)
(`01_intro_js_operadores.js`, `02_dict.js` y `05_points_size.js`), que era de nivel
introductorio. El 0 es nuevo, y recoge lo de `Javascript Básico.js` de las ediciones de
2022 y 2023 —listas, `forEach`, concatenación— que no estaba en los de 2025. El 3 es el
`04_geometrias.js` de 2025 **reescrito para que corra solo**: el original dependía de tres
geometrías dibujadas a mano en el mapa (`huelva`, `sevilla`, `Marisma`) y fallaba al
pegarlo tal cual; ahora las define en código y dibujarlas es el ejercicio del final.

## Si te sabe a poco

- [JavaScript para GEE](https://developers.google.com/earth-engine/tutorials/tutorial_js_01), el tutorial oficial, media hora
- [Client vs server](https://developers.google.com/earth-engine/guides/client_server), la página que hay que leer dos veces
- [Curso de 2025](https://github.com/Digdgeo/GEE_Course_2025), nivel introductorio y en español, por si falta base de Earth Engine y no solo de JavaScript
