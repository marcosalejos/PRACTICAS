//let myuuid = uuidv4();

// TODO: Simulador de biblioteca con Programación Orientada a Objetos en TypeScript.
// Recuerda: el navegador NO entiende TypeScript. Deja "tsc --watch" corriendo en la
// terminal para que cada vez que guardes se genere script.js automáticamente.
// Todo lo que muestres con console.log() lo verás en la consola del navegador (F12).

// ───────────────────────────── INTERFAZ DATOSLIBRO ─────────────────────────────

// 1. Declara una interfaz DatosLibro con los campos que se pueden modificar de un
//    libro: titulo, autor y anio. Los tres deben ser OPCIONALES (investiga "?"),
//    porque al actualizar un libro puede que solo quieras cambiar uno de ellos.
//    La usarás en el método actualizarLibro() de la Biblioteca.

interface DatosLibro {
  titulo?: string;
  autor?: string;
  anio?: number;
}

// ─────────────────────────────── CLASE LIBRO ───────────────────────────────

// 2. Declara la clase Libro con sus propiedades y el TIPO de cada una:
//    - id        → number, y que no se pueda cambiar nunca (investiga "readonly").
//    - titulo    → string
//    - autor     → string
//    - anio      → number
//    - disponible → boolean

class Libro {
  readonly id: number;
  titulo: string;
  autor: string;
  anio: number;
  disponible: boolean = true;

  // 3. Crea su constructor. Debe recibir id, titulo, autor y anio (¡con sus tipos!).
  //    Guarda cada uno en el objeto usando "this".
  //    El campo "disponible" NO se recibe: todo libro nuevo empieza disponible (true).

  constructor(id: number, titulo: string, autor: string, anio: number) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.anio = anio;
  }

  // 4. Método prestar(): no devuelve nada (investiga el tipo "void").
  //    Si el libro ya está prestado, avisa por consola. Si no, cambia "disponible" a false.

  prestar(): void {
    if (!this.disponible) {
      console.log("El libro ya está prestado");
    } else {
      this.disponible = false;
      console.log("El libro ha sido prestado");
    }
  }

  // 5. Método devolver(): también void.
  //    Si el libro ya está disponible, avisa por consola. Si no, cambia "disponible" a true.

  devolver(): void {
    if (this.disponible) {
      console.log("El libro ya estaba disponible");
    } else {
      this.disponible = true;
      console.log("El libro ha sido devuelto y está disponible");
    }
  }

  // 6. Método describir(): DEVUELVE (return) un string con los datos del libro, por ejemplo:
  //    "[1] El Quijote - Miguel de Cervantes (1605) - ✅ Disponible"
  //    "[2] 1984 - George Orwell (1949) - ❌ Prestado"

  describir(): string {                                                 // Comprobar si está disponible con un ternario
    return `[${this.id}] ${this.titulo} - ${this.autor} (${this.anio}) - ${this.disponible ? "Disponible" : "Prestado"}`;
  }     
}

// 👉 Antes de seguir, prueba aquí tu clase Libro: crea un libro, muéstralo con
//    describir(), préstalo y vuelve a mostrarlo. Prueba también a pasarle un texto
//    donde va el año y fíjate en el error que te marca TypeScript.
//    Cuando funcione, puedes borrar esta prueba o dejarla comentada.
/*
// Variable para asignar ID
let contador = 0;

// Libro1
let libro1 = new Libro(asignarID(), "El Quijote", "Miguel de Cervantes", 1605);
console.log(libro1.describir());
libro1.prestar();
console.log(libro1.describir());

// Libro2
let libro2 = new Libro(asignarID(), "1984", "George Orwell", 1949);
console.log(libro2.describir())

//Libro3
let libro3 = new Libro(asignarID(), "Título libro3", "Agustin", 2015);
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
  nombre: string;
  private libros: Libro[] = []; // Crear una lista 'libros' que almacena objetos de tipo Libro, la inicializamos vacía

  // 8. Crea su constructor. Solo recibe el nombre.
  //    La lista de libros empieza vacía.

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  // 9. Método buscarLibro(id: number): devuelve el Libro con ese id, o null si no existe.
  //    El tipo de retorno debe reflejar las dos posibilidades (investiga "Libro | null").
  //    (Empieza por este: casi todos los demás lo van a usar.)

  buscarLibro(id: number): Libro | null {
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

  agregarLibro(libro: Libro): void {
    this.buscarLibro(libro.id)
      ? console.log("Ya existe un libro con ese ID")
      : this.libros.push(libro);
  }
  // El método .push() añade elementos al final de array. Puede añadir más de un elemento libros.push(Libro6, Libro7, Libro8)

  // 11. Método listarLibros(): void.
  //     Si no hay libros, muestra un mensaje. Si hay, muestra el describir() de cada uno.

  listarLibros(): void{
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

  actualizarLibro(id: number, nuevosDatos: DatosLibro): void{
    if (this.buscarLibro(id) === null){
      console.log('El libro que se quiere actualizar no existe')
    }else{
      if (nuevosDatos.titulo){
        this.buscarLibro(id).titulo = nuevosDatos.titulo;
      }
      if(nuevosDatos.autor){
        this.buscarLibro(id).autor = nuevosDatos.autor;
      }
      if(nuevosDatos.anio){
        this.buscarLibro(id)?.anio = nuevosDatos.anio;
      }

    }
  }

  // 13. Método eliminarLibro(id: number): void.
  //     Quita el libro de la lista. Si no existe, avisa.

  // 14. Método cambiarDisponibilidad(id: number, disponible: boolean): void.
  //     Si "disponible" es false, presta el libro; si es true, lo devuelve.
  //     Reutiliza prestar() y devolver(). Si el libro no existe, avisa.
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
