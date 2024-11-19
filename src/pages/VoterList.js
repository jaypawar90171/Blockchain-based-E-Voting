import React, { useEffect, useContext, useState } from "react";
import { VotingContext } from "../context/voter";
import {
  UserIcon,
  DocumentTextIcon,
  UploadIcon,
  CheckCircleIcon,
  ClipboardCheckIcon,
  SearchIcon,
  FilterIcon,
} from "@heroicons/react/solid";
import PageTransition from "../components/PageTransition";

// VoterCard component (improved)
const VoterCard = ({ voter }) => (
  <div className="bg-gray-800 shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
    <div className="flex items-center space-x-4">
      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
        <img src={ ("https://gateway.pinata.cloud/ipfs/" + voter[5] ) || "/placeholder-avatar.png"} alt={voter[1]} className="w-full h-full object-cover" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{voter[1]}</h3>
        <span className=" text-sm font-semibold text-white">Registered ID:</span><span className="text-white px-1">{voter[0].toNumber()}</span>
        {/* <p className="text-sm text-gray-600">{voter[0].toNumber()}</p> */}
      </div>
    </div>
    <div className="mt-4 space-y-2">
      <p className="text-sm text-white">
        <span className="font-semibold">Bloackchain Address:</span> {voter[2].slice(0, 20)}...
      </p>
      <p className="text-sm text-white">
        <span className="font-semibold">Status:</span> 
        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${voter[6] == 1 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {voter[6] === 1 ? 'Approved' : 'Pending'}
        </span>
      </p>
      <p className="text-sm text-white">
        <span className="font-semibold">Voting Status:</span>
        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${voter[4]? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {voter[4] ? 'You Already Voted' : 'Not Voted Yet'}
        </span>
      </p>
    </div>
  </div>
);

// SearchBar component (new)
const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search voters..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
  </div>
);

// FilterOptions component (new)
const FilterOptions = ({ filter, setFilter }) => (
  <div className="flex items-center space-x-4">
    <span className="text-gray-700">Filter by:</span>
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="all">All</option>
      <option value="approved">Approved</option>
      <option value="pending">Pending</option>
    </select>
  </div>
);

// RegistrationGuide component
const RegistrationGuide = () => (
  <div className="bg-white shadow-xl rounded-lg p-6 max-w-lg mx-auto mt-2 border-4 border-blue-500 border-double mb-4">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
      Registration Guide for Voters
    </h2>
    <p className="text-gray-600 mb-4">
      If you are not registered yet, please follow these steps:
    </p>
    <ol className="list-decimal list-inside text-gray-700 space-y-4">
      <li className="flex items-center hover:text-blue-600 transition-colors">
        <UserIcon className="w-6 h-6 text-blue-500 mr-2" />
        Navigate to the <span className="font-semibold">"Allowed Voters"</span> tab.
      </li>
      <li className="flex items-center hover:text-blue-600 transition-colors">
        <DocumentTextIcon className="w-6 h-6 text-green-500 mr-2" />
        Fill out your information (name, address, position).
      </li>
      <li className="flex items-center hover:text-blue-600 transition-colors">
        <UploadIcon className="w-6 h-6 text-yellow-500 mr-2" />
        Upload a valid profile image.
      </li>
      <li className="flex items-center hover:text-blue-600 transition-colors">
        <CheckCircleIcon className="w-6 h-6 text-purple-500 mr-2" />
        Click <span className="font-semibold">"Authorize Voter"</span> to submit.
      </li>
      <li className="flex items-center hover:text-blue-600 transition-colors">
        <ClipboardCheckIcon className="w-6 h-6 text-indigo-500 mr-2" />
        Wait for approval to participate in the election.
      </li>
    </ol>
  </div>
);

// VoterStats component
const VoterStats = ({ totalVoters, approvedVoters, pendingVoters }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Voter Statistics</h2>
    <div className="grid grid-cols-3 gap-4 text-center">
      <div>
        <p className="text-3xl font-bold text-blue-500">{totalVoters}</p>
        <p className="text-sm text-gray-600">Total Voters</p>
      </div>
      <div>
        <p className="text-3xl font-bold text-green-500">{approvedVoters}</p>
        <p className="text-sm text-gray-600">Approved</p>
      </div>
      <div>
        <p className="text-3xl font-bold text-yellow-500">{pendingVoters}</p>
        <p className="text-sm text-gray-600">Pending</p>
      </div>
    </div>
  </div>
);

// Main VoterList component
export default function VoterList() {
  const { getAllVoterData, voterArray } = useContext(VotingContext);
  const [showRegistrationGuide, setShowRegistrationGuide] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // getAllVoterData();
  }, []);

  const filteredVoters = voterArray.filter((voter) => {
    const matchesSearch = voter[1].toLowerCase().includes(searchTerm.toLowerCase()) ||
                          voter[1].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || 
                          (filter === "approved" && voter[6] === 1) ||
                          (filter === "pending" && voter[6] === 0);
    return matchesSearch && matchesFilter;
  });

  const approvedVoters = voterArray.filter(voter => voter[6] === 1).length;
  const pendingVoters = voterArray.filter(voter => voter[6] === 0).length;

  return (
    <PageTransition>
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Voter List</h1>
        
        <button 
          onClick={() => setShowRegistrationGuide(!showRegistrationGuide)} 
          className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          {showRegistrationGuide ? 'Hide Registration Guide' : 'Show Registration Guide'}
        </button>
        
        {showRegistrationGuide && <RegistrationGuide />}
        
        <VoterStats 
          totalVoters={voterArray.length} 
          approvedVoters={approvedVoters} 
          pendingVoters={pendingVoters} 
        />
        
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterOptions filter={filter} setFilter={setFilter} />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredVoters.map((voter, index) => (
            <VoterCard key={index} voter={voter} />
          ))}
        </div>
        
        {filteredVoters.length === 0 && (
          <p className="text-center text-gray-600 mt-8">No voters found matching your criteria.</p>
        )}
      </div>
    </div>
    </PageTransition>
  );
}