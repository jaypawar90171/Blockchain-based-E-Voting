import {React, useState, useContext, useEffect} from 'react'
import { VotingContext } from '../context/voter';
import {motion, AnimatePresence} from 'framer-motion'
import PageTransition from '../components/PageTransition';

export default function UnapprovedVoters() {
    
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [selectedVoter, setSelectedVoter] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const itemsPerPage = 6;

  const { voterArray, ApproveVoter, RejectVoter } = useContext(VotingContext);
  const unapprovedVoters = voterArray.filter(candidate => candidate[6] === 0);

  const sortedVoters = [...unapprovedVoters].sort((a, b) => {
    if (sortBy === 'name') return a[1].localeCompare(b[1]);
    if (sortBy === 'id') return parseInt(a[6], 16) - parseInt(b[6], 16);
    return 0;
  });

  const filteredVoters = sortedVoters.filter(voter =>
    voter[1].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredVoters.length / itemsPerPage);
  const paginatedCandidates = filteredVoters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleApprove = (id) => {
    if(!message)
    {
        setError("Please enter a reason before approving.");
        return;
    }
    ApproveVoter(id, message); // Call the approve function from VotingContext
    console.log(`Approved voter with address: ${id} Reason: ${message}`);
    setMessage(''); 
  };

  const handleReject = (id) => {
    if(!message)
    {
        setError("Please enter a reason before rejecting.");
        return;
    }

    RejectVoter(id, message); // Call the reject function from VotingContext
    console.log(`Rejected candidate with address: ${id} Reason: ${message}`);
    setMessage(''); // Clear message after submission
  };

  const handleMessage = (e) => {
    const msg = e.target.value;
    console.log(msg);
  }

  useEffect(() => {
    if(error)
    {
      setError(error);
    }
  }, [error])
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

  return (
    <PageTransition>
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Unapproved Voters</h1>

      {/*  Displaying the error alert  */}
      <AnimatePresence>
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      </AnimatePresence>

      
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center border-black">
        <input
          type="text"
          placeholder="Search by name or ID"
          className="w-full md:w-64 px-4 py-2 rounded-md border border-gray-300 mb-4 md:mb-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="id">Sort by ID</option>
        </select>
      </div>

      {paginatedCandidates.length === 0 ? (
        <p className="text-center text-gray-600">No unapproved voter's found.</p>
      ) : ( 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {paginatedCandidates.map((candidate) => (
        <motion.div
          key={candidate[0].toNumber()}
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl max-w-sm"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative h-64 overflow-hidden">
            <img
              src={`https://gateway.pinata.cloud/ipfs/${candidate[5]}` || "/placeholder-avatar.png"}
              alt={`Profile picture of ${candidate[1]}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h2 className="text-2xl font-bold text-white text-shadow">{candidate[1]}</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">ID: {candidate[0].toNumber()}</p>
              {candidate[6] === 0 && (
                <span className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Pending Approval
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm break-all">
              Address: {candidate[2].substring(0, 20)}...
            </p>
            <motion.button
              onClick={() => setSelectedVoter(candidate)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
              whileTap={{ scale: 0.95 }}
              aria-label={`View details of ${candidate[1]}`}
            >
              View Details
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
      )}

      {pageCount > 1 && (
        <div className="mt-8 flex justify-center">
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`mx-1 px-4 py-2 rounded-md ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {selectedVoter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedVoter[1]}</h2>
            <p><strong>ID:</strong> {selectedVoter[0].toNumber()}</p>
            <span className='font-bold'>Voting Status: </span>{selectedVoter[4] ? 'You Already Voted' : 'Not Voted Yet'}
            <p><strong>Blockchain Address:</strong> {selectedVoter[2]}</p>
            <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleApprove(selectedVoter[2])}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"> Approve
                </button>
                <button
                  onClick={() => handleReject(selectedVoter[2])}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"> Reject
                </button>
                <div className=' items-center border-black'>
                <input type="text" placeholder="Enter the Message" className="w-full md:w-64 px-4 py-2 rounded-md border border-gray-300 mb-4 md:mb-0"
                value={message}
                onChange={(e) => {setMessage(e.target.value)}}
                />
                </div>
              </div>
            <button
              onClick={() => setSelectedVoter(null)}
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </PageTransition>
  );
}
