# Ejercicio 2 - Biblioteca (TypeScript)

## 🎯 Objetivo

Construir un pequeño **simulador de biblioteca** usando **Programación Orientada a Objetos (POO)** y, esta vez, **TypeScript** en lugar de JavaScript.

Vas a crear dos tipos de objetos mediante **clases**:

- Un **`Libro`**, con sus datos (título, autor...) y un campo que indique si está **disponible** o prestado.
- Una **`Biblioteca`**, que tiene un nombre y **una lista de libros**, y que sabe cómo gestionarlos: añadirlos, buscarlos, modificarlos, eliminarlos y listarlos (lo que se conoce como un **CRUD**: *Create, Read, Update, Delete*).

En este ejercicio lo importante es la **lógica** y los **tipos**, no el aspecto visual: todo el resultado lo verás en la **consola del navegador**. Al final hay un apartado **extra** opcional para mostrar los libros en la página.

## ✅ Requisitos

1. Todo el código se escribe en `script.ts`, y **todas** las propiedades, parámetros y valores de retorno deben tener su **tipo** indicado.
2. Debe existir una **interfaz** `DatosLibro` con los campos `titulo`, `autor` y `anio`, los tres **opcionales**.
3. Debe existir una clase `Libro` con, al menos, estos campos:
   - `id: number` → identifica al libro de forma única. Debe ser **`readonly`** (no se puede cambiar una vez creado).
   - `titulo: string`
   - `autor: string`
   - `anio: number` → año de publicación.
   - `disponible: boolean` → todo libro nuevo empieza **disponible** (`true`).
4. La clase `Libro` debe tener los métodos:
   - `prestar(): void` → marca el libro como no disponible. Si ya estaba prestado, debe avisar por consola y no hacer nada más.
   - `devolver(): void` → marca el libro como disponible. Si ya estaba disponible, debe avisar por consola.
   - `describir(): string` → devuelve un texto con la información del libro, por ejemplo:
     `[1] El Quijote - Miguel de Cervantes (1605) - ✅ Disponible`
5. Debe existir una clase `Biblioteca` con los campos `nombre: string` y `libros` (una lista de `Libro`, que empieza vacía). La lista debe ser **`private`**.
6. La clase `Biblioteca` debe tener los métodos:
   - `agregarLibro(libro: Libro): void` → **C**reate. Añade un libro a la lista. No debe permitir añadir dos libros con el mismo `id`.
   - `buscarLibro(id: number): Libro | null` → **R**ead. Devuelve el libro con ese `id`, o `null` si no existe.
   - `actualizarLibro(id: number, nuevosDatos: DatosLibro): void` → **U**pdate. Modifica el título, autor y/o año del libro indicado.
   - `eliminarLibro(id: number): void` → **D**elete. Quita el libro de la lista.
   - `listarLibros(): void` → muestra por consola todos los libros de la biblioteca (usando `describir()` de cada libro).
   - `cambiarDisponibilidad(id: number, disponible: boolean): void` → permite marcar **desde fuera** un libro como disponible o no disponible.
7. Cuando se intente buscar, actualizar, eliminar o cambiar la disponibilidad de un libro que **no existe**, el programa no debe romperse: debe mostrar un aviso por consola.
8. El código debe compilar **sin errores** de TypeScript (no vale usar `any` para quitarte errores de encima).
9. Al final de `script.ts` debes escribir una pequeña **prueba** que use todo lo anterior (crear la biblioteca, añadir libros, prestar alguno, modificar otro, eliminar otro y listar).

## 🪜 Pasos sugeridos

### 0. Antes de empezar: preparar TypeScript

> ⚠️ **El navegador no entiende TypeScript.** Solo sabe ejecutar JavaScript. Por eso tú vas a escribir en `script.ts`, y una herramienta llamada **`tsc`** (el compilador de TypeScript) lo va a **traducir** a un `script.js`, que es el que el `index.html` tiene enlazado.
>
> Es la misma idea que con el SCSS del ejercicio 1: tú escribes en un lenguaje "mejorado" y se genera automáticamente el archivo que entiende el navegador. **Nunca edites `script.js` a mano**: se sobrescribe cada vez que compilas.

1. Instala TypeScript en tu ordenador (solo una vez). En la terminal:
   ```
   npm install -g typescript
   ```
   Comprueba que se ha instalado con `tsc -v` (debe mostrarte un número de versión).
2. En la terminal, **entra en la carpeta del ejercicio** (`cd "Ejercicio 2 - Biblioteca"`).
3. Ejecuta:
   ```
   tsc --watch
   ```
   - `tsc` → el compilador de TypeScript. Lee el archivo `tsconfig.json` que ya viene en la carpeta, donde está la configuración.
   - `--watch` → se queda "vigilando": cada vez que guardes `script.ts`, vuelve a generar `script.js` automáticamente. Deja esa terminal abierta mientras trabajas.
