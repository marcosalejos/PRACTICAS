// TODO: Inventario de una tienda en TypeScript, practicando funciones flecha (lambdas).
// Recuerda: deja "tsc --watch" corriendo en la terminal para que cada vez que guardes
// se genere script.js automáticamente. El resultado lo verás en la consola (F12).
// Ten abierto el ejercicio 2: Producto se parece a Libro e Inventario a Biblioteca.

// ─────────────────────────── CALENTAMIENTO: LAMBDAS ───────────────────────────

// 1. Escribe como FUNCIONES FLECHA (con su tipo) y pruébalas con console.log():
//    - esPar(n)            → devuelve si n es par (investiga el operador %).
const esPar = (n: number): string => n % 2 === 0 ? "Es par": "Es impar";
console.log(esPar(11))

//    - saludar(nombre)     → devuelve "Hola, <nombre>".
const saludar = (nombre: string): string => `Hola, <${nombre}>`;
console.log(saludar("Agustín"))

//    - precioConIva(precio) → devuelve el precio con un 21 % de IVA.
const precioConIva = (precio: number): number => (precio * 0.21) + precio;
console.log(precioConIva(10));

// 2. Con esta lista, y usando SOLO métodos de arrays con lambdas:
const numeros: number[] = [3, 8, 12, 5, 20, 7];

//    - Saca los pares usando tu lambda esPar (numeros.filter(esPar)).
const pares = numeros.filter(x => x % 2 === 0);
console.log(pares);

//    - Saca una lista con cada número al cuadrado (map).
const cuadrados = numeros.map(x => x * x);
console.log(cuadrados);

//    - Busca el primer número mayor que 10 (find).
const mayor10 = numeros.find(x => x > 10);
console.log(mayor10);

//    - Comprueba si alguno es negativo (some) y si todos son menores que 100 (every).
const esNegativo = numeros.some(x => x < 0);
const menores100 = numeros.every(x => x < 100);
console.log(`¿Hay algún número negativo en números? ${esNegativo}, ¿Todos son menores que 100? ${menores100}`);

//    - Calcula la suma de todos (reduce, ¡no olvides el valor inicial!).
//const sumaTodos = numeros.reduce((x, y) => x + y);
const sumaTodos = numeros.reduce((x, y) => x + y, 0); // 0 -> es el valor inicial, evita que si la lista viene vacía de error
console.log(sumaTodos);

// 3. Escribe la lambda aplicar(n, operacion), donde operacion es de tipo
//    (x: number) => number, que devuelva el resultado de aplicar operacion a n.
//    Llámala con al menos tres lambdas distintas.

const aplicar = (n: number, operacion: (x: number) => number): number => operacion(n);

console.log(aplicar(5, x => x * 2));
console.log(aplicar(5, x => x ** 2));  
console.log(aplicar(5, x => x - 3));      
console.log(aplicar(5, x => -x));

// 👉 No sigas hasta que todo el calentamiento funcione.
//    Cuando funcione, puedes dejarlo comentado para que no ensucie la consola.

// ──────────────────────────── TIPO CATEGORIA ────────────────────────────

// 4. Declara el tipo Categoria, que solo admita "alimentacion", "bebidas" o "limpieza".

type Categoria = "alimentacion" | "bebidas" | "limpieza";

// ─────────────────────────────── CLASE PRODUCTO ───────────────────────────────

// 5. Declara la clase Producto con sus propiedades y el TIPO de cada una:
//    - id        → number, readonly
//    - nombre    → string
//    - categoria → Categoria
//    - precio    → number
//    - stock     → number

class Producto{
    readonly id: number;
    nombre: string;
    categoria: Categoria;
    precio: number;
    stock: number;


// 6. Crea su constructor. Recibe los cinco datos y los guarda con "this".

    constructor(id: number, nombre: string, categoria: Categoria, precio: number, stock: number){
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
    }

// 7. Método describir(): string, por ejemplo:
//    "[3] Leche (alimentacion) - 1.15 € - 24 uds"   (investiga toFixed(2))

public describir(): string{
    return `[${this.id}] ${this.nombre} (${this.categoria}) - ${this.precio.toFixed(2)} € - ${this.stock} uds`
}

// 8. Método estaAgotado(): boolean → true si el stock es 0. Cabe en una línea.

public estaAgotado(): boolean{
    return this.stock === 0 ? true : false  // Se puede hacer simplemente así: return this.stock === 0, evalua la comparación y devuelve true o false
}
}

