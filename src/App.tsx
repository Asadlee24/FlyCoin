import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import ConnectWalletPage from './ConnectWalletPage';
import InviteFriendsPage from './InviteFriendsPage';
import SocialTaskPage from './SocialTaskPage';
import './App.css';
import coinImage from './images/coin.png';
import centralCoinImage from './images/notcoin.png'; // Central coin image
import bearImage from './images/bear.png';
import rocketImage from './images/rocket.png'; // Rocket image
import notcoinImage from './images/notcoin.png'; // Notcoin image

const formatNumber = (number: number) => number.toLocaleString();

const App: React.FC = () => {
  const [count, setCount] = useState(12345);
  const [isAnimating, setIsAnimating] = useState(false);
  const [tapCount, setTapCount] = useState(0); // State to track number of taps
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showReferralLink, setShowReferralLink] = useState(false);
  const referralCode = 'YOUR_REFERRAL_CODE';
  const referralLink = `https://yourapp.com/?ref=${referralCode}`;
  const navigate = useNavigate();

  // Function to handle coin click
  const handleCoinClick = async (event: React.MouseEvent) => {
    setIsAnimating(true);
    const taps = event.detail; // Number of taps or clicks
    setCount(count + taps); // Increase coin count based on number of taps
    await handleMining(); // Wait for mining to complete
    setTapCount(taps); // Update tap count state
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Function to navigate to Connect Wallet page
  const handleConnectWalletClick = () => {
    navigate('/connect-wallet');
  };

  // Function to navigate to Invite Friends page
  const handleInviteFriendsClick = () => {
    navigate('/invite-friends');
  };

  // Function to handle copy referral link
  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
  };

  // Function to trigger mining
  const handleMining = async () => {
    try {
      const response = await fetch('/api/mine', {
        method: 'POST',
      });
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error('Error triggering mining:', error);
    }
  };

  return (
    <div className="app">
      <div className="header">
        <div className="mining-label">$FLY</div>
      </div>
      <div className="mining-interface">
        <img src={coinImage} className="coin" alt="Coin" />
        <div className="mining-count">{formatNumber(count)}</div>
      </div>
      <img
        src={centralCoinImage}
        className={`central-coin ${isAnimating ? 'bubble-effect' : ''}`}
        alt="Central Coin"
        onClick={handleCoinClick} // Handle clicks and taps
      />
      <div className="bottom-section">
        <div className="bottom-item" onClick={() => navigate('/social-task')}>
          <img src={notcoinImage} className="notcoin-image" alt="Notcoin" />
          Social Task
        </div>
        <div className="bottom-item" onClick={handleInviteFriendsClick}>
          <img src={bearImage} alt="Bear" />
          Invite Friends
        </div>
        <div className="bottom-item" onClick={handleConnectWalletClick}>
          <img src={rocketImage} className="rocket-image" alt="Rocket" />
          Connect Wallet
        </div>
      </div>
      {showComingSoon && (
        <div className="coming-soon">
          Coming Soon
        </div>
      )}
      {showReferralLink && (
        <div className="referral-popup">
          <div className="referral-link">
            {referralLink}
          </div>
          <button onClick={handleCopyReferralLink}>Copy Link</button>
        </div>
      )}
    </div>
  );
};

// AppRouter component to handle routing
const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/connect-wallet" element={<ConnectWalletPage />} />
        <Route path="/invite-friends" element={<InviteFriendsPage />} />
        <Route path="/social-task" element={<SocialTaskPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
