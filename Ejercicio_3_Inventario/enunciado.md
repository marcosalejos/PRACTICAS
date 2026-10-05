# Ejercicio 3 - Inventario de una tienda (TypeScript + lambdas)

## 🎯 Objetivo

Construir el **inventario de una pequeña tienda**: una lista de productos con su precio y su stock (las unidades que quedan en el almacén), y una clase que sepa gestionarlos.

Es la misma idea que la biblioteca del ejercicio 2 (un **CRUD**), pero esta vez vas a ir un paso más allá:

- Además de añadir, buscar, modificar y eliminar, el inventario tiene que saber **responder preguntas** sobre sus datos: *¿qué productos son bebidas?*, *¿cuánto dinero hay en el almacén?*, *¿hay algo agotado?*, *dame los productos ordenados de más barato a más caro*...
- Para eso vas a trabajar a fondo con las **funciones flecha** (también llamadas **lambdas**) y con los métodos de arrays que las usan: `filter`, `map`, `find`, `some`, `every`, `reduce` y `sort`.
- Los métodos del inventario ya **no muestran nada por consola**: **devuelven** el resultado, y es quien los llama el que decide qué hacer con él.

Igual que en el ejercicio 2, lo importante es la **lógica**: todo el resultado lo verás en la **consola del navegador**.

## ✅ Requisitos

1. Todo el código se escribe en `script.ts`, con **todos** los tipos indicados y **sin usar `any`**.
2. Al principio de `script.ts` debes resolver el **calentamiento de lambdas** (paso 1).
3. Debe existir un tipo `Categoria` que solo admita estos valores: `"alimentacion"`, `"bebidas"` y `"limpieza"`.
4. Debe existir una clase `Producto` con:
   - `id: number` (**`readonly`**), `nombre: string`, `categoria: Categoria`, `precio: number` y `stock: number`.
   - `describir(): string` → por ejemplo `[3] Leche (alimentacion) - 1.15 € - 24 uds`
   - `estaAgotado(): boolean` → `true` si el stock es `0`.
5. Debe existir una interfaz `DatosProducto` con `nombre`, `categoria` y `precio`, los tres **opcionales**. ⚠️ **No** tiene `stock`: el stock solo puede cambiar vendiendo o reponiendo.
6. Debe haber tres **funciones flecha de validación**, fuera de la clase:
   - `nombreValido` → el nombre no está vacío (ni es solo espacios).
   - `precioValido` → el precio es mayor que `0`.
   - `cantidadValida` → es un número **entero** y mayor o igual que `0`.
7. Debe existir una clase `Inventario` con:
   - Una lista **`private`** de `Producto` que empieza vacía.
   - Un contador **`private`** `siguienteId` que empieza en `1`. **El `id` lo pone el inventario**, no quien crea el producto.
8. La clase `Inventario` debe tener estos métodos de **gestión** (el CRUD):

   | Método | Qué hace | Devuelve |
   |---|---|---|
   | `agregarProducto(nombre, categoria, precio, stock)` | Valida los datos y que **no exista ya un producto con el mismo nombre**. Si todo está bien, crea el `Producto` con el siguiente `id` y lo guarda. | El `Producto` creado, o `null` si no se ha podido crear. |
   | `obtenerProducto(id)` | Busca un producto por su `id`. | `Producto \| null` |
   | `actualizarProducto(id, datos: DatosProducto)` | Cambia solo los campos que vengan, validándolos antes. | `boolean` (`true` si se ha actualizado) |
   | `eliminarProducto(id)` | Quita el producto de la lista. | `boolean` |
   | `venderProducto(id, cantidad)` | Resta unidades del stock. No se puede vender más de lo que hay. | `boolean` |
   | `reponerProducto(id, cantidad)` | Suma unidades al stock. | `boolean` |