// ──────────────────────────── INTERFAZ DATOSPRODUCTO ────────────────────────────

// 9. Declara la interfaz DatosProducto con nombre, categoria y precio, los tres OPCIONALES.
//    ⚠️ Sin stock: el stock solo cambia vendiendo o reponiendo.

interface DatosProducto{
    nombre?: string;
    categoria?: Categoria;
    precio?: number;
}

// ──────────────────────────── VALIDACIONES (LAMBDAS) ────────────────────────────

// 10. Escribe estas tres funciones flecha. Cada una recibe un dato y devuelve un boolean,
//     y todas caben en una línea:
//     - nombreValido(nombre)     → no está vacío ni es solo espacios (investiga trim()).

const nombreValido = (nombre: string): boolean => nombre.trim() !== ""; // true nombreValido

//     - precioValido(precio)     → es mayor que 0.

const precioValido = (precio: number): boolean => precio > 0;

//     - cantidadValida(cantidad) → es un entero (Number.isInteger()) y mayor o igual que 0.

const cantidadValida = (cantidad: number): boolean => Number.isInteger(cantidad) && cantidad >= 0;

// ───────────────────────────── CLASE INVENTARIO ─────────────────────────────

// 11. Declara la clase Inventario con:

class Inventario{

//     - una lista PRIVADA de Producto, que empieza vacía.
    private productos: Producto[] = [];

//     - un contador PRIVADO siguienteId, que empieza en 1.
    private siguienteId: number = 1;

// ── GESTIÓN ──
// Estos métodos pueden avisar por consola cuando algo falla, y devuelven null / false.

// 12. obtenerProducto(id: number): Producto | null
//     Con find() y una lambda. Convierte el undefined en null con ??.
/*El método .find() recorre la lista productod y devuelve el Producto con el mismo id que el pasado por parámetro en la función.
    Si no encuentra ningún Producto devuelve undefined, el operador ?? convierte undefined en null.*/

    public obtenerProducto(id: number): Producto | null{
        return this.productos.find(producto => producto.id === id) ?? null;
    }

// 13. agregarProducto(nombre: string, categoria: Categoria, precio: number, stock: number): Producto | null
//     - Valida nombre, precio y stock con tus lambdas.
//     - Comprueba con some() que no exista ya ese nombre (sin importar mayúsculas).
//     - Crea el Producto con this.siguienteId, súmale 1 al contador, guárdalo y DEVUÉLVELO.
    public agregarProducto(nombre: string, categoria: Categoria, precio: number, stock: number): Producto | null{

        // Crear el nombre todo en minúsculas y sin espacios
        const nombreMinuscula: string = nombre.toLowerCase().trim();  

        if (!nombreValido(nombre) || !precioValido(precio) || !cantidadValida(stock)){
            console.log("Los datos nombre, precio o stock no son correctos");
            return null;

        }else if(this.nombreRepetido(nombreMinuscula)){
            console.log("El nombre del producto ya existe");
            return null;

        }else{
            // Crear objeto Producto y añadirlo al array productos
            const producto: Producto = new Producto(this.siguienteId, nombreMinuscula, categoria, precio, stock);
            this.siguienteId++;
            this.productos.push(producto);
            return producto;
        }
    }

// 14. actualizarProducto(id: number, datos: DatosProducto): boolean
//     Primero comprueba TODO (que exista y que los campos que vengan sean válidos)
//     y solo después cambia los campos que vengan.
    public actualizarProducto(id: number, datos: DatosProducto): boolean{
        
        const editarProducto: Producto | null = this.obtenerProducto(id);

        // Comprobar que el id existe
        if (editarProducto === null){
            console.log("No es posible actualizar el producto porque no existe");
            return false;
        }

        // Comprobar nombre válido, que no venga vacío o el nombre ya esté en el inventario
        if (datos.nombre !== undefined){

            if(!nombreValido(datos.nombre)){
                console.log("Nombre no válido al actualizar el producto");
                return false;
            }
            if (this.nombreRepetido(datos.nombre.toLowerCase().trim(), id)){
                console.log("Nombre repetido en el inventario");
                return false;
            }
        }
        
        // Comprobar precio
        if (datos.precio !== undefined){

            if (!precioValido(datos.precio)){
                console.log("Precio no válido al actualizar el producto");
                return false;
            }
        }
        // Modificar datos    
        
        if(datos.nombre !== undefined){
            editarProducto.nombre = datos.nombre.toLowerCase().trim();
        }

        if(datos.precio !== undefined){
            editarProducto.precio = datos.precio;
        }

        return true;
    }

// 15. eliminarProducto(id: number): boolean
//     Hazlo con filter(). ¿Cómo sabes si se ha borrado algo? Compara longitudes.

