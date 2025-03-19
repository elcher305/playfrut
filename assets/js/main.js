let playerName = '';
let timer = null;
let isPaused = false;
let score = 0;
let playerField = [];
let enemyField = [];
let enemyShips = [];
let playerShips = [];

document.getElementById('startGameBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', pauseGame);
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        pauseGame();
    }
});

function startGame() {
    playerName = document.getElementById('playerName').value;
    if (playerName) {
        document.getElementById('startScreen').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'flex';
        initGame();
    }
}

function initGame() {
    // Инициализация игровых полей
    for (let i = 0; i < 100; i++) {
        playerField.push(false);
        enemyField.push(false);
    }

    // Расстановка кораблей игрока
    placeShips(playerField, playerShips);

    // Расстановка кораблей противника
    placeShips(enemyField, enemyShips);

    drawFields();

    // Запуск таймера
    startTimer();

    // Обработчик клика на поле противника
    document.getElementById('enemyField').addEventListener('click', (e) => {
        if (!isPaused && e.target.classList.contains('cell')) {
            let index = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
            makeShot(index);
        }
    });
}

function placeShips(field, ships) {
    // Простая реализация расстановки кораблей
    for (let i = 0; i < 5; i++) {
        let shipSize = Math.floor(Math.random() * 3) + 1; // Размер корабля от 1 до 3 ячеек
        let direction = Math.random() < 0.5 ? 'h' : 'v'; // Направление корабля
        let x, y;

        if (direction === 'h') {
            x = Math.floor(Math.random() * (10 - shipSize));
            y = Math.floor(Math.random() * 10);
        } else {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * (10 - shipSize));
        }

        for (let j = 0; j < shipSize; j++) {
            if (direction === 'h') {
                field[y * 10 + x + j] = true;
            } else {
                field[(y + j) * 10 + x] = true;
            }
        }
    }
}

function drawFields() {
    let playerHtml = '';
    let enemyHtml = '';

    for (let i = 0; i < 100; i++) {
        playerHtml += `<div class="cell" style="background-color: ${playerField[i] ? 'green' : ''}"></div>`;
        enemyHtml += `<div class="cell"></div>`;
    }

    document.getElementById('playerField').innerHTML = playerHtml;
    document.getElementById('enemyField').innerHTML = enemyHtml;
}

function startTimer() {
    let minutes = 0;
    let seconds = 0;

    timer = setInterval(() => {
        if (!isPaused) {
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
            document.getElementById('timer').innerText = `${pad(minutes)}:${pad(seconds)}`;
        }
    }, 1000);
}

function pauseGame() {
    isPaused = !isPaused;
    document.getElementById('pauseBtn').innerText = isPaused ? 'Возобновить' : 'Пауза';
}

function makeShot(index) {
    if (enemyField[index]) {
        enemyField[index] = false;
        document.querySelectorAll('#enemyField .cell')[index].classList.add('hit');
        score++;
        document.getElementById('score').innerText = `Баллы: ${score}`;
        checkWin();
    } else {
        document.querySelectorAll('#enemyField .cell')[index].classList.add('miss');
    }

    // Ход компьютера
    let enemyIndex = Math.floor(Math.random() * 100);
    if (playerField[enemyIndex]) {
        playerField[enemyIndex] = false;
        document.querySelectorAll('#playerField .cell')[enemyIndex].classList.add('hit');
    } else {
        document.querySelectorAll('#playerField .cell')[enemyIndex].classList.add('miss');
    }

    checkLose();
}

function checkWin() {
    if (!enemyField.includes(true)) {
        endGame('win');
    }
}

function checkLose() {
    if (!playerField.includes(true)) {
        endGame('lose');
    }
}

function endGame(result) {
    clearInterval(timer);
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('endScreen').style.display = 'flex';

    if (result === 'win') {
        document.getElementById('endMessage').innerText = `Поздравляем, ${playerName}! Вы выиграли с баллами: ${score}`;
    } else {
        document.getElementById('endMessage').innerText = `К сожалению, ${playerName}, вы проиграли.`;
    }
}

function pad(num) {
    return num.toString().padStart(2, '0');
}
