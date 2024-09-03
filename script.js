// tic.js

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const cell = e.target;
        const index = cell.dataset.index;

        if (board[index] === '' && isGameActive) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            checkResult();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    const checkResult = () => {
        let roundWon = false;
        let winningCells = [];

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                winningCells = [a, b, c];
                break;
            }
        }

        if (roundWon) {
            winningCells.forEach(index => {
                cells[index].classList.add('win');
            });
            statusText.textContent = `${currentPlayer} has won!`;
            isGameActive = false;
        } else if (!board.includes('')) {
            statusText.textContent = `It's a draw!`;
            isGameActive = false;
        }
    };

    const resetGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        currentPlayer = 'X';
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('win');
        });
        statusText.textContent = '';
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
