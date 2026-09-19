```javascript
const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const scoreText = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

let playerPosition = 120;
let enemyPosition = 50;
let enemyTop = -100;
let score = 0;
let gameRunning = false;
let gameLoop;

startBtn.addEventListener("click", startGame);

document.addEventListener("keydown", function(event) {
    if (!gameRunning) return;

    if (event.key === "ArrowLeft") {
        playerPosition -= 20;

        if (playerPosition < 10) {
            playerPosition = 10;
        }

        player.style.left = playerPosition + "px";
    }

    if (event.key === "ArrowRight") {
        playerPosition += 20;

        if (playerPosition > 245) {
            playerPosition = 245;
        }

        player.style.left = playerPosition + "px";
    }
});

function startGame() {
    gameRunning = true;
    score = 0;
    scoreText.textContent = score;

    playerPosition = 120;
    enemyTop = -100;
    enemyPosition = Math.floor(Math.random() * 240) + 10;

    player.style.left = playerPosition + "px";
    enemy.style.left = enemyPosition + "px";
    enemy.style.top = enemyTop + "px";

    startBtn.textContent = "Restart Game";

    clearInterval(gameLoop);
    gameLoop = setInterval(updateGame, 20);
}

function updateGame() {
    enemyTop += 5;

    enemy.style.top = enemyTop + "px";

    // Check collision
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    if (
        playerRect.left < enemyRect.right &&
        playerRect.right > enemyRect.left &&
        playerRect.top < enemyRect.bottom &&
        playerRect.bottom > enemyRect.top
    ) {
        gameOver();
    }

    // Enemy passed the player
    if (enemyTop > 500) {
        score++;
        scoreText.textContent = score;

        enemyTop = -100;
        enemyPosition = Math.floor(Math.random() * 240) + 10;

        enemy.style.left = enemyPosition + "px";
    }
}

function gameOver() {
    gameRunning = false;
    clearInterval(gameLoop);

    alert("Game Over! Your score: " + score);

    startBtn.textContent = "Start Game";
}
```
