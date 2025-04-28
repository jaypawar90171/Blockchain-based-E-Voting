"use client"

import { useContext, useEffect, useState } from "react"
import { VotingContext } from "../context/voter"
import { motion, AnimatePresence } from "framer-motion"
import PageTransition from "../components/PageTransition"
import { AlertTriangle, CheckCircle, Eye, Lock, Search, Users, Vote, X, UserCheck } from "lucide-react"

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

// Voter Card with a futuristic design
const VoterCard = ({ voter, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false)

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
            src={`https://gateway.pinata.cloud/ipfs/${voter[5]}`}
            alt={`Profile picture of ${voter[1]}`}
            className="w-full h-full object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"
            animate={{ opacity: isHovered ? 0.9 : 0.7 }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="text-2xl font-bold text-white">{voter[1]}</h2>
            <div className="flex items-center mt-1">
              <div className="px-2 py-1 bg-yellow-900/60 backdrop-blur-sm rounded-md text-xs text-yellow-300 border border-yellow-700/50">
                Pending Approval
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
              <span className="text-gray-300">ID: {voter[0].toNumber()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-purple-900/30 text-purple-400">
                <Vote className="h-4 w-4" />
              </div>
              <span className="text-gray-300">
                Status: <span className="font-bold text-white">{voter[4] ? "Voted" : "Not Voted"}</span>
              </span>
            </div>
          </div>

          <div className="text-gray-400 text-sm truncate">Address: {formatAddress(voter[2])}</div>

          <motion.button
            onClick={() => onViewDetails(voter)}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="h-5 w-5" />
            View Details
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

// Voter Details Modal
const VoterDetailsModal = ({ voter, onClose, onApprove, onReject, message, setMessage }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative max-w-lg w-full rounded-xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl" />
      <div className="absolute inset-0 border border-indigo-500/20 rounded-xl" />
      <div className="relative bg-gray-900/95 backdrop-blur-sm p-6 rounded-xl border border-indigo-500/30">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <div className="rounded-xl overflow-hidden border-2 border-indigo-500/30">
              <img
                src={`https://gateway.pinata.cloud/ipfs/${voter[5]}`}
                alt={`Profile picture of ${voter[1]}`}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-4">
            <h2 className="text-3xl font-bold text-white">{voter[1]}</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                <p className="text-xs text-gray-400 mb-1">ID</p>
                <p className="text-sm font-medium text-white">{voter[0].toNumber()}</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                <p className="text-xs text-gray-400 mb-1">Voting Status</p>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full ${voter[4] ? "bg-green-500" : "bg-yellow-500"} mr-1.5`}></div>
                  <p className="text-sm font-medium text-white">{voter[4] ? "Voted" : "Not Voted"}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
              <p className="text-xs text-gray-400 mb-1">Blockchain Address</p>
              <p className="text-sm font-medium text-white break-all">{voter[2]}</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm text-gray-300">
                Approval/Rejection Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter a reason for approval or rejection"
                className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-2">
              <motion.button
                onClick={() => onApprove(voter[2])}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                whileTap={{ scale: 0.95 }}
              >
                <CheckCircle className="h-5 w-5" />
                Approve
              </motion.button>
              <motion.button
                onClick={() => onReject(voter[2])}
                className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-5 w-5" />
                Reject
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
)

// Main UnapprovedVoters Component
const UnapprovedVoters = () => {
  const { voterArray, ApproveVoter, RejectVoter, checkIfWalletIsConnected, currentAccount, userRole } =
    useContext(VotingContext)

  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("name")
  const [selectedVoter, setSelectedVoter] = useState(null)
  const [message, setMessage] = useState("")
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("all")
  const itemsPerPage = 6

  const unapprovedVoters = voterArray.filter((voter) => voter[6] === 0)

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const handleApprove = (id) => {
    if (!message) {
      setError("Please enter a reason before approving.")
      return
    }
    ApproveVoter(id, message)
    console.log(`Approved voter with address: ${id} Reason: ${message}`)
    setMessage("")
    setSelectedVoter(null)
  }

  const handleReject = (id) => {
    if (!message) {
      setError("Please enter a reason before rejecting.")
      return
    }
    RejectVoter(id, message)
    console.log(`Rejected voter with address: ${id} Reason: ${message}`)
    setMessage("")
    setSelectedVoter(null)
  }

  const sortedVoters = [...unapprovedVoters].sort((a, b) => {
    if (sortBy === "name") return a[1].localeCompare(b[1])
    if (sortBy === "id") return a[0].toNumber() - b[0].toNumber()
    if (sortBy === "status") return a[4] === b[4] ? 0 : a[4] ? 1 : -1
    return 0
  })

  const filteredVoters = sortedVoters.filter(
    (voter) =>
      voter[1].toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter[0].toNumber().toString().includes(searchTerm) ||
      voter[2].toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const pageCount = Math.ceil(filteredVoters.length / itemsPerPage)
  const paginatedVoters = filteredVoters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
                  <span className="capitalize">{userRole || "Admin"}</span>
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
              Voter Approval Dashboard
            </motion.h1>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-gray-400 mt-2"
            >
              Review and approve voter registrations for the election
            </motion.p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              icon={<Users className="h-5 w-5 text-yellow-100" />}
              title="Pending Approvals"
              value={unapprovedVoters.length}
              color="from-yellow-600 to-amber-800"
            />
            <StatsCard
              icon={<CheckCircle className="h-5 w-5 text-green-100" />}
              title="Approved Voters"
              value={voterArray.filter((v) => v[6] === 1).length}
              color="from-green-600 to-green-800"
            />
            <StatsCard
              icon={<UserCheck className="h-5 w-5 text-blue-100" />}
              title="Voters Who Voted"
              value={voterArray.filter((v) => v[4]).length}
              color="from-blue-600 to-blue-800"
            />
          </div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-xl mb-6"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl" />
            <div className="absolute inset-0 border border-indigo-500/20 rounded-xl" />
            <div className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-indigo-500/30">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="w-full md:w-auto relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, ID, or address"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-80 pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="id">Sort by ID</option>
                    <option value="status">Sort by Voting Status</option>
                  </select>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab("all")}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === "all" ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      All Pending
                    </button>
                    <button
                      onClick={() => setActiveTab("recent")}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === "recent"
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      Recent
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Voters Grid */}
          {paginatedVoters.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl" />
              <div className="absolute inset-0 border border-indigo-500/20 rounded-xl" />
              <div className="relative bg-gray-900/80 backdrop-blur-sm p-12 rounded-xl border border-indigo-500/30 text-center">
                <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Pending Voters</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  There are currently no voters waiting for approval. All voters have been processed.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {paginatedVoters.map((voter) => (
                <VoterCard key={voter[2]} voter={voter} onViewDetails={setSelectedVoter} />
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="mt-8 flex justify-center">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`mx-1 px-4 py-2 rounded-md transition-colors ${
                    currentPage === page ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}

          {/* Voter Details Modal */}
          <AnimatePresence>
            {selectedVoter && (
              <VoterDetailsModal
                voter={selectedVoter}
                onClose={() => setSelectedVoter(null)}
                onApprove={handleApprove}
                onReject={handleReject}
                message={message}
                setMessage={setMessage}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </PageTransition>
  )
}

export default UnapprovedVoters