9. Y estos métodos de **consulta**, que **no modifican nada** y **no hacen `console.log`**:

   | Método | Devuelve | Método de array que debes usar |
   |---|---|---|
   | `obtenerTodos(): Producto[]` | Una **copia** de la lista. | spread `[...]` |
   | `buscarPorNombre(texto: string): Producto[]` | Los productos cuyo nombre **contiene** ese texto, sin importar mayúsculas. | `filter` |
   | `filtrarPorCategoria(categoria: Categoria): Producto[]` | Los de esa categoría. | `filter` |
   | `stockBajo(limite: number): Producto[]` | Los que tienen **menos** unidades que el límite. | `filter` |
   | `obtenerNombres(): string[]` | Solo los nombres. | `map` |
   | `hayAgotados(): boolean` | Si **algún** producto está agotado. | `some` |
   | `todosConStock(): boolean` | Si **todos** tienen al menos una unidad. | `every` |
   | `valorTotal(): number` | La suma de `precio × stock` de todos los productos. | `reduce` |
   | `ordenarPorPrecio(ascendente: boolean): Producto[]` | Una lista **nueva** ordenada por precio, **sin desordenar** la original. | `sort` |
   | `buscar(criterio: (p: Producto) => boolean): Producto[]` | Los productos que cumplan el criterio que **tú le pases como lambda**. | `filter` |

10. Debe existir el método `aplicarDescuento(categoria: Categoria, porcentaje: number): number`, que rebaja el precio de todos los productos de esa categoría y **devuelve cuántos** productos ha rebajado.
11. Cuando se intente consultar, modificar, vender o eliminar un producto que **no existe**, o se pasen datos no válidos, el programa **no** debe romperse: el método avisa por consola y devuelve `null` o `false`.
12. Al final de `script.ts` debes escribir una **prueba** que use todo lo anterior (paso 7).
13. El código debe compilar **sin errores** (`Found 0 errors`).

## 🪜 Pasos sugeridos

### 0. Antes de empezar
Igual que en el ejercicio 2:

1. Entra en la carpeta del ejercicio (`cd Ejercicio_3_Inventario`).
2. Ejecuta `tsc --watch` y deja esa terminal abierta.
3. Abre `index.html` con **Live Server** y abre la consola (`F12` → *Console*).

> 💡 Ten **abierto el ejercicio 2** mientras haces este. La clase `Producto` se parece mucho a `Libro`, y buena parte del `Inventario` se parece a tu `Biblioteca`. Reutiliza lo que ya sabes.

### 1. Calentamiento: funciones flecha (lambdas)
Antes de tocar el inventario, vas a practicar con funciones flecha sueltas. **No te saltes este paso**: es la base de todo el ejercicio.

#### 1.1 De función normal a función flecha
Estas tres funciones hacen **exactamente lo mismo**:

```ts
// 1) Función "de toda la vida"
function doble(n: number): number {
    return n * 2;
}

// 2) Función flecha con llaves
const doble2 = (n: number): number => {
    return n * 2;
};

// 3) Función flecha "corta": si solo hay una línea que devuelve algo,
//    puedes quitar las llaves Y el return. Se llama "return implícito".
const doble3 = (n: number): number => n * 2;
```

- La flecha `=>` se lee como *"devuelve"*: `(n) => n * 2` es *"recibe `n` y devuelve `n * 2`"*.
- Una función flecha se guarda en una **variable** (`const`), como si fuera un dato más. Esto es la clave de todo lo que viene después: **una función puede ser un valor**, y por tanto se puede **pasar como parámetro a otra función**.

> ⚠️ **Cuidado con el return implícito:** solo funciona **sin llaves**. Si pones llaves, tienes que escribir el `return` tú; si no, la función devuelve `undefined`.
> ```ts
> const mal = (n: number): number => { n * 2 };  // ❌ error: no devuelve nada
> const bien = (n: number): number => n * 2;     // ✅
> ```

**Practica:** en la zona de calentamiento de `script.ts`, escribe como funciones flecha:
- `esPar`: recibe un número y devuelve si es par (pista: el operador `%`).
- `saludar`: recibe un nombre y devuelve `"Hola, <nombre>"`.
- `precioConIva`: recibe un precio y devuelve ese precio con un 21 % de IVA.

Pruébalas con `console.log(...)`.

#### 1.2 Pasar una lambda a otra función (callbacks)
Cuando le pasas una función a otra función para que **ella** la use, a esa función que pasas se le llama **callback**. Los arrays tienen muchos métodos que funcionan así: tú les das una lambda y ellos la ejecutan **con cada elemento** de la lista.

```ts
const numeros: number[] = [3, 8, 12, 5, 20];

const grandes = numeros.filter(n => n > 6);          // [8, 12, 20]
```

Léelo así: *"filtra `numeros` quedándote con cada `n` que cumpla `n > 6`"*. `filter` recorre la lista, le pasa cada número a tu lambda, y se queda con los que hacen que devuelva `true`.

