let gameBoard = [];
let currentPlayer = 'X';
let gameOver = false;

// Create game board array
for (let i = 0; i < 9; i++) {
    gameBoard.push('');
}

// Add event listeners to cells
document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (!gameOver && gameBoard[index] === '') {
            gameBoard[index] = currentPlayer;
            cell.classList.add(currentPlayer.toLowerCase());
            checkWin();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

// Check for win
function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        if (gameBoard[condition[0]] === gameBoard[condition[1]] && gameBoard[condition[1]] === gameBoard[condition[2]] && gameBoard[condition[0]] !== '') {
            gameOver = true;
            alert(`Player ${gameBoard[condition[0]]} wins!`);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameOver = true;
        alert('It\'s a draw!');
    }
}

// Reset game
document.getElementById('reset-button').addEventListener('click', () => {
    gameBoard = [];
    currentPlayer = 'X';
    gameOver = false;
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
    });
    for (let i = 0; i < 9; i++) {
        gameBoard.push('');
    }
});