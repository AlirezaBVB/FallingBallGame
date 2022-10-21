var ball = document.getElementById("ball");
var game = document.getElementById("game")
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];
var blocks;
var gameLevel = 0.5;

const moveLeft = () => {
    var left = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    if (left > 0) {
        ball.style.left = left - 2 + "px"
    }
}

const moveRight = () => {
    var left = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    if (left < 380) {
        ball.style.left = left + 2 + "px"
    }
}

// Move The F. Ball
document.addEventListener("keydown", event => {
    if (both == 0) {
        both++;
        if (event.key === "ArrowLeft") {
            interval = setInterval(moveLeft, 1)
        }
        if (event.key === "ArrowRight") {
            interval = setInterval(moveRight, 1)
        }
    }
});

// Stop Moving Ball
document.addEventListener("keyup", event => {
    clearInterval(interval);
    both = 0;
})

// Current Blocks
blocks = setInterval(function () {
    var blockLast = document.getElementById("block" + (counter - 1));
    var holeLast = document.getElementById("hole" + (counter - 1));

    // Change Game Level
    if (counter > 15) {
        gameLevel = 1;
    } else if (counter > 20) {
        gameLevel = 1.5;
    } else if (counter > 25) {
        gameLevel = 2;
    }

    // Calc Last Block Top
    if (counter > 0) {
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }

    // Create New Blocks
    if (blockLastTop < 400 || counter == 0) {
        var block = document.createElement("div");
        var hole = document.createElement("div");

        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");

        block.setAttribute("id", "block" + counter);
        hole.setAttribute("id", "hole" + counter);

        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";

        var random = Math.floor(Math.random() * 360);
        hole.style.left = random + "px"

        game.appendChild(block);
        game.appendChild(hole);

        currentBlocks.push(counter);

        counter++;
    }

    //Calc Ball Props
    var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    var ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    var drop = 0;

    // Game Over
    if (ballTop <= 0) {
        alert("You Lost Bruda, Your Score is: " + (counter - 9));
        clearInterval(blocks);
        location.reload();
    }

    // Moving Ball & Blocks
    for (i = 0; i < currentBlocks.length; i++) {
        let current = currentBlocks[i];

        let ihole = document.getElementById("hole" + current);
        let iblock = document.getElementById("block" + current);

        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));

        iblock.style.top = iblockTop - gameLevel + "px";
        ihole.style.top = iblockTop - gameLevel + "px";

        if (iblockTop < -20) {
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
        }
        if (iblockTop - 20 < ballTop && iblockTop > ballTop) {
            drop++;
            if (iholeLeft <= ballLeft && iholeLeft + 20 >= ballLeft) {
                drop = 0;
            }
        }
    }

    // Drop Ball From Hole
    if (drop == 0) {
        if (ballTop < 480) {
            ball.style.top = ballTop + 2 + "px";
        }
    } else {
        ball.style.top = ballTop - gameLevel + "px";
    }

}, 1)