> 💡 Fíjate en que dentro del `filter` **no hace falta poner el tipo** de `n`: TypeScript ya sabe que, si la lista es de `number`, cada elemento es un `number`. Y si solo hay **un** parámetro, puedes quitar los paréntesis: `n => n > 6`.

Estos son los métodos que vas a usar en el ejercicio. **Todos reciben una lambda**:

| Método | Qué hace | Ejemplo con `[3, 8, 12, 5, 20]` | Resultado |
|---|---|---|---|
| `filter` | Se queda con los que cumplen la condición. | `numeros.filter(n => n > 6)` | `[8, 12, 20]` |
| `map` | **Transforma** cada elemento en otra cosa. | `numeros.map(n => n * 10)` | `[30, 80, 120, 50, 200]` |
| `find` | Devuelve el **primero** que cumple la condición (o `undefined`). | `numeros.find(n => n > 6)` | `8` |
| `some` | ¿**Alguno** cumple la condición? | `numeros.some(n => n > 15)` | `true` |
| `every` | ¿**Todos** cumplen la condición? | `numeros.every(n => n > 15)` | `false` |
| `forEach` | Hace algo con cada uno. **No devuelve nada.** | `numeros.forEach(n => console.log(n))` | — |
| `reduce` | **Acumula** todos en un único valor. | `numeros.reduce((total, n) => total + n, 0)` | `48` |

> 💡 **Cómo leer `reduce`:** `(total, n) => total + n` se ejecuta con cada número. `total` es lo que llevas acumulado y `n` es el elemento actual. Lo que devuelve la lambda pasa a ser el nuevo `total`. El `0` del final es el valor con el que **empieza** `total`.
>
> | Vuelta | `total` | `n` | Devuelve |
> |---|---|---|---|
> | 1 | 0 | 3 | 3 |
> | 2 | 3 | 8 | 11 |
> | 3 | 11 | 12 | 23 |
> | 4 | 23 | 5 | 28 |
> | 5 | 28 | 20 | **48** |

**Practica:** en el calentamiento, con la lista `[3, 8, 12, 5, 20, 7]`:
- Saca los números **pares** usando tu lambda `esPar` (sí: puedes pasarle **directamente** una lambda que ya tengas guardada: `numeros.filter(esPar)`).
- Saca una lista con cada número **al cuadrado**.
- Busca el **primer** número mayor que 10.
- Comprueba si **alguno** es negativo y si **todos** son menores que 100.
- Calcula la **suma** de todos con `reduce`.

#### 1.3 Escribir tu propia función que recibe una lambda
Hasta ahora has **usado** funciones que reciben lambdas. Ahora vas a **escribir** una. Para eso necesitas saber escribir el **tipo de una función**:

```ts
(x: number) => number
```

Esto se lee: *"una función que recibe un `number` y devuelve un `number`"*. Ojo: aquí no hay código, es solo la **descripción** del tipo, igual que `string` o `number[]`.

```ts
const aplicar = (n: number, operacion: (x: number) => number): number => operacion(n);

aplicar(5, x => x * 2);   // 10
aplicar(5, x => x + 100); // 105
aplicar(5, doble3);       // 10
```

**Practica:** copia `aplicar` en el calentamiento y llámala con al menos tres lambdas distintas. Después intenta pasarle una lambda que devuelva un `string` y mira el error de TypeScript.

> 💡 **¿Cuándo usar una función flecha y cuándo una normal?** En este ejercicio, la regla es sencilla:
> - **Lambdas**: para funciones **cortas y sueltas** (como las validaciones del paso 3) y siempre que le pases una función **a otra función** (`filter`, `map`, `buscar`...).
> - **Métodos normales**: para los métodos de las clases (`describir()`, `agregarProducto()`...), igual que en el ejercicio 2.

No pases al paso 2 hasta que todo el calentamiento funcione.

### 2. El tipo `Categoria` y la clase `Producto`
- Declara el tipo `Categoria` con un **tipo unión de textos**:
  ```ts
  type Categoria = "alimentacion" | "bebidas" | "limpieza";
  ```
  Una variable de tipo `Categoria` solo puede valer uno de esos tres textos. Prueba a hacer `let c: Categoria = "juguetes";` y mira qué pasa. Así nadie puede colar una categoría inventada o mal escrita (`"bebida"`, `"Bebidas"`...).

