"use client"

import { useEffect, useContext, useState } from "react"
import { VotingContext } from "../context/voter"
import {
  UserIcon,
  DocumentTextIcon,
  UploadIcon,
  CheckCircleIcon,
  ClipboardCheckIcon,
  SearchIcon,
  UsersIcon,
  CheckIcon,
  ClockIcon,
  EyeIcon,
  ChartBarIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid"
import PageTransition from "../components/PageTransition"

// VoterCard component (redesigned)
const VoterCard = ({ voter }) => (
  <div className="bg-gray-900 border border-gray-800 shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 hover:border-purple-500">
    <div className="flex items-center space-x-4">
      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800 border-2 border-purple-500">
        <img
          src={"https://gateway.pinata.cloud/ipfs/" + voter[5] || "/placeholder-avatar.png"}
          alt={voter[1]}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{voter[1]}</h3>
        <div className="flex items-center">
          <span className="text-sm font-semibold text-gray-400">ID:</span>
          <span className="text-purple-400 px-1">{voter[0].toNumber()}</span>
        </div>
      </div>
    </div>
    <div className="mt-4 space-y-3">
      <p className="text-sm text-gray-300">
        <span className="font-semibold text-gray-400">Address:</span> {voter[2].slice(0, 20)}...
      </p>
      <p className="text-sm flex items-center">
        <span className="font-semibold text-gray-400 mr-2">Status:</span>
        <span
          className={`px-3 py-1 rounded-full text-xs ${voter[6] == 1 ? "bg-purple-900 text-purple-200" : "bg-gray-800 text-yellow-300"}`}
        >
          {voter[6] === 1 ? "Approved" : "Pending"}
        </span>
      </p>
      <p className="text-sm flex items-center">
        <span className="font-semibold text-gray-400 mr-2">Voting Status:</span>
        <span
          className={`px-3 py-1 rounded-full text-xs ${voter[4] ? "bg-purple-900 text-purple-200" : "bg-gray-800 text-yellow-300"}`}
        >
          {voter[4] ? "Voted" : "Not Voted"}
        </span>
      </p>
    </div>
  </div>
)

// SearchBar component (redesigned)
const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search voters..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
    />
    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
  </div>
)

// FilterOptions component (redesigned)
const FilterOptions = ({ filter, setFilter }) => (
  <div className="flex items-center space-x-4">
    <span className="text-gray-400">Filter by:</span>
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="rounded-lg border border-gray-700 bg-gray-900 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      <option value="all">All</option>
      <option value="approved">Approved</option>
      <option value="pending">Pending</option>
    </select>
  </div>
)

// RegistrationGuide component (redesigned)
const RegistrationGuide = () => (
  <div className="bg-gray-900 shadow-xl rounded-lg p-6 max-w-lg mx-auto mt-2 border border-purple-500 mb-6">
    <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2 flex items-center">
      <InformationCircleIcon className="w-6 h-6 text-purple-500 mr-2" />
      Registration Guide for Voters
    </h2>
    <p className="text-gray-400 mb-4">If you are not registered yet, please follow these steps:</p>
    <ol className="list-decimal list-inside text-gray-300 space-y-4">
      <li className="flex items-center hover:text-purple-400 transition-colors">
        <UserIcon className="w-6 h-6 text-purple-500 mr-2" />
        Navigate to the <span className="font-semibold">"Allowed Voters"</span> tab.
      </li>
      <li className="flex items-center hover:text-purple-400 transition-colors">
        <DocumentTextIcon className="w-6 h-6 text-purple-500 mr-2" />
        Fill out your information (name, address, position).
      </li>
      <li className="flex items-center hover:text-purple-400 transition-colors">
        <UploadIcon className="w-6 h-6 text-purple-500 mr-2" />
        Upload a valid profile image.
      </li>
      <li className="flex items-center hover:text-purple-400 transition-colors">
        <CheckCircleIcon className="w-6 h-6 text-purple-500 mr-2" />
        Click <span className="font-semibold">"Authorize Voter"</span> to submit.
      </li>
      <li className="flex items-center hover:text-purple-400 transition-colors">
        <ClipboardCheckIcon className="w-6 h-6 text-purple-500 mr-2" />
        Wait for approval to participate in the election.
      </li>
    </ol>
  </div>
)

