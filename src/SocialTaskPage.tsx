// src/SocialTaskPage.tsx
import React from 'react';
import './SocialTaskPage.css'; // Import the CSS file for styling
import BackButton from './BackButton'; // Import the BackButton component

const SocialTaskPage: React.FC = () => {
  return (
    <div className="social-task-page">
      <BackButton /> {/* Add the BackButton */}
      <h1>Social Task Page</h1>
      <p>This is the page for social tasks.</p>
    </div>
  );
};

export default SocialTaskPage;