4. Abre `index.html` con **Live Server** y abre la **consola del navegador**: pulsa `F12` (o clic derecho → *Inspeccionar*) y ve a la pestaña **Console**.
5. Haz una prueba rápida: escribe `console.log("Hola biblioteca");` en `script.ts`, guarda y comprueba que aparece en la consola. Si aparece, ya está todo listo.

> 💡 Los errores de TypeScript los verás en **dos sitios**: subrayados en rojo en VSCode mientras escribes, y en la terminal donde tienes `tsc --watch`. **Léelos con calma**: casi siempre te dicen exactamente qué tipo esperaba y qué le has dado. No son tu enemigo, te están avisando de un fallo **antes** de que ocurra.

### 1. ¿Qué es TypeScript y qué aporta?
TypeScript es **JavaScript con tipos**. Todo lo que sabes de JavaScript sigue valiendo, pero además puedes (y debes) decir de qué tipo es cada cosa:

```ts
let edad: number = 25;
let nombre: string = "Ana";
let activo: boolean = true;

function saludar(persona: string): string {
    return `Hola ${persona}`;
}
```

- Lo que va después de los `:` es el **tipo**.
- En la función, `persona: string` dice que el parámetro tiene que ser un texto, y el `: string` del final dice que la función **devuelve** un texto.
- Si intentas hacer `saludar(42)`, TypeScript te marcará un error **antes de ejecutar nada**. En JavaScript ese fallo solo lo descubrirías (o no) cuando el programa ya estuviera funcionando.

### 2. ¿Qué es una clase y qué es un objeto?
Antes de escribir código, entiende bien esta idea:

> 💡 Una **clase** es como un **molde** o una **plantilla**: describe qué datos tiene algo y qué cosas sabe hacer. Un **objeto** (o **instancia**) es cada cosa concreta que fabricas con ese molde.
>
> Por ejemplo, `Libro` es la clase (el molde). *"El Quijote"* y *"1984"* son dos objetos distintos creados con ese mismo molde: los dos tienen título, autor y año, pero cada uno con **sus propios valores**.

- Los **datos** que guarda cada objeto se llaman **propiedades** o **campos** (`titulo`, `autor`...).
- Las **acciones** que sabe hacer se llaman **métodos** (`prestar()`, `devolver()`...). Un método no es más que una función que "vive" dentro de la clase.

> 💡 **Diferencia importante con JavaScript:** en TypeScript tienes que **declarar las propiedades al principio de la clase, con su tipo**, antes del constructor. En JavaScript podías inventártelas directamente dentro del constructor; en TypeScript, si intentas usar `this.titulo` sin haberla declarado antes, te dará error.

### 3. La interfaz `DatosLibro`
- Una **interfaz** (`interface`) sirve para describir la **forma** que debe tener un objeto: qué campos tiene y de qué tipo son. No crea nada, solo es una "descripción" que TypeScript usa para comprobar.
- Declara la interfaz `DatosLibro` con `titulo`, `autor` y `anio`.
- Haz que los tres campos sean **opcionales**. Investiga qué significa poner un `?` detrás del nombre de un campo (`titulo?: string`).
- La vas a usar más adelante en `actualizarLibro()`, para poder pasar solo los datos que quieras cambiar.

### 4. La clase `Libro`
- Investiga cómo se declara una clase con la palabra reservada `class`.
- Al principio de la clase, declara sus propiedades **con su tipo**. Haz que `id` sea **`readonly`**: así TypeScript no dejará que nadie le cambie el `id` a un libro una vez creado.
- Toda clase tiene un método especial llamado `constructor`. Es el que se ejecuta **automáticamente** cuando creas un objeto nuevo con `new`. Piensa qué datos debe recibir (pista: todos menos `disponible`, porque ese siempre empieza igual) y ponle el tipo a cada parámetro.
- Dentro del constructor, guarda cada dato en el propio objeto usando `this`.

> ⚠️ **Punto clave que suele confundir al principio: `this`.**
>
> Dentro de una clase, `this` significa **"este objeto en concreto"**. Cuando escribes `this.titulo = titulo;` en el constructor, estás diciendo: *"guarda en la propiedad `titulo` de **este** libro el valor que me han pasado"*.
>
> Fíjate en que ahí aparecen **dos** `titulo` distintos: `this.titulo` es la **propiedad del objeto** (la que declaraste arriba y que se queda guardada), y `titulo` a secas es el **parámetro** que llega al constructor (un valor de paso que desaparece cuando el constructor termina). Si te olvidas del `this`, el dato no se guarda en ningún sitio.
>
> Lo mismo en los métodos: si dentro de `prestar()` quieres cambiar la disponibilidad, tienes que escribir `this.disponible`, no `disponible`.

