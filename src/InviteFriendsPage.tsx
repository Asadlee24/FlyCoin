import React, { useEffect, useState } from 'react';
import './InviteFriendsPage.css'; // Import the CSS file for styling
import BackButton from './BackButton'; // Import the BackButton component

const InviteFriendsPage: React.FC = () => {
  const [referralLink, setReferralLink] = useState<string | null>(null);

  useEffect(() => {
    const fetchReferralLink = async () => {
      try {
        // Replace with actual logic to get the user ID (this might be passed as a prop or retrieved from authentication)
        const userId = 'YOUR_USER_ID'; // You need to dynamically get this ID
        const response = await fetch(`/api/referral/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setReferralLink(data.referralLink);
        } else {
          console.error('Error fetching referral link');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchReferralLink();
  }, []);

  const handleCopyReferralLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      alert('Referral link copied to clipboard!');
    }
  };

  return (
    <div className="invite-page">
      <BackButton /> {/* Add the BackButton */}
      <h1>Invite Friends</h1>
      <p>Invite your friends to join and earn rewards!</p>
      {referralLink && (
        <div className="referral-container">
          <p>Your referral link:</p>
          <div className="referral-link">{referralLink}</div>
          <button className="copy-button" onClick={handleCopyReferralLink}>
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default InviteFriendsPage;
