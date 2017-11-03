function validate() {
    validateEmpty();
    validateCapitalLetter();
}

function prepareFormOnSubmit() {
    var form = document.getElementById("food_form");
    form.onsubmit = function () {
        return validate();
    }
}

addLoadEvent(prepareFormOnSubmit);

function addLoadEvent(func) {
    var oldOnLoad = window.onload;
    if (typeof oldOnLoad === "function") {
        window.onload = function () {
            oldOnLoad();
            func();
        }
    } else {
        window.onload = func;
    }
}