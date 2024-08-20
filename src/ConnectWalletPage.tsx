// src/ConnectWalletPage.tsx
import React from 'react';
import './ConnectWalletPage.css'; // Import the CSS file for styling
import rocketImage from './images/rocket.png'; // Import the rocket image
import BackButton from './BackButton'; // Import the BackButton component

const ConnectWalletPage: React.FC = () => {
  return (
    <div className="connect-wallet-container">
      <BackButton /> {/* Add the BackButton */}
      <img src={rocketImage} className="rocket-image" alt="Rocket" />
      <div className="coming-soon-message">
        <h1>Coming Soon</h1>
        <p>We are working hard to bring this feature to you. Stay tuned!</p>
      </div>
    </div>
  );
};

export default ConnectWalletPage;
