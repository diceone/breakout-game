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
const brickWidth = 20;
const brickHeight = 20;
const brickPadding = 2;
const brickOffsetTop = 30;
const brickOffsetLeft = 250; // Adjust for centering the lungs

// Lung shape pattern
const lungPattern = [
    "011000000000011",
    "1111000000001111",
    "1111100000011111",
    "1111110000111111",
    "1111111001111111",
    "1111111011111111",
    "1111111011111111",
    "1111111011111111",
    "1111111011111111",
    "1111111011111111",
    "1111111011111111",
    "1111111011111111",
    "1111111011111111",
    "011111101111110",
    "001111101111100",
    "000111101111000",
    "000011101110000",
    "000001001000000"
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
