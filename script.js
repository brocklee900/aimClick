console.log("AimClick");

let playboard = document.querySelector(".playBoard");

function createTarget() {
    let target = document.createElement("div");
    target.classList.add("target");
    
    target.style.height = .1*playboard.clientHeight + 'px';
    target.style.width = .1*playboard.clientWidth + 'px';
    target.style.top = (Math.random() * (90)) + '%';
    target.style.left = (Math.random() * (90)) + '%';

    return target;
}

let scoreDisplay = document.querySelector("#score");
let score = 0;
let combo = 1;
function updateScore(targetHit) {
    if (targetHit) {
        score += combo;
        if (combo < 5) {
            combo += 1;
        }
        scoreDisplay.textContent = score;
    } else {
        combo = 1;
    }
}

const TIMELIMIT = 30;
let timeDisplay = document.querySelector("#time");
let intervalId;

function startTimer() {
    let count = TIMELIMIT;
    timeDisplay.textContent = count
    intervalId = setInterval( () => {
        count -= 1;
        timeDisplay.textContent = count;
        
        if (count == 0) {
            gameStatus = false;
            clearInterval(intervalId);
            playboard.removeChild(playboard.lastElementChild);
        }
    }, 1000);
}

let startButton = document.querySelector("#start");
let stopButton = document.querySelector("#stop");
let gameStatus = false;

startButton.addEventListener("click", () => {
    if (!gameStatus) {
        gameStatus = true;
        startTimer();
        scoreDisplay.textContent = 0;
        score = 0;
        combo = 1;
        playboard.appendChild(createTarget());
    }
})

stopButton.addEventListener("click", () => {
    if (gameStatus) {
        gameStatus = false;
        clearInterval(intervalId);
        playboard.removeChild(playboard.lastElementChild);
    }
})

playboard.addEventListener("click", (e) => {

    if (e.target.classList.contains("target")) {
        updateScore(true, scoreDisplay);
        playboard.removeChild(e.target);
        playboard.appendChild(createTarget());
    } else {
        updateScore(false, scoreDisplay);
    }
})


