// src/BackButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css'; // Import the CSS file for styling

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      &#8592; Back
    </button>
  );
};

export default BackButton;
