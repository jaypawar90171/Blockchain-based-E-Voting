import React, { useState, useContext, useEffect } from 'react';
import { VotingContext } from '../context/voter';
import PageTransition from '../components/PageTransition';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Confirm Reset</h2>
        <p className="mb-6">Are you sure you want to reset the voting contract? This action cannot be undone.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Confirm Reset
          </button>
        </div>
      </div>
    </div>
  );
};

const ResetResult = ({ success, message }) => {
  const bgColor = success ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500';
  const textColor = success ? 'text-green-700' : 'text-red-700';

  return (
    <div className={`border-l-4 p-4 ${bgColor}`} role="alert">
      <p className={`font-bold ${textColor}`}>{success ? 'Success' : 'Error'}</p>
      <p className={textColor}>{message}</p>
    </div>
  );
};

const Guidelines = () => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Guidelines for Resetting the Contract</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <ul className="list-disc pl-5 space-y-1">
              <li>Ensure all voting activities have concluded before resetting.</li>
              <li>Inform all stakeholders before initiating the reset.</li>
              <li>Backup any important data before proceeding.</li>
              <li>This action cannot be undone. Proceed with caution.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContractStatus = ({ totalVotes, candidates }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Current Contract Status</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="text-sm font-medium text-blue-800">Total Votes Cast</p>
          <p className="text-2xl font-bold text-blue-600">{totalVotes}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <p className="text-sm font-medium text-green-800">Number of Candidates</p>
          <p className="text-2xl font-bold text-green-600">{candidates}</p>
        </div>
      </div>
    </div>
  );
};


export default function ResetVotingContract() {
    const {candidateArray, candidateLength, resetContract} = useContext(VotingContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetResult, setResetResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
 

  useEffect(() => {
    const fetchData = async () => {
    const votes = candidateArray.reduce((acc, candidate) => acc + candidate[3].toNumber(), 0);
    setTotalVotes(votes);
    };
    fetchData();
  }, []);

  const handleResetClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmReset = async () => {
    setIsModalOpen(false);
    setIsLoading(true);
    try {
      await resetContract();
      setResetResult({ success: true, message: 'The voting contract has been successfully reset.' });
        const votes = candidateArray.reduce((acc, candidate) => acc + candidate[3].toNumber(), 0);
        setTotalVotes(votes);
    } catch (error) {
      setResetResult({ success: false, message: `Failed to reset the contract: ${error.message}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Reset Voting Contract
        </h1>
        
        <Guidelines />

        <ContractStatus totalVotes={totalVotes} candidates={candidateLength} />

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <p className="text-gray-700 mb-4">
            Click the button below to reset the voting contract. This action will clear all current votes and candidate information.
          </p>
          <button
            onClick={handleResetClick}
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Resetting...' : 'Reset Voting Contract'}
          </button>
        </div>

        {resetResult && <ResetResult success={resetResult.success} message={resetResult.message} />}


        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmReset}
        />
      </div>
    </div>
    </PageTransition>
  );
}