// VoterStats component (redesigned)
const VoterStats = ({ totalVoters, approvedVoters, pendingVoters }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div className="bg-gray-900 border border-gray-800 shadow-lg rounded-lg p-6 flex items-center">
      <div className="bg-blue-600 rounded-lg p-2 mr-4">
        <UsersIcon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-400">Total Voters</p>
        <p className="text-2xl font-bold text-white">{totalVoters}</p>
      </div>
    </div>

    <div className="bg-gray-900 border border-gray-800 shadow-lg rounded-lg p-6 flex items-center">
      <div className="bg-purple-600 rounded-lg p-2 mr-4">
        <CheckIcon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-400">Approved</p>
        <p className="text-2xl font-bold text-white">{approvedVoters}</p>
      </div>
    </div>

    <div className="bg-gray-900 border border-gray-800 shadow-lg rounded-lg p-6 flex items-center">
      <div className="bg-yellow-600 rounded-lg p-2 mr-4">
        <ClockIcon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-400">Pending</p>
        <p className="text-2xl font-bold text-white">{pendingVoters}</p>
      </div>
    </div>
  </div>
)

// Voting Information component (new)
const VotingInformation = () => (
  <div className="bg-gray-900 border border-gray-800 shadow-lg rounded-lg p-6 mb-6">
    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
      <InformationCircleIcon className="w-6 h-6 text-purple-500 mr-2" />
      Voting Information
    </h2>

    <div className="space-y-4">
      <div className="flex items-center">
        <div className="bg-purple-900/30 p-2 rounded-lg mr-3">
          <ClockIcon className="h-5 w-5 text-purple-400" />
        </div>
        <div>
          <p className="text-gray-400 text-sm">Voting Period</p>
          <p className="text-white font-medium">Active</p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="bg-purple-900/30 p-2 rounded-lg mr-3">
          <CheckCircleIcon className="h-5 w-5 text-purple-400" />
        </div>
        <div>
          <p className="text-gray-400 text-sm">Security</p>
          <p className="text-white font-medium">Blockchain Protected</p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="bg-purple-900/30 p-2 rounded-lg mr-3">
          <EyeIcon className="h-5 w-5 text-purple-400" />
        </div>
        <div>
          <p className="text-gray-400 text-sm">Transparency</p>
          <p className="text-white font-medium">Public Verification</p>
        </div>
      </div>
    </div>
  </div>
)

// Main VoterList component
export default function VoterList() {
  const { getAllVoterData, voterArray } = useContext(VotingContext)
  const [showRegistrationGuide, setShowRegistrationGuide] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    // getAllVoterData();
  }, [])

  const filteredVoters = voterArray.filter((voter) => {
    const matchesSearch =
      voter[1].toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter[1].toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filter === "all" || (filter === "approved" && voter[6] === 1) || (filter === "pending" && voter[6] === 0)
    return matchesSearch && matchesFilter
  })

  const approvedVoters = voterArray.filter((voter) => voter[6] === 1).length
  const pendingVoters = voterArray.filter((voter) => voter[6] === 0).length

  return (
    <PageTransition>
      <div className="bg-gray-950 min-h-screen py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-400 mb-2">Voting Dashboard</h1>
            <p className="text-gray-400">Secure, transparent, and decentralized voting platform</p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="md:w-1/3">
              <VotingInformation />

              <div className="bg-gray-900 border border-gray-800 shadow-lg rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <ChartBarIcon className="w-6 h-6 text-purple-500 mr-2" />
                  Voting Statistics
                </h2>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400">Participation Rate</span>
                      <span className="text-white">
                        {voterArray.length > 0
                          ? Math.round((voterArray.filter((v) => v[4]).length / voterArray.length) * 100)
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full"
                        style={{
                          width: `${
                            voterArray.length > 0
                              ? Math.round((voterArray.filter((v) => v[4]).length / voterArray.length) * 100)
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400">Voter Approval</span>
                      <span className="text-white">
                        {voterArray.length > 0 ? Math.round((approvedVoters / voterArray.length) * 100) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full"
                        style={{
                          width: `${
                            voterArray.length > 0 ? Math.round((approvedVoters / voterArray.length) * 100) : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowRegistrationGuide(!showRegistrationGuide)}
                className="w-full mb-6 bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-600 hover:to-purple-400 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
              >
                {showRegistrationGuide ? "Hide Registration Guide" : "Show Registration Guide"}
              </button>

              {showRegistrationGuide && <RegistrationGuide />}
            </div>

            <div className="md:w-2/3">
              <VoterStats
                totalVoters={voterArray.length}
                approvedVoters={approvedVoters}
                pendingVoters={pendingVoters}
              />

              <div className="bg-gray-900 border border-gray-800 shadow-lg rounded-lg p-6 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 mb-6">
                  <h2 className="text-xl font-semibold text-white">Registered Voters</h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <FilterOptions filter={filter} setFilter={setFilter} />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                  {filteredVoters.map((voter, index) => (
                    <VoterCard key={index} voter={voter} />
                  ))}
                </div>

                {filteredVoters.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-400 mb-2">No voters found matching your criteria.</p>
                    <p className="text-purple-400">Try adjusting your search or filter settings</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
