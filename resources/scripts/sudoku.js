"use strict";

var _solutions = [];

function solve() {
    _solutions = [];
    var userMatrix = getMatrix("user_matrix_textarea");
    if (userMatrix !== -1) {
        var matrix = getMatrix("user_matrix_textarea");
        solvingLoop(matrix, true);
        clearSolutions();
        showSolutions(userMatrix, _solutions);
        toggleSolverMenuContainer();
    }
}


function toggleSolverMenuContainer() {
    var solverMenuContainer = document.getElementById("menu_1_container");
    if (solverMenuContainer.classList.contains("hidden")) {
        solverMenuContainer.classList.remove("hidden");
    } else {
        solverMenuContainer.classList.add("hidden");
    }
}

function clearSolutions() {
    var solutionTableContainer = document.getElementById("solution_table_container");
    while (solutionTableContainer.firstChild) {
        solutionTableContainer.removeChild(solutionTableContainer.firstChild);
    }
}

function showSolutions(userMatrix, solutions) {
    var solutionContainer = document.getElementById("solution_container");
    solutionContainer.classList.remove("hidden");
    if (solutions.length > 0) {
        document.getElementById("solution_count").innerHTML = solutions.length;
    } else {
        document.getElementById("solution_count").innerHTML = "Sorry, no";
    }
    for (var i = 0; i < solutions.length; i++) {
        var tableId = "sudoku_solution_" + i;
        prepareTable("solution_table_container", tableId, "Solution " + (i + 1) + " of " + solutions.length);
        disableAllInputs(tableId);
        fillInKnown(tableId, userMatrix);
        fillInUnknown(tableId, solutions[i]);
    }
}

function hideSolutionContainer() {
    toggleSolverMenuContainer();
    var solutionContainer = document.getElementById("solution_container");
    if (!solutionContainer.classList.contains("hidden")) {
        solutionContainer.classList.add("hidden");
    }
}

function fillInKnown(tableId, userMatrix) {
    var table = document.getElementById(tableId);
    for (var i = 0; i < 9; i++) {
        var rowInputs = table.getElementsByClassName("row" + i);
        for (var j = 0; j < 9; j++) {
            if (userMatrix[i][j] !== 0) {
                rowInputs[j].value = userMatrix[i][j];
                rowInputs[j].classList.add("known");
            }
        }
    }
}

function fillInUnknown(tableId, solvedMatrix) {
    var table = document.getElementById(tableId);
    for (var i = 0; i < 9; i++) {
        var rowInputs = table.getElementsByClassName("row" + i);
        for (var j = 0; j < 9; j++) {
            if (rowInputs[j].value.length === 0) {
                rowInputs[j].value = solvedMatrix[i][j];
                rowInputs[j].classList.add("unknown");
            }
        }
    }
}

function disableAllInputs(tableId) {
    var inputs = document.getElementById(tableId).getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
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
        _solutions[_solutions.length] = [];
        for (var a = 0; a < 9; a++) {
            _solutions[_solutions.length - 1].push(matrix[a].slice(0));
        }

        if (typeof all === "boolean")
            return !all;
    }

    //get the next best blank to fill in
    var nextBestBlank = getNextBestBlank(matrix);

    for (i = 0; i < nextBestBlank.count; i++) {
        var temp = matrix[nextBestBlank.x][nextBestBlank.y];
        matrix[nextBestBlank.x][nextBestBlank.y] = nextBestBlank.values[i];

        if (solvingLoop(matrix, all) === true) {
            return true;
        }
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
        var matrixText = document.getElementById(textAreaId).value.trim().replace(/[\r\n]+/g, ' ').replace(/\s\s+/g, ' ');
        var rawMatrix = matrixText.split(" ");
        for (var m = 0; m < rawMatrix.length; m++) {
            rawMatrix[m] = parseInt(rawMatrix[m]);
        }
        if (isUserMatrixValid(rawMatrix) === true) {
            return change1x81MatrixTo9x9Matrix(rawMatrix);
        } else {
            handleWrongInput();
            return -1;
        }
    }
}

