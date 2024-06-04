let scoreElement = document.getElementById('score');
let hiScoreElement = document.getElementById('hi-score');
let canvas = document.getElementById('canvas');
let buttons = document.querySelectorAll('.control button');
let gameMode = document.getElementById('game-mode')
let gameMod = document.getElementById('game-mod')

gameMode.addEventListener('click',() => {
   gameMod.style.display= 'block'
})


let gameOver = false;
    let setIntervalId;
    let foodX, foodY;
    let foodAr = ['🥞','🧇','🧀','🎂','🍰',"🍒",'🥦',"🍏",'🍈','🍊',"🥝"];
    let foodArr = foodAr[Math.floor(Math.random()*foodAr.length)].toString()
    let snakeX = 10;
    let snakeY = 12;
    let velocityX = 0;
    let velocityY = 0; 
    let snake = [[10, 12]];
    let score = 0;
    let highScore = localStorage.getItem("high-score") || 0;
    
    hiScoreElement.innerText = highScore.toString().padStart(2, '0');
function placeFood() {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}   

function handleGameOver() {
    clearInterval(setIntervalId);
    alert('Game Over:\nPress "Ok" To Play Again');
    location.reload();
}

function gameControl(e) {
    switch(e.key) {
        case "ArrowUp":
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
            case "ArrowDown":
                if (velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case "ArrowLeft":
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
        case "ArrowRight":
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
    }
}
let touchStartX = 0;
let touchStartY = 0;

const touchMovement = (eve) => {
    const firstTouch = eve.touches[0];
    touchStartX =firstTouch.clientX;
    touchStartY = firstTouch.clientY;
}
const handleTouchMovement = (eve) => {
    if (!touchStartX || !touchStartY) {
        return;
    }

    let touchEndX = eve.changedTouches[0].clientX;
    let touchEndY = eve.changedTouches[0].clientY;

    let diffX = touchStartX - touchEndX;
    let diffY = touchStartY - touchEndY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
        } else {
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
        }
    } else {
        if (diffY > 0) {
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
        } else {
            if (velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            }
        }
    }
    touchStartX = 0;
    touchStartY = 0;
}
function gameRun() {
    if (gameOver) {
        return handleGameOver()
    };
    
    let foodElement = `<div style='grid-area: ${foodY} / ${foodX};'>${foodArr}</div>`;
    if (snakeX === foodX && snakeY === foodY) {
        foodArr= foodAr[Math.floor(Math.random()*foodAr.length)]
        placeFood();
        snake.push([snakeX, snakeY]); 
        score++;
        scoreElement.innerText = score.toString().padStart(2, '0');
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        hiScoreElement.innerText = highScore.toString().padStart(2, '0');
    }
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = [...snake[i - 1]];
    }
    snake[0] = [snakeX, snakeY];
    snakeX += velocityX;
    snakeY += velocityY;
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snakeX === snake[i][0] && snakeY === snake[i][1]) {
            gameOver = true;
        }
    }
    let snakeElements = snake.map(segment => {
        return `<div class="snake" style="grid-area: ${segment[1]} / ${segment[0]}"></div>`;
    }).join('');
    
    canvas.innerHTML = foodElement + snakeElements;
}

var slow = 150;
function speed(newSpeed) {
    clearInterval(setIntervalId)
    slow = newSpeed
    setIntervalId= setInterval(gameRun,slow)
}
document.getElementById('slow').addEventListener('click',() => {
    gameMod.style.display= 'none'        
    speed(300)
    })
    document.getElementById('normal').addEventListener('click',() => {
        gameMod.style.display= 'none'
       speed(149)
    })
    document.getElementById('fast').addEventListener('click',() => {
        gameMod.style.display= 'none'            
       speed(60)
    })
    placeFood();
    setIntervalId= setInterval(gameRun,slow)
document.addEventListener('keydown', gameControl);
document.addEventListener('touchstart', touchMovement);
document.addEventListener('touchmove', handleTouchMovement);