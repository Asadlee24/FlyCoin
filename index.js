// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './App'; // Import AppRouter
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
// src/App.tsx
import ConnectWalletPage from './ConnectWalletPage'; // Ensure this file exists
import InviteFriendsPage from './InviteFriendsPage'; // Ensure this file exists
import SocialTaskPage from './SocialTaskPage'; // Ensure this file exists
