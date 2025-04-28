"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { VotingContext } from "../context/voter"
import PageTransition from "../components/PageTransition"
import { AlertTriangle, AlertCircle, CheckCircle, RefreshCw, Info, ArrowRight, Users, BarChart3 } from "lucide-react"

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-slate-800 p-6 rounded-lg shadow-2xl max-w-md w-full border border-slate-700">
        <div className="flex items-center mb-4 text-red-400">
          <AlertTriangle className="h-6 w-6 mr-2" />
          <h2 className="text-xl font-bold">Confirm Reset</h2>
        </div>
        <p className="mb-6 text-slate-300">
          Are you sure you want to reset the voting contract? This action will erase all votes and candidate data and{" "}
          <span className="text-red-400 font-semibold">cannot be undone</span>.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Confirm Reset
          </button>
        </div>
      </div>
    </div>
  )
}

const SuccessModal = ({ isOpen, message }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-slate-800 p-6 rounded-lg shadow-2xl max-w-md w-full border border-emerald-700">
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 bg-emerald-900 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-emerald-400 mb-2">Success</h2>
          <p className="mb-6 text-slate-300">{message}</p>
          <p className="text-slate-400 text-sm">Redirecting to dashboard...</p>
        </div>
      </div>
    </div>
  )
}

const ResetResult = ({ success, message }) => {
  const bgColor = success ? "bg-slate-800 border-emerald-600" : "bg-slate-800 border-red-600"
  const textColor = success ? "text-emerald-400" : "text-red-400"
  const icon = success ? <CheckCircle className="h-5 w-5 mr-2" /> : <AlertCircle className="h-5 w-5 mr-2" />

  return (
    <div className={`border-l-4 p-4 rounded-r-lg ${bgColor}`} role="alert">
      <div className="flex items-center">
        {icon}
        <p className={`font-bold ${textColor}`}>{success ? "Success" : "Error"}</p>
      </div>
      <p className="ml-7 text-slate-300">{message}</p>
    </div>
  )
}

const Guidelines = () => {
  return (
    <div className="bg-slate-800 border-l-4 border-amber-500 p-5 rounded-r-lg mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-6 w-6 text-amber-400" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-amber-300">Guidelines for Resetting the Contract</h3>
          <div className="mt-3 text-amber-200">
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span>Ensure all voting activities have concluded before resetting.</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span>Inform all stakeholders before initiating the reset.</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span>Backup any important data before proceeding.</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span>This action cannot be undone. Proceed with caution.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const ContractStatus = ({ totalVotes, candidates }) => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-700 shadow-lg rounded-lg p-6 mb-6 border border-slate-600">
      <h2 className="text-xl font-semibold mb-4 text-slate-200 flex items-center">
        <Info className="h-5 w-5 mr-2 text-violet-400" />
        Current Contract Status
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-slate-700 to-blue-900 p-5 rounded-lg border border-blue-800">
          <div className="flex items-center mb-2">
            <BarChart3 className="h-5 w-5 text-blue-400 mr-2" />
            <p className="text-sm font-medium text-blue-300">Total Votes Cast</p>
          </div>
          <p className="text-3xl font-bold text-blue-200">{totalVotes}</p>
        </div>
        <div className="bg-gradient-to-br from-slate-700 to-emerald-900 p-5 rounded-lg border border-emerald-800">
          <div className="flex items-center mb-2">
            <Users className="h-5 w-5 text-emerald-400 mr-2" />
            <p className="text-sm font-medium text-emerald-300">Number of Candidates</p>
          </div>
          <p className="text-3xl font-bold text-emerald-200">{candidates}</p>
        </div>
      </div>
    </div>
  )
}

export default function ResetVotingContract() {
  const navigate = useNavigate()
  const { candidateArray, candidateLength, resetContract } = useContext(VotingContext)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [resetResult, setResetResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [totalVotes, setTotalVotes] = useState(0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const votes = candidateArray.reduce((acc, candidate) => acc + candidate[3].toNumber(), 0)
      setTotalVotes(votes)
    }
    fetchData()
  }, [candidateArray])

  const handleResetClick = () => {
    setIsModalOpen(true)
  }

  const handleConfirmReset = async () => {
    setIsModalOpen(false)
    setIsLoading(true)
    try {
      await resetContract()
      setResetResult({ success: true, message: "The voting contract has been successfully reset." })
      setShowSuccessModal(true)

      // Update the total votes
      const votes = candidateArray.reduce((acc, candidate) => acc + candidate[3].toNumber(), 0)
      setTotalVotes(votes)

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/")
      }, 3000)
    } catch (error) {
      setResetResult({ success: false, message: `Failed to reset the contract: ${error.message}` })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-slate-100 mb-2">Reset Voting Contract</h1>
            <p className="text-slate-400">Use this page to reset the voting contract and start a new election</p>
          </div>

          <Guidelines />

          <ContractStatus totalVotes={totalVotes} candidates={candidateLength} />

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 shadow-lg rounded-lg p-6 mb-6 border border-slate-600">
            <div className="flex items-start mb-4">
              <div className="bg-red-900 p-2 rounded-lg mr-4">
                <RefreshCw className="h-6 w-6 text-red-300" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-200 mb-2">Reset Contract</h3>
                <p className="text-slate-300 mb-4">
                  Resetting the contract will clear all current votes and candidate information. This action is
                  permanent and cannot be reversed.
                </p>
              </div>
            </div>
            <button
              onClick={handleResetClick}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Resetting Contract...
                </>
              ) : (
                <>
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Reset Voting Contract
                </>
              )}
            </button>
          </div>

          {resetResult && !showSuccessModal && (
            <ResetResult success={resetResult.success} message={resetResult.message} />
          )}

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center text-slate-400 hover:text-slate-200 transition-colors"
            >
              Return to Dashboard
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmReset}
          />

          <SuccessModal
            isOpen={showSuccessModal}
            message="The voting contract has been successfully reset. All votes and candidate data have been cleared."
          />
        </div>
      </div>
    </PageTransition>
  )
}
