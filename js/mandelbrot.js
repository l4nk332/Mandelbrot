"use strict";

// Create canvas
let canvas = document.createElement("canvas");
// Set drawing context
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let body = document.querySelector("body");
body.appendChild(canvas);

// Set-up canvas coordinate plane
ctx.translate(canvas.width/2, canvas.height/2);
ctx.scale(1, -1);

// Draw coordinate plane
function drawGraph() {
    ctx.beginPath()
    ctx.moveTo(0, canvas.height)
    ctx.lineTo(0, -1*canvas.height);
    ctx.moveTo(canvas.width, 0)
    ctx.lineTo(canvas.width*-1, 0);
    ctx.stroke();
}

// Provide color based on pixel x | y and maxIteration
function getColorCoord(pX, pY, maxIteration) {
    let scaledX = pX/(canvas.width/3.5);
    let scaledY = pY/(canvas.height/2);
    let x = 0.0;
    let y = 0.0;
    let iteration = 0;
    while (x*x + y*y < 2*2 && iteration < maxIteration) {
	let xTemp = x*x - y*y + scaledX;
	y = 2*x*y + scaledY;
	x = xTemp;
	iteration = iteration + 1;
    }
    let color = Math.floor(Math.min(255, 255*(iteration/maxIteration)));
    let rgb = `rgb(${color}, ${color}, ${color})`;
    return rgb;
}

// Render pixel on the screen given x | y
function renderPixel(x, y, maxIteration) {
    let color = getColorCoord(x, y, maxIteration);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}

// Render each pixel in the coordinate plane
function drawSet(maxIteration=4) {
    for (let i = (-1*canvas.width); i < canvas.width; i++) {
	for (let j = (-1*canvas.height); j < canvas.height/2; j++) {
	    renderPixel(i, j, maxIteration);
	}
    }
}

// Click event triggers infinite rendering intervals
window.addEventListener("click", function(e) {
    let counter = 1;
    setInterval(function() {
	ctx.clearRect(-1*canvas.width,-1*canvas.height, canvas.width, canvas.height);
	drawSet(counter);
	counter++;
    }, 1000);
});

drawGraph();