- Crea la clase `Producto`. Es casi igual que `Libro`: propiedades con su tipo, `id` `readonly` y un constructor que recibe los cinco datos.
- `describir()` igual que en el ejercicio 2. Para que el precio salga siempre con dos decimales, investiga `toFixed(2)`.
- `estaAgotado()` es un método de **una sola línea**: devuelve el resultado de una comparación.
- Crea la interfaz `DatosProducto` (con `nombre`, `categoria` y `precio` opcionales).

> 💡 **¿Por qué `DatosProducto` no tiene `stock`?** Porque en una tienda el stock no se "edita" a mano: baja cuando vendes y sube cuando repones. Si dejáramos cambiarlo con `actualizarProducto()`, cualquiera podría poner `stock: 1000` y el inventario dejaría de reflejar la realidad. **Quitar esa posibilidad del tipo** es la forma de asegurarte de que solo cambia por el camino correcto.

### 3. Las validaciones (lambdas)
Fuera de las clases, escribe las tres funciones flecha de validación: `nombreValido`, `precioValido` y `cantidadValida`. Cada una recibe un dato y devuelve un `boolean`. **Todas caben en una línea**.

> 💡 Investiga `trim()` y `Number.isInteger()`.

Las vas a usar **en varios métodos** del inventario (al añadir, al actualizar, al vender y al reponer). Por eso las escribes **una sola vez**, aparte: si mañana cambia la regla (por ejemplo, *"el precio máximo es 10.000 €"*), solo la tocas en un sitio.

### 4. La clase `Inventario`: gestión
- Declara la lista privada y el contador privado `siguienteId`. El constructor no necesita recibir nada.

#### 4.1 `obtenerProducto(id: number): Producto | null`
- Como `buscarLibro()` del ejercicio 2, pero **obligatoriamente con `find()` y una lambda**.
- Recuerda: `find()` devuelve `undefined` si no encuentra nada. Conviértelo en `null` con `??`.

#### 4.2 `agregarProducto(nombre: string, categoria: Categoria, precio: number, stock: number): Producto | null`
- Valida el nombre, el precio y el stock con tus lambdas. Si algo falla, avisa por consola y devuelve `null`.
- Comprueba que **no exista ya** un producto con el mismo nombre. Usa `some()`. Ojo: `"Leche"` y `"leche"` deberían contar como el mismo (investiga `toLowerCase()`).
- Si todo está bien:
  1. Crea el `Producto` usando `this.siguienteId` como `id`.
  2. Suma 1 a `this.siguienteId`.
  3. Guárdalo en la lista y **devuelve** el producto creado.

> 💡 Compara con el ejercicio 2: allí tú elegías el `id` de cada libro y tenías que comprobar que no se repitiera. Aquí **el `id` lo pone el inventario**, así que es **imposible** que se repita. Es una forma mucho más segura de hacerlo.

#### 4.3 `actualizarProducto(id: number, datos: DatosProducto): boolean`
- Igual que `actualizarLibro()`: busca el producto y cambia solo los campos que vengan.
- **Nuevo:** antes de cambiar nada, valida los campos que vengan (si viene `nombre`, que sea válido; si viene `precio`, que sea válido). Si alguno no lo es, avisa, **no cambies nada** y devuelve `false`.

> ⚠️ Fíjate en el orden: primero **compruebas todo** y solo después **cambias**. Si cambiaras el nombre y luego descubrieras que el precio está mal, el producto se quedaría a medio actualizar.

#### 4.4 `eliminarProducto(id: number): boolean`
- Esta vez hazlo con `filter()`: quédate con todos los productos **cuyo id sea distinto** del que quieres borrar, y guarda esa lista nueva en `this.productos`.
- ¿Cómo sabes si se ha borrado algo? Compara la longitud de la lista antes y después.

#### 4.5 `venderProducto(id: number, cantidad: number): boolean` y `reponerProducto(id: number, cantidad: number): boolean`
- Valida la cantidad con `cantidadValida` (y que sea mayor que `0`: vender cero unidades no tiene sentido).
- Busca el producto. Si no existe, avisa y devuelve `false`.
- En `venderProducto`, si no hay stock suficiente, avisa (*"Solo quedan 3 unidades de Leche"*), **no cambies nada** y devuelve `false`.
- Si todo va bien, resta o suma la cantidad y devuelve `true`.

> 💡 Es la misma idea que `prestar()` del ejercicio 2 (*"no se puede prestar un libro ya prestado"*), pero con números.

