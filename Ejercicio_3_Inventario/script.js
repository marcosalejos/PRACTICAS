"use strict";
// TODO: Inventario de una tienda en TypeScript, practicando funciones flecha (lambdas).
// Recuerda: deja "tsc --watch" corriendo en la terminal para que cada vez que guardes
// se genere script.js automáticamente. El resultado lo verás en la consola (F12).
// Ten abierto el ejercicio 2: Producto se parece a Libro e Inventario a Biblioteca.
// ─────────────────────────────── CLASE PRODUCTO ───────────────────────────────
// 5. Declara la clase Producto con sus propiedades y el TIPO de cada una:
//    - id        → number, readonly
//    - nombre    → string
//    - categoria → Categoria
//    - precio    → number
//    - stock     → number
class Producto {
    // 6. Crea su constructor. Recibe los cinco datos y los guarda con "this".
    constructor(id, nombre, categoria, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
    }
    // 7. Método describir(): string, por ejemplo:
    //    "[3] Leche (alimentacion) - 1.15 € - 24 uds"   (investiga toFixed(2))
    describir() {
        return `[${this.id}] ${this.nombre} (${this.categoria}) - ${this.precio.toFixed(2)} € - ${this.stock} uds`;
    }
    // 8. Método estaAgotado(): boolean → true si el stock es 0. Cabe en una línea.
    estaAgotado() {
        return this.stock === 0 ? true : false; // Se puede hacer simplemente así: return this.stock === 0, evalua la comparación y devuelve true o false
    }
}
// ──────────────────────────── VALIDACIONES (LAMBDAS) ────────────────────────────
// 10. Escribe estas tres funciones flecha. Cada una recibe un dato y devuelve un boolean,
//     y todas caben en una línea:
//     - nombreValido(nombre)     → no está vacío ni es solo espacios (investiga trim()).
const nombreValido = (nombre) => nombre.trim() !== ""; // true nombreValido
//     - precioValido(precio)     → es mayor que 0.
const precioValido = (precio) => precio > 0;
//     - cantidadValida(cantidad) → es un entero (Number.isInteger()) y mayor o igual que 0.
const cantidadValida = (cantidad) => Number.isInteger(cantidad) && cantidad >= 0;
// ───────────────────────────── CLASE INVENTARIO ─────────────────────────────
// 11. Declara la clase Inventario con:
class Inventario {
    constructor() {
        //     - una lista PRIVADA de Producto, que empieza vacía.
        this.productos = [];
        //     - un contador PRIVADO siguienteId, que empieza en 1.
        this.siguienteId = 1;
    }
    //     - No hace falta crear un constructor, TypeScript crea uno vacio por defecto    
    // constructor() {}
    // ── GESTIÓN ──
    // Estos métodos pueden avisar por consola cuando algo falla, y devuelven null / false.
    // 12. obtenerProducto(id: number): Producto | null
    //     Con find() y una lambda. Convierte el undefined en null con ??.
    /*El método .find() recorre la lista productod y devuelve el Producto con el mismo id que el pasado por parámetro en la función.
        Si no encuentra ningún Producto devuelve undefined, el operador ?? convierte undefined en null.*/
    obtenerProducto(id) {
        return this.productos.find(producto => producto.id === id) ?? null;
    }
    // 13. agregarProducto(nombre: string, categoria: Categoria, precio: number, stock: number): Producto | null
    //     - Valida nombre, precio y stock con tus lambdas.
    //     - Comprueba con some() que no exista ya ese nombre (sin importar mayúsculas).
    //     - Crea el Producto con this.siguienteId, súmale 1 al contador, guárdalo y DEVUÉLVELO.
    agregarProducto(nombre, categoria, precio, stock) {
        // Crear el nombre todo en minúsculas y sin espacios
        const nombreMinuscula = nombre.toLowerCase().trim();
        if (!nombreValido(nombre)) {
            console.log("El nombre no es correcto");
            return null;
        }
        else if (!precioValido(precio)) {
            console.log("El precio no es correcto");
            return null;
        }
        else if (!cantidadValida(stock)) {
            console.log("El stock no es correcto");
            return null;
        }
        else if (this.nombreRepetido(nombreMinuscula)) {
            console.log("El nombre del producto ya existe");
            return null;
        }
        else {
            // Crear objeto Producto y añadirlo al array productos
            const producto = new Producto(this.siguienteId, nombreMinuscula, categoria, precio, stock);
            this.siguienteId++;
            this.productos.push(producto);
            return producto;
        }
    }
    // 14. actualizarProducto(id: number, datos: DatosProducto): boolean
    //     Primero comprueba TODO (que exista y que los campos que vengan sean válidos)
    //     y solo después cambia los campos que vengan.
    actualizarProducto(id, datos) {
        const editarProducto = this.obtenerProducto(id);
        // Comprobar que el id existe
        if (editarProducto === null) {
            console.log("No es posible actualizar el producto porque no existe");
            return false;
        }
        // Comprobar nombre válido, que no venga vacío o el nombre ya esté en el inventario
        if (datos.nombre !== undefined) {
            if (!nombreValido(datos.nombre)) {
                console.log("Nombre no válido al actualizar el producto");
                return false;
            }
            if (this.nombreRepetido(datos.nombre.toLowerCase().trim(), id)) {
                console.log("Nombre repetido en el inventario");
                return false;
            }
        }
        // Comprobar precio. mayor que 0
        if (datos.precio !== undefined) {
            if (!precioValido(datos.precio)) {
                console.log("Precio no válido al actualizar el producto");
                return false;
            }
        }
        // Modificar datos    
        if (datos.nombre !== undefined) {
            editarProducto.nombre = datos.nombre.toLowerCase().trim();
        }
        if (datos.precio !== undefined) {
            editarProducto.precio = datos.precio;
        }
        return true;
    }
    // 15. eliminarProducto(id: number): boolean
    //     Hazlo con filter(). ¿Cómo sabes si se ha borrado algo? Compara longitudes.
    eliminarProducto(id) {
        // Longitud array inicial
        let longitudInicial = this.productos.length;
        // Sobreescribir el array con todos los productos excepto el que coincida con el id del parámetro
        this.productos = this.productos.filter(producto => producto.id !== id);
        // Longitud array resultante
        let longitudFinal = this.productos.length;
        return longitudFinal < longitudInicial;
    }
    // 16. venderProducto(id: number, cantidad: number): boolean
    //     Cantidad válida y mayor que 0, que el producto exista y que haya stock suficiente.
    venderProducto(id, cantidad) {
        // Validar cantidad
        if (cantidad <= 0 || !cantidadValida(cantidad)) {
            console.log("La cantidad introducida no es la correcta");
            return false;
        }
        // Obtener producto
        let productoVendido = this.obtenerProducto(id);
        // Validar producto
        if (productoVendido === null) {
            console.log("El producto no se puede vender porque no existe");
            return false;
            // El producto existe 
        }
        else {
            // Validar si hay stock suficiente
            if (productoVendido.stock < cantidad) {
                console.log(`Solo quedan ${productoVendido.stock} unidades de ${this.primeraLetraMayuscula(productoVendido.nombre)}`);
                return false;
                // Realizar la venta    
            }
            else {
                productoVendido.stock -= cantidad;
                return true;
            }
        }
    }
    // 17. reponerProducto(id: number, cantidad: number): boolean
    reponerProducto(id, cantidad) {
        // Validar cantidad
        if (cantidad <= 0 || !cantidadValida(cantidad)) {
            console.log("La cantidad introducida no es la correcta");
            return false;
        }
        // Obtener producto
        let productoRepuesto = this.obtenerProducto(id);
        // Validar producto
        if (productoRepuesto === null) {
            console.log("El producto no existe");
            return false;
            // El producto existe 
        }
        else {
            productoRepuesto.stock += cantidad;
            console.log(`Al producto ${this.primeraLetraMayuscula(productoRepuesto.nombre)} se le han añadido ${cantidad} unidades`);
            return true;
        }
    }
    /* -------------------
       MÉTODOS ADICIONALES
       ------------------- */
    //**** MÉTODO NOMBRE REPETIDO *****
    nombreRepetido(nombre, id) {
        return (this.productos.some(producto => (producto.nombre === nombre) && (producto.id !== id)));
    }
    /* Se utiliza el parámetro opcional id?, para que en la consulta de validación del nombre (punto 14)
    "if (this.nombreRepetido(datos.nombre.toLowerCase().trim(), id)", no se descarte a sí mismo, de esta forma
    compara todos los nombres de productos del inventario excepto el que queremos actualizar, el parámetro opcional
    no afecta al punto 13 agregarProducto */
    //**** MÉTODO PRIMERA LETRA DE UNA PALABRA EN MAYÚSCULA *****
    primeraLetraMayuscula(palabra) {
        return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    }
    /* Se obtiene el primer caracter de la palabra .charAt(0) y se pone en mayúscula .toUpperCase()
    Obtener el residuo de la palabra desde el segundo carácter, índice 1, hasta el final del string palabra.slice(1)
    Concatenar la letra mayúscula con el residuo */
    // ── CONSULTAS ──
    // ⚠️ Estas NO modifican nada y NO hacen console.log: solo DEVUELVEN el resultado.
    //    La mayoría caben en una línea.
    // 18. obtenerTodos(): Producto[]                      → una COPIA de la lista ([...])
    obtenerTodos() { return [...this.productos]; }
    // [...], el operador spread crea una copia del array original sin que se pueda modificar el original
    // 19. filtrarPorCategoria(categoria: Categoria): Producto[]   → filter
    filtrarPorCategoria(categoria) {
        return this.productos.filter(producto => producto.categoria === categoria);
    }
    // 20. stockBajo(limite: number): Producto[]           → filter (stock MENOR que el límite)
    stockBajo(limite) {
        return this.productos.filter(producto => producto.stock < limite);
    }
    // 21. buscarPorNombre(texto: string): Producto[]      → filter + includes(), sin importar mayúsculas
    buscarPorNombre(texto) {
        return this.productos.filter(producto => producto.nombre.includes(texto.toLowerCase().trim()));
        // includes busca el texto pasado por parámetros en la propiedad del Producto del array, en este caso la propiedad es nombre.
        // Si el texto fuese "CHo", nos puede devolver un array con [chorizo, chocolate, cachopo]
        // Quitamos los espacios y pasamos a minúsculas el texto, porque así guardamos el nombre del Producto al agrearlo en productos[]  
    }
    // 22. obtenerNombres(): string[]                      → map
    obtenerNombres() {
        return this.productos.map(producto => producto.nombre);
    }
    // 23. hayAgotados(): boolean                          → some (reutiliza estaAgotado())
    hayAgotados() {
        return this.productos.some(producto => producto.estaAgotado());
    }
    // 24. todosConStock(): boolean                        → every
    todosConStock() {
        return this.productos.every(producto => producto.stock > 0);
        // Otra opción: .every(producto => !producto.estaAgotado());
    }
    // 25. valorTotal(): number                            → reduce (suma de precio × stock)
    valorTotal() {
        return this.productos.reduce((total, producto) => total + (producto.stock * producto.precio), 0);
    }
    // 26. ordenarPorPrecio(ascendente: boolean): Producto[]
    //     → sort sobre una COPIA. Si ordenas this.productos directamente, desordenas el inventario.
    ordenarPorPrecio(ascendente) {
        // this.obtenerTodos() es la copia del array reutilizando en el método del punto 18
        if (ascendente) {
            return this.obtenerTodos().sort((producto1, producto2) => producto1.precio - producto2.precio);
        }
        // Descendente
        return this.obtenerTodos().sort((producto1, producto2) => producto2.precio - producto1.precio);
    }
    // Con ternario
    // return this.obtenerTodos().sort((producto1, producto2) => ascendente ? producto1.precio - producto2.precio : producto2.precio - producto1.precio);
    // 27. buscar(criterio: (p: Producto) => boolean): Producto[]
    //     → recibe una lambda y devuelve los productos que la cumplen.
    // buscar recibe por parámetro "criterio" que es una función de tipo lambda, criterio recibe un parámetro de tipo Producto y la lambda 
    // introducida desde fuera su resultado ha de ser un boolean. buscar() devuelve un array de Productos. 
    buscar(criterio) {
        return this.productos.filter(criterio);
    }
    // ── DESCUENTOS ──
    // 28. aplicarDescuento(categoria: Categoria, porcentaje: number): number
    //     - El porcentaje debe estar entre 1 y 100 (si no, avisa y devuelve 0).
    //     - Usa filtrarPorCategoria() + forEach() para rebajar el precio.
    //     - Redondea a 2 decimales: Math.round(precio * 100) / 100.
    //     - Devuelve cuántos productos se han rebajado.
    aplicarDescuento(categoria, porcentaje) {
        // Validar porcentaje
        if (porcentaje < 1 || porcentaje > 100) {
            console.log("El descuento a aplicar no es correcto, debe estar comprendido entre 1 y 100");
            return 0;
        }
        // Obtener array con los productos de la categoría
        let productosDescontados = this.filtrarPorCategoria(categoria);
        productosDescontados.forEach(producto => {
            producto.precio = producto.precio * (100 - porcentaje) / 100;
            producto.precio = Math.round(producto.precio * 100) / 100;
        });
        // En una sola línea y sin necesidad de llaves{} -> producto.precio = Math.round(producto.precio * (100 - porcentaje)) / 100;
        return productosDescontados.length;
    }
}
// ─────────────────────────────────── PRUEBA ───────────────────────────────────
// 29. Crea la lambda de ayuda mostrarLista(titulo: string, lista: Producto[]): void
//     que muestre el título y el describir() de cada producto, o "(ninguno)" si está vacía.
const mostrarLista = (titulo, lista) => {
    console.log(titulo);
    // Si la lista no está vacia
    lista.length > 0
        ? lista.forEach(producto => console.log(producto.describir()))
        : console.log("(ninguno)");
};
// 30. Escribe aquí la prueba del paso 7 del enunciado. Pon un console.log("--- Paso X ---")
//     antes de cada paso para que la consola se lea bien:
//
//      1. Crea un inventario y añade al menos 8 productos (alguno con stock 0).
console.log("--- Paso 1 ---");
let inventarioAgustino = new Inventario();
inventarioAgustino.agregarProducto("Leche", "bebidas", 0.89, 23);
inventarioAgustino.agregarProducto("Agua mineral", "bebidas", 0.45, 60);
inventarioAgustino.agregarProducto("Zumo de naranja", "bebidas", 1.75, 0);
inventarioAgustino.agregarProducto("Arroz", "alimentacion", 1.30, 40);
inventarioAgustino.agregarProducto("Pasta", "alimentacion", 0.95, 4);
inventarioAgustino.agregarProducto("Aceite de oliva", "alimentacion", 7.50, 12);
inventarioAgustino.agregarProducto("Lejía", "limpieza", 1.20, 0);
inventarioAgustino.agregarProducto("Detergente", "limpieza", 5.99, 18);
//      2. Intenta añadir productos no válidos (nombre vacío, precio negativo,
//         stock decimal, nombre repetido con otras mayúsculas).
console.log("--- Paso 2 ---");
inventarioAgustino.agregarProducto(" ", "bebidas", 1.75, 4);
inventarioAgustino.agregarProducto("Aquarius", "bebidas", -1.75, 20);
inventarioAgustino.agregarProducto("Jabón", "limpieza", 1.75, 10.8);
inventarioAgustino.agregarProducto("PASTA", "alimentacion", 0.95, 4);
//      3. Muestra todos los productos.
console.log("--- Paso 3 ---");
let productos = inventarioAgustino.obtenerTodos();
mostrarLista("Inventario Agustino", productos);
//      4. Muestra las bebidas, los de stock bajo (< 5) y los que contienen "le".
console.log("--- Paso 4 ---");
//Bebidas
productos = inventarioAgustino.filtrarPorCategoria("bebidas");
mostrarLista("Bebidas", productos);
// stock bajo (< 5)
productos = inventarioAgustino.stockBajo(5);
mostrarLista("stock bajo (< 5)", productos);
// contienen "le"
productos = inventarioAgustino.buscarPorNombre("le");
mostrarLista(`contienen "le"`, productos);
//      5. Muestra los nombres, si hay agotados, si todos tienen stock y el valor total.
console.log("--- Paso 5 ---");
// Nombres
console.log("Muestra los nombres");
let nombres = inventarioAgustino.obtenerNombres();
nombres.forEach(nombre => console.log(nombre));
// Si hay agotados
let agotados = inventarioAgustino.hayAgotados();
console.log(`¿Hay agotados? ${agotados ? "SI" : "NO"}`);
// Si todos tienen stock    
console.log(`¿Todos tienen stock? ${inventarioAgustino.todosConStock() ? "SI" : "NO"}`);
// valor total
console.log(`Valor total del inventario: ${inventarioAgustino.valorTotal()}€`);
//      6. Ordena por precio en los dos sentidos y comprueba que el original no ha cambiado.
console.log("--- Paso 6 ---");
// Ascendente
mostrarLista("Ascendente", inventarioAgustino.ordenarPorPrecio(true));
// Descendente
mostrarLista("Descendente", inventarioAgustino.ordenarPorPrecio(false));
// Original
mostrarLista("Original", inventarioAgustino.obtenerTodos());
//      7. Usa buscar() con al menos tres lambdas distintas.
console.log("--- Paso 7 ---");
// Buscar productos Categoria = limpieza
mostrarLista("Categoria = limpieza", inventarioAgustino.buscar(producto => producto.categoria === "limpieza"));
// Buscar productos con stock = 0
mostrarLista("Buscar productos sin stock", inventarioAgustino.buscar(producto => producto.stock === 0));
// Buscar productos con precio mayor de 3€
mostrarLista("Precio mayor de 3€", inventarioAgustino.buscar(producto => producto.precio > 3));
// Buscar productos por nombre
mostrarLista("Buscar por nombre", inventarioAgustino.buscar(producto => producto.nombre === "ArRoZ ".trim().toLowerCase()));
//      8. Vende, intenta vender de más y repón uno agotado. ¿Sigue habiendo agotados?
console.log("--- Paso 8 ---");
// Vender
let idProductoVendido = 8; // No existe 18  PRUEBA
let productoVendido = inventarioAgustino.obtenerProducto(idProductoVendido);
let cantidad = 12; // Vender de más 22  PRUEBA, Validar cantidad -12  PRUEBA
// Comprobar si el producto existe
if (productoVendido !== null) {
    // Mostrar información del producto antes de su venta
    console.log("Producto a vender:", productoVendido.describir());
    // Ejecutar la venta 
    if (inventarioAgustino.venderProducto(idProductoVendido, cantidad)) {
        // Mostrar información del producto si se vende
        console.log(`Venta realizada de ${cantidad} uds: ${productoVendido.describir()}`);
        // Si el método .venderProducto() es false muestra la información del por qué
    }
}
else {
    console.log("El producto no existe");
}
// Reponer agotado       
cantidad = 7;
// Comprobar si hay agotados
if (inventarioAgustino.hayAgotados()) {
    // Buscar productos con stock = 0
    mostrarLista("Mostrar productos sin stock", inventarioAgustino.buscar(producto => producto.stock === 0));
    // Reponer los agotados
    // Obtener productos sin stock en array agotados
    let agotados = inventarioAgustino.buscar(producto => producto.stock === 0);
    // Añadir la cantidad al stock de los productos obtenidos sin stock
    agotados.forEach(producto => inventarioAgustino.reponerProducto(producto.id, cantidad));
    // Volver a comprobar si hay productos agotados
    inventarioAgustino.hayAgotados() ? console.log("Hay productos agotados") : console.log("No hay productos agotados");
}
else {
    console.log("No hay productos agotados");
}
//      9. Actualiza un precio e intenta actualizar otro con un precio no válido.
console.log("--- Paso 9 ---");
let actualizarProducto = inventarioAgustino.obtenerProducto(5);
if (actualizarProducto !== null) {
    // Mostrar producto a actualizar
    console.log(actualizarProducto.describir());
    // Actualizar precio
    inventarioAgustino.actualizarProducto(5, { precio: 1.2 });
    console.log(actualizarProducto.describir());
    // Precio no valido
    inventarioAgustino.actualizarProducto(6, { precio: 0 });
    // id no existe
    inventarioAgustino.actualizarProducto(13, { precio: 2 });
    // nombre no válido
    inventarioAgustino.actualizarProducto(5, { nombre: "  " });
    // nombre repetido en inventario
    inventarioAgustino.actualizarProducto(6, { nombre: "PASTA" });
}
else {
    console.log("El producto no existe");
}
//     10. Aplica un 10 % de descuento a una categoría y muéstrala.
console.log("--- Paso 10 ---");
let descuento = 10;
// Original
mostrarLista("Lista Categoria alimentación", inventarioAgustino.filtrarPorCategoria("alimentacion"));
// Con descuento
// Obtener cuantos productos se les ha aplicado el descuento, al ejecutar el método se modifican los precios del array original
console.log(`Se les ha aplicado el descuento de un ${descuento}% a un total 
            de ${inventarioAgustino.aplicarDescuento("alimentacion", descuento)} productos`);
