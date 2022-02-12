/* Requisitos:
- Debe funcionar solo con letras mayúsculas;
- No deben ser utilizadas letras con acentos ni caracteres especiales;
- Al completar o dibujo de la horca, debe ser mostrado un mensaje "Fin del juego" en la pantalla;
- Si se completa la palabra correcta antes de que se acaben los intentos, debe ser mostrado un mensaje de 
    "Ganaste, Felicidades!" en la pantalla.
- La página debe tener los guiones indicando cada letra da palabra, separados por un espacio;
- Para comenzar el juego la página debe tener un botón de "Iniciar Juego";
- No debe ser posible escribir números dentro del juego.
- Las letras equivocadas deben aparecer en la pantalla, pero no pueden aparecer de forma repetida;
- Las letras correctas deben aparecer en la pantalla encima de los guiones, en la posición correcta em relación a la palabra.


Extras:
- La página debe tener un campo para inserción de texto con la finalidad de adicionar nuevas palabras al juego, 
e un botón "Agregar palabra".


*/


var listaPalabras = ['PATO', 'PERRO', 'SANDIA', 'TRABAJO', 'ORACLE', 'ALURA', 'JAVASCRIPT', 'MARIPOSA', 'CUCHARA'];
var letrasIngresadas =[];
var palabraIngresada;
var paso = 0;
var newPalabra = document.querySelector("#input-nueva-palabra");


var palabraSecreta;
function escogerPalabra() {
    var a = Math.round(  Math.random() * listaPalabras.length);
    //resto 1 cuando a == listaPalabras.length que no existe
    a = listaPalabras.length == a ? (a - 1):a;
    palabraSecreta = listaPalabras[a];
    console.log("Palabra: "+palabraSecreta);
    palabraIngresada = new Array(palabraSecreta.length);
    return palabraSecreta;
}

//valido que la palabra ingresada  no tenga acentos
//y no esté en la lista de palabras ya ingresadas
function validarPalabra(palabra) {
    var exito  = true;
    var palabra = palabra.toUpperCase();
    //var acentos = ['Á','É','Í','Ó','Ú'];
    for (let i = 0; i < palabra.length; i++) {
        var codigo = palabra[i].charCodeAt(0);
        //console.log('Codigo: '+ codigo);
        if( !(codigo > 64 && codigo < 91) || palabra.trim().length == 0) {
            alert("Texto vacío o con caracteres no permitidos!!");
            exito = false;
            break;
        }
    }
    return exito;
}


function agregarPalabra() {
    var palabra = newPalabra.value.toUpperCase().trim();
    //validar palabra
    if (listaPalabras.indexOf(palabra) >= 0 ) {
        alert("Palabra ya ingresada.");
        return;
    }
    if (validarPalabra(palabra)) {
        listaPalabras.push(palabra);
        console.log(listaPalabras);
    }
}

function iniciarJ() {
    console.log("iniciarJ");
    paso = 0;
    letrasIngresadas =[];
    palabraSecreta = escogerPalabra();
    window.addEventListener( "keydown", capturaLetra);
    dTablero(palabraSecreta);

}



//valido que la letra esté en mayúsculas y no tenga acentos
//y no esté en la lista de letras erroneas ya ingresadas
function validarLetra(letra, codigo) {
    letra = letra.toUpperCase();
    //console.log('Letra: '+ letra + ' Codigo: '+codigo);
    var acentos = ['Á','É','Í','Ó','Ú']
    if (codigo > 64 && codigo < 91) {
        if (acentos.indexOf(letra) < 0 ) {
            if (letrasIngresadas.indexOf(letra) < 0) {
                return true;    
            }
            
        }
    }
    return false;
}

//Para saber si la letra ingresada coincide con alguna de la palabraSecreta
function coincideLetra(letra) {
    var coincide = false
    if (palabraSecreta.indexOf(letra) >= 0) {
        coincide = true;
    }
    letrasIngresadas.push(letra);
    return coincide;
}


function capturaLetra(evento) {
    console.log("capturaLetra");
    var letra = evento.key.toUpperCase();
    if (validarLetra(letra, evento.keyCode) && paso < 10) {
        if(coincideLetra(letra)){ 
            dLetrac(letra);
            //console.log(palabraIngresada.join(''));
            if (palabraSecreta == palabraIngresada.join('')) {
                paso = 11;
                dAhorcado(paso);
            }
        }else{
            dLetrai(letra);
            dAhorcado(++paso);
        }
    }
}



var btnIniciar = document.querySelector("#iniciar-juego");
btnIniciar.onclick = iniciarJ;

var btnAgregar = document.querySelector("#nueva-palabra");
btnAgregar.onclick = agregarPalabra();