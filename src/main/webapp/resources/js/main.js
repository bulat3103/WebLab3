let x, r;

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function validate() {
    let check = true;
    if (!validateX()) {
        check = false;
        document.getElementById("x_input").style.borderColor = "#d94343";
    }
    if (!validateR()) {
        check = false;
        document.getElementById("r_input").style.borderColor = "#d94343";
    }
    if (!check) document.getElementById("messageArea").innerHTML = "Некорректные данные";
    return check;
}

function validateX() {
    const X_MIN = -5;
    const X_MAX = 3;
    let xField = document.getElementById("#x_input");
    let numX = xField.val().replace(',', '.');
    if (isNumeric(numX) && numX >= X_MIN && numX <= X_MAX) {
        x = numX;
        return true;
    }
    return false;
}

function validateR() {
    const R_MIN = 2;
    const R_MAX = 5;
    let rField = document.getElementById("#r_input");
    if (rField >= R_MIN && rField <= R_MAX) {
        r = rField;
        return true;
    }
    return false;
}