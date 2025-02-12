import React, { useContext, useEffect, useState } from 'react';
import { VotingContext } from '../context/voter';
import PageTransition from '../components/PageTransition';
// Confetti component
const Confetti = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      {[...Array(50)].map((_, index) => (
        <div
          key={index}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10%`,
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
            width: '10px',
            height: '10px',
            borderRadius: '50%',
          }}
        />
      ))}
    </div>
  );
};

// Vote Bar component
const VoteBar = ({ votes, maxVotes }) => {
  const percentage = (votes / maxVotes) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
      <div
        className="bg-blue-600 h-4 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

// Winner Card component
const WinnerCard = ({ winner }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">{winner.name}</h2>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Address:</span> 
        <span className="ml-2 text-sm break-all">{winner.address}</span>
      </p>
      <p className="text-3xl font-bold text-green-600 mt-4">{winner.votes} Votes</p>
      <VoteBar votes={winner.votes} maxVotes={winner.votes} />
    </div>
  );
};

export default function WinningCandidate() {
  const { winner, fetchWinner, error } = useContext(VotingContext);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const currentTimestamp = Math.floor(new Date().getTime() / 1000);
    fetchWinner(currentTimestamp);
  }, []);

  useEffect(() => {
    if (winner) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [winner]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      {showConfetti && <Confetti />}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-8">
          🏆 Winning Candidate 🏆
        </h1>
        {winner ? (
          <div className="space-y-8">
            <WinnerCard winner={winner} />
            <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">Election Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-200 rounded-lg p-4">
                  <p className="text-lg font-semibold text-blue-800">Total Votes</p>
                  <p className="text-3xl font-bold text-blue-600">{winner.votes}</p>
                </div>
                <div className="bg-green-200 rounded-lg p-4">
                  <p className="text-lg font-semibold text-green-800">Winning Margin</p>
                  <p className="text-3xl font-bold text-green-600">100%</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 bg-white rounded-lg shadow-lg p-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
            <p className="text-xl text-gray-600 font-medium">Tallying the votes...</p>
          </div>
        )}
      </div>
    </div>
    </PageTransition>
  );
}