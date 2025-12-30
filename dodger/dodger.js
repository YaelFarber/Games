const player = document.getElementById('player');
const game = document.getElementById('game');

const startScreen = document.getElementById('start');
const gameOverScreen = document.getElementById('game-over');
const victoryScreen = document.getElementById('victory');

const newBestScoreMsg = document.getElementById('new-best');
const finalScore = document.getElementById('final-score');

const strawberries = document.getElementById('strawberries');
const score = document.getElementById('score');
const best = document.getElementById('best');
const bestLevel = document.getElementById('best-level');
const levelDisplay = document.getElementById('level');

const collectedStrawberries = document.getElementById('collected-strawberries');
const finalLevel = document.querySelectorAll('.final-level');

let strawberriesCount = 0;
let currentScore = 0;

let bestScore = 0;
let reachLevel = 1;

let level = 1;
let scrollSpeed = 3;
let throwInterval = null;

let isGameOver = false;
let isVictory = false;
let isNewBestThisRun = false;

const OBJECT_SIZE = 50;


const strawberryIcon = '../dodger/dodger-assets/strawberry.png';
const brocollyIcon = '../dodger/dodger-assets/broccoly.png';


// GET BEST SCORE KEY FROM STORAGE
function getBestScoreKey() {
  return GameStorageManager.userKey('dodgerBestScore');
}

// GET BEST LEVEL KEY FROM STORAGE
function getBestLevelKey() {
  return GameStorageManager.userKey('dodgerBestLevel');
}

// LOAD HIGH SCORES FROM STORAGE
function loadDodgerHighScoresForUser() {
  bestScore = parseInt(GameStorageManager.getStorageValue(getBestScoreKey(), '0'), 10);
  reachLevel = parseInt(GameStorageManager.getStorageValue(getBestLevelKey(), '1'), 10);

  if (Number.isNaN(bestScore)) bestScore = 0;
  if (Number.isNaN(reachLevel)) reachLevel = 1;
}

// SAVE BEST SCORE TO STORAGE
function saveBestScore() {
  GameStorageManager.setStorageValue(getBestScoreKey(), String(bestScore));
}
// SAVE BEST LEVEL TO STORAGE
function saveBestLevel() {
  GameStorageManager.setStorageValue(getBestLevelKey(), String(reachLevel));
}

// UPDATE THE SCORE BOARD
function updateScoreBoard() {
    strawberries.textContent = `${strawberriesCount}`;
    score.textContent = `${currentScore}`;
    levelDisplay.textContent = `${level}`
    best.textContent = `${bestScore}`;
    bestLevel.textContent = `${reachLevel}`;
}

// HANDLE MOUSE MOVEMENT
function handleMove(event) {
    const gameBounds = game.getBoundingClientRect();
    let x = event.clientX - gameBounds.left - player.offsetWidth / 2;
    x = Math.max(0, Math.min(x, gameBounds.width - player.offsetWidth));
    player.style.left = `${x}px`;
}

// EVENT LISTENER FOR MOVEMENT
game.addEventListener('mousemove', handleMove)

// CLEAR DEAD OBJECTS
function clearStrawberriesAndBroccolies() {
    document.querySelectorAll(".strawberry, .broccoly").forEach(obj => obj.remove());
}

// RANDOM STRAWBERRIES AND BROCCOLIES THROW
function throwObjects() {
    if(isGameOver || isVictory) return;

    const isStrawberry = Math.random() < 0.8;

    const obj = document.createElement('div');
    obj.style.left = `${Math.random() * (game.offsetWidth - OBJECT_SIZE)}px`;
    obj.style.animationDuration = `${scrollSpeed}s`;
    obj.style.backgroundImage = `url(${isStrawberry ? strawberryIcon : brocollyIcon})`;
    obj.classList.add(isStrawberry ? 'strawberry' : 'broccoly');
    game.appendChild(obj);
    obj.addEventListener('animationend', () => obj.remove());
    checkCollision(obj, isStrawberry);
}

