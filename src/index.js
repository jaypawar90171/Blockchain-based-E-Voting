import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { VotingProvider } from './context/voter'; // Import the VotingProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <VotingProvider> {/* Wrap App with VotingProvider */}
      <App />
    </VotingProvider>
  // </React.StrictMode>
);