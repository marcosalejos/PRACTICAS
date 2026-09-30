# Ejercicio 1 - Contador

## 🎯 Objetivo

Construir un contador interactivo en el navegador. Debe mostrar un número en el centro de la pantalla y, debajo, dos botones:

- Un botón para **sumar 1** al contador.
- Un botón para **resetear** el contador a 0.

## ✅ Requisitos

1. El número del contador debe empezar en 0.
2. Cada vez que se pulse el botón de sumar, el número mostrado debe aumentar en 1.
3. Cada vez que se pulse el botón de resetear, el número mostrado debe volver a 0.
4. El contador y los dos botones deben aparecer **centrados en la pantalla** (tanto horizontal como verticalmente).
5. Los botones deben tener un estilo propio (no el estilo por defecto del navegador) y reaccionar visualmente al pasar el ratón por encima.
6. El fondo de la página debe tener un color distinto al blanco por defecto.

## 🪜 Pasos sugeridos

### 0. Antes de empezar
Instala en VSCode la extensión **"Live Sass Compiler"**. Te permitirá guardar `styles.scss` y que se genere automáticamente `styles.css`, que es el archivo que el `index.html` ya tiene enlazado.

### 1. Estructura HTML
Piensa qué elementos necesitas y en qué orden:
- Un contenedor que agrupe visualmente el número y los botones.
- Un elemento de texto para mostrar el número actual.
- Dos botones, cada uno con un texto que indique claramente su función.

Ponle a cada elemento que necesites manipular después (el número, cada botón) un **id** único y descriptivo. Lo necesitarás en el paso 3.

### 2. Estilos con SCSS
- Averigua qué elemento envuelve toda la página para poder cambiarle el color de fondo.
- Investiga cómo centrar contenido en pantalla completa con **Flexbox**: qué propiedad convierte un elemento en un contenedor flexible, y cuáles controlan la alineación horizontal y vertical de sus hijos.
- Piensa si el contenedor y los botones deben organizarse en fila o en columna.
- Da estilo propio a los botones (colores, bordes, tamaño, espaciado) y añade un efecto al pasar el ratón por encima.

### 3. Lógica en JavaScript
- Necesitas una forma de "recordar" el valor actual del contador entre clic y clic: piensa en qué tipo de variable usarías.

> ⚠️ **Punto clave que suele confundir al principio:** la variable de JavaScript y el número que ve el usuario en la pantalla **son dos cosas totalmente separadas**. La variable vive solo en la memoria del programa; el navegador no sabe que existe ni la muestra por sí sola. Que la variable cambie de valor **no actualiza nada visualmente por sí mismo**.
>
> Para que el usuario vea el nuevo valor, tú tienes que, cada vez que la variable cambie, **escribir manualmente ese valor dentro del elemento HTML** que seleccionaste en el paso 1 (el que tiene el id del número). Es decir: 1) cambias la variable, y 2) por separado, copias el valor de esa variable al contenido del elemento en pantalla. Si te olvidas del paso 2, la variable cambiará "por dentro" pero en pantalla seguirás viendo siempre el mismo número.

- Selecciona desde JavaScript los elementos del HTML que creaste en el paso 1, usando los ids que les asignaste.
- Cada botón necesita "escuchar" cuándo el usuario hace clic sobre él para reaccionar.
- Cuando se detecte el clic en el botón de sumar: incrementa el valor guardado en la variable y, justo después, escribe ese nuevo valor en el elemento que lo muestra en pantalla.
- Cuando se detecte el clic en el botón de resetear: vuelve el valor guardado a 0 y, justo después, escribe ese 0 en el elemento que lo muestra en pantalla.
- Como vas a necesitar repetir "escribir el valor actual en el elemento" en más de un sitio (al sumar y al resetear), piensa si te conviene crear una función propia solo para esa tarea y llamarla desde los dos sitios, en vez de repetir la misma idea dos veces.

### 4. Probar
Abre `index.html` en el navegador (puedes usar la extensión "Live Server" de VSCode) y comprueba que:
- El contador empieza en 0.
- El botón de sumar incrementa correctamente.
- El botón de resetear vuelve a poner el contador en 0.
- Todo se ve centrado y con estilos propios.

## 🔎 Conceptos que te conviene investigar

- `document.getElementById` / `document.querySelector`
- `addEventListener('click', ...)`
- `textContent` / `innerText`
- Diferencia entre `let` y `const`
- CSS Flexbox: `display: flex`, `flex-direction`, `justify-content`, `align-items`
- Pseudo-clase `:hover` en CSS/SCSS

Consulta las webs recomendadas en el README principal del repositorio si te atascas en algún concepto.
