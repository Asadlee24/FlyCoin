import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Replace with your actual API key
const token = '7310534646:AAENoCC1Qqi3etexxVY_rsbbwVAInVKRKYs';
const bot = new TelegramBot(token, { polling: true });

const app = express();
const port = 3000; // Or your preferred port

// Get the current directory of the module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve your game files
app.use(express.static(path.join(__dirname, 'public')));

// Define the route to serve the game
app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Telegram bot message handling
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Welcome to the Game! Click the button below to start playing.', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Start Game',
            url: 'https://263d14a9-e41f-4bbe-8cdf-698a7b42ac9e-00-1fkyfl79mk1aa.pike.replit.dev:3000/' // Update with your Replit app URL
          }
        ]
      ]
    }
  });
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'If you need assistance, you can contact the admin by clicking the link below:', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Contact Admin',
            url: 'https://t.me/Asadlee84' // Your Telegram username link
          }
        ]
      ]
    }
  });
});

app.listen(port, () => {
  console.log(`Game server running at http://localhost:${port}`);
});