### 5. La clase `Inventario`: consultas
Aquí está el corazón del ejercicio. **Todas** estas consultas siguen dos reglas:

- **No modifican** la lista ni los productos.
- **No hacen `console.log`**: devuelven el resultado. Es la prueba del paso 7 la que lo muestra.

> 💡 **¿Por qué no hacer `console.log` dentro?** Porque así el mismo método te vale para muchas cosas: mostrarlo en consola, pintarlo en una página web, usarlo dentro de otro cálculo... Si el método imprime directamente, solo sirve para imprimir.

La mayoría son **una sola línea** con un método de array y una lambda. Hazlas en este orden:

1. **`obtenerTodos()`** → devuelve una **copia**: `[...this.productos]`. Si devolvieras `this.productos` directamente, desde fuera podrían hacerle un `push()` y saltarse todas tus validaciones (¿te acuerdas de por qué la lista era `private`?).
2. **`filtrarPorCategoria(categoria)`** → `filter`.
3. **`stockBajo(limite)`** → `filter`.
4. **`buscarPorNombre(texto)`** → `filter` + `includes()`. Pasa a minúsculas **las dos cosas** (el nombre y el texto) antes de comparar.
5. **`obtenerNombres()`** → `map`. Transforma cada `Producto` en su `nombre`.
6. **`hayAgotados()`** → `some`. Pista: ya tienes un método `estaAgotado()` en `Producto`.
7. **`todosConStock()`** → `every`.
8. **`valorTotal()`** → `reduce`. Lo que acumulas es `precio × stock` de cada producto. **No olvides el valor inicial `0`.**
9. **`ordenarPorPrecio(ascendente)`** → `sort`. Lee con atención el aviso de abajo.
10. **`buscar(criterio)`** → el último y el más interesante (ver 5.1).

> ⚠️ **Dos trampas de `sort()`:**
>
> 1. **`sort()` modifica la lista original.** Si haces `this.productos.sort(...)`, desordenas el inventario. Ordena siempre una **copia**: `[...this.productos].sort(...)`.
> 2. **Necesita una lambda que compare dos elementos**, `(a, b) => ...`, y que devuelva:
>    - un número **negativo** si `a` va **antes** que `b`,
>    - un número **positivo** si `a` va **después** que `b`,
>    - `0` si da igual.
>
>    Para números hay un truco: `(a, b) => a.precio - b.precio` ordena de menor a mayor. ¿Qué tendrías que cambiar para que sea de mayor a menor?

#### 5.1 `buscar(criterio: (p: Producto) => boolean): Producto[]`
Este método **recibe una lambda** como parámetro, igual que tu `aplicar()` del calentamiento. Por dentro es solo un `filter` que usa ese criterio:

```ts
buscar(criterio: (p: Producto) => boolean): Producto[] {
    // ... aquí usas criterio con filter
}
```

Y desde fuera lo puedes usar para hacer **cualquier búsqueda** sin tener que escribir un método nuevo cada vez:

```ts
inventario.buscar(p => p.precio < 2);
inventario.buscar(p => p.categoria === "bebidas" && p.stock > 10);
inventario.buscar(p => p.nombre.startsWith("A"));
```

> 💡 Fíjate en una cosa: `filtrarPorCategoria(categoria)` y `stockBajo(limite)` se podrían reescribir con `buscar(...)`. Inténtalo con una de las dos. Así verás que, cuando una función recibe una lambda, se vuelve **mucho más flexible**.

### 6. `aplicarDescuento(categoria: Categoria, porcentaje: number): number`
- Este método **sí modifica** los productos (rebaja su precio), así que es de gestión, no de consulta.
- Valida que el porcentaje esté entre `1` y `100` (si no, avisa y devuelve `0`).
- Usa tu `filtrarPorCategoria()` para sacar los productos afectados y luego `forEach()` para cambiar el precio de cada uno.
- Devuelve **cuántos** productos se han rebajado.
- Al aplicar porcentajes salen muchos decimales (`1.1499999...`). Redondea a dos con `Math.round(precio * 100) / 100`.

> 💡 Aquí `filter` devuelve una lista **nueva**, pero los productos de dentro **son los mismos objetos** que hay en el inventario (igual que pasaba en `actualizarLibro()` del ejercicio 2: no son copias, son referencias). Por eso, si les cambias el precio dentro del `forEach`, el cambio se ve en el inventario.

