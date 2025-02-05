const express = require('express');
const app = express();
//const PORT = 3000;
app.use(express.json());

let stocks = [
  { stockId: 1, ticker: 'AAPL', companyName: 'Apple Inc.', price: 150.75 },
  { stockId: 2, ticker: 'GOOGL', companyName: 'Alphabet Inc.', price: 2750.1 },
  { stockId: 3, ticker: 'TSLA', companyName: 'Tesla, Inc.', price: 695.5 },
];

let trades = [
  {
    tradeId: 1,
    stockId: 1,
    quantity: 10,
    tradeType: 'buy',
    tradeDate: '2024-08-07',
  },
  {
    tradeId: 2,
    stockId: 2,
    quantity: 5,
    tradeType: 'sell',
    tradeDate: '2024-08-06',
  },
  {
    tradeId: 3,
    stockId: 3,
    quantity: 7,
    tradeType: 'buy',
    tradeDate: '2024-08-05',
  },
];

async function getAllStocks() {
  return stocks;
}

async function getStockByTicker(ticker) {
  return stocks.find((stock) => stock.ticker === ticker);
}

// async function addTrade(data) {
//   data.tradeId = trades.length + 1;
//   trades.push(data);
//   return data;
// }

async function addTrade(data) {
  let newTrade = { tradeId: trades.length + 1, ...data };
  trades.push(newTrade);
  return newTrade;
}

function validateTrades(trade) {
  if (!trade.stockId || typeof trade.stockId !== 'number') {
    return 'stockId is required and should be a number.';
  }
  if (typeof trade.quantity !== 'number' || trade.quantity <= 0) {
    return 'quantity is required and should be a positive number.';
  }
  if (!['buy', 'sell'].includes(trade.tradeType)) {
    return 'tradeType must be "buy" or "sell".';
  }
  if (isNaN(Date.parse(trade.tradeDate))) {
    return 'tradeDate must be a valid date.';
  }
  return null;
}

// Exercise 1: Retrieve All Stocks

app.get('/stocks', async (req, res) => {
  const allStocks = await getAllStocks();
  res.json(allStocks);
});

// Exercise 2: Retrieve Stock by Ticker

app.get('/stocks/:ticker', async (req, res) => {
  const stock = await getStockByTicker(req.params.ticker);
  if (stock) {
    res.json(stock);
  } else {
    res.status(404).json({ message: 'Stock not found' });
  }
});

// Exercise 3: Add a New Trade

app.post('/trades/new', async (req, res) => {
  const error = validateTrades(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const newTrade = await addTrade(req.body);
  res.status(201).json({ trade: newTrade });
});

const PORT = 3000
app.listen(PORT,() => {
    console.log("server is running on port 3000 ")
});