import React from 'react';
import { XCircle, AlertTriangle } from 'lucide-react';

const AuthModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 backdrop-blur-sm">
      <div className="relative overflow-hidden rounded-xl max-w-md w-full mx-4">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-pink-900/30 rounded-xl" />
        <div className="absolute inset-0 border border-red-500/20 rounded-xl" />
        <div className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-red-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <h2 className="text-xl font-bold text-white">Authentication Failed</h2>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>
          
          <p className="text-gray-300 mb-6">
            We couldn't verify your identity. Please ensure your face is clearly visible and well-lit, or contact support if you continue to experience issues.
          </p>
          
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;