### 7. Probar todo
Al final de `script.ts`, escribe la prueba. Para mostrar listas de productos, crea primero esta **lambda de ayuda** (fuera de las clases):

```ts
const mostrarLista = (titulo: string, lista: Producto[]): void => {
    // muestra el título y, debajo, el describir() de cada producto (usa forEach)
    // si la lista está vacía, muestra "(ninguno)"
};
```

Después, con un `console.log("--- Paso X ---")` antes de cada paso:

1. Crea un inventario y añade **al menos 8 productos** de las tres categorías. Que alguno tenga **stock 0**.
2. Intenta añadir productos **no válidos**: uno con nombre vacío, uno con precio negativo, uno con stock decimal y uno con un nombre que **ya existe** escrito con otras mayúsculas. Todos deben devolver `null`.
3. Muestra todos los productos.
4. Muestra las bebidas, los productos con stock bajo (menos de 5) y los que contienen `"le"` en el nombre.
5. Muestra la lista de nombres, si hay agotados, si todos tienen stock y el valor total del inventario.
6. Muestra los productos ordenados por precio en los dos sentidos. Después vuelve a mostrar **todos** y comprueba que el orden original **no ha cambiado**.
7. Usa `buscar()` con **al menos tres lambdas distintas** inventadas por ti.
8. Vende unidades de un producto, intenta vender **más de las que quedan** y repón otro que estaba agotado. Vuelve a comprobar si hay agotados.
9. Actualiza el precio de un producto, intenta actualizar otro con un precio no válido y comprueba que **no ha cambiado nada**.
10. Aplica un 10 % de descuento a una categoría, muestra cuántos productos se han rebajado y vuelve a mostrar esa categoría.
11. Elimina un producto e intenta eliminar, vender y actualizar un `id` que **no existe**.
12. Muestra el valor total del inventario al final.

> 💡 Como los métodos devuelven valores, puedes mostrarlos directamente: `console.log("¿Hay agotados?", inventario.hayAgotados());`

Antes de dar el ejercicio por terminado, la terminal de `tsc --watch` debe poner **`Found 0 errors`**.

### ⭐ 8. Extras (opcionales)

#### ⭐ A. Encadenar métodos
Como `filter`, `sort` y `map` devuelven arrays, puedes **encadenarlos** uno detrás de otro:

```ts
inventario.obtenerTodos()
    .filter(p => ...)
    .sort((a, b) => ...)
    .map(p => ...);
```

Con **una sola cadena** cada vez, saca:
- Los **nombres** de las bebidas con stock, ordenadas de más barata a más cara.
- El **valor total** solo de los productos de limpieza (`filter` + `reduce`).
- El producto **más caro** del inventario.

#### ⭐ B. Resumen por categoría
Añade al `Inventario` un método `resumenPorCategoria(): string[]` que devuelva una línea por categoría, por ejemplo:

```
bebidas: 3 productos, 54 uds, valor 87.30 €
```

- Declara antes una lista con todas las categorías: `const CATEGORIAS: Categoria[] = ["alimentacion", "bebidas", "limpieza"];`
- Recorre esa lista con `map` y, para cada categoría, reutiliza `filtrarPorCategoria()` y `reduce`.

## 🔎 Conceptos que te conviene investigar

- Funciones flecha (*arrow functions* / lambdas) y el **return implícito**
- Funciones como valores: guardarlas en variables y pasarlas como parámetro (**callbacks**)
- El tipo de una función en TypeScript: `(p: Producto) => boolean`
- Tipos unión de textos: `type Categoria = "a" | "b" | "c"`
- Métodos de arrays: `filter()`, `map()`, `find()`, `some()`, `every()`, `forEach()`, `reduce()`, `sort()`
- Operador spread para copiar arrays: `[...lista]`
- Diferencia entre **modificar** un array y **crear uno nuevo**
- Métodos de strings: `trim()`, `toLowerCase()`, `includes()`, `startsWith()`
- `Number.isInteger()`, `toFixed()`, `Math.round()`
- Operador `??` (nullish coalescing)

Consulta las webs recomendadas en el README principal del repositorio si te atascas. Para este ejercicio te serán especialmente útiles:

- [MDN - Funciones flecha](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [MDN - Array](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array) (en el menú de la izquierda tienes cada método con ejemplos)
- [TypeScript - More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html) (apartado *Function Type Expressions*)