    public eliminarProducto(id: number): boolean{

        // Longitud array inicial
        let longitudInicial: number = this.productos.length;

        // Sobreescribir el array con todos los productos excepto el que coincida con el id del parámetro
        this.productos = this.productos.filter(producto => producto.id !== id);

        // Longitud array resultante
        let longitudFinal: number = this.productos.length;

        return longitudFinal < longitudInicial;
    }

// 16. venderProducto(id: number, cantidad: number): boolean
//     Cantidad válida y mayor que 0, que el producto exista y que haya stock suficiente.

    public venderProducto(id: number, cantidad: number): boolean{

        // Validar cantidad
        if (cantidad <= 0 || !cantidadValida(cantidad)){
            console.log("La cantidad introducida no es la correcta");
            return false;
        }    

        // Obtener producto
        let productoVendido: Producto | null = this.obtenerProducto(id);

        // Validar producto
        if (productoVendido === null){
            console.log("El producto no existe");
            return false;
        
        // El producto existe 
        }else{
            // Validar si hay stock suficiente
            if (productoVendido.stock < cantidad){
                console.log(`Solo quedan ${productoVendido.stock} unidades de ${this.primeraLetraMayuscula(productoVendido.nombre)}`);
                return false;
            
            // Realizar la venta    
            }else{
                productoVendido.stock -= cantidad;
                return true;
            }
        }
    }    

// 17. reponerProducto(id: number, cantidad: number): boolean
    public reponerProducto(id: number, cantidad: number): boolean{

        // Validar cantidad
        if (cantidad <= 0 || !cantidadValida(cantidad)){
            console.log("La cantidad introducida no es la correcta");
            return false;
        }    

        // Obtener producto
        let productoRepuesto: Producto | null = this.obtenerProducto(id);

        // Validar producto
        if (productoRepuesto === null){
            console.log("El producto no existe");
            return false;
        
        // El producto existe 
        }else{
            productoRepuesto.stock += cantidad;
            console.log(`Al producto ${this.primeraLetraMayuscula(productoRepuesto.nombre)} se le han añadido ${cantidad} unidades`);
            return true;
        }              
    }    

/* -------------------
   MÉTODOS ADICIONALES 
   ------------------- */

//**** MÉTODO NOMBRE REPETIDO *****

    private nombreRepetido(nombre: string, id?: number): boolean{
        return (this.productos.some(producto => (producto.nombre === nombre) && (producto.id !== id)))
    }   
/* Se utiliza el parámetro opcional id?, para que en la consulta de validación del nombre (punto 14) 
"if (this.nombreRepetido(datos.nombre.toLowerCase().trim(), id)", no se descarte a sí mismo, de esta forma
compara todos los nombres de productos del inventario excepto el que queremos actualizar, el parámetro opcional 
no afecta al punto 13 agregarProducto */

//**** MÉTODO PRIMERA LETRA DE UNA PALABRA EN MAYÚSCULA *****

    private primeraLetraMayuscula(palabra: string): string{
        return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    }
/* Se obtiene el primer caracter de la palabra .charAt(0) y se pone en mayúscula .toUpperCase()
Obtener el residuo de la palabra desde el segundo carácter, índice 1, hasta el final del string palabra.slice(1)
Concatenar la letra mayúscula con el residuo */


// ── CONSULTAS ──
// ⚠️ Estas NO modifican nada y NO hacen console.log: solo DEVUELVEN el resultado.
//    La mayoría caben en una línea.

// 18. obtenerTodos(): Producto[]                      → una COPIA de la lista ([...])

