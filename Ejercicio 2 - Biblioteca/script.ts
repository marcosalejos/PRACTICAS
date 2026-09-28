// TODO: Simulador de biblioteca con Programación Orientada a Objetos en TypeScript.
// Recuerda: el navegador NO entiende TypeScript. Deja "tsc --watch" corriendo en la
// terminal para que cada vez que guardes se genere script.js automáticamente.
// Todo lo que muestres con console.log() lo verás en la consola del navegador (F12).


// ───────────────────────────── INTERFAZ DATOSLIBRO ─────────────────────────────

// 1. Declara una interfaz DatosLibro con los campos que se pueden modificar de un
//    libro: titulo, autor y anio. Los tres deben ser OPCIONALES (investiga "?"),
//    porque al actualizar un libro puede que solo quieras cambiar uno de ellos.
//    La usarás en el método actualizarLibro() de la Biblioteca.


// ─────────────────────────────── CLASE LIBRO ───────────────────────────────

// 2. Declara la clase Libro con sus propiedades y el TIPO de cada una:
//    - id        → number, y que no se pueda cambiar nunca (investiga "readonly").
//    - titulo    → string
//    - autor     → string
//    - anio      → number
//    - disponible → boolean

// 3. Crea su constructor. Debe recibir id, titulo, autor y anio (¡con sus tipos!).
//    Guarda cada uno en el objeto usando "this".
//    El campo "disponible" NO se recibe: todo libro nuevo empieza disponible (true).

// 4. Método prestar(): no devuelve nada (investiga el tipo "void").
//    Si el libro ya está prestado, avisa por consola. Si no, cambia "disponible" a false.

// 5. Método devolver(): también void.
//    Si el libro ya está disponible, avisa por consola. Si no, cambia "disponible" a true.

// 6. Método describir(): DEVUELVE (return) un string con los datos del libro, por ejemplo:
//    "[1] El Quijote - Miguel de Cervantes (1605) - ✅ Disponible"
//    "[2] 1984 - George Orwell (1949) - ❌ Prestado"

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

// 8. Crea su constructor. Solo recibe el nombre.
//    La lista de libros empieza vacía.

// 9. Método buscarLibro(id: number): devuelve el Libro con ese id, o null si no existe.
//    El tipo de retorno debe reflejar las dos posibilidades (investiga "Libro | null").
//    (Empieza por este: casi todos los demás lo van a usar.)

// 10. Método agregarLibro(libro: Libro): void.
//     Si ya existe un libro con ese id, avisa y no lo añadas. Si no, añádelo a la lista.

// 11. Método listarLibros(): void.
//     Si no hay libros, muestra un mensaje. Si hay, muestra el describir() de cada uno.

// 12. Método actualizarLibro(id: number, nuevosDatos: DatosLibro): void.
//     nuevosDatos es un objeto, por ejemplo { titulo: "Otro título", anio: 2001 }.
//     Cambia solo los campos que vengan (los que no vengan serán undefined).
//     Si el libro no existe, avisa.

// 13. Método eliminarLibro(id: number): void.
//     Quita el libro de la lista. Si no existe, avisa.

// 14. Método cambiarDisponibilidad(id: number, disponible: boolean): void.
//     Si "disponible" es false, presta el libro; si es true, lo devuelve.
//     Reutiliza prestar() y devolver(). Si el libro no existe, avisa.


// ─────────────────────────────────── PRUEBA ───────────────────────────────────

// 15. Escribe aquí la prueba del paso 5 del enunciado. Pon un console.log("--- Paso X ---")
//     antes de cada paso para que la consola se lea bien:
//     1. Crea una biblioteca.
//     2. Crea al menos 4 libros y añádelos.
//     3. Intenta añadir un libro con un id repetido.
//     4. Lista los libros.
//     5. Presta un libro con cambiarDisponibilidad() y vuelve a listar.
//     6. Intenta prestar otra vez el mismo libro.
//     7. Actualiza un libro y vuelve a listar.
//     8. Elimina un libro y vuelve a listar.
//     9. Intenta buscar, actualizar o eliminar un id que no existe.
