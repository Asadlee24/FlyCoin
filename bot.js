import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and Anon Key
const SUPABASE_URL = 'https://tmhjqejachfolusmvhmj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtaGpxZWphY2hmb2x1c212aG1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxNTU5MzgsImV4cCI6MjAzOTczMTkzOH0.2HR21iYFnqdRILIDD9NHILf_j7qAg7_0JEsU4gQBErw';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;

  // Generate a unique referral code
  const referralCode = crypto.randomBytes(4).toString('hex');

  // Store user with referral code in Supabase
  const { error } = await supabase
    .from('users')
    .insert([
      { 
        chat_id: chatId,
        username,
        referral_code: referralCode
      }
    ]);

  if (error) {
    console.error('Error storing user data:', error);
  }

  const referralLink = `https://yourapp.com/referral/${referralCode}`;

  bot.sendMessage(chatId, 'Welcome to the Game! Click the button below to start playing.', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Start Game',
            url: 'https://263d14a9-e41f-4bbe-8cdf-698a7b42ac9e-00-1fkyfl79mk1aa.pike.replit.dev:3000/' // Update with your Replit app URL
          }
        ],
        [
          {
            text: 'Your Referral Link',
            url: referralLink
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

// Handle referral link visits
app.get('/referral/:referralCode', async (req, res) => {
  const referralCode = req.params.referralCode;

  // Look up the referral code to find the referrer in Supabase
  const { data: referrer, error } = await supabase
    .from('users')
    .select('*')
    .eq('referral_code', referralCode)
    .single();

  if (error) {
    console.error('Error fetching referral data:', error);
    res.send('Invalid referral code.');
  } else if (referrer) {
    // Handle referral logic, e.g., store this info in a database or process it
    console.log(`User referred by ${referrer.username}`);

    // Redirect to the game or show a confirmation page
    res.redirect('/game');
  } else {
    // Handle invalid referral code
    res.send('Invalid referral code.');
  }
});

app.listen(port, () => {
  console.log(`Game server running at http://localhost:${port}`);
});
