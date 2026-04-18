const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const winnerLine = document.getElementById('winnerLine');
const difficultySelect = document.getElementById('difficultySelect');

let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let isPlayerTurn = true;

// Загружаем сохранённую сложность
let currentDifficulty = localStorage.getItem('tic_tac_toe_difficulty') || 'hard';
if (difficultySelect) {
    difficultySelect.value = currentDifficulty;
    difficultySelect.addEventListener('change', (e) => {
        currentDifficulty = e.target.value;
        localStorage.setItem('tic_tac_toe_difficulty', currentDifficulty);
        resetGame();
    });
}

const winPatterns = [
    { cells: [0, 1, 2], type: 'horizontal', position: 1 },
    { cells: [3, 4, 5], type: 'horizontal', position: 2 },
    { cells: [6, 7, 8], type: 'horizontal', position: 3 },
    { cells: [0, 3, 6], type: 'vertical', position: 1 },
    { cells: [1, 4, 7], type: 'vertical', position: 2 },
    { cells: [2, 5, 8], type: 'vertical', position: 3 },
    { cells: [0, 4, 8], type: 'diagonal', position: 1 },
    { cells: [2, 4, 6], type: 'diagonal', position: 2 }
];

function saveResult(result) {
    let stats = localStorage.getItem('tictactoe_stats');
    if (stats) {
        stats = JSON.parse(stats);
    } else {
        stats = { playerWins: 0, computerWins: 0, draws: 0 };
    }
    
    if (result === 'player') stats.playerWins++;
    else if (result === 'computer') stats.computerWins++;
    else if (result === 'draw') stats.draws++;
    
    localStorage.setItem('tictactoe_stats', JSON.stringify(stats));
}

function createBoard() {
    boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (board[i] === 'hero') {
            cell.classList.add('hero');
        } else if (board[i] === 'zero') {
            cell.classList.add('zero');
        }
        cell.addEventListener('click', () => {
            if (isPlayerTurn && gameActive && board[i] === '') {
                playerMove(i);
            }
        });
        boardElement.appendChild(cell);
    }
}

function playerMove(index) {
    if (!gameActive) return;
    board[index] = 'hero';
    createBoard();
    if (checkWinner()) return;
    isPlayerTurn = false;
    statusElement.innerHTML = 'Ход компьютера (⭕) ...';
    setTimeout(() => computerMove(), 300);
}

// ========== НОВИЧОК (случайные ходы) ==========
function computerMoveEasy() {
    const freeCells = [];
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            freeCells.push(i);
        }
    }
    if (freeCells.length === 0) return;
    const randomIndex = Math.floor(Math.random() * freeCells.length);
    const computerChoice = freeCells[randomIndex];
    board[computerChoice] = 'zero';
    createBoard();
    if (checkWinner()) return;
    isPlayerTurn = true;
    statusElement.innerHTML = 'Ваш ход (❌)';
}

// ========== ПРОДВИНУТЫЙ (умный компьютер) ==========
function findWinningMove(player) {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern.cells;
        const cells = [board[a], board[b], board[c]];
        const playerCells = cells.filter(cell => cell === player).length;
        const emptyCells = cells.filter(cell => cell === '').length;
        const emptyIndexes = [];
        if (cells[0] === '') emptyIndexes.push(a);
        if (cells[1] === '') emptyIndexes.push(b);
        if (cells[2] === '') emptyIndexes.push(c);
        if (playerCells === 2 && emptyCells === 1) {
            return emptyIndexes[0];
        }
    }
    return null;
}

function computerMoveHard() {
    let computerChoice = findWinningMove('zero');
    if (computerChoice === null) computerChoice = findWinningMove('hero');
    const zeroCount = board.filter(cell => cell === 'zero').length;
    const heroCount = board.filter(cell => cell === 'hero').length;
    if (computerChoice === null && zeroCount === 0 && heroCount === 1) {
        if (board[4] === '') computerChoice = 4;
    }
    if (computerChoice === null) {
        const freeCells = [];
        for (let i = 0; i < 9; i++) if (board[i] === '') freeCells.push(i);
        if (freeCells.length === 0) return;
        computerChoice = freeCells[Math.floor(Math.random() * freeCells.length)];
    }
    board[computerChoice] = 'zero';
    createBoard();
    if (checkWinner()) return;
    isPlayerTurn = true;
    statusElement.innerHTML = 'Ваш ход (❌)';
}

// Главная функция хода компьютера (выбор сложности)
function computerMove() {
    if (!gameActive) return;
    
    if (currentDifficulty === 'easy') {
        computerMoveEasy();
    } else {
        computerMoveHard();
    }
}

function showLine(winPattern) {
    const boardRect = boardElement.getBoundingClientRect();
    const cellSize = 100, gap = 10;
    let left, top, width, height, transform = '';
    if (winPattern.type === 'horizontal') {
        const row = winPattern.position - 1;
        top = boardRect.top + (row * (cellSize + gap)) + cellSize / 2 - 5;
        left = boardRect.left;
        width = boardRect.width;
        height = 10;
    } else if (winPattern.type === 'vertical') {
        const col = winPattern.position - 1;
        left = boardRect.left + (col * (cellSize + gap)) + cellSize / 2 - 5;
        top = boardRect.top;
        width = 10;
        height = boardRect.height;
    } else if (winPattern.type === 'diagonal') {
        width = Math.hypot(boardRect.width, boardRect.height);
        height = 10;
        if (winPattern.position === 1) {
            left = boardRect.left + (boardRect.width - width) / 2;
            top = boardRect.top + (boardRect.height - height) / 2;
            transform = 'rotate(45deg)';
        } else {
            left = boardRect.right - (boardRect.width - width) / 2 - width;
            top = boardRect.top + (boardRect.height - height) / 2;
            transform = 'rotate(-45deg)';
        }
        winnerLine.style.cssText = `display:block; left:${left}px; top:${top}px; width:${width}px; height:${height}px; transform:${transform}; transform-origin:center center;`;
        return;
    } else { winnerLine.style.display = 'none'; return; }
    winnerLine.style.cssText = `display:block; left:${left}px; top:${top}px; width:${width}px; height:${height}px; transform:none;`;
}

function checkWinner() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern.cells;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            const winner = board[a] === 'hero' ? 'player' : 'computer';
            const winnerName = board[a] === 'hero' ? 'Игрок (❌)' : 'Компьютер (⭕)';
            statusElement.innerHTML = `🏆 Победитель: ${winnerName}! 🏆`;
            showLine(pattern);
            saveResult(winner);
            return true;
        }
    }
    if (board.every(cell => cell !== '')) {
        gameActive = false;
        statusElement.innerHTML = '🤝 Ничья! 🤝';
        saveResult('draw');
        return true;
    }
    return false;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    isPlayerTurn = true;
    statusElement.innerHTML = 'Ваш ход (❌)';
    winnerLine.style.display = 'none';
    createBoard();
}

createBoard();
resetBtn.addEventListener('click', resetGame);