- Crea el método `prestar()`. Como no devuelve nada, su tipo de retorno es **`void`**. Comprueba primero si el libro ya está prestado: si lo está, avisa por consola; si no, cambia `disponible` a `false`.
- Crea el método `devolver()`, que es la idea contraria.
- Crea el método `describir()`: debe **devolver** (con `return`) un `string` con los datos del libro. Para el trozo de "Disponible / Prestado", piensa cómo elegir un texto u otro según el valor del booleano (puedes usar un `if` o investigar el **operador ternario**).
- **Prueba antes de seguir:** crea un libro con `new Libro(...)`, muéstralo con `console.log(libro.describir())`, préstalo, vuelve a mostrarlo y comprueba que ha cambiado.
- **Prueba también a equivocarte a propósito:** pásale un texto donde va el año (`"mil novecientos"`), o intenta hacer `libro.id = 99`. Mira qué error te da TypeScript. Así entenderás para qué sirven los tipos y el `readonly`. Luego deshaz el error.

No pases al paso 5 hasta que la clase `Libro` funcione y compile sin errores.

### 5. La clase `Biblioteca`
- Declara la clase `Biblioteca` con sus propiedades `nombre` y `libros`.
- Para `libros`, investiga cómo se escribe en TypeScript el tipo **"lista de objetos `Libro`"** (hay dos formas: `Libro[]` y `Array<Libro>`, las dos valen).
- Haz que `libros` sea **`private`**.

> 💡 **¿Por qué `private`?** Esto es una de las ideas básicas de la POO: la **encapsulación**. Si la lista fuera pública, cualquiera podría hacer desde fuera `biblioteca.libros.push(...)` y colar un libro con un `id` repetido, saltándose todas las comprobaciones que vas a programar. Al hacerla privada, **la única forma** de tocar la lista es a través de los métodos de la biblioteca, que son los que se aseguran de que todo se hace bien. Pruébalo: intenta acceder a `biblioteca.libros` desde fuera de la clase y mira qué te dice TypeScript.

- Su constructor solo necesita recibir el `nombre`. La lista de libros **no** se recibe por parámetro: empieza vacía.

> 💡 Aquí aparece otra idea muy importante de la POO: **un objeto puede contener otros objetos**. La biblioteca guarda dentro una lista de objetos `Libro`. Cuando saques un libro de esa lista, podrás usar sus métodos (`prestar()`, `describir()`...) igual que si lo hubieras creado tú directamente.

Ahora ve creando los métodos **uno a uno**, y prueba cada uno antes de pasar al siguiente:

#### 5.1 `buscarLibro(id: number): Libro | null`
Empieza por este, porque **casi todos los demás lo van a necesitar**.
- Tienes que recorrer `this.libros` y devolver el que tenga ese `id`.
- Puedes hacerlo con un bucle `for` clásico, o investigar el método de los arrays `find()`, que hace justo esto.
- Si no lo encuentra, debe devolver `null`.

> ⚠️ **Ojo con `find()`:** cuando no encuentra nada, `find()` no devuelve `null`, devuelve **`undefined`**. TypeScript te avisará de que el tipo no coincide con `Libro | null`. Investiga cómo convertir ese `undefined` en `null` (pista: el operador `??`).

> ⚠️ **Y ojo al usarlo:** como `buscarLibro()` puede devolver `null`, TypeScript **no te dejará** hacer directamente `this.buscarLibro(id).prestar()`, porque si el libro no existe estarías llamando a `prestar()` sobre `null` y el programa se rompería. Primero tienes que guardar el resultado en una variable y comprobar con un `if` que no es `null`. Una vez dentro de ese `if`, TypeScript ya sabe que es un `Libro` y te deja usar sus métodos. **Esto es justo lo que te obliga a cumplir el requisito 7.**

#### 5.2 `agregarLibro(libro: Libro): void`
- Antes de añadir, usa `buscarLibro()` para comprobar si ya existe un libro con ese mismo `id`. Si existe, avisa por consola y **no** lo añadas.
- Si no existe, añádelo a la lista. Investiga el método de los arrays `push()`.

#### 5.3 `listarLibros(): void`
- Si la lista está vacía, muestra un mensaje del tipo *"La biblioteca no tiene libros"*.
- Si no, recorre la lista y, por cada libro, muestra por consola lo que devuelve su `describir()`.
- Puedes recorrerla con un `for...of` o investigar `forEach()`.

#### 5.4 `actualizarLibro(id: number, nuevosDatos: DatosLibro): void`
- Aquí es donde usas la interfaz del paso 3. Gracias a que sus campos son opcionales, podrás llamar al método así: `actualizarLibro(2, { anio: 2001 })`, pasando solo lo que quieras cambiar.
- Busca el libro con `buscarLibro()`. Si no existe, avisa y termina.
- Si existe, cambia solo los campos que vengan en `nuevosDatos`. Pista: si un campo no viene, su valor será `undefined`; comprueba con un `if` cada campo antes de copiarlo, para no borrar datos que no querías tocar.
- Fíjate en que la interfaz **no tiene `id`**: así nadie puede intentar cambiarlo por aquí (y además es `readonly`).

