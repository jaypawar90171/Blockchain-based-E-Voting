// SPDX-License-Identifier: unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol"; //handling incrementing and decrementing of values
import "@openzeppelin/contracts/utils/Strings.sol";

contract VotingContract {
    using Counters for Counters.Counter;

    address public votingOrganizer; //this is the Election Commision
    uint256 startTime; //time when election starts
    uint256 endTime; //time when election ends
    Counters.Counter private _voterId; //registerId of the Voter
    Counters.Counter private _candidateId; ///registerId of the Candidate

    enum ApprovalStatus {
        Pending,
        Approved,
        Rejected
    }

    // Candidate
    struct Candidate {
        uint256 candidateId;
        string age;
        string name;
        string ipfs;
        uint256 voteCount;
        address _address;
        string message;
        ApprovalStatus status;
    }

    // Event is used to store the data on the blockchain
    event CandidateCreate(
        uint256 indexed candidateId,
        string age,
        string name,
        uint256 voteCount,
        address _address,
        string message,
        ApprovalStatus status
    );

    mapping(address => Candidate) public candidates;
    mapping(address => Voters) public voters;

    address[] public candidateAddress; // Store the address of all candidates
    address[] public votedVoters; // voters who voted
    address[] public votersAddress;
    address[] public approvedCandidates;
    address[] public approvedVoters;

    struct Voters {
        uint256 voter_voterId;
        string voter_name;
        address voter_address;
        bool voter_voted;
        uint256 voter_vote;
        string voter_ipfs;
        string message;
        ApprovalStatus status;
        // uint256 voter_allowed;
    }

    // Saves voter on the blockchain when emitted
    event voterCreated(
        uint256 indexed voter_voterId,
        string voter_name,
        address voter_address,
        bool voter_voted,
        uint256 voter_vote,
        string message,
        ApprovalStatus status
    );

    constructor() {
        votingOrganizer = msg.sender; // Person responsible for managing the election (Election Commission)
        startTime = 0;
        endTime = 0;
    }

    modifier onlyOwner() {
        require(
            msg.sender == votingOrganizer,
            "Only owner can call this function"
        );
        _;
    }

    modifier onlyDuringVotingPeroid() {
        require(
            block.timestamp >= startTime && block.timestamp <= endTime,
            "Voting is not active"
        );
        _;
    }

    // Function to add the candidate
    function setCandidate(
        address _address,
        string memory _age,
        string memory _name,
        string memory _ipfs
    ) public {
        require(
            keccak256(bytes(_age)) != keccak256(bytes("21")),
            "You are not eligible to be a candidate"
        );

        _candidateId.increment(); // Increment count as each candidate is added
        uint256 IdNumber = _candidateId.current();
        Candidate storage candidate = candidates[_address]; // Object of Candidate

        candidate.candidateId = IdNumber;
        candidate.age = _age;
        candidate.name = _name;
        candidate.voteCount = 0;
        candidate._address = _address;
        candidate.ipfs = _ipfs;
        candidate.status = ApprovalStatus.Pending;
        candidate.message = "";

        // Store address in the array of all candidates
        candidateAddress.push(_address);

        emit CandidateCreate(
            IdNumber,
            _age,
            _name,
            candidate.voteCount,
            _address,
            candidate.message,
            candidate.status
        );
    }

    // Function to get all the candidates
    function getCandidates() public view returns (address[] memory) {
        return candidateAddress;
    }

    // Function to return total number of candidates
    function getCandidateLength() public view returns (uint256) {
        return candidateAddress.length;
    }

    // Function to get the details of the particular candidate
    function getCandidateData(
        address _address
    )
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            uint256,
            string memory,
            address,
            ApprovalStatus
        )
    {
        return (
            candidates[_address].age,
            candidates[_address].name,
            candidates[_address].candidateId,
            candidates[_address].voteCount,
            candidates[_address].ipfs,
            candidates[_address]._address,
            candidates[_address].status
        );
    }

    // Approve a candidate with a message
    function approveCandidate(
        address _candidateAddress,
        string memory _message
    ) public onlyOwner {
        Candidate storage candidate = candidates[_candidateAddress];
        require(
            candidate.status == ApprovalStatus.Pending,
            "Candidate status must be pending"
        );

        candidate.status = ApprovalStatus.Approved;
        candidate.message = _message;
        approvedCandidates.push(_candidateAddress);
    }

    // Reject a candidate with a message
    function rejectCandidate(
        address _candidateAddress,
        string memory _message
    ) public onlyOwner {
        Candidate storage candidate = candidates[_candidateAddress];
        require(
            candidate.status == ApprovalStatus.Pending,
            "Candidate status must be pending"
        );

        candidate.status = ApprovalStatus.Rejected;
        candidate.message = _message;
    }

    // Function to get all approved voters
    function getAllApprovedCandidates() public view returns (address[] memory) {
        return approvedCandidates;
    }

    // Function to update an existing candidate's details
    function updateCandidate(
        address _candidateAddress,
        string memory _name,
        string memory _ipfs
    ) public onlyOwner {
        Candidate storage candidate = candidates[_candidateAddress];
        require(candidate._address != address(0), "Candidate does not exist");

        // Update the candidate's details
        candidate.name = _name;
        candidate.ipfs = _ipfs;
    }

    /// --- VOTER SECTION --- ///

    function voterRight(
        address _address,
        string memory _name,
        string memory _ipfs
    ) public {
        _voterId.increment(); // Increment the voter count as voter is created
        uint256 IdNumber = _voterId.current();

        Voters storage voter = voters[_address];
        require(voter.voter_voted == false, "Voter already allowed"); // Require that the voter hasn't been allowed before

        // Set the voter's data
        voter.voter_name = _name;
        voter.voter_ipfs = _ipfs;
        voter.voter_voterId = IdNumber;
        voter.voter_address = _address;
        voter.voter_vote = 1000;
        voter.voter_voted = false;
        voter.status = ApprovalStatus.Pending;
        voter.message = "";

        // Store the voter's address
        votersAddress.push(_address);

        emit voterCreated(
            IdNumber,
            _name,
            _address,
            voter.voter_voted,
            voter.voter_vote,
            voter.message,
            voter.status
        );
    }

    function vote(address _candidateAddress) external onlyDuringVotingPeroid {
        Voters storage voter = voters[msg.sender];
        require(!voter.voter_voted, "You have already voted");

        // Ensure the candidate address is valid and exists
        require(
            candidates[_candidateAddress].candidateId != 0,
            "Invalid candidate address"
        );
        require(
            voter.status == ApprovalStatus.Approved,
            "You are not an approved voter"
        );

        Candidate storage candidate = candidates[_candidateAddress];
        require(
            candidate.status == ApprovalStatus.Approved,
            "Candidate is not approved"
        );

        // Mark the voter as having voted
        voter.voter_voted = true;
        // voter.voter_vote = _candidateId.current(); // Determines which voter gives vote to which candidate
        voter.voter_vote = candidates[_candidateAddress].candidateId;

        // Increment the candidate’s vote count
        candidates[_candidateAddress].voteCount++;
        // Add the voter's address to the list of voted voters
        votedVoters.push(msg.sender);
    }

    // Function to count total number of voters
    function voterLength() public view returns (uint256) {
        return votersAddress.length;
    }

    // Function to get the particular voter's data
    function getVoterData(
        address _address
    )
        public
        view
        returns (
            uint256,
            string memory,
            address,
            uint256,
            bool,
            string memory,
            ApprovalStatus status
        )
    {
        return (
            voters[_address].voter_voterId,
            voters[_address].voter_name,
            voters[_address].voter_address,
            voters[_address].voter_vote,
            voters[_address].voter_voted,
            voters[_address].voter_ipfs,
            voters[_address].status
        );
    }

    // Approve a voter to be eligible to vote
    function approveVoter(
        address _voterAddress,
        string memory _message
    ) public onlyOwner {
        Voters storage voter = voters[_voterAddress];
        require(
            voter.status == ApprovalStatus.Pending,
            "Voter status must be pending"
        );

        voter.status = ApprovalStatus.Approved;
        voter.message = _message;
        approvedVoters.push(_voterAddress);
    }

    // Reject a voter with a message
    function rejectVoter(
        address _voterAddress,
        string memory _message
    ) public onlyOwner {
        Voters storage voter = voters[_voterAddress];
        require(
            voter.status == ApprovalStatus.Pending,
            "Voter status must be pending"
        );
        voter.status = ApprovalStatus.Rejected;
        voter.message = _message; // Set the rejection message
    }

    // Function to get the list of people who actually voted
    function getVotedVotersList() public view returns (address[] memory) {
        return votedVoters;
    }

    // Function to get the list of voters who have the right to vote
    function getVoterList() public view returns (address[] memory) {
        return votersAddress;
    }

    // function to return all approved voters
    function getAllApprovedVoters() public view returns (address[] memory) {
        return approvedVoters;
    }

    //function to update existing voter's details
    function updateVoter(
        address _voterAddress,
        string memory _name,
        string memory _ipfs
    ) public onlyOwner {
        Voters storage voter = voters[_voterAddress];
        require(voter.voter_address != address(0), "Voter does not exist");

        // Update the voter's details
        voter.voter_name = _name;
        voter.voter_ipfs = _ipfs;
    }

    // ---- Election Commision ------

    // Set the voting period (start and end times)
    function setVotingPeriod(
        uint256 _startTime,
        uint256 _endTime
    ) public onlyOwner {
        require(_startTime < _endTime, "Start time must be before end time");

        startTime = _startTime;
        endTime = _endTime;
    }

    //function to chnage the owner of the contract
    function changeOwner(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be the zero address");
        votingOrganizer = newOwner;
    }

    // Function to reset the contract data
    function resetContract() public onlyOwner {
        // Reset counters
        _voterId.reset();
        _candidateId.reset();

        // Clear candidate and voter mappings and arrays
        for (uint256 i = 0; i < votersAddress.length; i++) {
            address voterAddr = votersAddress[i];
            delete voters[voterAddr];
        }
        for (uint256 i = 0; i < candidateAddress.length; i++) {
            address candidateAddr = candidateAddress[i];
            delete candidates[candidateAddr];
        }

        // Clear arrays
        delete votersAddress;
        delete candidateAddress;
        delete votedVoters;
        delete approvedVoters;
        delete approvedCandidates;

        // Reset voting period
        startTime = 0;
        endTime = 0;
    }

    // Function to check the current status of the voting period
    function currentVotingStatus(
        uint256 _currentTime
    ) public view returns (string memory) {
        if (startTime == 0 && endTime == 0) {
            return "Voting period not set";
        } else if (_currentTime < startTime) {
            return "Voting has not started yet";
            // string.concat(
            //     "Voting has not started yet",
            //     Strings.toString(block.timestamp)
            // );
        } else if (_currentTime >= startTime && _currentTime <= endTime) {
            return "Voting is in progress";
            // string.concat(
            //     "Voting is in progress",
            //     Strings.toString(_currentTime)
            // );
        } else {
            return "Voting has ended";
            // string.concat(
            //     "Voting has ended",
            //     Strings.toString(_currentTime)
            // );
        }
    }

    // Function to get the winning candidate based on the highest vote count
    function getWinningCandidate(
        uint256 _currentTime
    )
        public
        view
        returns (
            address winningCandidate,
            string memory name,
            uint256 voteCount
        )
    {
        require(_currentTime > endTime, "Voting period has not ended yet");

        uint256 highestVoteCount = 0;
        address winnerAddress;

        for (uint256 i = 0; i < candidateAddress.length; i++) {
            address candidateAddr = candidateAddress[i];
            Candidate storage candidate = candidates[candidateAddr];

            if (candidate.voteCount > highestVoteCount) {
                highestVoteCount = candidate.voteCount;
                winnerAddress = candidateAddr;
            }
        }

        Candidate storage winningCandidateData = candidates[winnerAddress];
        return (
            winnerAddress,
            winningCandidateData.name,
            winningCandidateData.voteCount
        );
    }

    // Function to get the role of a user based on their address
    // function getUserRole(address _address) public view returns (string memory)
    // {
    //     // Check if the address is a candidate
    //     if (candidates[_address].candidateId != 0)
    //     {
    //         return "candidate";
    //     }
    //     // Check if the address is a voter
    //     if (voters[_address].voter_voterId != 0)
    //     {
    //         return "voter";
    //     }

    //     // Return "none" if the address is neither a candidate nor a voter
    //     return "none";
    // }
}
