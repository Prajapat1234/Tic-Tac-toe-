let currentPlayer = ('X', 'O');
let gameBoard = Array(9).fill('');

const statusElement = document.getElementById('status');
const boardElement = document.getElementById('board');
const Popup = document.getElementById("Popup");
const wins = document.getElementById("wins");
const draw = document.getElementById("draw");
const Draw = document.getElementById("Draw");

const renderBoard = () => {
    boardElement.innerHTML = '';
    gameBoard.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = value;
        cell.onclick = () => handleClick(index);
        boardElement.appendChild(cell);
    });
};

const checkWinner = () => {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return { winner: gameBoard[a], cells: combination };
        }
    }

    return null;
};

const handleClick = (index) => {
    if (gameBoard[index] || checkWinner()) {
        return;
    }

    gameBoard[index] = currentPlayer;
    renderBoard();

    const winnerInfo = checkWinner();
    if (winnerInfo) {
        highlightWinningCells(winnerInfo.cells);
        Popup.classList.add("Pop-up");
        wins.textContent = `Player ${winnerInfo.winner} wins!`;
    }
    else if (gameBoard.every(cell => cell !== '')) {
        draw.textContent = "Nobody win👎";
        Draw.classList.add("draw-up");
        // currentPlayer();


        setTimeout(() => {
            Draw.classList.remove("draw-up");
            gameBoard = Array(9).fill('');
            renderBoard();
        }, 2500);

    }
    else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusElement.textContent = `Next player: ${currentPlayer}`;
    }
};

const highlightWinningCells = (winningCells) => {
    for (const cellIndex of winningCells) {
        const cell = boardElement.children[cellIndex];
        cell.classList.add('winning-cell');
    }
};

function closePopup() {
    Popup.classList.remove("Pop-up");
    clearBoard();
    currentPlayer();

}

const resetGame = () => {
    clearBoard();
    currentPlayer();
    statusElement.textContent = 'Next player: O';
    renderBoard();
};

const clearBoard = () => {
    boardElement.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('winning-cell');
    });
    gameBoard = Array(9).fill('');
    renderBoard();
};

renderBoard();