#### 5.5 `eliminarLibro(id: number): void`
- Primero comprueba que el libro existe; si no, avisa.
- Para quitarlo de la lista tienes dos caminos, investiga el que te resulte más claro:
  - `findIndex()` para saber en qué posición está, y luego `splice()` para quitarlo.
  - `filter()` para crear una lista nueva **sin** ese libro y guardarla en `this.libros`.

#### 5.6 `cambiarDisponibilidad(id: number, disponible: boolean): void`
- Este método es el que permite **desde fuera** decir si un libro está disponible o no.
- Busca el libro. Si no existe, avisa.
- Si existe, en lugar de tocar `libro.disponible` directamente, piensa si puedes **reutilizar** los métodos `prestar()` y `devolver()` que ya creaste en el paso 4. Así los avisos ("ya estaba prestado"...) funcionarán también aquí sin repetir código.

### 6. Probar todo
Al final de `script.ts`, escribe una pequeña "historia" que use todo lo anterior y comprueba en la consola que cada paso hace lo esperado:
1. Crea una biblioteca con un nombre.
2. Crea al menos **4 libros** y añádelos.
3. Intenta añadir un libro con un `id` repetido → debe salir un aviso.
4. Lista los libros.
5. Presta un libro usando `cambiarDisponibilidad(...)` y vuelve a listar.
6. Intenta prestar **otra vez** el mismo libro → debe salir un aviso.
7. Actualiza el título o el año de un libro y vuelve a listar.
8. Elimina un libro y vuelve a listar.
9. Intenta buscar, actualizar o eliminar un `id` que no existe → debe salir un aviso y el programa **no** debe romperse.

> 💡 Pon un `console.log("--- Paso X ---")` antes de cada paso de la prueba. Así la consola se lee mucho mejor y sabrás qué salida corresponde a cada cosa.

Antes de dar el ejercicio por terminado, mira la terminal donde tienes `tsc --watch`: debe poner **`Found 0 errors`**.

### ⭐ 7. Extra (opcional): mostrarlo en la página
Si has terminado todo lo anterior y quieres ir un paso más allá:
- En el `index.html` hay un contenedor preparado (`#listaLibros`) para mostrar la lista de libros.
- Añade a la clase `Biblioteca` un método `pintarLibros(): void` que vacíe ese contenedor y cree dentro un elemento por cada libro, con el texto de `describir()`.
- Recuerda lo que aprendiste en el ejercicio 1: **cambiar los datos no actualiza la pantalla por sí solo**. Cada vez que añadas, elimines, modifiques o prestes un libro, tendrás que volver a llamar a `pintarLibros()`.
- Da estilo en el SCSS para que los libros prestados se vean distintos de los disponibles (por ejemplo, en gris o tachados). Pista: investiga cómo añadir una **clase CSS** a un elemento desde código (`classList.add`).

> ⚠️ `document.getElementById(...)` en TypeScript devuelve **`HTMLElement | null`**, porque puede que ese id no exista en el HTML. Te pasará lo mismo que con `buscarLibro()`: tendrás que comprobar que no es `null` antes de usarlo.

## 🔎 Conceptos que te conviene investigar

- Qué es TypeScript y el compilador `tsc` (`tsc --watch`)
- Tipos básicos: `number`, `string`, `boolean`, `void`, `null`, `undefined`
- Tipos de arrays: `Libro[]` / `Array<Libro>`
- Tipos unión: `Libro | null`
- `interface` y campos opcionales (`?`)
- `class`, `constructor` y `new`
- La palabra reservada `this`
- Modificadores de acceso: `public`, `private` y `readonly`
- Diferencia entre **propiedad** y **método**
- Métodos de arrays: `push()`, `find()`, `findIndex()`, `splice()`, `filter()`, `forEach()`
- Operador `??` (nullish coalescing)
- Operador ternario: `condicion ? valorSiTrue : valorSiFalse`
- Template literals (plantillas de texto con comillas invertidas): `` `Hola ${nombre}` ``
- `console.log()` y la consola del navegador (`F12`)
- Extra: `document.createElement`, `appendChild`, `innerHTML`, `classList.add`

Consulta las webs recomendadas en el README principal del repositorio si te atascas en algún concepto. Para TypeScript, la documentación oficial es [typescriptlang.org/docs](https://www.typescriptlang.org/docs/) (el apartado **"TypeScript for JavaScript Programmers"** es muy buen punto de partida), y en W3Schools tienes un [tutorial de TypeScript](https://www.w3schools.com/typescript/) muy visual.
