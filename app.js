const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Create the paddle
const paddleWidth = 10, paddleHeight = 60;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;

// Create the ball
const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Draw the paddles
function drawPaddle(x, y) {
    ctx.fillStyle = '#000';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

// Draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.closePath();
}

// Draw everything
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    drawPaddle(0, leftPaddleY);
    drawPaddle(canvas.width - paddleWidth, rightPaddleY);

    // Draw ball
    drawBall();

    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Bounce off the top and bottom edges
    if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Bounce off left paddle
    if (ballX - ballSize < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Bounce off right paddle
    if (ballX + ballSize > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Move the right paddle towards the ball
    if (rightPaddleY + paddleHeight / 2 < ballY) {
        rightPaddleY += 5;
    } else {
        rightPaddleY -= 5;
    }
}

// Main game loop
function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

// Handle user input
document.addEventListener('keydown', (e) => {
    // Move left paddle up
    if (e.key === 'ArrowUp' && leftPaddleY > 0) {
        leftPaddleY -= 10;
    }

    // Move left paddle down
    if (e.key === 'ArrowDown' && leftPaddleY < canvas.height - paddleHeight) {
        leftPaddleY += 10;
    }
});

// Start the game loop
gameLoop();
