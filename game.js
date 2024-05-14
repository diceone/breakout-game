const canvas = document.getElementById("breakoutCanvas");
const ctx = canvas.getContext("2d");

// Ball properties
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

// Paddle properties
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

// Brick properties
const brickWidth = 15;
const brickHeight = 15;
const brickPadding = 3;
const brickOffsetTop = 30;
const brickOffsetLeft = 170; // Adjust for centering the lungs

// Lung shape pattern
const lungPattern = [
    "0000011000000000000000110",
    "0001111100000000000011111",
    "0011111110000000001111111",
    "0111111111000000111111111",
    "0111111111100001111111111",
    "0111111111110011111111111",
    "0111111111110111111111111",
    "0111111111110111111111111",
    "0111111111110111111111111",
    "0111111111110111111111111",
    "0111111111110111111111111",
    "0111111111110111111111111",
    "0111111111110111111111111",
    "0001111111110111111111100",
    "0000111111110111111111000",
    "0000011111110111111110000",
    "0000001111110111111100000",
    "0000000111010111011100000",
    "0000000010000100010000000"
];

let bricks = [];
for (let r = 0; r < lungPattern.length; r++) {
    bricks[r] = [];
    for (let c = 0; c < lungPattern[r].length; c++) {
        if (lungPattern[r][c] === "1") {
            let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
            let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[r][c] = { x: brickX, y: brickY, status: 1 };
        } else {
            bricks[r][c] = { x: 0, y: 0, status: 0 }; // Inactive brick
        }
    }
}

// Game control
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let r = 0; r < lungPattern.length; r++) {
        for (let c = 0; c < lungPattern[r].length; c++) {
            if (bricks[r][c].status === 1) {
                ctx.beginPath();
                ctx.rect(bricks[r][c].x, bricks[r][c].y, brickWidth, brickHeight);
                ctx.fillStyle = "#fff";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for (let r = 0; r < lungPattern.length; r++) {
        for (let c = 0; c < lungPattern[r].length; c++) {
            let b = bricks[r][c];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    // Ball movement and collision with walls
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius - 10) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            document.location.reload();
        }
    }

    x += dx;
    y += dy;

    // Paddle movement
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    // Quit Smoking message
    ctx.font = "16px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Quit Smoking", canvas.width - 100, canvas.height - 10);

    requestAnimationFrame(draw);
}

draw();
