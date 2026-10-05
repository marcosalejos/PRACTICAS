// TODO: Inventario de una tienda en TypeScript, practicando funciones flecha (lambdas).
// Recuerda: deja "tsc --watch" corriendo en la terminal para que cada vez que guardes
// se genere script.js automáticamente. El resultado lo verás en la consola (F12).
// Ten abierto el ejercicio 2: Producto se parece a Libro e Inventario a Biblioteca.

// ─────────────────────────── CALENTAMIENTO: LAMBDAS ───────────────────────────

// 1. Escribe como FUNCIONES FLECHA (con su tipo) y pruébalas con console.log():
//    - esPar(n)            → devuelve si n es par (investiga el operador %).
//    - saludar(nombre)     → devuelve "Hola, <nombre>".
//    - precioConIva(precio) → devuelve el precio con un 21 % de IVA.

// 2. Con esta lista, y usando SOLO métodos de arrays con lambdas:
const numeros: number[] = [3, 8, 12, 5, 20, 7];
//    - Saca los pares usando tu lambda esPar (numeros.filter(esPar)).
//    - Saca una lista con cada número al cuadrado (map).
//    - Busca el primer número mayor que 10 (find).
//    - Comprueba si alguno es negativo (some) y si todos son menores que 100 (every).
//    - Calcula la suma de todos (reduce, ¡no olvides el valor inicial!).

// 3. Escribe la lambda aplicar(n, operacion), donde operacion es de tipo
//    (x: number) => number, que devuelva el resultado de aplicar operacion a n.
//    Llámala con al menos tres lambdas distintas.

// 👉 No sigas hasta que todo el calentamiento funcione.
//    Cuando funcione, puedes dejarlo comentado para que no ensucie la consola.

// ──────────────────────────── TIPO CATEGORIA ────────────────────────────

// 4. Declara el tipo Categoria, que solo admita "alimentacion", "bebidas" o "limpieza".

// ─────────────────────────────── CLASE PRODUCTO ───────────────────────────────

// 5. Declara la clase Producto con sus propiedades y el TIPO de cada una:
//    - id        → number, readonly
//    - nombre    → string
//    - categoria → Categoria
//    - precio    → number
//    - stock     → number

// 6. Crea su constructor. Recibe los cinco datos y los guarda con "this".

// 7. Método describir(): string, por ejemplo:
//    "[3] Leche (alimentacion) - 1.15 € - 24 uds"   (investiga toFixed(2))

// 8. Método estaAgotado(): boolean → true si el stock es 0. Cabe en una línea.

// ──────────────────────────── INTERFAZ DATOSPRODUCTO ────────────────────────────

// 9. Declara la interfaz DatosProducto con nombre, categoria y precio, los tres OPCIONALES.
//    ⚠️ Sin stock: el stock solo cambia vendiendo o reponiendo.

// ──────────────────────────── VALIDACIONES (LAMBDAS) ────────────────────────────

// 10. Escribe estas tres funciones flecha. Cada una recibe un dato y devuelve un boolean,
//     y todas caben en una línea:
//     - nombreValido(nombre)     → no está vacío ni es solo espacios (investiga trim()).
//     - precioValido(precio)     → es mayor que 0.
//     - cantidadValida(cantidad) → es un entero (Number.isInteger()) y mayor o igual que 0.

// ───────────────────────────── CLASE INVENTARIO ─────────────────────────────

// 11. Declara la clase Inventario con:
//     - una lista PRIVADA de Producto, que empieza vacía.
//     - un contador PRIVADO siguienteId, que empieza en 1.

// ── GESTIÓN ──
// Estos métodos pueden avisar por consola cuando algo falla, y devuelven null / false.

// 12. obtenerProducto(id: number): Producto | null
//     Con find() y una lambda. Convierte el undefined en null con ??.

// 13. agregarProducto(nombre: string, categoria: Categoria, precio: number, stock: number): Producto | null
//     - Valida nombre, precio y stock con tus lambdas.
//     - Comprueba con some() que no exista ya ese nombre (sin importar mayúsculas).
//     - Crea el Producto con this.siguienteId, súmale 1 al contador, guárdalo y DEVUÉLVELO.

// 14. actualizarProducto(id: number, datos: DatosProducto): boolean
//     Primero comprueba TODO (que exista y que los campos que vengan sean válidos)
//     y solo después cambia los campos que vengan.

// 15. eliminarProducto(id: number): boolean
//     Hazlo con filter(). ¿Cómo sabes si se ha borrado algo? Compara longitudes.

// 16. venderProducto(id: number, cantidad: number): boolean
//     Cantidad válida y mayor que 0, que el producto exista y que haya stock suficiente.

// 17. reponerProducto(id: number, cantidad: number): boolean

// ── CONSULTAS ──
// ⚠️ Estas NO modifican nada y NO hacen console.log: solo DEVUELVEN el resultado.
//    La mayoría caben en una línea.

// 18. obtenerTodos(): Producto[]                      → una COPIA de la lista ([...])

// 19. filtrarPorCategoria(categoria: Categoria): Producto[]   → filter

// 20. stockBajo(limite: number): Producto[]           → filter (stock MENOR que el límite)

// 21. buscarPorNombre(texto: string): Producto[]      → filter + includes(), sin importar mayúsculas

// 22. obtenerNombres(): string[]                      → map

// 23. hayAgotados(): boolean                          → some (reutiliza estaAgotado())

// 24. todosConStock(): boolean                        → every

// 25. valorTotal(): number                            → reduce (suma de precio × stock)

// 26. ordenarPorPrecio(ascendente: boolean): Producto[]
//     → sort sobre una COPIA. Si ordenas this.productos directamente, desordenas el inventario.

// 27. buscar(criterio: (p: Producto) => boolean): Producto[]
//     → recibe una lambda y devuelve los productos que la cumplen.

// ── DESCUENTOS ──

// 28. aplicarDescuento(categoria: Categoria, porcentaje: number): number
//     - El porcentaje debe estar entre 1 y 100 (si no, avisa y devuelve 0).
//     - Usa filtrarPorCategoria() + forEach() para rebajar el precio.
//     - Redondea a 2 decimales: Math.round(precio * 100) / 100.
//     - Devuelve cuántos productos se han rebajado.

// ─────────────────────────────────── PRUEBA ───────────────────────────────────

// 29. Crea la lambda de ayuda mostrarLista(titulo: string, lista: Producto[]): void
//     que muestre el título y el describir() de cada producto, o "(ninguno)" si está vacía.

// 30. Escribe aquí la prueba del paso 7 del enunciado. Pon un console.log("--- Paso X ---")
//     antes de cada paso para que la consola se lea bien:
//
//      1. Crea un inventario y añade al menos 8 productos (alguno con stock 0).
//      2. Intenta añadir productos no válidos (nombre vacío, precio negativo,
//         stock decimal, nombre repetido con otras mayúsculas).
//      3. Muestra todos los productos.
//      4. Muestra las bebidas, los de stock bajo (< 5) y los que contienen "le".
//      5. Muestra los nombres, si hay agotados, si todos tienen stock y el valor total.
//      6. Ordena por precio en los dos sentidos y comprueba que el original no ha cambiado.
//      7. Usa buscar() con al menos tres lambdas distintas.
//      8. Vende, intenta vender de más y repón uno agotado. ¿Sigue habiendo agotados?
//      9. Actualiza un precio e intenta actualizar otro con un precio no válido.
//     10. Aplica un 10 % de descuento a una categoría y muéstrala.
//     11. Elimina un producto e intenta eliminar, vender y actualizar un id que no existe.
//     12. Muestra el valor total al final.
