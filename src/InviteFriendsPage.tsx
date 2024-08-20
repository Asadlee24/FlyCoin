// src/InviteFriendsPage.tsx
import React from 'react';
import './InviteFriendsPage.css'; // Import the CSS file for styling
import BackButton from './BackButton'; // Import the BackButton component

const InviteFriendsPage: React.FC = () => {
  return (
    <div className="invite-page">
      <BackButton /> {/* Add the BackButton */}
      <h1>Invite Friends</h1>
      <p>Invite your friends to join and earn rewards!</p>
    </div>
  );
};

export default InviteFriendsPage;
