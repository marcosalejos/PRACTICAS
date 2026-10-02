"use strict";
//let myuuid = uuidv4();
// ─────────────────────────────── CLASE LIBRO ───────────────────────────────
// 2. Declara la clase Libro con sus propiedades y el TIPO de cada una:
//    - id        → number, y que no se pueda cambiar nunca (investiga "readonly").
//    - titulo    → string
//    - autor     → string
//    - anio      → number
//    - disponible → boolean
class Libro {
    // 3. Crea su constructor. Debe recibir id, titulo, autor y anio (¡con sus tipos!).
    //    Guarda cada uno en el objeto usando "this".
    //    El campo "disponible" NO se recibe: todo libro nuevo empieza disponible (true).
    constructor(id, titulo, autor, anio) {
        this.disponible = true;
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
    }
    // 4. Método prestar(): no devuelve nada (investiga el tipo "void").
    //    Si el libro ya está prestado, avisa por consola. Si no, cambia "disponible" a false.
    prestar() {
        if (!this.disponible) {
            console.log("El libro ya está prestado");
        }
        else {
            this.disponible = false;
            console.log("El libro ha sido prestado");
        }
    }
    // 5. Método devolver(): también void.
    //    Si el libro ya está disponible, avisa por consola. Si no, cambia "disponible" a true.
    devolver() {
        if (this.disponible) {
            console.log("El libro ya estaba disponible");
        }
        else {
            this.disponible = true;
            console.log("El libro ha sido devuelto y está disponible");
        }
    }
    // 6. Método describir(): DEVUELVE (return) un string con los datos del libro, por ejemplo:
    //    "[1] El Quijote - Miguel de Cervantes (1605) - ✅ Disponible"
    //    "[2] 1984 - George Orwell (1949) - ❌ Prestado"
    describir() {
        return `[${this.id}] ${this.titulo} - ${this.autor} (${this.anio}) - ${this.disponible ? "Disponible" : "Prestado"}`;
    }
}
// 👉 Antes de seguir, prueba aquí tu clase Libro: crea un libro, muéstralo con
//    describir(), préstalo y vuelve a mostrarlo. Prueba también a pasarle un texto
//    donde va el año y fíjate en el error que te marca TypeScript.
//    Cuando funcione, puedes borrar esta prueba o dejarla comentada.
// ───────────────────────────── CLASE BIBLIOTECA ─────────────────────────────
// 7. Declara la clase Biblioteca con sus propiedades:
//    - nombre → string
//    - libros → una lista de objetos Libro (investiga cómo se escribe el tipo
//      "array de Libro"). Hazla PRIVADA (investiga "private"): desde fuera de la
//      clase nadie debería poder tocar la lista directamente, solo a través de
//      los métodos de la biblioteca.
class Biblioteca {
    // 8. Crea su constructor. Solo recibe el nombre.
    //    La lista de libros empieza vacía.
    constructor(nombre) {
        this.libros = []; // Crear una lista 'libros' que almacena objetos de tipo Libro, la inicializamos vacía
        this.nombre = nombre;
    }
    // 9. Método buscarLibro(id: number): devuelve el Libro con ese id, o null si no existe.
    //    El tipo de retorno debe reflejar las dos posibilidades (investiga "Libro | null").
    //    (Empieza por este: casi todos los demás lo van a usar.)
    buscarLibro(id) {
        for (let i = 0; i < this.libros.length; i++) {
            if (this.libros[i].id === id) {
                // .id: acceder a una propiedad de un objeto
                return this.libros[i]; // Se accede al id del Libro ubicado en la posición i del array libros.
            } // === Igualdad estricta, compara valor y tipo -> 6 es distinto (!==) de "6"
        }
        return null; // En caso de que no se haya encontrado ningún libro en el for, se devuelve null
    }
    /* Opción con el método find
  
      buscarLibro(id: number): Libro | null {
          return this.libros.find(libro => libro.id === id) ?? null;
      }
  
      El método .find() recorre la lista libros y devuelve el Libro con el mismo id que el pasado por parámetro en la función.
      Si no encuentra ningún Libro devuelve undefined, el operador ?? convierte undefined en null.
      */
    // 10. Método agregarLibro(libro: Libro): void.
    //     Si ya existe un libro con ese id, avisa y no lo añadas. Si no, añádelo a la lista.
    agregarLibro(libro) {
        this.buscarLibro(libro.id)
            ? console.log("Ya existe un libro con ese ID")
            : this.libros.push(libro);
    }
    // El método .push() añade elementos al final de array. Puede añadir más de un elemento libros.push(Libro6, Libro7, Libro8)
    // 11. Método listarLibros(): void.
    //     Si no hay libros, muestra un mensaje. Si hay, muestra el describir() de cada uno.
    listarLibros() {
        this.libros.length === 0
            ? console.log('No hay libros en la biblioteca')
            : this.libros.forEach(libro => console.log(libro.describir()));
    }
    // Se comprueba si la lista está vacía mediante su longitud, no existe el método .isEmpty()
    // Se recorre la lista mediante forEach, el cual espera una función (flecha) que ejecuta en cada libro de la lista.
    // 12. Método actualizarLibro(id: number, nuevosDatos: DatosLibro): void.
    //     nuevosDatos es un objeto, por ejemplo { titulo: "Otro título", anio: 2001 }.
    //     Cambia solo los campos que vengan (los que no vengan serán undefined).
    //     Si el libro no existe, avisa.
    actualizarLibro(id, nuevosDatos) {
        /* Guardamos en libroActualizado el propio libro encontrado en el método buscarLibro(), no es una copia, es una referencia al
        propio Libro, por lo que al modificar libroActualizado se modifica el Libro encontrado en el array libros */
        let libroActualizado = this.buscarLibro(id);
        if (libroActualizado === null) {
            console.log('El libro que se quiere actualizar no existe');
        }
        else {
            if (nuevosDatos.titulo !== undefined) {
                libroActualizado.titulo = nuevosDatos.titulo;
            }
            if (nuevosDatos.autor !== undefined) {
                libroActualizado.autor = nuevosDatos.autor;
            }
            if (nuevosDatos.anio !== undefined) {
                libroActualizado.anio = nuevosDatos.anio;
            }
        }
    }
    // 13. Método eliminarLibro(id: number): void.
    //     Quita el libro de la lista. Si no existe, avisa.
    eliminarLibro(id) {
        /* Guardar el número de indice en una variable. El método .findIndex() recibe por parámetro una función, la cual aplica a cada elemento
         del array. Se genera una función flecha que compara el id pasado por parámetro en eliminarLibro(id) con el de cada Libro de la lista libros,
         si lo encuentra devuelve su posición y si no devuelve -1. Si lo encuentra detiene el bucle de búsqueda, es decir, si hubiesen dos ID
         repetidas solo nos daría la posición del primero que encuentra */
        let numeroIndice = this.libros.findIndex(libro => libro.id === id);
        // Método .splice() -> elimina elementos en el array desde la posición del 1º param. e indicamos cuantos elementos queremos eliminar con el 2º param.
        numeroIndice === -1 ? console.log('El libro no ha sido eliminado porque no existe') : this.libros.splice(numeroIndice, 1);
    }
    // 14. Método cambiarDisponibilidad(id: number, disponible: boolean): void.
    //     Si "disponible" es false, presta el libro; si es true, lo devuelve.
    //     Reutiliza prestar() y devolver(). Si el libro no existe, avisa.
    cambiarDisponibilidad(id, disponible) {
        let libroDisponibilidad = this.buscarLibro(id);
        if (libroDisponibilidad === null) {
            console.log('El libro no existe');
        }
        else {
            if (disponible) {
                libroDisponibilidad.devolver();
            }
            else {
                libroDisponibilidad.prestar();
            }
        }
    }
}
// ─────────────────────────────────── PRUEBA ───────────────────────────────────
// 15. Escribe aquí la prueba del paso 5 del enunciado. Pon un console.log("--- Paso X ---")
//     antes de cada paso para que la consola se lea bien:
//     1. Crea una biblioteca.
console.log('1. Crea una biblioteca.');
let biblio = new Biblioteca('Biblioteca Molona');
console.log(biblio.nombre);
console.log("");
//     2. Crea al menos 4 libros y añádelos.
console.log('2. Crea al menos 4 libros y añádelos.');
// Variable para asignar ID
let contador = 0;
//Función para asignar ID
function asignarID() {
    return contador += 1;
}
let libro1 = new Libro(asignarID(), "El Quijote", "Miguel de Cervantes", 1605);
let libro2 = new Libro(asignarID(), "1984", "George Orwell", 1949);
let libro3 = new Libro(asignarID(), "Cien años de soledad", "Gabriel García Márquez", 1967);
let libro4 = new Libro(asignarID(), "Ficciones", "Jorge Luis Borges", 1944);
// Agregar libros nuevos con un forEach recorriendo la array de agregarNuevosLibros
let agregarNuevosLibros = [libro1, libro2, libro3, libro4];
agregarNuevosLibros.forEach(libro => biblio.agregarLibro(libro));
biblio.listarLibros();
console.log("");
//     3. Intenta añadir un libro con un id repetido.
console.log('3. Intenta añadir un libro con un id repetido.');
let libro5 = new Libro(3, "Pedro Páramo", "Juan Rulfo", 1955);
biblio.agregarLibro(libro5);
console.log("");
//     4. Lista los libros.
console.log("4. Lista los libros.");
biblio.listarLibros();
console.log("");
//     5. Presta un libro con cambiarDisponibilidad() y vuelve a listar.
console.log('5. Presta un libro con cambiarDisponibilidad() y vuelve a listar.');
biblio.cambiarDisponibilidad(1, false);
biblio.listarLibros();
console.log("");
//     6. Intenta prestar otra vez el mismo libro.
console.log('6. Intenta prestar otra vez el mismo libro.');
biblio.cambiarDisponibilidad(1, false);
biblio.listarLibros();
console.log("");
//     7. Actualiza un libro y vuelve a listar.
console.log('7. Actualiza un libro y vuelve a listar.');
let paramModificados = { titulo: "Título actualizado" };
biblio.actualizarLibro(3, paramModificados);
biblio.listarLibros();
console.log("");
//     8. Elimina un libro y vuelve a listar.
console.log('8. Elimina un libro y vuelve a listar.');
biblio.eliminarLibro(2);
biblio.listarLibros();
console.log("");
//     9. Intenta buscar, actualizar o eliminar un id que no existe.
console.log('9. Intenta buscar, actualizar o eliminar un id que no existe.');
biblio.buscarLibro(6);
biblio.actualizarLibro(7, paramModificados);
biblio.eliminarLibro(5);
console.log("");
//     10. Agregar un nuevo libro.
console.log('10. Agregar un nuevo libro.');
let libro6 = new Libro(asignarID(), "Pedro Páramo", "Juan Rulfo", 1955);
biblio.agregarLibro(libro6);
biblio.listarLibros();
