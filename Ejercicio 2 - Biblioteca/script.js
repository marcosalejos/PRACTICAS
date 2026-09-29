"use strict";
//import {v4 as uuidv4} from 'uuid';
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
            console.log('El libro ya está prestado');
        }
        else {
            this.disponible = false;
            console.log('El libro ha sido prestado');
        }
    }
    // 5. Método devolver(): también void.
    //    Si el libro ya está disponible, avisa por consola. Si no, cambia "disponible" a true.
    devolver() {
        if (this.disponible) {
            console.log('El libro ya estaba disponible');
        }
        else {
            this.disponible = true;
            console.log('El libro ha sido devuelto y está disponible');
        }
    }
    // 6. Método describir(): DEVUELVE (return) un string con los datos del libro, por ejemplo:
    //    "[1] El Quijote - Miguel de Cervantes (1605) - ✅ Disponible"
    //    "[2] 1984 - George Orwell (1949) - ❌ Prestado"
    describir() {
        return `[${this.id}] ${this.titulo} - ${this.autor} (${this.anio}) - ${this.consultarDisponibilidad()}`;
    }
    consultarDisponibilidad() {
        let resultado; // return this.disponible ? 'Disponible' : 'Prestado';
        if (this.disponible) {
            resultado = 'Disponible';
        }
        else {
            resultado = 'Prestado';
        }
        return resultado;
    }
}
// 👉 Antes de seguir, prueba aquí tu clase Libro: crea un libro, muéstralo con
//    describir(), préstalo y vuelve a mostrarlo. Prueba también a pasarle un texto
//    donde va el año y fíjate en el error que te marca TypeScript.
//    Cuando funcione, puedes borrar esta prueba o dejarla comentada.
/*
// Variable para asignar ID
let contador = 0;

// Libro 1
        //const -> impide reasignar la variable, es decir, hacer que apunte a otro objeto. No impide modificar el objeto al que apunta.
const libro1 = new Libro(asignarID(), "El Quijote", "Miguel de Cervantes", 1605);
console.log(libro1.describir());
libro1.prestar();
console.log(libro1.describir());

// Libro2
const libro2 = new Libro(asignarID(), "1984", "George Orwell", 1949);
console.log(libro2.describir())

//Libro2
const libro3 = new Libro(asignarID(), "Título libro3", "Agustin", 2015);
console.log(libro3.describir())

// Función para asignar ID
function asignarID(): number{
    return contador +=1
}
*/
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
            if (this.libros[i].id === id) { // .id: acceder a una propiedad de un objeto
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
        this.buscarLibro(libro.id) ? console.log('Ya existe un libro con ese ID') : this.libros.push(libro);
    }
}
// ─────────────────────────────────── PRUEBA ───────────────────────────────────
// 15. Escribe aquí la prueba del paso 5 del enunciado. Pon un console.log("--- Paso X ---")
//     antes de cada paso para que la consola se lea bien:
console.log("Hola biblioteca");
//     1. Crea una biblioteca.
//     2. Crea al menos 4 libros y añádelos.
//     3. Intenta añadir un libro con un id repetido.
//     4. Lista los libros.
//     5. Presta un libro con cambiarDisponibilidad() y vuelve a listar.
//     6. Intenta prestar otra vez el mismo libro.
//     7. Actualiza un libro y vuelve a listar.
//     8. Elimina un libro y vuelve a listar.
//     9. Intenta buscar, actualizar o eliminar un id que no existe.
