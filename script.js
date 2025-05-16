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

startButton.addEventListener("click", () => {
    gameStatus = true;
    playboard.appendChild(createTarget());
})

stopButton.addEventListener("click", () => {
    gameStatus = false;
    playboard.removeChild(playboard.lastElementChild);
})

playboard.addEventListener("click", (e) => {
    if (e.target.classList.contains("target")) {
        playboard.removeChild(e.target);
        playboard.appendChild(createTarget());
    }
})


