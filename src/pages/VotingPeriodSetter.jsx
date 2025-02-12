import React, { useState, useContext, useEffect } from 'react';
import { VotingContext } from '../context/voter';
import PageTransition from '../components/PageTransition';

const VotingPeriodSetter = () => {
    const [timeRemaining, setTimeRemaining] = useState('');
    const [status, setStatus] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [message, setMessage] = useState('');
    const [showGuide, setShowGuide] = useState(false);

  const {setelectionTime, getCurrentVotingStatus, voterLength, candidateLength , currentVotingStatus} = useContext(VotingContext);

  // console.log(getCurrentVotingStatus); 

  function calculateTimeRemaining() {
     // const now = Math.floor(Date.now() / 1000);
      // const startTimestamp = Math.floor(new Date(startTime).getTime() / 1000);
      // const endTimestamp = Math.floor(new Date(endTime).getTime() / 1000);
      
      // setStartTime(startTimestamp);
      // setEndTime(endTimestamp);
      // console.log(startTime);
      // console.log(endTime);
      
      // const status1 = 
      const currentTimestamp = Math.floor(new Date().getTime() / 1000);
      getCurrentVotingStatus(currentTimestamp);
      // getCurrentVotingStatus();
      // console.log("Voting Status in frontend", currentVotingStatus);
      // setStatus(status1);
      setStatus(currentVotingStatus)
      // if(currentVotingStatus === 'Voting period not set'){
      //   setStatus('Voting period not set')
      // }else if(currentVotingStatus === 'Voting has not started yet'){
      //   setStatus('Voting has not started yet');
      // }else if(currentVotingStatus === 'Voting has ended')
      // {
      //   setStatus('Voting has ended')
      //   // setStatus('Voting Peroid is set');
      // }else if(currentVotingStatus === 'Voting is in progress'){
      //   setStatus('Voting is in progress');
      // }else
      // {
      //   setStatus('Error in voting status')
      // }
      setTimeRemaining('');
      // if (startTimestamp && now < startTimestamp) 
      // {
      //   setTimeRemaining(`Voting starts in ${Math.max(startTimestamp - now, 0)} seconds`);
      //   // setStatus('Upcoming');
      // } 
      // else if (endTimestamp && now < endTimestamp) 
      // {
      //   setTimeRemaining(`Voting ends in ${Math.max(endTimestamp - now, 0)} seconds`);
      //   // setStatus('Active');
      // } 
      // else if (startTimestamp && endTimestamp) 
      // {
      //   setTimeRemaining('');
      //   // setStatus('Voting period has ended');
      // } 
      // else 
      // {
      //   setTimeRemaining('');
      //   // setStatus('No voting period set.');
      // }
  }
  useEffect(() => {
    
    
    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [startTime, endTime]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      const startTimestamp = Math.floor(new Date(startTime).getTime() / 1000);
      const endTimestamp = Math.floor(new Date(endTime).getTime() / 1000);

      await setelectionTime(startTimestamp, endTimestamp);
      console.log("startingL", startTimestamp, "Ending:", endTimestamp);
      setMessage('Voting period set successfully!');
    } 
    catch (error) 
    {
        console.error('Error setting voting period:', error);
        setMessage('Failed to set voting period. Please try again.');
    }
  };

  const suggestVotingPeriod = () => {
    const now = new Date();
    const suggestedStart = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Start tomorrow
    const suggestedEnd = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000); // End in a week

    setStartTime(suggestedStart.toISOString().slice(0, 16));
    setEndTime(suggestedEnd.toISOString().slice(0, 16));
  };

  return (
    <PageTransition>
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-3">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Voting Period Management</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Set Voting Period</h2>
        <p className="text-gray-600 mb-4">Specify the start and end times for the voting period.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              id="startTime"
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              id="endTime"
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className='flex space-x-4'>
          <button type="submit"
          className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Set Voting Period
          </button>
          <button
              type="button"
              onClick={suggestVotingPeriod}
              className="flex-1 bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"> Suggest Period
            </button>
          </div>
        </form>
      </div>
      {message && (
        <div className="px-6 py-4 bg-green-100 border-t border-green-200">
          <p className="text-green-600 text-sm">{message}</p>
        </div>
      )}
      {status && (
        <div className="px-6 py-4 bg-yellow-100 border-t border-yellow-200">
          <p className="text-yellow-600 text-sm">{status}</p>
        </div>
      )}
      {/* {timeRemaining && (
        <div className="px-6 py-4 bg-blue-100 border-t border-blue-200">
          <p className="text-blue-600 text-sm">{timeRemaining}</p>
        </div>
      )} */}

      {/* Voting period Guide */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Voting Period Guide</h2>
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="text-blue-600 hover:text-blue-800 focus:outline-none"
        >
          {showGuide ? 'Hide Guide' : 'Show Guide'}
        </button>
        {showGuide && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="font-semibold mb-2">Tips for Setting Voting Periods:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Ensure the voting period is long enough for all eligible voters to participate.</li>
              <li>Consider time zones if your voters are geographically dispersed.</li>
              <li>Avoid setting the end time too close to result announcement deadlines.</li>
              <li>Consider setting the start time at least 24 hours in the future to allow for proper communication to voters.</li>
              <li>A typical voting period might last between 24 hours and 7 days, depending on the scale of the election.</li>
            </ul>
          </div>
        )}
      </div>

      {/* Important Remainders */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8">
        <h2 className="text-lg font-semibold text-yellow-800 mb-2">Important Reminders</h2>
        <ul className="list-disc pl-5 space-y-2 text-yellow-700">
          <li>Once set, the voting period cannot be changed. Double-check your inputs before submitting.</li>
          <li>Ensure all candidates and voters are registered and approved before the voting period starts.</li>
          <li>Communicate the voting period to all stakeholders well in advance.</li>
        </ul>
      </div>

      {/* Current contact status */}
      <div className="bg-gray-100 p-4 rounded-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Current Contract Status</h2>
        <p className="text-gray-700">
          Current voting status: {status}
        </p>
        <p className="text-gray-700">
          Number of registered candidates: {candidateLength}
        </p>
        <p className="text-gray-700">
          Number of approved voters: {voterLength}
        </p>
      </div>

    </div>
    </PageTransition>
  );
};

export default VotingPeriodSetter;