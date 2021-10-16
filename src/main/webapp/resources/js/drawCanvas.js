const canvasGraph = document.getElementById('canvas');

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

canvasGraph.addEventListener('click', function (event) {
    document.getElementById("r_input").style.removeProperty("border-color");
    document.getElementById("messageArea").innerHTML = "";
    let rVal = document.getElementById('r_input').value;
    if (!validateRadius(rVal)) {
        document.getElementById("r_input").style.borderColor = "#d94343";
        document.getElementById("messageArea").innerHTML = "Радиус не задан";
        return;
    }
    let xFromCanvas = (event.offsetX - 125) / 82 * rVal;
    if (xFromCanvas < -3) xFromCanvas = -3;
    else if (xFromCanvas > 5) xFromCanvas = 5;

    let yFromCanvas = (-event.offsetY + 125) / 82 * rVal;
    if (yFromCanvas <= -3) yFromCanvas = -3;
    else if (yFromCanvas >= 5) yFromCanvas = 5;
    $.get("app", {
        'xVal': Math.floor(xFromCanvas * 100) / 100,
        'yVal': Math.floor(yFromCanvas * 100) / 100,
        'rVal': rVal,
        'timezone': new Date().getTimezoneOffset()
    }).done(function (data) {
        document.getElementById("scroll").innerHTML = data;
        let hits = document.getElementsByClassName("hit");
        if (hits[hits.length - 1].innerHTML === "true") {
            drawPoint(xFromCanvas, yFromCanvas, rVal, "#22be00");
        } else {
            drawPoint(xFromCanvas, yFromCanvas, rVal, "#ff0000");
        }
    })
})

function drawPoint(xPosition, yPosition, radius, color) {
    yPosition = 125 - 82 * yPosition / radius;
    xPosition = 125 + 82 * xPosition / radius
    const ctx = canvasGraph.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(xPosition, yPosition);
    ctx.fillStyle = color;
    ctx.globalAlpha = 1;
    ctx.arc(xPosition, yPosition, 2.2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function drawCanvas(radius) {
    const ctx = canvasGraph.getContext('2d');
    const canvasGraphWidth = canvasGraph.clientWidth;
    const canvasGraphHeight = canvasGraph.clientHeight;
    const xAxis = canvasGraphWidth / 2;
    const yAxis = canvasGraphHeight / 2;
    const xNameAxis = canvasGraphWidth / 12;
    const yNameAxis = canvasGraphHeight / 12;
    const offsetAxis = 5;

    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    ctx.moveTo(xAxis, 0);
    ctx.lineTo(xAxis, canvasGraphHeight);
    ctx.moveTo(0, yAxis);
    ctx.lineTo(canvasGraphWidth, yAxis);
    ctx.stroke();
    ctx.closePath();

    let labels = ["5", "4", "3", "2", "1", " ", "-1", "-2", "-3", "-4", "-5"];
    ctx.font = '15px Arial';
    ctx.fillText("y", xAxis + offsetAxis, offsetAxis * 2);
    ctx.moveTo(xAxis - offsetAxis / 2, offsetAxis);
    ctx.lineTo(xAxis, 0);
    ctx.moveTo(xAxis + offsetAxis / 2, offsetAxis);
    ctx.lineTo(xAxis, 0);
    ctx.stroke();
    for (let i = 0; i < labels.length; i++) {
        ctx.moveTo(xAxis - offsetAxis / 2, yNameAxis + yNameAxis * i);
        ctx.lineTo(xAxis + offsetAxis / 2, yNameAxis + yNameAxis * i);
        ctx.stroke();
        ctx.fillText(labels[i], xAxis + offsetAxis, yNameAxis + yNameAxis * i + offsetAxis);
    }

    ctx.fillText("x", canvasGraphWidth - offsetAxis * 2, yAxis + 20);
    ctx.moveTo(canvasGraphWidth - offsetAxis, yAxis - offsetAxis / 2);
    ctx.lineTo(canvasGraphWidth, yAxis);
    ctx.moveTo(canvasGraphWidth - offsetAxis, yAxis + offsetAxis / 2);
    ctx.lineTo(canvasGraphWidth, yAxis);
    ctx.stroke();
    for (let i = 0; i < labels.length; i++) {
        ctx.moveTo(xNameAxis + xNameAxis * i, yAxis - offsetAxis / 2);
        ctx.lineTo(xNameAxis + xNameAxis * i, yAxis + offsetAxis / 2);
        ctx.stroke();
        ctx.fillText(labels[labels.length - i - 1], xNameAxis + xNameAxis * i - offsetAxis, yAxis + 20);
    }

    ctx.fillStyle = "#9933ff";
    ctx.globalAlpha = 0.4;
    ctx.fillRect(xAxis - radius * xNameAxis, yAxis, radius * xNameAxis, radius * yNameAxis);
    ctx.fillStyle = "#f53737";
    ctx.beginPath();
    ctx.moveTo(xAxis, yAxis);
    ctx.lineTo(xAxis, yAxis + yNameAxis);
    ctx.lineTo(xAxis + radius * xNameAxis, yAxis);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(xAxis, yAxis);
    ctx.fillStyle = "#ef9308";
    ctx.arc(xAxis, yAxis, xAxis - (6 - radius) * xNameAxis, Math.PI * 1.5, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

drawCanvas(2);

function slideEnd() {

}

function validateRadius(value) {
    const R_MIN = 2;
    const R_MAX = 5;
    return !!(isNumeric(value) && value > R_MIN && value < R_MAX);

}