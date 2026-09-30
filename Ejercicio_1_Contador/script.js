// TODO: Lógica del contador.

// 1. Declara una variable que guarde el valor actual del contador, empezando en 0.
contador = 0;
actualizarContador(contador);    
    
// 2. Selecciona del HTML los elementos que necesitas: el elemento que muestra el
//    número y los dos botones (el de sumar y el de resetear).

// 3. Añade un "escuchador de eventos" de tipo click al botón de sumar: cada vez que
//    se pulse, debe incrementar la variable del contador y actualizar el texto que
//    se muestra en pantalla.

document.getElementById("add").addEventListener("click", function() {
    contador +=1;
    actualizarContador(contador);
});

// 4. Añade otro escuchador de eventos al botón de resetear: debe volver la variable
//    a 0 y actualizar el texto en pantalla.

function reset0(){
    contador = 0;
    actualizarContador(contador);
};

// 5. Función para actualizar el valor de la pantalla y de la variable interna contador

function actualizarContador(contador){
    document.getElementById("textCount").innerText = contador;   
};

/*
He cogido como apuntes ejercicios que había realizado en primero de DAM, pudiéndolo hacer de dos forma diferentes:
1.
    <button id="add">SUMAR 1</button>

    document.getElementById("add").addEventListener("click", function() {
    
    });

2.
    <button onclick="reset0()" id="reset">RESET</button>
    
    function reset0(){
    
    };
*/