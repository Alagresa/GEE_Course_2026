# Análisis Geoespacial Avanzado con Google Earth Engine — 2026 🌍🛰️

Material del curso **«Análisis geoespacial avanzado con Google Earth Engine»**, del
Gabinete de Formación del CSIC en colaboración con la Estación Biológica de Doñana.

> Este curso es la continuación de [GEE_Course_2025](https://github.com/Digdgeo/GEE_Course_2025),
> que era de nivel introductorio. **Aquí se da por sabido lo que allí se enseñaba**: Code
> Editor, colecciones, filtros, índices y exportaciones. Si vienes sin esa base, repasa
> aquel repositorio antes de empezar. Y si lo que falta no es Earth Engine sino
> **programación**, el anexo [`Dia_1/repaso_js/`](Dia_1/repaso_js/) repasa el JavaScript
> necesario en cinco scripts y media hora.

**▶️ [Ver la presentación del curso](https://digdgeo.github.io/GEE_Course_2026/presentacion/)**
— las diapositivas de los cinco días, en el navegador. Se mueve con las flechas, `F` para
pantalla completa.

---

## 📋 Información del curso

| | |
|---|---|
| **Título** | Análisis geoespacial avanzado con Google Earth Engine (Aula Virtual). Dirigido |
| **Nivel** | Medio / avanzado |
| **Duración** | 30 horas — 5 sesiones de 9:00 a 15:00 |
| **Fechas** | 9, 10, 12, 13 y 16 de noviembre de 2026 |
| **Formato** | Aula virtual |
| **Plazas** | 16 |
| **Dirigido a** | Personal científico, técnico y de apoyo, preferentemente de la Estación Biológica de Doñana |
| **Requisitos** | Conocimientos básicos de teledetección. Deseable algo de programación, no indispensable |
| **Idioma** | Español; algunas lecciones pueden impartirse en inglés |

> ⚠️ **El miércoles 11 no hay clase**: por la huelga general, esa sesión se traslada al
> **lunes 16**. El curso queda, por tanto, en lunes 9, martes 10, jueves 12, viernes 13 y
> lunes 16.

---

## 🎯 Objetivos

1. Dominar las capacidades avanzadas de GEE para el análisis profesional de *big data*
   geoespacial y de series temporales.
2. Desarrollar flujos de trabajo complejos en el Code Editor, con técnicas de optimización
   y buenas prácticas.
3. Implementar análisis sofisticados en Geemap, integrando Python, visualizaciones
   interactivas y *machine learning*.
4. Realizar análisis estadísticos avanzados mediante operaciones vectoriales y desarrollo
   de cuadros de mando interactivos.
5. Diseñar y desplegar aplicaciones web profesionales en GEE para casos reales de
   monitoreo territorial.

---

## ⚙️ Configuración previa

No hace falta instalar nada: todo se usa desde el navegador. Lo único recomendable es
llegar con **una cuenta de Earth Engine ya activa**, porque desde 2025 hace falta un
proyecto de Google Cloud vinculado y el registro puede tardar en aprobarse.

**➡️ [CONFIGURACION.md](CONFIGURACION.md) lo explica paso a paso.** Quien no llegue a
tiempo, no pasa nada: **el primer día se crea en clase**.

---

## 🗓️ Programa

Cinco sesiones de 6 horas, con **mucha práctica**: teoría corta, ejercicio guiado y
trabajo propio. El hilo del curso es ir de la cuenta en blanco a tener código tuyo
publicado y usable por otros.

| Día | Fecha | Sesión | Qué se hace |
|---|---|---|---|
| [**1**](Dia_1/) | lun 9 nov | Puesta a punto profesional | Cuenta de GEE y Google Cloud, **tipos de cuenta y precios**, GitHub con tu primer *pull request*, conda y VS Code, y primeros scripts |
| [**2**](Dia_2/) | mar 10 nov | Code Editor a fondo y Python | Series temporales, tendencias, estadísticas zonales y optimización; lo mismo con geemap en Colab |
| [**3**](Dia_3/) | **jue 12 nov** | Una app en el Code Editor | `ui.*`, publicación y el visor de inundación de la marisma |
| [**4**](Dia_4/) | **vie 13 nov** | Una app en Python | geemap, cuadros de mando, *machine learning* y despliegue con solara |
| [**5**](Dia_5/) | **lun 16 nov** | Colaborar en abierto | *Issue*, *fork*, rama, *pull request* y revisión sobre un repositorio real |

## 📂 Cómo está organizado

```
Dia_N/
├── README.md     la guía del día: objetivos, contenidos, ejercicios y recursos
├── GUIA_*.md     guías de instalación y de uso que se quedan para después del curso
└── scripts/      el código que se trabaja en clase (.js del Code Editor, .ipynb de Python)
Dia_1/repaso_js/  anexo opcional, fuera de programa: repaso de JavaScript desde cero
extras/           scripts de ediciones anteriores, fuera de programa, que corren tal cual
presentacion/     las diapositivas del curso, publicadas en GitHub Pages
images/           figuras usadas en los README
CONFIGURACION.md  puesta a punto de la cuenta de Earth Engine, antes de empezar
environment.yml   el entorno de conda, para quien trabaje en local
PARTICIPANTES.md  los huecos del primer pull request del curso
```

---

## 🔗 Enlaces útiles

- [Code Editor](https://code.earthengine.google.com/)
- [Documentación de Earth Engine](https://developers.google.com/earth-engine)
- [Catálogo de datos](https://developers.google.com/earth-engine/datasets)
- [geemap](https://geemap.org/)
- [ndvi2gif](https://github.com/Digdgeo/Ndvi2Gif)
- [Curso de 2025 (nivel introductorio)](https://github.com/Digdgeo/GEE_Course_2025)

---

## 📜 Licencia

El material se publica bajo la licencia que acompaña al repositorio ([LICENSE](LICENSE)).
