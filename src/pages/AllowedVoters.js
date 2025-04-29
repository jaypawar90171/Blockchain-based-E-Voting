"use client"

import { useState, useCallback, useContext, useEffect } from "react"
import { VotingContext } from "../context/voter"
import { useDropzone } from "react-dropzone"
import { motion, AnimatePresence } from "framer-motion"
import PageTransition from "../components/PageTransition"

const Input = ({ title, placeholder, handleClick, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="mb-5"
  >
    <label className="block text-sm font-medium text-gray-300 mb-2">{title}</label>
    <input
      type="text"
      placeholder={placeholder}
      onChange={handleClick}
      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-200 placeholder-gray-500 transition-all duration-200"
    />
  </motion.div>
)

const ErrorAlert = ({ message, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.3 }}
    className="p-4 mb-4 text-sm text-red-100 rounded-lg bg-gradient-to-r from-red-900 to-red-800 fixed top-4 left-1/2 transform -translate-x-1/2 z-50 shadow-xl border border-red-700"
    role="alert"
  >
    <div className="flex items-center">
      <svg
        className="w-5 h-5 mr-2 text-red-300"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
      <span className="font-medium mr-2">Error:</span> {message}
    </div>
    <button
      onClick={onClose}
      className="absolute top-1 right-1 text-red-300 hover:text-red-100 transition-colors duration-200"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </motion.div>
)