    public obtenerTodos(): Producto[] { return [...this.productos];}
    // [...], el operador spread crea una copia del array original sin que se pueda modificar el original

// 19. filtrarPorCategoria(categoria: Categoria): Producto[]   → filter

    public filtrarPorCategoria(categoria: Categoria): Producto[] { 
        return this.productos.filter(producto => producto.categoria === categoria); 
    }

// 20. stockBajo(limite: number): Producto[]           → filter (stock MENOR que el límite)

    public stockBajo(limite: number): Producto[]{
        return this.productos.filter(producto => producto.stock < limite);
    }

// 21. buscarPorNombre(texto: string): Producto[]      → filter + includes(), sin importar mayúsculas

    public buscarPorNombre(texto: string): Producto[]{
        return this.productos.filter(producto => producto.nombre.includes(texto.toLowerCase().trim()));
        // includes busca el texto pasado por parámetros en la propiedad del Producto del array, en este caso la propiedad es nombre.
        // Si el texto fuese "CHo", nos puede devolver un array con [chorizo, chocolate, cachopo]
        // Quitamos los espacios y pasamos a minúsculas el texto, porque así guardamos el nombre del Producto al agrearlo en productos[]  
    }

// 22. obtenerNombres(): string[]                      → map

    public obtenerNombres(): string[]{
        return this.productos.map(producto => producto.nombre);
    }

// 23. hayAgotados(): boolean                          → some (reutiliza estaAgotado())

    public hayAgotados(): boolean{
        return this.productos.some(producto => producto.estaAgotado());
    }

// 24. todosConStock(): boolean                        → every

    public todosConStock(): boolean{
        return this.productos.every(producto => producto.stock > 0);
        // Otra opción: .every(producto => !producto.estaAgotado());
    }

// 25. valorTotal(): number                            → reduce (suma de precio × stock)

    public valorTotal(): number{
        return this.productos.reduce((total, producto) => total + (producto.stock * producto.precio), 0);
    }

// 26. ordenarPorPrecio(ascendente: boolean): Producto[]
//     → sort sobre una COPIA. Si ordenas this.productos directamente, desordenas el inventario.

    public ordenarPorPrecio(ascendente: boolean): Producto[]{

        // this.obtenerTodos() es la copia del array reutilizando el método del punto 18
        if (ascendente){
            return this.obtenerTodos().sort((producto1, producto2) => producto1.precio - producto2.precio);

        }
        return this.obtenerTodos().sort((producto1, producto2) => producto2.precio - producto1.precio);
    }
    // Con ternario
    // return this.obtenerTodos().sort((producto1, producto2) => ascendente ? producto1.precio - producto2.precio : producto2.precio - producto1.precio);

// 27. buscar(criterio: (p: Producto) => boolean): Producto[]
//     → recibe una lambda y devuelve los productos que la cumplen.
// buscar recibe por parámetro "criterio" que es una función de tipo lambda, criterio recibe un parámetro de tipo Producto y la lambda 
// introducida desde fuera su resultado ha de ser un boolean. buscar() devuelve un array de Productos. 

    public buscar(criterio: (producto: Producto) => boolean): Producto[]{

        return this.productos.filter(criterio);
    }

// ── DESCUENTOS ──

// 28. aplicarDescuento(categoria: Categoria, porcentaje: number): number
//     - El porcentaje debe estar entre 1 y 100 (si no, avisa y devuelve 0).
//     - Usa filtrarPorCategoria() + forEach() para rebajar el precio.
//     - Redondea a 2 decimales: Math.round(precio * 100) / 100.
//     - Devuelve cuántos productos se han rebajado.

    public aplicarDescuento(categoria: Categoria, porcentaje: number): number{

        // Validar porcentaje
        if (porcentaje < 1 || porcentaje > 100){
            console.log("El descuento a aplicar no es correcto, debe estar comprendido entre 1 y 100");
            return 0;
        }

        // Obtener array con los productos de la categoría
        let productosDescontados: Producto[] = this.filtrarPorCategoria(categoria);

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
