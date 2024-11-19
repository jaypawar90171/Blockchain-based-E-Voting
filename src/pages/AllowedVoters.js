import React, { useState, useCallback, useContext, useEffect } from 'react';
import { VotingContext } from '../context/voter';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion'; 
import PageTransition from '../components/PageTransition';
// import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@radix-ui/react-alert';

const Input = ({ title, placeholder, handleClick, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay}}
    className="mb-4"
  >
    <label className="block text-sm font-medium text-gray-700 mb-1">{title}</label>
    <input
      type="text"
      placeholder={placeholder}
      onChange={handleClick}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </motion.div>
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

export default function AllwedVoters() {
  const [fileurl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({ name: "", address: "", position: "", ipfs: ""});
  const [error, setError] = useState(null); // Added state to store error message
  const { uploadToIPFS, getAllVoterData, voterArray, createVoter, error: votingError } = useContext(VotingContext);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log(file);
    try {
      const url = await uploadToIPFS(file);
      if (!url)
      {
        setError('IPFS Hash not found in response');
        throw new Error("IPFS Hash not found in response");
      }
      setFileUrl(url);
      setFormInput({ ...formInput, ipfs: url });
    } catch (error) {
      setError('Error uploading file');
      console.error("Error uploading file:", error);
    }
  }, [uploadToIPFS]);
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  useEffect(() => {
    if (votingError) {
      setError(votingError); // Set error state if there's an error from VotingContext
    }
  }, [votingError]);

  return (
    <PageTransition>
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Voter Management</h1>

      {/*  Displaying the error alert  */}
      <AnimatePresence>
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      </AnimatePresence>

      {/*  File Uploading  */}
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-4">Create New Voter</h2>
          {fileurl ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-4" >
              <img src={ "  https://gateway.pinata.cloud/ipfs/" + fileurl} alt="Voter"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-500"/>
              <p className="font-semibold">{formInput.name}</p>
              <p className="text-sm text-gray-600">{formInput.address.slice(0, 20)}</p>
              <p className="text-sm">{formInput.position}</p>
            </motion.div>
          ) : (
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition duration-300"
            >
              <input {...getInputProps()} />
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">Drag and drop an image, or click to select</p>
              <p className="mt-1 text-xs text-gray-500">JPG, PNG, WEBM (max 5MB)</p>
            </div>
          )}

          {/*  Voter registration Form  */}
          <Input title="Name" placeholder="Enter Your Name" handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })} delay={0.3} />
          <Input title="Address" placeholder="Voter Address" handleClick={(e) => setFormInput({ ...formInput, address: e.target.value })} delay={0.4} />
          <Input title="Position" placeholder="Voter Position" handleClick={(e) => setFormInput({ ...formInput, position: e.target.value })} delay={0.5} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-700 transition duration-300"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            onClick={() => createVoter(formInput)}
          >
            Authorize Voter
          </motion.button>
        </motion.div>


        {/*  Display the existing voters  */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5}}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-4">Existing Voters</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {voterArray.length > 0 ? (
              voterArray.map((voter, index) => (
                <motion.div
                  key={index + 1}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-4 shadow"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="font-semibold">{voter[1]}</p>
                  <p className="text-sm text-gray-600">{voter[2] ? voter[2].slice(0, 20) : 'N/A'}</p>
                  <p className="text-sm">Voter id:{voter[0].toNumber() || 'No position'}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No voters found</p>
            )}
          </div>
        </motion.div>
      </div>
      
    </div>
    </PageTransition>
  );
}