function handleWrongInput() {
    alert("Your matrix could not be recognized. Please make sure there are 81 integers.");
}

function change1x81MatrixTo9x9Matrix(rawMatrix) {
    var converted = [];
    for (var i = 0; i < 9; i++) {
        converted[i] = [];
        for (var j = 0; j < 9; j++) {
            converted[i][j] = rawMatrix[9 * i + j];
        }
    }
    return converted;
}

function isUserMatrixValid(matrix) {
    var size = getRectangularArraySize(matrix);
    if (size.length === 1 && size[0] === 81) {
        return isAllValueSingleDigit(matrix);
    } else {
        return false;
    }

}

function isAllValueSingleDigit(array) {
    if (typeof(array.length) === "undefined") {
        return isInteger(array) && (getIntegerDigitNumber(array) === 1);
    }

    for (var i = 0; i < array.length; i++) {
        if (isAllValueSingleDigit(array[i]) === false) {
            return false;
        }
    }

    return true;
}

function isInteger(x) {
    return (typeof(x) === "number") && (x % 1 === 0);
}

function getIntegerDigitNumber(x) {
    if (typeof(x) !== "number")
        return -1;
    if (isInteger(x) === false)
        return -1;

    var i = 0;
    while (x >= 1) {
        x = x / 10;
        i++;
    }
    if (x === 0)
        i++;

    return i;
}

function getRectangularArraySize(array) {
    var rowNo = array.length;
    var tempSize;

    if (typeof(rowNo) === "undefined") {
        return 0;
    }
    else {
        tempSize = array[0].length;
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
                return [rowNo];
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


function prepareTable(destinationParentId, tableId, tableCaption) {
    if (document.getElementById(tableId))
        return;
    //create the biggest table
    var sudokuContainer = document.getElementById(destinationParentId);
    var sudokuTable = document.createElement("table");
    sudokuTable.classList.add("solution");
    sudokuTable.setAttribute("id", tableId);
    sudokuTable.setAttribute("cellspacing", "1px");
    sudokuTable.setAttribute("cellpadding", "0px");
    var sudokuCaption = document.createElement("caption");
    sudokuCaption.innerHTML = tableCaption;
    sudokuTable.appendChild(sudokuCaption);
    for (var tableRowNo = 0; tableRowNo < 3; tableRowNo++) {
        var tableRow = document.createElement("tr");
        for (var innerTableNo = 0; innerTableNo < 3; innerTableNo++) {
            var innerCell = document.createElement("td");
            var innerTable = document.createElement("table");
            innerTable.setAttribute("class", "innerTable");
            innerTable.setAttribute("cellspacing", "1px");
            innerTable.setAttribute("cellpadding", "0px");
            for (var innerTableRowNo = 0; innerTableRowNo < 3; innerTableRowNo++) {
                var innerTableRow = document.createElement("tr");
                innerTableRow.setAttribute("class", "innerTableRow");
                for (var innerTableCellNo = 0; innerTableCellNo < 3; innerTableCellNo++) {
                    var innerTableCell = document.createElement("td");
                    var input = document.createElement("input");
                    innerTableCell.setAttribute("class", "innerTableCell");
                    input.setAttribute("type", "text");
                    input.setAttribute("class", "row" + (tableRowNo * 3 + innerTableRowNo) + " col" + (innerTableNo * 3 + innerTableCellNo % 3));
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
    setOddStyle();
}

function setOddStyle() {
    var innerTables = document.getElementsByClassName("innerTable");
    var even = false;
    for (var i = 0; i < innerTables.length; i++) {
        if (!even) {
            innerTables[i].classList.add("odd");
        }
        even = !even;
    }
}

function prepareSolveBtn() {
    var solveBtn = document.getElementById("solve_btn");
    solveBtn.onclick = solve;
}

function prepareSolveAnotherBtn() {
    var solveAnother = document.getElementById("solve_another");
    solveAnother.onclick = hideSolutionContainer;
}

addLoadEvent(prepareSolveBtn);
addLoadEvent(prepareSolveAnotherBtn);

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