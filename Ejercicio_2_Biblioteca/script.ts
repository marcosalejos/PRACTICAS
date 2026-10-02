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

  public prestar(): void {
    if (!this.disponible) {
      console.log("El libro ya está prestado");
    } else {
      this.disponible = false;
      console.log("El libro ha sido prestado");
    }
  }

  // 5. Método devolver(): también void.
  //    Si el libro ya está disponible, avisa por consola. Si no, cambia "disponible" a true.

  public devolver(): void {
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

  public describir(): string {
    // Comprobar si está disponible con un ternario
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

  public buscarLibro(id: number): Libro | null {
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

  public agregarLibro(libro: Libro): void {
    this.buscarLibro(libro.id)
      ? console.log("Ya existe un libro con ese ID")
      : this.libros.push(libro);
  }
  // El método .push() añade elementos al final de array. Puede añadir más de un elemento libros.push(Libro6, Libro7, Libro8)

  // 11. Método listarLibros(): void.
  //     Si no hay libros, muestra un mensaje. Si hay, muestra el describir() de cada uno.

  public listarLibros(): void {
    this.libros.length === 0
      ? console.log("No hay libros en la biblioteca")
      : this.libros.forEach((libro) => console.log(libro.describir()));
  }
  // Se comprueba si la lista está vacía mediante su longitud, no existe el método .isEmpty()
  // Se recorre la lista mediante forEach, el cual espera una función (flecha) que ejecuta en cada libro de la lista.

  // 12. Método actualizarLibro(id: number, nuevosDatos: DatosLibro): void.
  //     nuevosDatos es un objeto, por ejemplo { titulo: "Otro título", anio: 2001 }.
  //     Cambia solo los campos que vengan (los que no vengan serán undefined).
  //     Si el libro no existe, avisa.

  public actualizarLibro(id: number, nuevosDatos: DatosLibro): void {
    /* Guardamos en libroActualizado el propio libro encontrado en el método buscarLibro(), no es una copia, es una referencia al
    propio Libro, por lo que al modificar libroActualizado se modifica el Libro encontrado en el array libros */
    let libroActualizado = this.buscarLibro(id);

    if (libroActualizado === null) {
      console.log("El libro que se quiere actualizar no existe");
    } else {
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

  public eliminarLibro(id: number): void {
    /* Guardar el número de indice en una variable. El método .findIndex() recibe por parámetro una función, la cual aplica a cada elemento
     del array. Se genera una función flecha que compara el id pasado por parámetro en eliminarLibro(id) con el de cada Libro de la lista libros,
     si lo encuentra devuelve su posición y si no devuelve -1. Si lo encuentra detiene el bucle de búsqueda, es decir, si hubiesen dos ID
     repetidas solo nos daría la posición del primero que encuentra */
    let numeroIndice: number = this.libros.findIndex(
      (libro) => libro.id === id,
    );

    // Método .splice() -> elimina elementos en el array desde la posición del 1º param. e indicamos cuantos elementos queremos eliminar con el 2º param.
    numeroIndice === -1
      ? console.log("El libro no ha sido eliminado porque no existe")
      : this.libros.splice(numeroIndice, 1);
  }

  // 14. Método cambiarDisponibilidad(id: number, disponible: boolean): void.
  //     Si "disponible" es false, presta el libro; si es true, lo devuelve.
  //     Reutiliza prestar() y devolver(). Si el libro no existe, avisa.

  public cambiarDisponibilidad(id: number, disponible: boolean): void {
    let libroDisponibilidad = this.buscarLibro(id);

    if (libroDisponibilidad === null) {
      console.log("El libro no existe");
    } else {
      // if (disponible){
      //   libroDisponibilidad.devolver();
      // }else{
      //   libroDisponibilidad.prestar();
      // }
      libroDisponibilidad.disponible != libroDisponibilidad.disponible;
    }
  }
  // Si quiero cambiar la disponibilidad ha False es porque el libro está disponible (True), se presta y se cambia la disponibilidad a False
  // Si quiero cambiar la disponibilidad ha True es porque el libro está prestado y no está disponible (False), se devuelve y se cambia la disponibilidad a True
}

// ─────────────────────────────────── PRUEBA ───────────────────────────────────

// 15. Escribe aquí la prueba del paso 5 del enunciado. Pon un console.log("--- Paso X ---")
//     antes de cada paso para que la consola se lea bien:

//     1. Crea una biblioteca.

console.log('1. Crea una biblioteca.');

let biblio: Biblioteca = new Biblioteca ('Biblioteca Molona');

console.log("");

//     2. Crea al menos 4 libros y añádelos.

console.log('2. Crea al menos 4 libros y añádelos.');

let libro1: Libro = new Libro(asignarID(), "El Quijote", "Miguel de Cervantes", 1605);
let libro2: Libro = new Libro(asignarID(), "1984", "George Orwell", 1949);
let libro3: Libro = new Libro(asignarID(), "Cien años de soledad", "Gabriel García Márquez", 1967);
let libro4: Libro = new Libro(asignarID(), "Ficciones", "Jorge Luis Borges", 1944);

  // Agregar libros nuevos con un forEach recorriendo la array de agregarNuevosLibros
let agregarNuevosLibros: Libro []= [libro1, libro2, libro3, libro4];

agregarNuevosLibros.forEach(libro => biblio.agregarLibro(libro));

console.log("");

//     3. Intenta añadir un libro con un id repetido.

console.log('3. Intenta añadir un libro con un id repetido.');
let libro5: Libro = new Libro(2, "Pedro Páramo", "Juan Rulfo", 1955);
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

console.log('6. Intenta prestar otra vez el mismo libro.')

biblio.cambiarDisponibilidad(1, false);
biblio.listarLibros();

console.log("");

//     7. Actualiza un libro y vuelve a listar.

console.log('7. Actualiza un libro y vuelve a listar.')



//     8. Elimina un libro y vuelve a listar.
//     9. Intenta buscar, actualizar o eliminar un id que no existe.



// Variable para asignar ID
let contador = 0;

//Función para asignar ID
function asignarID(): number{
    return contador +=1
}