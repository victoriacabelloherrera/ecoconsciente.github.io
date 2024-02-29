const TOTAL_PREGUNTAS = 26;

// Tiempo del juego
const tiempo_del_juego = 180; // 3 minutos

// Estructura para almacenar las preguntas
const PR_juego = [
  {
      id:'A',
      pregunta:"¿Qué capa gaseosa rodea la Tierra y es crucial para mantener la vida?",
      respuesta:"Atmósfera"
  },
  {
    id:'B',
    pregunta:"¿Cómo se denomina la variedad de vida en la Tierra, incluyendo plantas, animales y microorganismos?",
    respuesta:"Biodiversidad"
  },
  {
    id:'C',
    pregunta:"Proceso que convierte residuos orgánicos en abono",
    respuesta:"Compostaje"
  },
  {
    id:'D',
    pregunta:"Gas que contribuye al efecto invernadero",
    respuesta:"Dióxido de carbono"
  },
  {
    id:'E',
    pregunta:"Proceso natural que atrapa el calor en la atmósfera de la Tierra",
    respuesta:"Efecto invernadero"
  },
  {
    id:'F',
    pregunta:"¿Qué proceso llevan a cabo las plantas para producir su propio alimento utilizando la luz solar?",
    respuesta:"Fotosíntesis"
  },
  {
    id:'G',
    pregunta:"Organización ecologista internacional encargada promover políticas para proteger el medio ambiente.",
    respuesta:"Greenpeace"
  },
  {
    id:'H',
    pregunta:"Emisión industrial que puede afectar la calidad del aire.",
    respuesta:"Humo"
  },
  {
    id:'I',
    pregunta:" ¿Qué masa de hielo flotante se desprende de los glaciares y puede contribuir al aumento del nivel del mar al derretirse?",
    respuesta:"Iceberg"
  },
  {
    id:'J',
    pregunta:"Producto de higiene personal que contribuye a reducir el uso de envases plásticos y la generación de residuos",
    respuesta:"Jabón sólido"
  },
  {
    id:'K',
    pregunta:" ¿Qué animal marsupial australiano está en peligro debido a la pérdida de hábitat y el cambio climático?",
    respuesta:"Koala"
  },
  {
    id:'L',
    pregunta:"Son organismos importantes en la descomposición de materia orgánica, contribuyendo al compostaje",
    respuesta:"Lombrices"
  },
  {
    id:'M',
    pregunta:"Un gas peligroso liberado principalmente por la quema de combustibles fósiles",
    respuesta:"Monóxido de carbono"
  },
  {
    id:'N',
    pregunta:"¿Cómo se llama el entorno natural donde estan los seres vivos y recursos naturales?",
    respuesta:"Naturaleza"
  },
  {
    id:'O',
    pregunta:"¿Qué capa de la atmósfera protege a la Tierra de la radiación ultravioleta del sol?",
    respuesta:"Ozono"
  },
  {
    id:'P',
    pregunta:"¿Qué tipo de productos se fabrican utilizando materiales biodegradables?",
    respuesta:"Productos Eco"
  },
  {
    id:'Q',
    pregunta:"Proceso no controlado de combustión que afecta áreas naturales, como bosques",
    respuesta:"Quema forestal"
  },
  {
    id:'R',
    pregunta:"¿Qué proceso transforma los desechos para que puedan ser reutilizados?",
    respuesta:"Reciclaje"
  },
  {
    id:'S',
    pregunta:"Práctica de vivir de manera que no se agoten los recursos naturales del planeta",
    respuesta:"Sostenible"
  },
  {
    id:'T',
    pregunta:"¿Qué actividad humana implica la eliminación de árboles de manera extensiva?",
    respuesta:"Tala de arboles"
  },
  {
    id:'U',
    pregunta:"¿Qué radiación solar se incrementa por el adelgazamiento de la capa de ozono?",
    respuesta:"Ultravioleta"
  },
  {
    id:'V',
    pregunta:" Estilo de vida que evita el consumo de productos de origen animal que a reduce la huella ecológica",
    respuesta:"Veganismo"
  },
  {
    id:'W',
    pregunta:"Estilo de vida que busca evitar completamente la generación de residuos",
    respuesta:"Waste free"
  },
  {
    id:'X',
    pregunta:"¿Qué plantas son más comunes en condiciones de sequía y podrían aumentar debido al cambio climático?",
    respuesta:"Xerófitas"
  },
  {
    id:'Y',
    pregunta:"Tipo de tela biodegradable hecho de fibras naturales, similar a la arpillera ",
    respuesta:"Yute"
  },
  {
    id:'Z',
    pregunta:"Filosofía que busca reducir al mínimo la generación de residuos, promoviendo la reutilización",
    respuesta:"Zero Waste"
  }
];

