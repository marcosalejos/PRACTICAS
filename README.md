# PRACTICAS

Repositorio de ejercicios de prácticas. Aquí encontrarás una guía rápida de Git, recursos de aprendizaje y, más abajo, la estructura de los ejercicios.

---

## 🔐 1. Configura tus credenciales de Git (hazlo antes de nada)

Antes de hacer tu primer commit, Git necesita saber quién eres. Ejecuta estos dos comandos en la terminal (solo una vez por ordenador):

```
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

- `git config` → comando para configurar Git.
- `--global` → indica que esta configuración se aplica a **todos** tus repositorios en este ordenador, no solo a este.
- `user.name` / `user.email` → los datos que aparecerán como autor en cada commit que hagas.

### Evitar que te pida el token/contraseña cada vez

Cuando haces `push` o `pull` sobre un repositorio remoto (GitHub, GitLab...), Git te puede pedir tu usuario y token en cada operación. Para que lo recuerde:

```
git config --global credential.helper store
```

- `credential.helper` → le dice a Git cómo debe **guardar** tus credenciales una vez las introduces.
- `store` → las guarda en un archivo de texto en tu ordenador, así solo te las pedirá la primera vez.

> 💡 En Windows, Git suele traer ya instalado el **Git Credential Manager**, que guarda tus credenciales de forma segura (cifradas) sin que tengas que hacer nada. Puedes comprobar si ya lo tienes configurado con:
> ```
> git config --global credential.helper
> ```
> Si te devuelve algo como `manager` o `manager-core`, ya está todo listo y no necesitas usar `store`.

---

## 🧰 2. Comandos básicos de Git

| Comando | ¿Qué hace? |
|---|---|
| `git status` | Te muestra qué archivos has cambiado, cuáles están preparados para el commit (staged) y cuáles no. Úsalo siempre antes de hacer un commit para saber qué vas a subir. |
| `git add <archivo>` | Prepara (o "añade al staging") un archivo para que se incluya en el próximo commit. Usa `git add .` para añadir **todos** los archivos modificados de golpe. |
| `git commit -m "mensaje"` | Guarda una "fotografía" de los cambios que has preparado con `add`, junto con un mensaje explicando qué has hecho. El parámetro `-m` te permite escribir el mensaje directamente en el mismo comando. |
| `git push` | Sube tus commits guardados localmente al repositorio remoto (por ejemplo, GitHub), para que otros los vean. |
| `git pull` | Descarga los cambios del repositorio remoto **y los combina automáticamente** con tu código local. Es como hacer un `fetch` + `merge` en un solo paso. |
| `git fetch` | Descarga los cambios del repositorio remoto pero **no los mezcla** con tu código, solo actualiza la información de lo que hay en el remoto. Útil para ver qué ha cambiado antes de decidir si haces `pull`. |

### Flujo de trabajo típico

1. `git status` → ver qué ha cambiado.
2. `git add .` → preparar los cambios.
3. `git commit -m "explica brevemente qué hiciste"` → guardar los cambios con un mensaje.
4. `git pull` → asegurarte de tener la última versión antes de subir la tuya (evita conflictos).
5. `git push` → subir tus cambios.

---

## 📚 3. Webs útiles para hacer los ejercicios

- [W3Schools](https://www.w3schools.com/) → tutoriales muy visuales de HTML, CSS y JavaScript, con ejemplos interactivos ("Try it Yourself").
- [MDN Web Docs](https://developer.mozilla.org/es/) → la documentación oficial y más completa de HTML, CSS y JavaScript. Un poco más técnica que W3Schools, ideal cuando quieras entender algo a fondo.
- [freeCodeCamp](https://www.freecodecamp.org/) → cursos gratuitos paso a paso, muy buenos para reforzar fundamentos con ejercicios prácticos.
- [Sass-lang (documentación oficial)](https://sass-lang.com/documentation/) → para dudas sobre sintaxis de SCSS.
- [CSS-Tricks - Guía de Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) → muy útil para centrar elementos en pantalla, algo que necesitarás en los primeros ejercicios.

---

## 📁 4. Estructura de los ejercicios

Cada ejercicio vive en su propia carpeta, con este patrón de nombre: `Ejercicio N - Nombre del ejercicio`.

Dentro de cada carpeta encontrarás:

- `enunciado.md` → la descripción del ejercicio y los pasos sugeridos para resolverlo.
- `index.html` → el archivo HTML base, ya enlazado con el CSS y el JS, pero vacío por dentro: tienes que completarlo tú.
- `styles.scss` → el archivo de estilos en SCSS, con comentarios guía pero sin estilos escritos.
- `script.js` → el archivo de lógica en JavaScript, con comentarios guía pero sin código escrito.

> ⚠️ El SCSS no lo entiende el navegador directamente: necesitas compilarlo a un archivo `.css`. La forma más sencilla es instalar la extensión **"Live Sass Compiler"** en Visual Studio Code: al guardar el `.scss`, generará automáticamente un `styles.css` que es el que está enlazado en el `index.html`.
