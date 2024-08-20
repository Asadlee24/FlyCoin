const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const crypto = require('crypto'); // For generating unique IDs

// Replace with your Telegram Bot API token
const token = '7310534646:AAENoCC1Qqi3etexxVY_rsbbwVAInVKRKYs';
const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(bodyParser.json());

let users = {}; // In-memory store, use a database in production

// Handle new chat members (user joins)
bot.on('new_chat_members', async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.new_chat_members[0].id;

  // Register new user and generate a referral link
  const userCode = crypto.randomBytes(8).toString('hex').toUpperCase();
  users[userId] = { referralCode: userCode };

  const referralLink = `https://yourapp.com/?ref=${userCode}`;
  bot.sendMessage(chatId, `Welcome! Your referral link is: ${referralLink}`);
});

// Handle incoming messages
app.post('/webhook', (req, res) => {
  const update = req.body;
  const chatId = update.message.chat.id;
  const text = update.message.text;

  if (text === '/start') {
    bot.sendMessage(chatId, 'Welcome to the mining app! Use /mining to start mining.');
  } else if (text === '/mining') {
    bot.sendMessage(chatId, 'You can start mining by clicking the coin!');
  }

  res.sendStatus(200);
});

// Endpoint to fetch referral link
app.get('/api/referral/:userId', (req, res) => {
  const user = users[req.params.userId];
  if (user) {
    const referralLink = `https://yourapp.com/?ref=${user.referralCode}`;
    res.json({ referralLink });
  } else {
    res.status(404).send('User not found');
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
