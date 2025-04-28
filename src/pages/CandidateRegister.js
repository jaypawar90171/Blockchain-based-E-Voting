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
      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-200 placeholder-gray-500 transition-all duration-200"
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

export default function CandidateRegister() {
  const [fileurl, setFileUrl] = useState(null)
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    address: "",
    age: "",
    ipfs: "",
  })

  const [error, setError] = useState(null)
  const {
    candidateArray,
    setCandidate,
    uploadToIPFS,
    getAllCandidatedata,
    error: CandidateError,
  } = useContext(VotingContext)

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0]
      try {
        const url = await uploadToIPFS(file)
        if (!url) throw new Error("IPFS Hash not found in response")
        setFileUrl(url)
        setCandidateForm({ ...candidateForm, ipfs: url })
      } catch (error) {
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
    // getAllCandidatedata();
    if (CandidateError) {
      setError(CandidateError)
    }
  }, [CandidateError])

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with glowing effect */}
          <div className="text-center mb-12 relative">
            <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Candidate Registration
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
            <div className="absolute -inset-1 bg-purple-500/20 blur-xl rounded-full -z-10 opacity-70"></div>
          </div>

          {/* Error Alert */}
          <AnimatePresence>{error && <ErrorAlert message={error} onClose={() => setError(null)} />}</AnimatePresence>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent pointer-events-none"></div>

              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="h-8 w-1 bg-purple-500 rounded-full mr-3"></span>
                Create New Candidate
              </h2>

              {fileurl ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center mb-6 relative"
                >
                  <div className="w-32 h-32 mx-auto relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-md opacity-70"></div>
                    <img
                      src={"https://gateway.pinata.cloud/ipfs/" + fileurl || "/placeholder.svg"}
                      alt="Candidate"
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-700 relative z-10"
                    />
                  </div>
                  <p className="font-semibold mt-4 text-lg">{candidateForm.name || "Candidate Name"}</p>
                  <p className="text-gray-400">
                    {candidateForm.address ? candidateForm.address.slice(0, 20) : "Address"}
                  </p>
                  <p className="text-gray-400">{candidateForm.age ? `Age: ${candidateForm.age}` : "Age"}</p>
                </motion.div>
              ) : (
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-gray-600 bg-gray-800/50 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500 transition duration-300 mb-6 group relative"
                >
                  <input {...getInputProps()} />
                  <div className="absolute inset-0 bg-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center group-hover:bg-gray-700/80 transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-gray-400 group-hover:text-purple-400 transition-colors duration-300"
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
                placeholder="Enter Your Name"
                handleClick={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
                delay={0.3}
              />
              <Input
                title="Address"
                placeholder="Candidate Address"
                handleClick={(e) => setCandidateForm({ ...candidateForm, address: e.target.value })}
                delay={0.4}
              />
              <Input
                title="Age"
                placeholder="Age"
                handleClick={(e) => setCandidateForm({ ...candidateForm, age: e.target.value })}
                delay={0.5}
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 hover:from-purple-700 hover:to-pink-700 transition duration-300 shadow-lg shadow-purple-700/30 font-medium"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                onClick={() => setCandidate(candidateForm)}
              >
                Authorize Candidate
              </motion.button>
            </motion.div>

            {/* Verification Process - Replacement for Existing Candidates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 to-transparent pointer-events-none"></div>

              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="h-8 w-1 bg-pink-500 rounded-full mr-3"></span>
                Verification Process
              </h2>

              <div className="space-y-6">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="relative pl-10"
                >
                  <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="absolute left-4 top-8 h-full w-0.5 bg-gradient-to-b from-pink-500 to-purple-500/20"></div>
                  <h3 className="text-lg font-medium text-white mb-2">Submit Information</h3>
                  <p className="text-gray-400 mb-3">
                    Complete the registration form with all required information and upload a profile photo.
                  </p>
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                    <div className="flex items-center text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-purple-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Ensure all information is accurate and verifiable
                    </div>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="relative pl-10"
                >
                  <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="absolute left-4 top-8 h-full w-0.5 bg-gradient-to-b from-pink-500 to-purple-500/20"></div>
                  <h3 className="text-lg font-medium text-white mb-2">Verification</h3>
                  <p className="text-gray-400 mb-3">
                    Your information will be verified by the election committee through a secure blockchain process.
                  </p>
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                    <div className="flex items-center text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-purple-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      Verification typically takes 24-48 hours
                    </div>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.0 }}
                  className="relative pl-10"
                >
                  <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Confirmation</h3>
                  <p className="text-gray-400 mb-3">
                    Once approved, you'll receive a confirmation and your candidacy will be officially registered.
                  </p>
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                    <div className="flex items-center text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-purple-400"
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
                      Your voter ID will be issued upon approval
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Additional Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="mt-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 border border-gray-700"
              >
                <div className="flex items-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-pink-400 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-white">Important Information</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All candidate information is securely stored on the blockchain</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>You must meet eligibility requirements to be approved</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Contact support if you don't receive confirmation within 48 hours</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