// Mostar productos de categoria con el descuento
mostrarLista("Lista Categoria alimentación con descuento", inventarioAgustino.filtrarPorCategoria("alimentacion"));
//     11. Elimina un producto e intenta eliminar, vender y actualizar un id que no existe.
console.log("--- Paso 11 ---");
// Eliminar producto
// Mostrar lista original
mostrarLista("Lista original", inventarioAgustino.obtenerTodos());
// Eliminar id = 6
inventarioAgustino.eliminarProducto(6)
    ? console.log("Producto con id = 6 ha sido eliminado")
    : console.log("Producto con id = 6 no se ha eliminado porque no existe");
// Eliminar un id que no existe. Volver a eliminar el id = 6
inventarioAgustino.eliminarProducto(6)
    ? console.log("Producto con id = 6 ha sido eliminado")
    : console.log("Producto con id = 6 no se ha eliminado porque no existe");
// Vender un producto que no existe, id = 6
inventarioAgustino.venderProducto(6, 12);
// Actualizar un producto que no existe, id = 6    
inventarioAgustino.actualizarProducto(6, { nombre: "Patata" });
// Mostrar lista final
mostrarLista("Lista final", inventarioAgustino.obtenerTodos());
//     12. Muestra el valor total al final.
console.log("--- Paso 12 ---");
console.log(`El valor total del Inventario es de: ${inventarioAgustino.valorTotal()}€`);
