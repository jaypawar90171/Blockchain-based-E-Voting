"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { VotingContext } from "../context/voter"
import PageTransition from "../components/PageTransition"
import { CalendarDays, Clock, AlertCircle, CheckCircle, ChevronDown, ChevronUp, Users, Award } from "lucide-react"

const VotingPeriodSetter = () => {
  const navigate = useNavigate();
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

  const getStatusColor = () => {
    if (status === "Voting period not set") return "bg-slate-700 text-slate-200 border-slate-600"
    if (status === "Voting has not started yet") return "bg-slate-700 text-cyan-300 border-cyan-700"
    if (status === "Voting is in progress") return "bg-slate-700 text-emerald-300 border-emerald-700"
    if (status === "Voting has ended") return "bg-slate-700 text-violet-300 border-violet-700"
    return "bg-slate-700 text-slate-200 border-slate-600"
  }

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto p-8 bg-slate-900 shadow-xl rounded-xl mt-6 text-slate-200">
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
            <div className="bg-slate-800 p-8 rounded-lg shadow-2xl max-w-md w-full border border-slate-700">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-2 text-slate-100">Success!</h3>
              <p className="text-center text-slate-300 mb-6">
                Voting period has been set successfully. Start time:{" "}
                {new Date(Number.parseInt(startTime)).toLocaleString()}, End time:{" "}
                {new Date(Number.parseInt(endTime)).toLocaleString()}
              </p>
              <p className="text-center text-slate-400 text-sm">Redirecting to home page...</p>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-3 mb-8">
          <CalendarDays className="h-8 w-8 text-violet-400" />
          <h1 className="text-3xl font-bold text-slate-100">Voting Period Management</h1>
        </div>

        {/* Current Status Card */}
        <div className={`mb-8 p-5 rounded-lg border-l-4 ${getStatusColor()}`}>
          <div className="flex items-center">
            <div className="mr-4">
              <Clock className="h-10 w-10 text-current opacity-75" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-100">Current Voting Status</h2>
              <p className="text-current font-medium">{status}</p>
            </div>
          </div>
        </div>

        {/* Set Voting Period Card */}
        <div className="mb-8 bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-xl shadow-sm border border-slate-600">
          <h2 className="text-2xl font-bold text-violet-300 mb-4">Set Voting Period</h2>
          <p className="text-slate-300 mb-6">
            Define when voters can cast their ballots by setting the start and end times below.
          </p>

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
                className="flex-1 bg-violet-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
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

        {/* Voting Guide Accordion */}
        <div className="mb-8 border border-slate-700 rounded-lg overflow-hidden">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <div className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-2 text-violet-400" />
              <span className="font-semibold text-slate-200">Voting Period Guide</span>
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
                    Ensure the voting period is long enough for all eligible voters to participate (typically 1-7 days).
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

        {/* Important Reminders */}
        <div className="mb-8 bg-slate-800 border-l-4 border-amber-500 p-5 rounded-r-lg">
          <div className="flex">
            <AlertCircle className="h-6 w-6 text-amber-400 mr-3 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-semibold text-amber-300 mb-2">Important Reminders</h2>
              <ul className="space-y-2 text-amber-200">
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">•</span>
                  <span>
                    Once set, the voting period <span className="font-semibold">cannot be changed</span>. Double-check
                    your inputs.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">•</span>
                  <span>Ensure all candidates and voters are registered before the voting period starts.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">•</span>
                  <span>Communicate the voting period to all stakeholders well in advance.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Current Contract Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-slate-800 to-violet-900 p-5 rounded-lg shadow-sm border border-violet-800">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 text-violet-300 mr-2" />
              <h3 className="font-semibold text-violet-200">Voting Status</h3>
            </div>
            <p className="text-violet-100 font-medium">{status || "Not available"}</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-cyan-900 p-5 rounded-lg shadow-sm border border-cyan-800">
            <div className="flex items-center mb-2">
              <Award className="h-5 w-5 text-cyan-300 mr-2" />
              <h3 className="font-semibold text-cyan-200">Candidates</h3>
            </div>
            <p className="text-cyan-100 font-medium">{candidateLength || 0} registered</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-emerald-900 p-5 rounded-lg shadow-sm border border-emerald-800">
            <div className="flex items-center mb-2">
              <Users className="h-5 w-5 text-emerald-300 mr-2" />
              <h3 className="font-semibold text-emerald-200">Voters</h3>
            </div>
            <p className="text-emerald-100 font-medium">{voterLength || 0} approved</p>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default VotingPeriodSetter
