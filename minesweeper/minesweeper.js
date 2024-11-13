let board = [];
let rows = 8;
let columns = 8;

let minesCount = 10;
let minesLocation = []; // "2-2", "3-4", "2-1"

let tilesClicked = 0; // Goal to click all tiles except the ones containing mines
let flagEnabled = false; // Initially set flag mode to false
let gameOver = false;

window.onload = function() {
    startGame();
}

function setMines() {
    let minesLeft = minesCount;
    minesLocation = []; // Clear previous mines
    while (minesLeft > 0) { 
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }
}

function startGame() {
    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("flag-button").addEventListener("click", setFlag);
    setMines();

    // Clear board array and reset clicked tiles count
    tilesClicked = 0;
    gameOver = false;

    // Clear the board div to remove any old tiles
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = '';

    // Rebuild the board
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            boardElement.append(tile);
            row.push(tile);
        }
        board.push(row);
    }
}

function setFlag() {
    // Toggle the flagEnabled state
    flagEnabled = !flagEnabled;

    // Update button background color based on flagEnabled status
    if (flagEnabled) {
        document.getElementById("flag-button").style.backgroundColor = "darkgray";
    } else {
        document.getElementById("flag-button").style.backgroundColor = "lightgray";
    }
}

function clickTile() {
    // Do nothing if the game is over or the tile is already clicked
    if (gameOver || this.classList.contains("tile-clicked")) {
        return;
    }

    let tile = this;
    
    if (flagEnabled) {
        // Toggle flag mode (add or remove the 'flagged' class)
        if (tile.classList.contains("flagged")) {
            tile.classList.remove("flagged");
        } else {
            tile.classList.add("flagged");
        }
        return; // Exit the function after flagging
    }

    // If not in flag mode, reveal the tile
    if (minesLocation.includes(tile.id)) {
        gameOver = true;
        revealMines();
        return;
    }

    let coords = tile.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);
}

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "💣";
                tile.style.backgroundColor = "red";                
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if (board[r][c].classList.contains("tile-clicked")) {
        return;
    }

    board[r][c].classList.add("tile-clicked");
    tilesClicked += 1;

    let minesFound = 0;

    // Check surrounding tiles for mines
    minesFound += checkTile(r-1, c-1);      // top left
    minesFound += checkTile(r-1, c);        // top 
    minesFound += checkTile(r-1, c+1);      // top right
    minesFound += checkTile(r, c-1);        // left
    minesFound += checkTile(r, c+1);        // right
    minesFound += checkTile(r+1, c-1);      // bottom left
    minesFound += checkTile(r+1, c);        // bottom 
    minesFound += checkTile(r+1, c+1);      // bottom right

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    } else {
        board[r][c].innerText = "";
        checkMine(r-1, c-1);    // top left
        checkMine(r-1, c);      // top
        checkMine(r-1, c+1);    // top right
        checkMine(r, c-1);      // left
        checkMine(r, c+1);      // right
        checkMine(r+1, c-1);    // bottom left
        checkMine(r+1, c);      // bottom
        checkMine(r+1, c+1);    // bottom right
    }

    if (tilesClicked == rows * columns - minesCount) {
        document.getElementById("mines-count").innerText = "Cleared";
        gameOver = true;
    }
}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}
