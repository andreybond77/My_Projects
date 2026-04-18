function loadStats() {
    let stats = localStorage.getItem('tictactoe_stats');
    if (stats) {
        stats = JSON.parse(stats);
    } else {
        stats = { playerWins: 0, computerWins: 0, draws: 0 };
    }
    
    document.getElementById('playerWins').textContent = stats.playerWins;
    document.getElementById('computerWins').textContent = stats.computerWins;
    document.getElementById('draws').textContent = stats.draws;
}

function resetStats() {
    if (confirm('Вы уверены, что хотите сбросить всю статистику?')) {
        localStorage.removeItem('tictactoe_stats');
        loadStats();
    }
}

document.getElementById('resetStatsBtn').addEventListener('click', resetStats);
loadStats();