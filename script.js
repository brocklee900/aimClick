console.log("AimClick");

let playboard = document.querySelector(".playBoard");

function createTarget() {
    let target = document.createElement("div");
    target.classList.add("target");
    
    target.style.height = .1*playboard.clientHeight + 'px';
    target.style.width = .1*playboard.clientWidth + 'px';
    target.style.top = (Math.random() * (90)) + '%';
    target.style.left = (Math.random() * (90)) + '%';

    playboard.appendChild(target);
}

let startButton = document.querySelector("#start");

startButton.addEventListener("click", () => {
    createTarget();
})