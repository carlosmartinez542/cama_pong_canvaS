const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

function Rect(x,y,width,height,color){
    return{x,y,width,height,color};
}

const player1 = Rect(0,(canvas.height -100) / 2, 20,100, 'white'); //el pirmer jugador ws un bloque rectangular
const player2 = Rect(canvas.width -20 ,(canvas.height -100) / 2, 20,100, 'white'); //el primer jugador es un bloque rectangular
const ball = Rect(canvas.width  / 2 - 10 ,canvas.height / 2 - 10,20, 20, 'white'); //se crea una pequeña pelota
ball.velocityX = 4;
ball.velocityY = 4;

//funcion para crear un rectangulo de un color cualquiera
function drawRect(rect){
    context.fillStyle = rect.color;
    context.fillRect(rect.x,rect.y,rect.width,rect.height);
}

function draw(){
    context.clearRect(0,0,canvas.width,canvas.height);
    drawRect(player1); //se dibuja el jugador 1
    drawRect(player2); //se dibuja el jugador 2
    drawRect(ball); //se dibuja la pelota
    }

    function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    //rebote de la pelota en cada borde
    if(ball.y <= 0 || (ball.y + ball.height) >= canvas.height){
       //la velocidad se redice
        ball.velocityY *= -1;
    }

    //rebote de la pelota en cada jugador
    if(
        ((ball.x <= player1.x + player1.with) && (ball.y + ball.height > player1.y) && (player1.y + player1.height)) ||
        ((ball.x + ball.with >= player2.x) && (ball.y + ball.height > player2.y) && (ball.y <player2.y + player2.height)) 
    ){
        //la velocidad se reduce
        ball.velocityX *= -1
    }

    //reinicio de la pelota en una nueva posicion si esta sale de los bordes o marco del juego
    if(ball.x < 0 || ball.x > canvas.width){
        ball.x = canvas.width / 2 -10;
        ball.y = canvas.height/2 - 10;
        ball.velocityX *= -1; //se rduce la velocidad en el eje X
        //se obtiene una posicion aleatoria de velocidad en el eje "Y" y se incrementa o reduce la velocidad de acuerdo al random
        ball.velocityY *= Math.random() > 0.5 ? 1 : -1 ;
    }
}

window.addEventListener('keydown', (event)=>{
    const key = event.key;
    if(key === 'ArrowUp' && player2.y > 0) player2.y -= 10; //si el jugador presiona la flecha hacia arriba (mueve) en 10px hacia arriba
    if(key === 'ArrowDown' && player2.y + player2.height < canvas.height) player2.y +=10; //si el jugador presiona la flecha hacia abajo (mueve) en 10px hacia abajo
    if(key === 'w' && player1.y > 0)player1.y -=10; //si el jugador presiona la tecla 'W' se reduce (mueve) en 10px hacia arriba
    if(key === 's' && player1.height < canvas.height) player1.y +=10; //si el jugador presiona la tecla 's' se reduce (mueve) en 10px hacia abajo
});

//indica que el juego sera ciclico
function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

//iniciar el juego
gameLoop();


