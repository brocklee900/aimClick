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

let startButton = document.querySelector("#start");
let stopButton = document.querySelector("#stop");
let gameStatus = false;

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

startButton.addEventListener("click", () => {
    if (!gameStatus) {
        gameStatus = true;
        startTimer();
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
        playboard.removeChild(e.target);
        playboard.appendChild(createTarget());
    }
})


