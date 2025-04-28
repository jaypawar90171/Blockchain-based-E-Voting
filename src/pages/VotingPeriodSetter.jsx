"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { VotingContext } from "../context/voter"
import PageTransition from "../components/PageTransition"
import {
  CalendarDays,
  Clock,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Users,
  Award,
  AlertTriangle,
  Info,
} from "lucide-react"

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

const Guidelines = () => {
  return (
    <div className="bg-slate-800 border-l-4 border-amber-500 p-5 rounded-r-lg mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-6 w-6 text-amber-400" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-amber-300">Guidelines for Setting Voting Period</h3>
          <div className="mt-3 text-amber-200">
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span>
                  Ensure the voting period is long enough for all eligible voters to participate (typically 1-7 days).
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span>Consider time zones if your voters are geographically dispersed.</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span>
                  Once set, the voting period <strong>cannot be changed</strong>. Double-check your inputs.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span>Communicate the voting period to all stakeholders well in advance.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const ContractStatus = ({ status, voterLength, candidateLength }) => {
  const getStatusColor = () => {
    if (status === "Voting period not set") return "text-slate-200 border-slate-600"
    if (status === "Voting has not started yet") return "text-cyan-300 border-cyan-700"
    if (status === "Voting is in progress") return "text-emerald-300 border-emerald-700"
    if (status === "Voting has ended") return "text-violet-300 border-violet-700"
    return "text-slate-200 border-slate-600"
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-700 shadow-lg rounded-lg p-6 mb-6 border border-slate-600">
      <h2 className="text-xl font-semibold mb-4 text-slate-200 flex items-center">
        <Info className="h-5 w-5 mr-2 text-violet-400" />
        Current Contract Status
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className={`bg-gradient-to-br from-slate-700 to-slate-900 p-5 rounded-lg border ${getStatusColor().split(" ")[1]}`}
        >
          <div className="flex items-center mb-2">
            <Clock className="h-5 w-5 text-violet-400 mr-2" />
            <p className="text-sm font-medium text-slate-300">Voting Status</p>
          </div>
          <p className={`text-lg font-bold ${getStatusColor().split(" ")[0]}`}>{status || "Not available"}</p>
        </div>
        <div className="bg-gradient-to-br from-slate-700 to-emerald-900 p-5 rounded-lg border border-emerald-800">
          <div className="flex items-center mb-2">
            <Users className="h-5 w-5 text-emerald-400 mr-2" />
            <p className="text-sm font-medium text-emerald-300">Registered Voters</p>
          </div>
          <p className="text-lg font-bold text-emerald-200">{voterLength || 0}</p>
        </div>
        <div className="bg-gradient-to-br from-slate-700 to-blue-900 p-5 rounded-lg border border-blue-800">
          <div className="flex items-center mb-2">
            <Award className="h-5 w-5 text-blue-400 mr-2" />
            <p className="text-sm font-medium text-blue-300">Registered Candidates</p>
          </div>
          <p className="text-lg font-bold text-blue-200">{candidateLength || 0}</p>
        </div>
      </div>
    </div>
  )
}

export default function VotingPeriodSetter() {
  const navigate = useNavigate()
  const [timeRemaining, setTimeRemaining] = useState("")
  const [status, setStatus] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [message, setMessage] = useState("")
  const [showGuide, setShowGuide] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const { setelectionTime, getCurrentVotingStatus, voterLength, candidateLength, currentVotingStatus } =
    useContext(VotingContext)

  function calculateTimeRemaining() {
    const currentTimestamp = Math.floor(new Date().getTime() / 1000)
    getCurrentVotingStatus(currentTimestamp)
    setStatus(currentVotingStatus)
    setTimeRemaining("")
  }

  useEffect(() => {
    calculateTimeRemaining()
    const interval = setInterval(calculateTimeRemaining, 1000)
    return () => clearInterval(interval)
  }, [startTime, endTime])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const startTimestamp = Math.floor(new Date(startTime).getTime() / 1000)
      const endTimestamp = Math.floor(new Date(endTime).getTime() / 1000)

      await setelectionTime(startTimestamp, endTimestamp)

      setMessage("Voting period set successfully!")
      setShowSuccess(true)

      // Redirect to home page after 3 seconds
      setTimeout(() => {
        navigate("/")
      }, 3000)
    } catch (error) {
      console.error("Error setting voting period:", error)
      setMessage("Failed to set voting period. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const suggestVotingPeriod = () => {
    const now = new Date()
    const suggestedStart = new Date(now.getTime() + 24 * 60 * 60 * 1000) // Start tomorrow
    const suggestedEnd = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000) // End in a week

    setStartTime(suggestedStart.toISOString().slice(0, 16))
    setEndTime(suggestedEnd.toISOString().slice(0, 16))
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-slate-100 mb-2">Voting Period Management</h1>
            <p className="text-slate-400">
              Define when voters can cast their ballots by setting the start and end times
            </p>
          </div>

          <Guidelines />

          <ContractStatus status={status} voterLength={voterLength} candidateLength={candidateLength} />

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 shadow-lg rounded-lg p-6 mb-6 border border-slate-600">
            <div className="flex items-start mb-4">
              <div className="bg-violet-900 p-2 rounded-lg mr-4">
                <CalendarDays className="h-6 w-6 text-violet-300" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-200 mb-2">Set Voting Period</h3>
                <p className="text-slate-300 mb-4">
                  Define when voters can cast their ballots by setting the start and end times below.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="startTime" className="flex items-center text-sm font-medium text-slate-300">
                    <CalendarDays className="h-4 w-4 mr-2 text-violet-400" />
                    Start Time
                  </label>
                  <input
                    id="startTime"
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors text-slate-200"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="endTime" className="flex items-center text-sm font-medium text-slate-300">
                    <CalendarDays className="h-4 w-4 mr-2 text-violet-400" />
                    End Time
                  </label>
                  <input
                    id="endTime"
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors text-slate-200"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-violet-600 to-violet-700 text-white font-bold py-3 px-6 rounded-lg hover:from-violet-700 hover:to-violet-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
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
                      Processing...
                    </>
                  ) : (
                    "Set Voting Period"
                  )}
                </button>

                <button
                  type="button"
                  onClick={suggestVotingPeriod}
                  className="flex-1 bg-slate-700 text-violet-300 font-bold py-3 px-6 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors border border-violet-700"
                >
                  Suggest Period
                </button>
              </div>
            </form>
          </div>

          {message && !showSuccess && (
            <div
              className={`p-4 rounded-lg mb-8 ${
                message.includes("success")
                  ? "bg-slate-800 text-emerald-400 border border-emerald-700"
                  : "bg-slate-800 text-red-400 border border-red-700"
              }`}
            >
              <div className="flex">
                {message.includes("success") ? (
                  <CheckCircle className="h-5 w-5 mr-2" />
                ) : (
                  <AlertCircle className="h-5 w-5 mr-2" />
                )}
                <p>{message}</p>
              </div>
            </div>
          )}

          <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden mb-8">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="w-full px-6 py-4 flex items-center justify-between bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center">
                <CalendarDays className="h-5 w-5 mr-2 text-violet-400" />
                <span className="font-semibold text-slate-200">Voting Period Best Practices</span>
              </div>
              {showGuide ? (
                <ChevronUp className="h-5 w-5 text-slate-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-slate-400" />
              )}
            </button>

            {showGuide && (
              <div className="p-6 bg-slate-800">
                <h3 className="font-semibold text-slate-200 mb-3">Tips for Setting Effective Voting Periods:</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-violet-900 text-violet-200 mr-2 flex-shrink-0">
                      1
                    </span>
                    <span>
                      Ensure the voting period is long enough for all eligible voters to participate (typically 1-7
                      days).
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-violet-900 text-violet-200 mr-2 flex-shrink-0">
                      2
                    </span>
                    <span>Consider time zones if your voters are geographically dispersed.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-violet-900 text-violet-200 mr-2 flex-shrink-0">
                      3
                    </span>
                    <span>Avoid setting the end time too close to result announcement deadlines.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-violet-900 text-violet-200 mr-2 flex-shrink-0">
                      4
                    </span>
                    <span>
                      Set the start time at least 24 hours in the future to allow for proper communication to voters.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-violet-900 text-violet-200 mr-2 flex-shrink-0">
                      5
                    </span>
                    <span>Consider weekdays vs. weekends based on your voter demographics.</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center text-slate-400 hover:text-slate-200 transition-colors"
            >
              Return to Dashboard
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          <SuccessModal
            isOpen={showSuccess}
            message="The voting period has been successfully set. All eligible voters can cast their votes during this period."
          />
        </div>
      </div>
    </PageTransition>
  )
}
