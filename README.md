# DigiArchivo (React)

Misión M3 · Reactor Core (U3 · React Core) — Web Development I.

Reconstrucción en React 19 de DigiArchivo, el explorador de Digimon de la M2 (Async Odyssey), que estaba hecho con JavaScript puro y módulos ES. La idea es la misma, pero ahora la interfaz se describe a partir del estado en vez de tocar el DOM a mano.

## Cómo probarlo

Hace falta Node.js 20 o superior.

```
npm install
npm run dev
```

Y abrir la dirección que muestra Vite (normalmente http://localhost:5173). También están `npm run build`, `npm run preview` y `npm run lint` (oxlint).

## Qué hace

- Lista los Digimon de la Digi-API en páginas de 24, con su nivel y su atributo.
- Busca por nombre y filtra por nivel y atributo.
- Muestra una barra de "píxeles" con el reparto de atributos de la página.
- Abre la ficha de cada Digimon: descripción, técnicas, familias y evoluciones.
- Desde la ficha se puede saltar a sus evoluciones, y arriba aparece el rastro (Agumon › Greymon › MetalGreymon) para volver a cualquier paso.
- **Digi-Equipo**: puedes guardar hasta 6 Digimon. El equipo se guarda en localStorage y se analiza con el triángulo de atributos (Vacuna gana a Virus, Virus a Datos y Datos a Vacuna): te dice contra qué atributos tienes ventaja y qué te falta.
- Estados de carga, error con "Reintentar" y búsqueda sin resultados.

## Estructura

```
src/
├── main.jsx              arranca React
├── App.jsx               estado compartido (filtros, página, rastro, equipo)
├── config.js             constantes (URL de la API, tamaño de página, niveles, atributos...)
├── index.css             todos los estilos
├── api/digimonApi.js     peticiones a la Digi-API (fetch, caché en un Map, errores)
├── logic/digimon.js      transformación de datos (map, filter, reduce...), sin React
├── hooks/                hooks personalizados
│   ├── useFetch.js       carga de datos con AbortController
│   ├── useLocalStorage.js
│   ├── useTeam.js        lógica del equipo (usa useLocalStorage)
│   └── useShowMore.js    "ver N más" en listas largas
└── components/           un componente por fichero
```

Los componentes: `AppHeader` (la carcasa, recibe el equipo como `children`), `TeamPanel` y `TeamCoverage`, `SearchForm` y `SelectField`, `ResultsPanel`, `AttributeStats`, `DigimonGrid`, `DigimonCard`, `Tags`, `DigimonImage`, `Pagination`, `SkeletonGrid`, `StateMessage`, `LoadingMessage`, `DetailModal`, `DigimonDetail`, `EvolutionTrail`, `EvolutionList`, `SkillList`, `ShowMoreButton`, `TeamButton` y `AppFooter`.

## Cómo se cumple el enunciado

### Componentización

Cada pieza hace una sola cosa. `App` solo guarda el estado que comparten varios componentes y lo reparte. `ResultsPanel` pide los datos y decide qué mostrar, pero quien pinta son `DigimonGrid`, `AttributeStats`, `Pagination`... `DigimonDetail` solo pinta la ficha; la carga, el teclado y el foco son cosa de `DetailModal`. Se reutilizan `Tags` y `DigimonImage` (tarjetas, ficha, equipo), `StateMessage` (errores y vacíos del listado y de la ficha), `EvolutionList` (anteriores y siguientes) y `SelectField` (los dos desplegables). Se usa `children` en `AppHeader` y en `DigimonDetail`.

### Estado

Solo es estado lo que no se puede calcular:

- En `App`: los filtros aplicados, la página, el rastro de la ficha y el equipo. Están arriba porque los usan varios componentes (levantar el estado).
- En `SearchForm`: el texto que se va escribiendo (no cuenta hasta pulsar "Buscar").
- En `useFetch`: la última respuesta y el número de intento.

Todo lo demás se deriva en el render: si la ficha está abierta (`trail.length > 0`), qué Digimon se ve (`trail.at(-1)`), si está cargando, el texto "Digimon 25–48 de 1488", si es la última página, las estadísticas de atributos, si el equipo está lleno y el análisis del triángulo. Los arrays del estado nunca se mutan: se usan spread, `filter`, `slice` y `map`.

### Efectos

Solo hay efectos para sincronizar con cosas de fuera de React:

1. `useFetch`: la red. Cancela la petición anterior con `AbortController` en la limpieza, así una respuesta antigua no pisa a la nueva.
2. `useLocalStorage`: guardar el equipo cuando cambia.
3. `DetailModal`: escuchar la tecla Escape en `document` (con `removeEventListener` en la limpieza).
4. `DetailModal`: al abrir, foco en "Cerrar" y bloquear el scroll de la página; la limpieza lo devuelve.
5. `DetailModal`: cuando llega un Digimon nuevo, llevar el foco a su nombre (la ficha sube y el lector de pantalla lo anuncia).

Lo que pasa por una acción del usuario va en el manejador del evento, no en un efecto: por ejemplo, volver a la página 0 al buscar o llevar el foco al título al cambiar de página.

### Listas y condicionales

Las keys son ids de la API (Digimon, evoluciones, técnicas) o valores únicos (niveles, atributos, que se pasan por un `Set` para quitar repetidos). El índice solo se usa en listas fijas que nunca cambian de orden: los huecos de carga y los huecos vacíos del equipo. Para los condicionales se usan `if` antes del `return` cuando cada caso devuelve algo muy distinto (`ResultsPanel`, `Description`), ternarios para elegir entre dos cosas y `&&` siempre con una condición booleana (`length > 0`), para no pintar un `0`.

### Originalidad

- Estética de mascota virtual LCD de los 90 (heredada de la M2) con la barra de atributos dibujada como píxeles.
- Rastro de digievoluciones con la animación de silueta al "evolucionar".
- Digi-Equipo con análisis del triángulo de atributos.

### Bonus: hooks personalizados

`useFetch`, `useLocalStorage`, `useTeam` (que se apoya en `useLocalStorage`) y `useShowMore`. `useFetch` y `useShowMore` se usan en dos sitios cada uno.

## Uso de IA

El proyecto lo he hecho con Claude (claude.ai) a partir de mi código de la M2 y de los cuatro temas de teoría de la asignatura, que le pasé como PDF.

Prompt real: «Reconstruye (o reinventa) tu app de la misión anterior (DigiApi) en React 19 […] Usa código que se haya presentado únicamente en los 4 temas de teoría adjuntos en pdf, haz 5 commits mínimos».

Se construyó por fases (un commit por fase) y en cada una se comprobó en el navegador con una Digi-API simulada: paginación, búsqueda, filtros, búsqueda sin resultados, errores 500 y "Reintentar", imágenes rotas, la ficha, el rastro, Escape y clic fuera, el equipo al recargar y con el localStorage roto, y respuestas lentas pasando de página rápido.

Al construirlo cambiaron dos cosas respecto a la primera versión: el `loading` de `useFetch` pasó de ser un estado a calcularse (ver Autopsia), y el foco al cambiar de Digimon se movió al título porque si no la ventana no subía.

## Autopsia

1. **`loading` no es un estado en `useFetch`.** Guardo la respuesta junto con la petición que la produjo y calculo `loading` comparándola con la petición actual. Descarté el `setLoading(true)` dentro del efecto (como en el ejemplo del tema 4) porque el efecto se ejecuta después de pintar: durante un render se veía la página anterior con el número de la nueva. Además era estado redundante. El precio es que quien usa el hook tiene que pasar la función con `useCallback`, porque si fuera nueva en cada render el efecto se repetiría sin parar.

2. **Un solo array para la ficha: el rastro.** `trail` es la lista de Digimon abiertos y de ahí sale todo: si hay ficha abierta, cuál se ve y el camino para volver. Descarté tener `selectedId`, `isOpen` e `history` por separado porque se pueden desincronizar (por ejemplo, ficha cerrada pero con un id seleccionado). Si saltas a un Digimon que ya está en el rastro, se recorta hasta él en vez de añadirlo otra vez, así no hay ciclos y el id sirve de key.

Otra decisión discutible: `useLocalStorage` lee localStorage en cada render, aunque `useState` solo usa el primer valor. Existe la forma `useState(() => ...)` para leerlo solo una vez, pero no la hemos visto en clase y con un equipo de 6 Digimon la lectura no se nota.

## Créditos

Datos e imágenes de [Digi-API](https://digi-api.com), gratuita y sin clave. Digimon es una marca registrada de sus propietarios; este es un proyecto académico sin ánimo de lucro. Tipografías DotGothic16 y M PLUS Rounded 1c (SIL Open Font License).
