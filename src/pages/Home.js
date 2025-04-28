import { useContext, useEffect, useState } from "react"
import { VotingContext } from "../context/voter"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import PageTransition from "../components/PageTransition"
import {
  AlertTriangle,
  Award,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Eye,
  FileText,
  HelpCircle,
  Info,
  Lock,
  Shield,
  Star,
  TrendingUp,
  Users,
  Vote,
} from "lucide-react"
import FaceAuth from "../components/FaceAuth"

// Format address to be more readable
const formatAddress = (address) => {
  if (!address) return ""
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

// Animated Counter Component
const AnimatedCounter = ({ value, className }) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let start = 0
    const end = Number.parseInt(value)

    if (start === end) return

    const duration = 1000
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start > end) start = end
      setDisplayValue(Math.floor(start))

      if (start === end) clearInterval(timer)
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return <span className={className}>{displayValue}</span>
}

// Countdown component with a futuristic design
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearTimeout(timer)
  })

  function calculateTimeLeft() {
    const difference = +new Date("2023-12-31") - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-bold text-white">Time Remaining</h3>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-lg" />
            <div className="absolute inset-0 border border-purple-500/20 rounded-lg" />
            <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-lg p-3 text-center border border-purple-500/30">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {value}
              </span>
              <p className="text-xs text-gray-400 capitalize mt-1">{unit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Stats Card Component
const StatsCard = ({ icon, title, value, color, suffix = "", prefix = "" }) => (
  <motion.div
    className="relative overflow-hidden rounded-xl"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 rounded-xl`} />
    <div className="relative p-5 backdrop-blur-sm bg-gray-900/80 border border-gray-800 rounded-xl">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold text-white flex items-baseline">
            {prefix}
            <AnimatedCounter value={value} className="text-2xl font-bold text-white" />
            {suffix}
          </p>
        </div>
        <div className={`p-2 rounded-lg ${color.replace("from-", "bg-").split(" ")[0]}`}>{icon}</div>
      </div>
    </div>
  </motion.div>
)

// Progress Bar Component
const ProgressBar = ({ value, color, height = "h-2" }) => (
  <div className={`w-full bg-gray-800 rounded-full overflow-hidden ${height}`}>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`${color} rounded-full ${height}`}
    />
  </div>
)

// Candidate Card with a futuristic design
const CandidateCard = ({ candidate, giveVote }) => {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate() // Make sure to import this at the top

  const handleVoteClick = () => {
    // Store candidate info in localStorage before navigating
    localStorage.setItem('candidateToVoteFor', candidate[5])
    // Navigate to face auth page
    navigate('/face-auth')
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl" />
      <div className="absolute inset-0 border border-indigo-500/20 rounded-xl" />
      <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-500/30">
        <div className="relative w-full h-64 overflow-hidden">
          <img
            src={`https://gateway.pinata.cloud/ipfs/${candidate[4]}`}
            alt={`Profile picture of ${candidate[1]}`}
            className="w-full h-full object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"
            animate={{ opacity: isHovered ? 0.9 : 0.7 }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="text-2xl font-bold text-white">{candidate[1]}</h2>
            <div className="flex items-center mt-1">
              <div className="px-2 py-1 bg-indigo-900/60 backdrop-blur-sm rounded-md text-xs text-indigo-300 border border-indigo-700/50">
                ID: {formatAddress(candidate[5])}
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-blue-900/30 text-blue-400">
                <Users className="h-4 w-4" />
              </div>
              <span className="text-gray-300">Age: {candidate[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-purple-900/30 text-purple-400">
                <Vote className="h-4 w-4" />
              </div>
              <span className="text-gray-300">
                Votes: <span className="font-bold text-white">{candidate[3].toNumber()}</span>
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Popularity</span>
              <span className="text-gray-300">{Math.min(100, candidate[3].toNumber() * 10)}%</span>
            </div>
            <ProgressBar
              value={Math.min(100, candidate[3].toNumber() * 10)}
              color="bg-gradient-to-r from-indigo-500 to-purple-500"
            />
          </div>

          <motion.button
            onClick={handleVoteClick}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            whileTap={{ scale: 0.95 }}
            aria-label={`Give vote to ${candidate[1]}`}
          >
            <Vote className="h-5 w-5" />
            Cast Your Vote
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// Error Alert Component
const ErrorAlert = ({ message, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.3 }}
    className="p-4 mb-4 text-sm rounded-lg fixed top-4 left-1/2 transform -translate-x-1/2 z-50 shadow-lg bg-red-900/90 backdrop-blur-sm border border-red-700 text-white"
    role="alert"
  >
    <div className="flex items-center">
      <AlertTriangle className="w-5 h-5 mr-2 text-red-300" />
      <span className="font-medium mr-2">Error:</span> {message}
    </div>
    <button onClick={onClose} className="absolute top-1 right-1 text-red-300 hover:text-white">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </motion.div>
)

// Main Home Component
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
    userRole,
  } = useContext(VotingContext)

  const [totalVotes, setTotalVotes] = useState(0)
  const [participationRate, setParticipationRate] = useState(0)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("candidates")

  useEffect(() => {
    checkIfWalletIsConnected()

    // Calculate total votes and participation rate
    const votes = candidateArray.reduce((acc, candidate) => acc + candidate[3].toNumber(), 0)
    setTotalVotes(votes)
    setParticipationRate(voterLength > 0 ? Math.round((votes / voterLength) * 100) : 0)
  }, [candidateArray, voterLength])

  useEffect(() => {
    if (HomeError) {
      setError(HomeError) // Set error state if there's an error from VotingContext
    }
  }, [HomeError])

  // Wallet connection screen
  if (!currentAccount) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
        <div className="relative max-w-md w-full overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl" />
          <div className="absolute inset-0 border border-indigo-500/20 rounded-2xl" />
          <div className="relative bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-indigo-500/30 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                <Vote className="h-10 w-10 text-white" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-3xl font-bold text-white mb-4"
            >
              Decentralized Voting
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-gray-300 mb-8"
            >
              Connect your wallet to access the secure blockchain-based voting platform
            </motion.p>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              onClick={checkIfWalletIsConnected}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Lock className="h-5 w-5" />
              Connect Wallet
            </motion.button>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 text-sm text-gray-400"
            >
              Powered by Ethereum Blockchain Technology
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100">
        {/* Error Alert */}
        <AnimatePresence>{error && <ErrorAlert message={error} onClose={() => setError(null)} />}</AnimatePresence>

        {/* Header */}
        <header className="border-b border-gray-800 backdrop-blur-sm bg-gray-900/80 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Vote className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white hidden sm:block">Decentralized Voting</h1>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 text-sm text-gray-300 hidden sm:block">
                  <span className="text-indigo-400">{formatAddress(currentAccount)}</span>
                </div>
                <div className="px-3 py-1.5 bg-indigo-900/30 backdrop-blur-sm rounded-lg border border-indigo-700/50 text-sm text-indigo-300">
                  <span className="capitalize">{userRole || "Voter"}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Dashboard Title */}
          <div className="mb-8 text-center">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
            >
              Voting Dashboard
            </motion.h1>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-gray-400 mt-2"
            >
              Secure, transparent, and decentralized voting platform
            </motion.p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              icon={<Users className="h-5 w-5 text-blue-100" />}
              title="Total Candidates"
              value={candidateLength}
              color="from-blue-600 to-blue-800"
            />
            <StatsCard
              icon={<Vote className="h-5 w-5 text-green-100" />}
              title="Registered Voters"
              value={voterLength}
              color="from-green-600 to-green-800"
            />
            <StatsCard
              icon={<CheckCircle className="h-5 w-5 text-purple-100" />}
              title="Total Votes Cast"
              value={totalVotes}
              color="from-purple-600 to-purple-800"
            />
            <StatsCard
              icon={<TrendingUp className="h-5 w-5 text-indigo-100" />}
              title="Participation Rate"
              value={participationRate}
              color="from-indigo-600 to-indigo-800"
              suffix="%"
            />
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Info Cards */}
            <div className="space-y-6">
              {/* Voting Information Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl" />
                <div className="absolute inset-0 border border-indigo-500/20 rounded-xl" />
                <div className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-indigo-500/30">
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="h-5 w-5 text-indigo-400" />
                    <h2 className="text-xl font-bold text-white">Voting Information</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-900/30 text-blue-400">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Voting Period</p>
                        <p className="text-white font-medium">Nov 1 - Dec 31, 2023</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-900/30 text-green-400">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Security</p>
                        <p className="text-white font-medium">Blockchain Protected</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-900/30 text-purple-400">
                        <Eye className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Transparency</p>
                        <p className="text-white font-medium">Public Verification</p>
                      </div>
                    </div>
                  </div>

                  <Countdown />
                </div>
              </motion.div>

              {/* Voting Statistics Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="relative overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl" />
                <div className="absolute inset-0 border border-indigo-500/20 rounded-xl" />
                <div className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-indigo-500/30">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-indigo-400" />
                    <h2 className="text-xl font-bold text-white">Voting Statistics</h2>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Participation Rate</span>
                        <span className="text-gray-300">{participationRate}%</span>
                      </div>
                      <ProgressBar value={participationRate} color="bg-gradient-to-r from-green-500 to-emerald-500" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Candidate Approval</span>
                        <span className="text-gray-300">
                          {candidateArray.filter((c) => c[6] === 1).length}/{candidateLength || 0}
                        </span>
                      </div>
                      <ProgressBar
                        value={
                          candidateLength
                            ? (candidateArray.filter((c) => c[6] === 1).length / candidateLength) * 100
                            : 0
                        }
                        color="bg-gradient-to-r from-blue-500 to-indigo-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Time Elapsed</span>
                        <span className="text-gray-300">61%</span>
                      </div>
                      <ProgressBar value={61} color="bg-gradient-to-r from-amber-500 to-orange-500" />
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="h-5 w-5 text-amber-400" />
                      <h3 className="text-lg font-bold text-white">Leading Candidate</h3>
                    </div>

                    {candidateArray.filter((c) => c[6] === 1).length > 0 ? (
                      (() => {
                        const leadingCandidate = [...candidateArray]
                          .filter((c) => c[6] === 1)
                          .sort((a, b) => b[3].toNumber() - a[3].toNumber())[0]

                        return (
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500">
                              <img
                                src={`https://gateway.pinata.cloud/ipfs/${leadingCandidate[4]}`}
                                alt={leadingCandidate[1]}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-bold text-white">{leadingCandidate[1]}</p>
                              <p className="text-sm text-amber-400">{leadingCandidate[3].toNumber()} votes</p>
                            </div>
                          </div>
                        )
                      })()
                    ) : (
                      <p className="text-gray-400">No approved candidates yet</p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Help Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl" />
                <div className="absolute inset-0 border border-indigo-500/20 rounded-xl" />
                <div className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-indigo-500/30">
                  <div className="flex items-center gap-2 mb-4">
                    <HelpCircle className="h-5 w-5 text-indigo-400" />
                    <h2 className="text-xl font-bold text-white">Need Help?</h2>
                  </div>

                  <p className="text-gray-300 mb-4">
                    If you're experiencing any issues with the voting process, please refer to our help resources.
                  </p>

                  <div className="space-y-3">
                    <a
                      href="#"
                      className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Voting Instructions</span>
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <Shield className="h-4 w-4" />
                      <span>Security Information</span>
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span>Contact Support</span>
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Candidates */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-xl mb-6"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl" />
                <div className="absolute inset-0 border border-indigo-500/20 rounded-xl" />
                <div className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-indigo-500/30">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-indigo-400" />
                      <h2 className="text-xl font-bold text-white">Approved Candidates</h2>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveTab("candidates")}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === "candidates"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        All Candidates
                      </button>
                      <button
                        onClick={() => setActiveTab("popular")}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === "popular"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        Most Popular
                      </button>
                    </div>
                  </div>

                  {candidateArray.filter((candidate) => candidate[6] === 1).length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {candidateArray
                        .filter((candidate) => candidate[6] === 1)
                        .sort((a, b) => (activeTab === "popular" ? b[3].toNumber() - a[3].toNumber() : 0))
                        .map((candidate, index) => (
                          <CandidateCard key={index} candidate={candidate} giveVote={giveVote} />
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4"
                      >
                        <AlertTriangle className="h-8 w-8 text-amber-400" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-2">No Approved Candidates</h3>
                      <p className="text-gray-400 max-w-md mx-auto">
                        There are currently no approved candidates for this election. Please check back later.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Blockchain Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl" />
                <div className="absolute inset-0 border border-indigo-500/20 rounded-xl" />
                <div className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-indigo-500/30">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-md bg-indigo-900/50 text-indigo-400">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z"
                          fill="currentColor"
                          opacity="0.2"
                        />
                        <path
                          d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 3.18L19 6.3V11C19 16.15 15.79 19.92 12 21.12C8.21 19.92 5 16.15 5 11V6.3L12 3.18Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <h2 className="text-lg font-bold text-white">Blockchain Security</h2>
                  </div>

                  <p className="text-gray-300 mb-4">
                    Your vote is secured by blockchain technology, ensuring transparency and immutability.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400 mb-1">Network</p>
                      <p className="text-sm font-medium text-white">Ethereum</p>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400 mb-1">Status</p>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
                        <p className="text-sm font-medium text-white">Active</p>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400 mb-1">Gas Price</p>
                      <p className="text-sm font-medium text-white">25 Gwei</p>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400 mb-1">Block Time</p>
                      <p className="text-sm font-medium text-white">~15 sec</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  )
}

export default Home
