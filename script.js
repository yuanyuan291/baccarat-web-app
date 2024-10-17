let bankerCount = 0;
let playerCount = 0;
let tieCount = 0;
let history = [];

// 記錄結果
function recordResult(result) {
    // 更新計數
    if (result === '莊') {
        bankerCount++;
    } else if (result === '閒') {
        playerCount++;
    } else if (result === '和') {
        tieCount++;
    }

    // 更新統計數據
    document.getElementById('bankerCount').innerText = bankerCount;
    document.getElementById('playerCount').innerText = playerCount;
    document.getElementById('tieCount').innerText = tieCount;

    // 添加到歷史記錄
    history.push(result);
    updateHistoryTable();

    // 提供下注建議
    suggestNextBet();
}

// 更新歷史記錄表格
function updateHistoryTable() {
    const historyTable = document.getElementById('historyTable');
    historyTable.innerHTML = '';  // 清空表格

    history.forEach((result, index) => {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');
        
        cell1.textContent = index + 1;
        cell2.textContent = result;

        row.appendChild(cell1);
        row.appendChild(cell2);
        historyTable.appendChild(row);
    });
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
