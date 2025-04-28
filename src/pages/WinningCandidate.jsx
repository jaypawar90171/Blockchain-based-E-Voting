"use client"

import { useContext, useEffect, useState } from "react"
import { VotingContext } from "../context/voter"
import PageTransition from "../components/PageTransition"
import {
  Trophy,
  User,
  MapPin,
  CheckCircle,
  BarChart3,
  Clock,
  Award,
  ChevronRight,
  Home,
  PieChart,
  Users,
  Settings,
  LogOut,
} from "lucide-react"

// Enhanced Confetti component
const Confetti = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      {[...Array(100)].map((_, index) => (
        <div
          key={index}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10%`,
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            borderRadius: "50%",
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

// Improved Vote Bar component
const VoteBar = ({ votes, maxVotes, color = "bg-purple-500" }) => {
  const [width, setWidth] = useState(0)
  const percentage = (votes / maxVotes) * 100

  useEffect(() => {
    setTimeout(() => setWidth(percentage), 100)
  }, [percentage])

  return (
    <div className="w-full bg-gray-800 rounded-full h-3 mt-2 overflow-hidden">
      <div
        className={`${color} h-3 rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  )
}

// Stat Card component
const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700 hover:border-gray-600 transition-all">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-400 font-medium">{title}</h3>
        <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  )
}

// Sidebar Item component
const SidebarItem = ({ icon, text, active }) => {
  return (
    <div
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${active ? "bg-purple-900/30 text-purple-400" : "text-gray-400 hover:bg-gray-800 hover:text-gray-300"}`}
    >
      {icon}
      <span className="font-medium">{text}</span>
      {active && <ChevronRight className="ml-auto h-4 w-4" />}
    </div>
  )
}

// Winner Profile component
const WinnerProfile = ({ winner }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Winner Profile</h2>
          <Trophy className="h-8 w-8 text-yellow-400" />
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-3 rounded-full">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{winner.name}</h3>
            <p className="text-gray-400">Elected Representative</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm break-all">{winner.address}</p>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Total Votes</span>
              <span className="text-xl font-bold text-white">{winner.votes}</span>
            </div>
            <VoteBar
              votes={winner.votes}
              maxVotes={winner.votes}
              color="bg-gradient-to-r from-purple-500 to-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WinningCandidate() {
  const { winner, fetchWinner, error } = useContext(VotingContext)
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const currentTimestamp = Math.floor(new Date().getTime() / 1000)
    fetchWinner(currentTimestamp)

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (winner) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [winner])

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg border border-red-500/50 max-w-md">
          <div className="bg-red-500/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error Occurred</h1>
          <p className="text-gray-300">{error}</p>
          <button className="mt-6 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-900 text-white flex">
        {showConfetti && <Confetti />}

        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 hidden md:block">
          <div className="flex items-center space-x-2 mb-8 px-2">
            <div className="bg-purple-600 p-1.5 rounded">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">ElectDash</h1>
          </div>

          <div className="space-y-1">
            <SidebarItem icon={<Home className="h-5 w-5" />} text="Dashboard" />
            <SidebarItem icon={<Trophy className="h-5 w-5" />} text="Results" active={true} />
            <SidebarItem icon={<Users className="h-5 w-5" />} text="Candidates" />
            <SidebarItem icon={<PieChart className="h-5 w-5" />} text="Statistics" />
            <SidebarItem icon={<Settings className="h-5 w-5" />} text="Settings" />
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <SidebarItem icon={<LogOut className="h-5 w-5" />} text="Logout" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center">
                  Election Results
                  <Trophy className="ml-3 h-6 w-6 text-yellow-400" />
                </h1>
                <p className="text-gray-400 mt-1">Results updated: {currentTime.toLocaleString()}</p>
              </div>

              <div className="mt-4 md:mt-0 bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
                <span className="flex items-center text-green-400">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Election Completed
                </span>
              </div>
            </div>

            {winner ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Winner Profile */}
                <div className="lg:col-span-2">
                  <WinnerProfile winner={winner} />
                </div>

                {/* Stats */}
                <div className="space-y-6">
                  <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Award className="mr-2 h-5 w-5 text-yellow-400" />
                      Victory Stats
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-400">Winning Margin</span>
                          <span className="text-white font-medium">100%</span>
                        </div>
                        <VoteBar votes={100} maxVotes={100} color="bg-green-500" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-400">Voter Turnout</span>
                          <span className="text-white font-medium">78%</span>
                        </div>
                        <VoteBar votes={78} maxVotes={100} color="bg-blue-500" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <StatCard
                      title="Total Votes"
                      value={winner.votes}
                      icon={<BarChart3 className="h-5 w-5 text-blue-400" />}
                      color="bg-blue-900/30"
                    />
                    <StatCard
                      title="Voter Turnout"
                      value="78%"
                      icon={<Users className="h-5 w-5 text-green-400" />}
                      color="bg-green-900/30"
                    />
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                    <h3 className="text-lg font-bold text-white mb-3">Election Timeline</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-green-500/20 p-2 rounded-full mr-3">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Voting Completed</p>
                          <p className="text-gray-400 text-sm">April 28, 2025</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-purple-500/20 p-2 rounded-full mr-3">
                          <Trophy className="h-4 w-4 text-purple-500" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Winner Announced</p>
                          <p className="text-gray-400 text-sm">April 28, 2025</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                    <h3 className="text-lg font-bold text-white mb-3">Voting Method</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Blockchain Votes</span>
                        <span className="text-white font-medium">100%</span>
                      </div>
                      <VoteBar votes={100} maxVotes={100} color="bg-purple-500" />
                      <p className="text-gray-400 text-sm mt-4">
                        All votes were securely recorded on the blockchain, ensuring transparency and immutability.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                    <h3 className="text-lg font-bold text-white mb-3">Next Steps</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="bg-blue-500/20 p-2 rounded-full mr-3">
                          <Clock className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Inauguration Ceremony</p>
                          <p className="text-gray-400 text-sm">May 15, 2025</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-blue-500/20 p-2 rounded-full mr-3">
                          <Clock className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-white font-medium">First Council Meeting</p>
                          <p className="text-gray-400 text-sm">May 20, 2025</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
                <div className="relative">
                  <div className="w-16 h-16 border-t-4 border-b-4 border-purple-500 rounded-full animate-spin"></div>
                  <div
                    className="w-16 h-16 border-l-4 border-r-4 border-transparent rounded-full animate-spin absolute top-0 left-0"
                    style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
                  ></div>
                </div>
                <p className="text-xl text-gray-300 font-medium mt-6">Tallying the votes...</p>
                <p className="text-gray-400 mt-2">Please wait while we calculate the final results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