// CALC COLLISIONS AND UPDATE THE SCORE BOARD
function checkCollision(obj, isStrawberry) {
    const checkInterval = setInterval(() => {
        if(!obj.isConnected) {
            clearInterval(checkInterval);
            return;
        }

        const objBounds = obj.getBoundingClientRect();
        const playerBounds = player.getBoundingClientRect();

        if(objBounds.left < playerBounds.right &&
            objBounds.right > playerBounds.left &&
            objBounds.top < playerBounds.bottom &&
            objBounds.bottom > playerBounds.top
        ) {
            obj.remove();
            clearInterval(checkInterval);

            if(isStrawberry) {
                strawberriesCount++;
                currentScore += 10;
                
                if (currentScore > bestScore) {
                    bestScore = currentScore;
                    isNewBestThisRun = true;
                    saveBestScore();
                }


                if(currentScore >= 200) {
                    isVictory = true;
                    endGame();
                    return;
                }
                
                updateScoreBoard();
                checkLevelUp();
            
            } else if (!isGameOver){
                isGameOver = true;
                endGame();
            }
        }
    }, 100); 
}

// CHECK TO LEVEL UP
function checkLevelUp() {
    if(strawberriesCount > 0 && strawberriesCount % 10 === 0) {
        level++;
        reachLevel = Math.max(level, reachLevel);
        saveBestLevel();

        scrollSpeed = Math.max(1, scrollSpeed - 0.5);
        clearInterval(throwInterval);
        throwInterval = setInterval(throwObjects, Math.max(500, 1000 - level*50));
        showLevelLine();
        updateScoreBoard();
    }
}

// ADDS THE NEW LEVEL
function showLevelLine() {
    const levelLine = document.createElement('div');
    levelLine.classList.add('level-line');
    game.appendChild(levelLine);
    setTimeout(() => levelLine.remove() , 1000);
}

// START GAME
function startGame() {
    clearInterval(throwInterval);
    clearStrawberriesAndBroccolies();
    isGameOver = false;
    isVictory = false;
    strawberriesCount = 0;
    currentScore = 0;
    level = 1;
    isNewBestThisRun = false;
    scrollSpeed = 3;

    loadDodgerHighScoresForUser();
    updateScoreBoard();

    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    victoryScreen.classList.add('hidden');
    game.classList.remove('hidden');
    
    throwInterval = setInterval(throwObjects, 1000);
}

// END GAME - VICTORY OR FAILURE
function endGame() {
    clearInterval(throwInterval);
    finalScore.textContent = currentScore;
    collectedStrawberries.textContent = strawberriesCount;
    finalLevel.forEach(elem => elem.textContent = level);

    if (isNewBestThisRun) {
        newBestScoreMsg.classList.remove('hidden');
        newBestScoreMsg.textContent = `You Got New Best Score! ${bestScore}`;
    } else {
        newBestScoreMsg.classList.add('hidden');
    }


    game.classList.add('hidden');

    if(isVictory) {
        victoryScreen.classList.remove('hidden');
    } else {
        gameOverScreen.classList.remove('hidden');
    }

    clearStrawberriesAndBroccolies();
    
    GameStorageManager.updateCurrentUser((u) => {
        u.totalScore = (u.totalScore || 0) + currentScore;
        u.lastGamePlayed = "Strawberry Dodger";
        u.lastPlayedAt = Date.now();
    });

}

// RESTART GAME
function restartGame() {
    if(isGameOver) {
        gameOverScreen.classList.add('hidden');
    } else if(isVictory) {
        victoryScreen.classList.add('hidden');
    }
    startGame();
}

// NAVIGATION
function goHome() {
    if(!game.classList.contains('hidden')) {
        clearInterval(throwInterval);
        window.location.href = '../dodger/dodger.html';
    } else {
        window.location.href = '../html/index.html';
    }
    
}

// INITIALIZE UI FROM STORAGE
function initDodgerUIFromStorage() {
  loadDodgerHighScoresForUser();
  updateScoreBoard();
}

document.addEventListener('DOMContentLoaded', initDodgerUIFromStorage);
