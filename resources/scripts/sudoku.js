var answers = [];

function solve() {
    var matrix = getMatrix();
    matrix = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
    displayMatrixConsole(matrix);
    solvingLoop(matrix, false);
    console.log("answers length: " + answers.length);
    for (var i = 0; i < answers.length; i++) {
        console.log("Answer " + (i + 1) + ": ");
        displayMatrixConsole(answers[i]);
    }
}

function solvingLoop(matrix, all) {
    //test whether the matrix is solved
    var i, j;
    var solved = true;

    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            if (matrix[i][j] === 0) {
                solved = false;
                break;
            }
        }

        if (solved === false)
            break;
    }

    if (solved === true) {
        answers[answers.length] = [];
        for (var a = 0; a < 9; a++) {
            answers[answers.length - 1].push(matrix[a].slice(0));
        }

        if (typeof all === "boolean")
            return !all;
    }

    //get the next best blank to fill in
    var nextBestBlank = getNextBestBlank(matrix);

    for (i = 0; i < nextBestBlank.count; i++) {
        //console.log("Try " + nextInput.values[i] + " at [" + nextInput.x + ", " + nextInput.y + "], which has " + nextInput.count + "possibilities.");
        var temp = matrix[nextBestBlank.x][nextBestBlank.y];
        matrix[nextBestBlank.x][nextBestBlank.y] = nextBestBlank.values[i];

        if (solvingLoop(matrix, all) === true) {
            return true;
        }
        //console.log("Failed...Restoring...");
        //restore the matrix for other loops
        matrix[nextBestBlank.x][nextBestBlank.y] = temp;
    }
    // when all possibilities on this path fails, return false.
    // false will be used to restoring puzzle to last state,
    // or to end the solving process because it has no solution.
    return false;
}

function getMatrix(textAreaId) {
    var matrix = [];

    if (arguments.length === 0) {
        for (var i = 0; i < 9; i++) {
            matrix[i] = [];

            var rowInputs = document.getElementsByClassName("row" + i);

            for (var j = 0; j < 9; j++) {
                if (rowInputs[j] && rowInputs[j].value <= 9 && rowInputs[j].value >= 1) {
                    matrix[i][j] = rowInputs[j].value;
                } else {
                    matrix[i][j] = 0;
                }
            }
        }
        return matrix;
    } else if (arguments.length === 1) {
        var matrixText = document.getElementById(textAreaId).value.trim().replace(/\s\s+/g, ' ');
        var rawMatrix = matrixText.split(" ");

    }
}

function validateUserMatrix(matrix) {
    if (matrix.length === 81) {

    } else if (matrix) {

    }

}


function getRectangularArraySize(array) {
    var rowNo = array.length;
    var tempSize;

    console.log("start of loop of array: " + array);
    if (typeof(rowNo) === "undefined") {
        console.log("end of loop of array:" + array);
        return 0;
    }
    else {
        tempSize = array[0].length;
        console.log("loop success. tempSize = " + tempSize + " of array: " + array[0]);
    }

    var next;

    for (var i = 0; i < rowNo; i++) {
        if (tempSize !== array[i].length)
            return -1;
        next = getRectangularArraySize(array[i]);
        switch (next) {
            case -1:
                return -1;
            case 0:
                return rowNo;
        }
    }

    return [rowNo].concat([next]);
}

function getNextBestBlank(matrix) {
    var nextInput = {
        x: 0,
        y: 0,
        count: 9,
        values: []
    };
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (matrix[i][j]) continue;
            var possibilities = getPossibilities(i, j, matrix);
            if (possibilities.length < nextInput.count) {
                nextInput.x = i;
                nextInput.y = j;
                nextInput.count = possibilities.length;
                nextInput.values = possibilities;
            }
            if (nextInput.count === 1) return nextInput;
        }
    }
    //console.log("Next input is " + nextInput.count + "possibilities at [" + nextInput.x + ", " + nextInput.y +"].");
    return nextInput;
}

function getPossibilities(x, y, matrix) {
    var possibilities = [];

    for (var n = 1; n <= 9; n++) {
        var m = 0;
        for (; m < 9; m++) {
            //row test
            if (matrix[x][m] === n && m !== y) {
                break;
            }
            //column test
            if (matrix[m][y] === n && m !== x) {
                break;
            }
            //innerTable test
            var i = Math.floor(x / 3) * 3 + Math.floor(m / 3);
            var j = Math.floor(y / 3) * 3 + m % 3;
            if (matrix[i][j] === n && i !== x && j !== y) {
                break;
            }
        }

        //if n passes all rows, columns and innerTable tests
        if (m === 9) {
            possibilities.push(n); //then add n to possibilities
        }
    }
    return possibilities;
}

function displayMatrixConsole(matrix) {
    for (var i = 0; i < 9; i++) {
        console.log("[" + matrix[i][0] + ", " + matrix[i][1] + ", " + matrix[i][2] + ", " + matrix[i][3] + ", " + matrix[i][4] + ", " + matrix[i][5] + ", " + matrix[i][6] + ", " + matrix[i][7] + ", " + matrix[i][8] + "]");
    }
}


function findSames(number) {
    var sames = [];
    var allInputs = document.getElementById("sudoku_table").getElementsByTagName("input");
    for (var i = 0; i < allInputs.length; i++) {
        if (allInputs[i].value === number)
            sames.push(allInputs[i]);
    }
    return sames;
}

