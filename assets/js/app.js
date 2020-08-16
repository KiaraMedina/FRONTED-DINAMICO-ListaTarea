//VARIABLES

const listaTweets = document.getElementById('lista-tweets');


//EVENT LISTENERS

eventListeners();

function eventListeners() {
    //Cuando se envia al formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    //BORRAR TWEETS
    listaTweets.addEventListener('click', borrarTweet);


    //LEA LOS DATOS DEL LOCAL STORAGE LOS CARGUE Y IMPRIMA
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

//FUNCIONES



//ANADIR TWEETS DEL FORMULARIO
function agregarTweet(e) {
    e.preventDefault();

    //LEER VALOR DE TEXTAREA
    const tweet = document.getElementById('tweet').value; // Creo una constante twwet, donde guardare todo lo que tenga en el textarea cuyo id es twwet y para llamar a un id es con gerElementById

    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';


    //CREAR ELEMENTO Y AGREGARLO EN LA LISTA
    const li = document.createElement('li');
    li.innerText = tweet;

    //AGREGA UN BOTON EN TWEET
    li.appendChild(botonBorrar);
    //AGREGA EL TWEET EN LA LISTA
    listaTweets.appendChild(li);
    //AGREGANDO EN EL LOCAL STORAGE

    agregarTweetLocalStorage(tweet);
}
//ELIMINAR EL TWEETS DEL DOM
function borrarTweet(e) {
    e.preventDefault();
    if (e.target.className == 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);


    }

}
//MOSTRAR DATOS DEL LOCAL STORAGE EN LA LISTA
function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet) {
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';


        //CREAR ELEMENTO Y AGREGARLO EN LA LISTA
        const li = document.createElement('li');
        li.innerText = tweet;

        //AGREGA UN BOTON EN TWEET
        li.appendChild(botonBorrar);
        //AGREGA EL TWEET EN LA LISTA
        listaTweets.appendChild(li);
        //AGREGANDO EN EL LOCAL STORAGE


    });
    //PARA ELIMINAR UN TWEET DE LOCAL STORAGE

}

//AGREGAR EN EL LOCAL STORAGE
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    //AGREANDO EL NUEVO TWEET
    tweets.push(tweet); //para agregar al ultimo de un arreglo

    //CONVERTIR DE STRING A ARREGLO PARA QUE PASE A LOCAL STORAGE
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


//COMPROBAR SI HAY ELEMENTOS DENTRO DEL LOCALSTORAAGE
//como en el local storage se reescribe entonces necesito crear una funcion en la cual obtenga los items del local storange, por eso se crea dentro de la funcion una condicional, si existe o no
function obtenerTweetsLocalStorage() {
    let tweets;
    // Revisamos los valoes de local storage
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

function borrarTweetLocalStorage(tweet) {

    let tweets, tweetBorrar;
    // Elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) {
        if (tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}