// preguntas que ya han sido contestadas. Si están en 0 no han sido contestadas, si estan en 1 ya fueron contestadas
let estadoPreguntas = [];
for (let i = 0; i < 26; i++) {
    estadoPreguntas.push(0);
}


let cantidadAcertadas = 0;
// inicialmente -1 para cargar la primera pregunta
let numPreguntaActual = -1;

// obtener el elemento del cronómetro
const timer = document.getElementById("tiempo");
// Establecer el tiempo inicial en 90 segundos
let tiempo_restante = tiempo_del_juego;
let cuentaRegresiva;


//////////// BLOQUE 1: Botón comenzar /////////////
let comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", function(event) {
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  largarTiempo();
  cargarPregunta();
});

// creacion del círculo con las letras de la A a la Z
const container = document.querySelector(".container");
// array de letras del alfabeto en minúsculas
const alfabeto = 'abcdefghijklmnopqrstuvwxyz'.split('');


// CREACIÓN DE CIRCULOS
for (let i = 0; i < TOTAL_PREGUNTAS; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle"); // se le aplica los estilos css de .circle
    circle.innerHTML = alfabeto[i]; // se accede a las letras del alfabeto
    circle.id = alfabeto[i].toUpperCase(); // se asigna el ID correspondiente a la letra en mayúscula
    container.appendChild(circle); // se le agrega el hijo circle al container, el circulo grande principal

    // Cálculo de la posición de los círculos, se usa math.pi * 2 porque un circulo completo equivale a 2π, dos radianes. si llego a incrementar no se deforma pero se vuelve mas espaciado, el problema es que no me van a entrar todas las letras
    // la resta hace que el circulo rote, en vez de estar la letra a hacia la derecha o marcando 3 en punto, esta centrada como si fuera la aguja de un reloj en las 12
    const angle = (i / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI / 2);
    const x = Math.round(96 + 150 * Math.cos(angle)); // x, el 96 para posicionar (izquierda o derecha) y el 150 para ampliar o achicar (hacerlo mas ovalado por ej)
    const y = Math.round(96 + 150 * Math.sin(angle)); // y, el 96 me lo tira mas hacia abajo y el 150 me lo agrande o achica en vertical
    // se le aplica el css para poder posicionar los circulos
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
}



// CARGAR PREGUNTAS 
function cargarPregunta(){
  numPreguntaActual++;
  // controlar si he llegado al final de las preguntas, para comenzar de nuevo
  if(numPreguntaActual >= TOTAL_PREGUNTAS){
    numPreguntaActual = 0;
  }

// se usa el metodo indexOf para buscar la posicion del valor 0 del array
// el if verifica si hay preguntas sin contestar, se ejecutara el while
// el bucle while estara buscando si la pregunta actual esta contestada, si esto se cumple incrementa para pasar a la siguiente pregunta
  if(estadoPreguntas.indexOf(0) >= 0){
    while(estadoPreguntas[numPreguntaActual] == 1){
      numPreguntaActual++;
      if(numPreguntaActual >= TOTAL_PREGUNTAS){ // verifica si el numero de preguntas respondidas es mayor o igual al 26, si se cumple llegaste al final del juego
        numPreguntaActual = 0; //reinicio para volver a empezar las preguntas
      }
    }
    // se accede a la letra que esta en el html y actualiza su contenido con el id de la pregunta actual del array 
    document.getElementById("letra-pregunta").innerHTML = PR_juego[numPreguntaActual].id;
    // accede a pregunta del html y al id pregunta del array
    document.getElementById("pregunta").innerHTML = PR_juego[numPreguntaActual].pregunta;
    // aca se guarda el id de la pregunta en la variable letra
    let letra = PR_juego[numPreguntaActual].id;
    // usando el id guardado en la variable "letra", busca el elemento CSS con la clase pregunta-actual y le agrega la clase "pregunta-actual".
    document.getElementById(letra).classList.add("pregunta-actual");
  } else {
    clearInterval(cuentaRegresiva); // si no hay preguntas por responder se detiene el temporizador y muestra pantalla final
    mostrarPantallaFinal();
  }
}

/////////// BLOQUE 2 //////////
// detectar cada vez que hay un cambio de tecla en el input
let respuesta = document.getElementById("respuesta");

respuesta.addEventListener("keyup", function(event) {
  // Detectar si la tecla presionada es ENTER
  if (event.keyCode === 13) {
    if(respuesta.value === ""){
      alert("¡Debe ingresar una respuesta!");
      return;
    }
    // Obtener la respuesta ingresada
    let txtRespuesta = respuesta.value;
    controlarRespuesta(txtRespuesta.toLowerCase());
  }
});

// Agregar un evento de clic al botón "Responder"
let botonResponder = document.getElementById("responder");
botonResponder.addEventListener("click", function(event) {
  if(respuesta.value === ""){
    alert("¡Debe ingresar una respuesta!");
    return;
  }
  let txtRespuesta = respuesta.value;
  controlarRespuesta(txtRespuesta.toLowerCase());
});



