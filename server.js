const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

// Replace with your Telegram Bot API token
const token = '7310534646:AAENoCC1Qqi3etexxVY_rsbbwVAInVKRKYs';
const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(bodyParser.json());

// Endpoint to handle Telegram updates
app.post('/webhook', (req, res) => {
  const update = req.body;
  const chatId = update.message.chat.id;
  const text = update.message.text;

  // Example response to a message
  if (text === '/start') {
    bot.sendMessage(chatId, 'Welcome to the mining app!');
  } else if (text === '/mining') {
    bot.sendMessage(chatId, 'You can start mining by clicking the coin!');
  }

  res.sendStatus(200);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