function checkErrors() {
    var errors = [];
    //finding error within a innerTable
    var innerTables = document.getElementsByClassName("innerTable");
    for (var innerTableNo = 0; innerTableNo < 9; innerTableNo++) {
        var inputs = innerTables[innerTableNo].getElementsByTagName("input");

        for (var inputsNo = 0; inputsNo < 9; inputsNo++) {
            if (inputs[inputsNo].value) {
                for (var i = 0; i < 9; i++) {
                    if (!inputs[i]) continue;
                    if (inputsNo === i) continue;
                    if (parseInt(inputs[inputsNo].value, 10) === parseInt(inputs[i].value, 10)) {
                        errors.push(inputs[inputsNo]);
                        break;
                    }
                }
            }
        }
    }
    //finding error within a row
    for (var rowNo = 0; rowNo < 9; rowNo++) {
        var rowInputs = document.getElementsByClassName("row" + rowNo);
        for (inputsNo = 0; inputsNo < 9; inputsNo++) {
            if (rowInputs[inputsNo].value) {
                for (i = 0; i < 9; i++) {
                    if (!rowInputs[i]) continue;
                    if (inputsNo === i) continue;
                    if (parseInt(rowInputs[inputsNo].value, 10) === parseInt(rowInputs[i].value, 10)) {
                        errors.push(rowInputs[inputsNo]);
                        break;
                    }
                }
            }
        }
    }
    //finding error within a column
    for (var colNo = 0; colNo < 9; colNo++) {
        var colInputs = document.getElementsByClassName("col" + colNo);
        for (inputsNo = 0; inputsNo < 9; inputsNo++) {
            if (colInputs[inputsNo].value) {
                for (i = 0; i < 9; i++) {
                    if (!colInputs[i]) continue;
                    if (inputsNo === i) continue;
                    if (parseInt(colInputs[inputsNo].value, 10) === parseInt(colInputs[i].value, 10)) {
                        errors.push(colInputs[inputsNo]);
                        break;
                    }
                }
            }
        }
    }
    //clear all errors
    clearAllStyle();
    //apply all errors
    var boolean = false;
    if (errors.length > 0) {
        boolean = true;
    }
    while (errors.length > 0) {
        errors.pop().classList.add("wrong");
    }
    return boolean;
}

function prepareHints() {
    for (var i = 0; i < allInputs.length; i++) {
        allInputs[i].onclick = function () {
            if (!this.value)
                return false;

            clearAllStyle();
            checkErrors();

            var hints = findSames(this.value);
            for (var j = 0; j < hints.length; j++) {
                hints[j].classList.add("same");
                saveGame();
            }
        };
        allInputs[i].addEventListener("change", function () {
            if (!this.value)
                return false;

            clearAllStyle();
            checkErrors();

            var hints = findSames(this.value);
            for (var j = 0; j < hints.length; j++) {
                hints[j].classList.add("same");
                saveGame();
            }
        }, false);
    }
}


function prepareBegin() {
    document.getElementById("begin").onclick = function () {
        prepareTable();
    }
}

function prepareMenu1Btns() {
    document.getElementById("custom_game_btn").onclick = getMenu1Onclick("custom_game_menu_container");

    document.getElementById("new_game_btn").onclick = getMenu1Onclick("new_game_menu_container");

    document.getElementById("solver_btn").onclick = getMenu1Onclick("solver_menu_container");

    function getMenu1Onclick(id) {
        return function () {
            var menu1Btn = document.getElementById(id);

            if (menu1Btn.classList.contains("shown"))
                return;

            hideAllMenu2s();
            menu1Btn.classList.remove("hidden");
            menu1Btn.classList.add("shown");
        }
    }
}

function hideAllMenu2s() {
    var menu2s = document.getElementsByClassName("menu_2");
    for (var i = 0; i < menu2s.length; i++) {
        menu2s[i].classList.remove("shown");
        menu2s[i].classList.add("hidden");
    }
}

function prepareTable() {
    if (document.getElementById("sudoku_table"))
        return;
    //create the biggest table
    var sudokuContainer = document.getElementById("sudoku_container");
    var sudokuTable = document.createElement("table");
    sudokuTable.setAttribute("id", "sudoku_table");
    for (var tableRowNo = 0; tableRowNo < 3; tableRowNo++) {
        var tableRow = document.createElement("tr");
        for (var innerTableNo = 0; innerTableNo < 3; innerTableNo++) {
            var innerCell = document.createElement("td");
            var innerTable = document.createElement("table");
            innerTable.setAttribute("class", "innerTable");
            for (var innerTableRowNo = 0; innerTableRowNo < 3; innerTableRowNo++) {
                var innerTableRow = document.createElement("tr");
                innerTableRow.setAttribute("class", "innerTableRow");
                for (var innerTableCellNo = 0; innerTableCellNo < 3; innerTableCellNo++) {
                    var innerTableCell = document.createElement("td");
                    var input = document.createElement("input");
                    innerTableCell.setAttribute("class", "innerTableCell");
                    input.setAttribute("type", "text");
                    input.setAttribute("id", "" + tableRowNo + innerTableNo + innerTableRowNo + innerTableCellNo);
                    input.setAttribute("maxlength", "1");
                    innerTableRow.appendChild(innerTableCell);
                    innerTableCell.appendChild(input);
                }
                innerTable.appendChild(innerTableRow);
            }
            innerCell.appendChild(innerTable);
            tableRow.appendChild(innerCell);
        }
        sudokuTable.appendChild(tableRow);
    }
    sudokuContainer.appendChild(sudokuTable);
}

addLoadEvent(prepareBegin);
addLoadEvent(prepareMenu1Btns);

function addLoadEvent(func) {
    var oldOnload = window.onload;
    if (typeof(oldOnload) === "function") {
        window.onload = function () {
            oldOnload();
            func();
        }
    }
    else {
        window.onload = func;
    }
}