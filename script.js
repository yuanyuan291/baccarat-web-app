let bankerCount = 0;
let playerCount = 0;
let tieCount = 0;
let history = [];

let initialFunds = 0;
let targetProfit = 0;
let currentFunds = 0;

// 開始遊戲，設置初始資金和目標盈利
function startGame() {
    initialFunds = parseFloat(document.getElementById('initialFunds').value);
    targetProfit = parseFloat(document.getElementById('targetFunds').value);
    currentFunds = initialFunds;
    document.getElementById('currentFunds').innerText = currentFunds.toFixed(2);
    document.getElementById('profitLoss').innerText = '0';
}

// 記錄結果並計算資金變化
function recordResult(result) {
    let betAmount = 100; // 假設每次下注100元
    if (result === '莊') {
        bankerCount++;
        currentFunds += betAmount; // 莊家贏，加錢
    } else if (result === '閒') {
        playerCount++;
        currentFunds += betAmount; // 閒家贏，加錢
    } else if (result === '和') {
        tieCount++;
        // 和局，不加不減
    } else {
        return;
    }

    // 更新統計數據和歷史記錄
    updateStats();
    updateHistory(result);

    // 更新資金狀況
    updateFunds();

    // 提供下注建議
    suggestNextBet();
}

// 更新統計數據
function updateStats() {
    document.getElementById('bankerCount').innerText = bankerCount;
    document.getElementById('playerCount').innerText = playerCount;
    document.getElementById('tieCount').innerText = tieCount;
}

// 更新歷史記錄表格
function updateHistory(result) {
    const historyTable = document.getElementById('historyTable');
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    
    cell1.textContent = history.length + 1;
    cell2.textContent = result;
    
    row.appendChild(cell1);
    row.appendChild(cell2);
    historyTable.appendChild(row);
    history.push(result);
}

// 更新資金狀況
function updateFunds() {
    let profitLoss = currentFunds - initialFunds;
    document.getElementById('currentFunds').innerText = currentFunds.toFixed(2);
    document.getElementById('profitLoss').innerText = profitLoss.toFixed(2);

    // 假如達到目標盈利，停止遊戲
    if (profitLoss >= targetProfit) {
        alert('達到目標盈利！遊戲結束');
    }
}

// 根據歷史提供下一局建議
function suggestNextBet() {
    let nextBet = '莊';
    if (playerCount > bankerCount) {
        nextBet = '莊';
    } else if (bankerCount > playerCount) {
        nextBet = '閒';
    } else {
        nextBet = '和';
    }
    document.getElementById('nextBet').innerText = `建議投注：${nextBet}`;
}
