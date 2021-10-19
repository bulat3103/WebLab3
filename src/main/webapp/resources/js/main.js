function validateValues() {
    document.getElementById("messageArea").innerHTML = "";
    let message = "";
    let check = true;
    if (!validateX()) {
        check = false;
        message += "X - число в интервале [-5;3]!\n";
    }
    if (!validateY()) {
        check = false;
        message += "Y не выбран!\n";
    }
    if (!validateR()) {
        check = false;
        message += "Радиус не задан!\n";
    }
    if (!check) document.getElementById("messageArea").innerHTML = message;
    return check;
}

function validateX() {
    const X_MIN = -5.0;
    const X_MAX = 3.0;
    let xVal = document.getElementById("input_form:x_input").value;
    let numX = xVal.replace(',', '.');
    if (isNumeric(numX) && numX >= X_MIN && numX <= X_MAX) {
        return true;
    }
    return false;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function validateY() {
    let ch = false;
    if(document.getElementById("input_form:j_idt20_input").ariaChecked === "true") {
        ch = true;
    }
    if(document.getElementById("input_form:j_idt21_input").ariaChecked === "true") {
        ch = true;
    }
    if(document.getElementById("input_form:j_idt22_input").ariaChecked === "true") {
        ch = true;
    }
    if(document.getElementById("input_form:j_idt23_input").ariaChecked === "true") {
        ch = true;
    }
    if(document.getElementById("input_form:j_idt24_input").ariaChecked === "true") {
        ch = true;
    }
    if(document.getElementById("input_form:j_idt25_input").ariaChecked === "true") {
        ch = true;
    }
    if(document.getElementById("input_form:j_idt26_input").ariaChecked === "true") {
        ch = true;
    }
    return ch;
}

function validateR() {
    let rVal = document.getElementById("input_form:r_hidden").value;
    if (rVal === "") {
        return false;
    }
    return true;
}