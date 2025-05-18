
//global variables
let playboard = document.querySelector(".playBoard");
let startButton = document.querySelector("#start");
let stopButton = document.querySelector("#stop");
let scoreDisplay = document.querySelector("#score");

let gameStatus = false;
let score = 0;
let combo = 1;

const TARGETSCALE = .1
const TIMELIMIT = 30;

//create and return the target that the player must click within the play area
//***since playboard position is relative and target position is absolute,
//the target will appear within the playboard
function createTarget() {
    let target = document.createElement("div");
    target.classList.add("target");
    
    //scale the target and placement to the size of the playboard
    target.style.height = TARGETSCALE*playboard.clientHeight + 'px';
    target.style.width = TARGETSCALE*playboard.clientWidth + 'px';
    target.style.top = (Math.random() * (100-(TARGETSCALE*100))) + '%';
    target.style.left = (Math.random() * (100-(TARGETSCALE*100))) + '%';

    //place the target onto the playboard
    playboard.appendChild(target);
}

//Update the score tracker/display.
function updateScore(targetHit) {
    if (targetHit) {
        score += combo;
        if (combo < 5) {
            combo += 1;
        }
        scoreDisplay.textContent = score;
    } else { //If the target was missed, reset the combo to 1
        combo = 1;
    }
}

//Update the timer tracker/display.
function startTimer() {
    let timeDisplay = document.querySelector("#time");
    let count = TIMELIMIT;
    timeDisplay.textContent = count;

    let targetIntervalId = setInterval( () => {
        count -= 1;
        timeDisplay.textContent = count;
        
        //Stop the timer when the user stops the game early
        if (gameStatus == false) {
            clearInterval(targetIntervalId);
        } else if (count == 0) {
            gameStatus = false;
            clearInterval(targetIntervalId);
            //only grab the target to remove - the point elements will delete itself
            playboard.removeChild(playboard.querySelector(".target"));
        }
    }, 1000);
}


//Shows the amount of points gained from clicking on the target
function showPoint(target) {
    //Switch the class instead of making a new object (to preserve the position on the board)
    target.classList.remove("target");
    target.classList.add("point");
    target.textContent = "+" + combo;

    //Make the object fade away and delete itself once invisible
    target.style.opacity = 1;
    setInterval( () => {
        target.style.opacity = +target.style.opacity - .1;
        if (target.style.opacity == 0) {
            playboard.removeChild(target);
        }
    }, 100);
}

//Set the initial starting values and start the game
startButton.addEventListener("click", () => {
    if (!gameStatus) {
        gameStatus = true;
        startTimer();
        scoreDisplay.textContent = 0;
        score = 0;
        combo = 1;
        createTarget();
    }
})

//Stop the game
stopButton.addEventListener("click", () => {
    if (gameStatus) {
        gameStatus = false;

        //only grab the target to remove - the point elements will delete itself
        playboard.removeChild(playboard.querySelector(".target"));
    }
})

//Respond to user clicks inside the playboard.
playboard.addEventListener("click", (e) => {

    //player clicked the target
    if (e.target.classList.contains("target")) {
        showPoint(e.target);
        updateScore(true);
        createTarget();
    } else { //player missed the target
        updateScore(false);
    }
})


