import React, { useContext, useEffect, useState } from 'react';
import { VotingContext } from '../context/voter';
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from '../components/PageTransition';

// VotingInfo component (improved)
const VotingInfo = ({ candidateLength, voterLength }) => (
  <div className="bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-sm text-center">
    <h2 className="text-2xl font-bold mb-4 text-white">Voting Information</h2>
    <div className="flex justify-between mb-6">
      <div>
        <p className="text-sm font-semibold text-white mb-1">Candidates</p>
        <span className="text-3xl font-bold text-blue-500">{candidateLength}</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-white mb-1">Voters</p>
        <span className="text-3xl font-bold text-green-500">{voterLength}</span>
      </div>
    </div>
    <Countdown />
  </div>
);

// Countdown component (new)
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date("2023-12-31") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  return (
    <div className="mt-4">
      <p className="text-md font-semibold text-white mb-2">Time Remaining:</p>
      <div className="grid grid-cols-4 gap-2 text-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="bg-gray-100 rounded-lg p-2">
            <span className="text-2xl font-bold text-indigo-500">{value}</span>
            <p className="text-xs text-gray-500 capitalize">{unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// CandidateCard component
const CandidateCard = ({ candidate, giveVote }) => (
  <motion.div 
      className="bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative w-full h-80 overflow-hidden">
        <img 
          src={`https://gateway.pinata.cloud/ipfs/${candidate[4]}`} 
          alt={`Profile picture of ${candidate[1]}`} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
          <h2 className="text-2xl font-bold text-white text-shadow">{candidate[1]}</h2>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-lg text-white">Age: {candidate[0]}</p>
          <p className="text-lg font-semibold text-indigo-400">Votes: {candidate[3].toNumber()}</p>
        </div>
        <p className="text-sm text-gray-300 break-all">
          Address: {candidate[5]}
        </p>
        <motion.button
          onClick={() => giveVote({address: candidate[5]})}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
          whileTap={{ scale: 0.95 }}
          aria-label={`Give vote to ${candidate[1]}`}
        >
          Give Vote
        </motion.button>
      </div>
    </motion.div>
);

// CandidateList component 
const CandidateList = ({ candidates, giveVote }) => (
  <div className="w-full max-w-4xl">
    {/* <h2 className="text-3xl font-bold text-gray-800 mb-6">Candidate List</h2> */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {candidates.filter(candidate => candidate[6] === 1).length > 0 ? (
        candidates
          .filter(candidate => candidate[6] === 1)
          .map((candidate, index) => (
            <CandidateCard key={index} candidate={candidate} giveVote={giveVote} />
          ))
      ) : (
        <p className="text-gray-500 col-span-full">No approved candidates found</p>
      )}
    </div>
  </div>
);

// VotingStats component 
const VotingStats = ({ totalVotes, participationRate }) => (
  <div className="bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-sm">
    <h2 className="text-2xl font-bold mb-4 text-white text-center">Voting Statistics</h2>
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-white mb-1">Total Votes Cast</p>
        <span className="text-3xl font-bold text-purple-500">{totalVotes}</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-white mb-1">Participation Rate</p>
        <span className="text-3xl font-bold text-orange-500">{participationRate}%</span>
      </div>
    </div>
  </div>
);

const ErrorAlert = ({ message, onClose }) => (
  <motion.div 
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.3 }}
    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-600 dark:text-white fixed top-4 left-1/2 transform -translate-x-1/2 z-50 shadow-lg"
    role="alert"
  >
    <div className="flex items-center">
      <svg className="w-5 h-5 mr-2 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
      <span className="font-medium mr-2">Error:</span> {message}
    </div>
    <button onClick={onClose} className="absolute top-1 right-1 text-red-500 hover:text-red-700">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </motion.div>
);

// Home component
const Home = () => {
  const {
    getAllCandidatedata,
    candidateArray,
    giveVote,
    checkIfWalletIsConnected,
    candidateLength,
    currentAccount,
    voterLength,
    error: HomeError,
    userRole
  } = useContext(VotingContext);

  const [totalVotes, setTotalVotes] = useState(0);
  const [participationRate, setParticipationRate] = useState(0);
  const [error, setError] = useState(null);

  console.log("your role is:", userRole);

  useEffect(() => {
    checkIfWalletIsConnected();
    
    // Calculate total votes and participation rate
    const votes = candidateArray.reduce((acc, candidate) => acc + candidate[3].toNumber(), 0);
    setTotalVotes(votes);
    setParticipationRate(voterLength > 0 ? Math.round((votes / voterLength) * 100) : 0);
  }, [candidateArray, voterLength]);

  useEffect(() => {
    if (HomeError) {
      setError(HomeError); // Set error state if there's an error from VotingContext
    }
  }, [HomeError]);

  if (!currentAccount) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to the Voting App</h2>
          <p className="text-gray-600 mb-6">To access the voting application, please connect your MetaMask wallet.</p>
          <button
            onClick={checkIfWalletIsConnected}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 text-lg"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
    <div className="bg-gray-100 min-h-screen py-12">

      {/*  Displaying the error alert  */}
      <AnimatePresence>
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      </AnimatePresence>

      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Voting Dashboard</h1>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-1/3 space-y-6">
            <VotingInfo candidateLength={candidateLength} voterLength={voterLength} />
            <VotingStats totalVotes={totalVotes} participationRate={participationRate} />
          </div>
          <div className="lg:w-2/3">
            <CandidateList candidates={candidateArray} giveVote={giveVote} />
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default Home;