// función que controla la respuesta
function controlarRespuesta(txtRespuesta){
  // convertir la respuesta ingresada por el usuario a minúsculas y eliminar espacios adicionales al principio y al final
  txtRespuesta = txtRespuesta.toLowerCase().trim();

  // convierte la respuesta almacenada en la base de datos a minúsculas y elimina tildes
  // con normalize se descompone los caracteres acentuados en su forma base y sus diacríticos,
  // // y luego replace los reemplaza para eliminarlos
  const respuestaCorrecta = PR_juego[numPreguntaActual].respuesta.toLowerCase().trim()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, '');

  // mensajes
  const mensajeCorrecto = "¡Correcto!";
  const mensajeIncorrecto = "Incorrecto";

  // comparar las respuestas, al igual que lo anterior, normaliza y reemplaza para que ambas respuestas (con tilde o sin) sean consideradas correctas
  if(txtRespuesta === respuestaCorrecta || txtRespuesta.normalize("NFD").replace(/[\u0300-\u036f]/g, '') === respuestaCorrecta) {
    // respuesta correcta
    cantidadAcertadas++;

    // mostrar mensaje de correcto dentro del círculo
    mensajeCirculo(mensajeCorrecto);
    
    // actualizar el estado de la pregunta actual a 1, indicando que ya está respondida
    estadoPreguntas[numPreguntaActual] = 1;
    let letra = PR_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual"); // se le aplica el css
    document.getElementById(letra).classList.add("bien-respondida"); // se le aplica el css
  } else {
    // respuesta incorrecta
    // mostrar mensaje de incorrecto dentro del círculo
    mensajeCirculo(mensajeIncorrecto);
    
    // actualizar el estado de la pregunta actual a 1, indicando que ya está respondida
    estadoPreguntas[numPreguntaActual] = 1;
    let letra = PR_juego[numPreguntaActual].id;
    // quitar la clase del estilo de pregunta actual
    document.getElementById(letra).classList.remove("pregunta-actual");
    // agregar la clase del estilo de pregunta mal respondida
    document.getElementById(letra).classList.add("mal-respondida");
  }

  // limpiar el campo de respuesta
  respuesta.value = "";

  // cargar la siguiente pregunta
  cargarPregunta();
}




// Función para mostrar mensaje dentro del círculo, busca la clase container con su descendiente tiempo
function mensajeCirculo(mensaje) {
  const circle = document.querySelector(".container #tiempo");
  circle.innerHTML = mensaje;
}


// botón para pasar de pregunta sin contestar
let pasar = document.getElementById("pasar");
pasar.addEventListener("click", function(event) {
    let letra = PR_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");
    cargarPregunta();
});

//////// BLOQUE 3 ///////////
// funcion de control del tiempo, se utiliza setInterval para la cuenta regresiva,  permite actualizar continuamente el tiempo restante en pantalla mientras el juego está en curso. 
function largarTiempo() {
  cuentaRegresiva = setInterval(function() {
    // restar un segundo al tiempo restante para que vaya en descenso
    tiempo_restante--;

    // actualizar el texto del cronómetro con el tiempo restante
    timer.innerHTML = tiempo_restante;

    // si el tiempo llega a 0, detener el cronómetro
    if (tiempo_restante < 0) {
      clearInterval(cuentaRegresiva); //clearInterval detiene la cuenta regresiva
      mostrarPantallaFinal(); //muestra final
    }
  }, 1000); // intervalo de ejecucion, (1000 milisegundos = 1 segundo)
}


// MOSTRAR PANTALLA FINAL
function mostrarPantallaFinal(){
  document.getElementById("acertadas").innerHTML = cantidadAcertadas;
  document.getElementById("score").innerHTML= Math.round((cantidadAcertadas * 100) / TOTAL_PREGUNTAS) + "% de acierto";
  document.getElementById("pantalla-juego").style.display =  "none";
  document.getElementById("pantalla-final").style.display =  "block";
}

// botón para recomenzar el juego
let recomenzar = document.getElementById("recomenzar");
recomenzar.addEventListener("click", function(event) {
  numPreguntaActual = -1;
  tiempo_restante = tiempo_del_juego;
  timer.innerText = tiempo_restante;
  cantidadAcertadas = 0;
  estadoPreguntas = [];
  for (let i = 0; i < PR_juego.length; i++) {
    estadoPreguntas.push(0);
  }


  // sacar las clases de los círculos
  let circulos = document.getElementsByClassName("circle");
  for(let i = 0; i < circulos.length; i++){
    circulos[i].classList.remove("bien-respondida");
    circulos[i].classList.remove("mal-respondida");
  }

  document.getElementById("pantalla-final").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  largarTiempo();
  cargarPregunta();
});
