import React from 'react';
import { XCircle } from 'lucide-react';

const AuthModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Authentication Failed</h2>
          <button onClick={onClose} className="modal-close-btn">
            <XCircle className="icon" />
          </button>
        </div>
        <p className="modal-message">
          Sorry, you are not authorized to access this page. Please ensure you have the correct permissions or contact support for assistance.
        </p>
        <div className="modal-footer">
          <button onClick={onClose} className="modal-close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