// Stats Card Component
const StatCard = ({ title, value, icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className={`bg-gray-900/80 rounded-xl p-4 border border-gray-700 shadow-lg relative overflow-hidden`}
  >
    <div className={`absolute top-0 right-0 w-24 h-24 ${color} rounded-full opacity-10 -mr-10 -mt-10`}></div>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
      <div className={`h-12 w-12 rounded-lg ${color} bg-opacity-20 flex items-center justify-center`}>{icon}</div>
    </div>
  </motion.div>
)

export default function AllwedVoters() {
  const [fileurl, setFileUrl] = useState(null)
  const [formInput, setFormInput] = useState({ name: "", address: "", position: "", ipfs: "" })
  const [error, setError] = useState(null)
  const { uploadToIPFS, getAllVoterData, voterArray, createVoter, error: votingError } = useContext(VotingContext)

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0]
      console.log(file)
      try {
        const url = await uploadToIPFS(file)
        if (!url) {
          setError("IPFS Hash not found in response")
          throw new Error("IPFS Hash not found in response")
        }
        setFileUrl(url)
        setFormInput({ ...formInput, ipfs: url })
      } catch (error) {
        setError("Error uploading file")
        console.error("Error uploading file:", error)
      }
    },
    [uploadToIPFS],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  })

  useEffect(() => {
    if (votingError) {
      setError(votingError)
    }
  }, [votingError])

  // Calculate some mock statistics based on voterArray
  const totalVoters = voterArray?.length || 0
  const pendingVerification = Math.floor(totalVoters * 0.3) // Just for demonstration
  const verifiedVoters = totalVoters - pendingVerification
  const verificationRate = totalVoters > 0 ? Math.floor((verifiedVoters / totalVoters) * 100) : 0

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with glowing effect */}
          <div className="text-center mb-12 relative">
            <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
              Voter Management
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full"></div>
            <div className="absolute -inset-1 bg-teal-500/20 blur-xl rounded-full -z-10 opacity-70"></div>
          </div>

          {/* Error Alert */}
          <AnimatePresence>{error && <ErrorAlert message={error} onClose={() => setError(null)} />}</AnimatePresence>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Voter Registration Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-transparent pointer-events-none"></div>

              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="h-8 w-1 bg-teal-500 rounded-full mr-3"></span>
                Create New Voter
              </h2>

              {fileurl ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center mb-6 relative"
                >
                  <div className="w-32 h-32 mx-auto relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 blur-md opacity-70"></div>
                    <img
                      src={"https://gateway.pinata.cloud/ipfs/" + fileurl}
                      alt="Voter"
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-700 relative z-10"
                    />
                  </div>
                  <p className="font-semibold mt-4 text-lg">{formInput.name || "Voter Name"}</p>
                  <p className="text-gray-400">{formInput.address ? formInput.address.slice(0, 20) : "Address"}</p>
                  <p className="text-gray-400">{formInput.position || "Position"}</p>
                </motion.div>
              ) : (
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-gray-600 bg-gray-800/50 rounded-xl p-8 text-center cursor-pointer hover:border-teal-500 transition duration-300 mb-6 group relative"
                >
                  <input {...getInputProps()} />
                  <div className="absolute inset-0 bg-teal-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center group-hover:bg-gray-700/80 transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-gray-400 group-hover:text-teal-400 transition-colors duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    Drag and drop an image, or click to select
                  </p>
                  <p className="mt-2 text-xs text-gray-500">JPG, PNG, WEBM (max 5MB)</p>
                </div>
              )}

              <Input
                title="Name"
                placeholder="Enter Voter Name"
                handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
                delay={0.3}
              />
              <Input
                title="Address"
                placeholder="Voter Address"
                handleClick={(e) => setFormInput({ ...formInput, address: e.target.value })}
                delay={0.4}
              />
              <Input
                title="Age"
                placeholder="Voter Age"
                handleClick={(e) => setFormInput({ ...formInput, position: e.target.value })}
                delay={0.5}
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 hover:from-teal-700 hover:to-cyan-700 transition duration-300 shadow-lg shadow-teal-700/30 font-medium"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                onClick={() => createVoter(formInput)}
              >
                Submit
              </motion.button>
            </motion.div>

            {/* Voter Verification Status - Replacement for Existing Voters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-transparent pointer-events-none"></div>

              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="h-8 w-1 bg-cyan-500 rounded-full mr-3"></span>
                Voter Verification Status
              </h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <StatCard
                  title="Total Voters"
                  value={totalVoters}
                  delay={0.6}
                  color="bg-teal-500"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-teal-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  }
                />
                <StatCard
                  title="Verification Rate"
                  value={`${verificationRate}%`}
                  delay={0.7}
                  color="bg-cyan-500"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-cyan-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                />
                <StatCard
                  title="Verified"
                  value={verifiedVoters}
                  delay={0.8}
                  color="bg-emerald-500"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-emerald-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  }
                />
                <StatCard
                  title="Pending"
                  value={pendingVerification}
                  delay={0.9}
                  color="bg-amber-500"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-amber-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                />
              </div>

              {/* Verification Process */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.0 }}
                className="bg-gray-900/50 rounded-xl p-5 border border-gray-700 mb-6"
              >
                <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Verification Process
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="text-gray-300">Voter information submitted</p>
                      <p className="text-xs text-gray-500 mt-1">Identity and eligibility information collected</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-teal-500/70 text-white flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="text-gray-300">Blockchain verification</p>
                      <p className="text-xs text-gray-500 mt-1">Data securely stored and verified on the blockchain</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-teal-500/50 text-white flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="text-gray-300">Voter ID assignment</p>
                      <p className="text-xs text-gray-500 mt-1">Unique identifier assigned to verified voters</p>
                    </div>
                  </li>
                </ul>
              </motion.div>

              {/* Recent Activity */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.1 }}
              >
                <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Recent Activity
                </h3>

                <div className="space-y-3">
                  {voterArray && voterArray.length > 0 ? (
                    voterArray.slice(0, 3).map((voter, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                        className="bg-gray-900/80 rounded-lg p-3 border border-gray-700 flex items-center"
                      >
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white text-xs mr-3">
                          {voter[1]?.charAt(0) || "V"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{voter[1]}</p>
                          <p className="text-xs text-gray-400 truncate">ID: {Number(voter[0])}</p>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900 text-green-300">
                          Verified
                        </span>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-6 bg-gray-900/50 rounded-lg border border-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 mx-auto text-gray-600 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-gray-400">No recent activity</p>
                      <p className="text-xs text-gray-500 mt-1">New voter verifications will appear here</p>
                    </div>
                  )}
                </div>
              </motion.div> */}
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
