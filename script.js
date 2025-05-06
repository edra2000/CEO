async function fetchLiquidity(symbol = 'BTCUSDT') {
const url = `https://api.binance.com/api/v3/aggTrades?symbol=${symbol}&limit=100`;

try {
const response = await fetch(url);
const data = await response.json();

let buyVolume = 0;
let sellVolume = 0;

data.forEach(trade => {
const volume = parseFloat(trade.q);
if (trade.m === false) {
buyVolume += volume; // Buyer is taker
} else {
sellVolume += volume; // Seller is taker
}
});

const totalVolume = buyVolume + sellVolume;
const buyPercent = (buyVolume / totalVolume) * 100;
const sellPercent = (sellVolume / totalVolume) * 100;

// Update UI
document.getElementById('buyBar').style.width = `${buyPercent.toFixed(1)}%`;
document.getElementById('sellBar').style.width = `${sellPercent.toFixed(1)}%`;
document.getElementById('buyBar').textContent = `${buyPercent.toFixed(1)}%`;
document.getElementById('sellBar').textContent = `${sellPercent.toFixed(1)}%`;
document.getElementById('buyVolume').textContent = `شراء: ${buyVolume.toFixed(2)}`;
document.getElementById('sellVolume').textContent = `بيع: ${sellVolume.toFixed(2)}`;

} catch (error) {
console.error('خطأ في جلب السيولة:', error);
}
}

// تحديث كل 15 ثانية
fetchLiquidity();
setInterval(fetchLiquidity, 15000);
