import React, { useState, createContext, useEffect } from 'react';
import Web3Modal from 'web3modal'; // Library for wallet connections
import { ethers } from 'ethers';
import { VotingAddress, VotingAddressABI } from './constants';
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";

// Function to get the contract instance
const getContracts = (signerOrProvider) => new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);

// Create context to share state globally
export const VotingContext = createContext();

// This context provider will pass contract and voting information to the dApp
export const VotingProvider = ({ children }) => {
  // const votingTitle = "data is passing";
  const highestVote = [];
  // const dataArray = [];

  //---Candidate Section---
  const [candidateIndex, setCandidateIndex] = useState([]);
  const [pushCandidate, setPushCandidate] = useState([]); // Stores all candidates
  const [currentAccount, setCurrentAccount] = useState('');
  const [candidateLength, setCandidateLength] = useState('');
  const [candidateArray, setCandidateArray] = useState([]); // Stores all candidates
  const [error, setError] = useState('');

  const [currentVotingStatus, setCurrentVotingStatus] = useState('');
  const [winner, setWinner] = useState(null);
  const[userRole, setUserRole] = useState('');

  //---Voter section---
  const [voterArray, setVoterArray] = useState([]); // Stores all voters
  const [voterLength, setVoterLength] = useState('');
  const [voterAddress, setVoterAddress] = useState([]);

  const [message, setMessage] = useState('');

  const storeArray = [];

  //---Connecting MetaMask---
  const checkIfWalletIsConnected = async () => 
  {
    if (!window.ethereum) return setError("You have not installed MetaMask");

    const account = await window.ethereum.request({ method: "eth_accounts" });

    if (account.length) 
    {
      setCurrentAccount(account[0]); // Set thecurrent account i.e. which is active on the metamask
    } 
    else 
    {
      setError("Please install MetaMask, connect, and reload");
    }
  };

  // Connecting to the wallet
  const connectWallet = async () => {
    if (!window.ethereum) return setError("You have not installed MetaMask");

    const account = await window.ethereum.request({ method: "eth_requestAccounts" });
    setCurrentAccount(account[0]); // Set the account
    console.log("Connected account:", account[0]); // Log the connected account
};

  // Create a new voter in the smart contract
  const createVoter = async (formInput) => {
    try {
      const { name, address, position, ipfs } = formInput;
      console.log(name, address, position);
      
      if (!name || !address || !position || !ipfs) {
        setError("Input Data is Missing");
        console.log("Missing data");
        return;
      }
      //---Connecting Smart Contract to frontend
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = getContracts(signer);

      const voter = await contract.voterRight(address, name , ipfs);
      await voter.wait();
      console.log(`Transaction successful: ${voter.hash}`);
      console.log(`Transaction details:`, voter);
      // Update the voterArray immediately after voter is added
      const newVoter = { name, address, position, ipfs };
      setVoterArray(prevState => [...prevState, newVoter]);
      console.log("Voter added:", newVoter);
      setUserRole('Voter');
      console.log(userRole);
  
      //Redirect
      window.location.href = "/voterlist";
      // navigate("/unapprovedVoters");
    } catch (error) {
      console.error("Error in creating voter:", error);
      setError('Error in creating voter');
    }
  };

  useEffect(() => {
    console.log("updated voter array:", voterArray);
  }, [voterArray])

  // --- Get Voter Data
  const getAllVoterData = async() => {
    //---Connecting Smart Contract to frontend
    try{
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = getContracts(signer);

    //returns the list of all the voters on the blockchain
    const voterListData = await contract.getVoterList();
    setVoterAddress(voterListData);

    //displays the details of each single voter
    voterListData.map(async (ele) => {
      const singleVoterData = await contract.getVoterData(ele);
      // Update the voterArray with each voter data
      setVoterArray(prevState => [...prevState, singleVoterData]);
      console.log("Voter data:", singleVoterData);
    })

    //returns the total number of voters available
    const voterlength = await contract.voterLength();
    setVoterLength(voterlength.toNumber());
    console.log(voterlength.toNumber());  //convert hec to number
    }
    catch(error)
    {
      console.error("Error in fetching data:", error);
      setError('Something went wrong with fetching data from the contract');
    }
  }


  //function to Approve the candidates
  const ApproveVoter = async(voterAddress, message) => {
    try 
    {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = getContracts(signer);

      const transition = await contract.approveVoter(voterAddress, message);
      await transition.wait();
      console.log(`Voter approved: ${voterAddress}`);
      //Redirect
      window.location.href = "/home";
    } 
    catch (error) 
    {
      console.error("Error in approving voter:", error);
      setError("Failed to approve voter");
    }
  };
  
  const RejectVoter = async(voterAddress, message) =>
  {
    try 
    {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = getContracts(signer);

      const transition = await contract.rejectVoter(voterAddress, message);
      await transition.wait();
      console.log(`Voter rejected: ${voterAddress}`);
    } 
    catch (error) 
    {
      console.error("Error in rejecting voter:", error);
      setError("Failed to reject voter");
    }
  };

  const updateVoter = async(voterAddress, name, ipfs) => {
    try 
    {
      if(!voterAddress || !name || !ipfs)
      {
        console.log('Missing Data');
        setError('Missing data');
      }

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = getContracts(signer);

      const transaction = await contract.updateVoter(voterAddress, name, ipfs);
      await transaction.wait();
    } 
    catch (error) 
    {
      console.log(`Error while updating the voter for address ${voterAddress}`);
      setError('Error in updating voter')
    }
  }

  useEffect(() => {
    getAllVoterData();
  }, []);


  //-------Give Vote
  const giveVote = async(id) => {
    try {
      //---Connecting Smart Contract to frontend
      const voterAddress = id.address;
      const voterId = id.id;
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = getContracts(signer);

      const voterList = await contract.vote(voterAddress);
      await voterList.wait();
      console.log(voterList);
    
    } catch (error) {
      console.log(error);
      setError('Error in give vote')
    }
  }

  //--------------------CANDIDATE SECTION-----------------------

  // Create a new candidate in the smart contract
  const setCandidate = async (candidateForm) => {
    try {
      const { name, address, age, ipfs } = candidateForm; 
      console.log(name, address, age, ipfs);
      
      if (!name || !address || !age) {
        setError("Input Data is Missing");
        console.log("Missing data");
        return;
      }
      //---Connecting Smart Contract to frontend
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = getContracts(signer);

      const voter = await contract.setCandidate(address, age, name, ipfs);
      await voter.wait();
      console.log(`Transaction successful: ${voter.hash}`);
      console.log(`Transaction details:`, voter);

      const newCandiddate = {name, address, age, ipfs};
      setCandidateArray(prevState => [...prevState, newCandiddate]);
      console.log("Candidate Added:", newCandiddate);
      setUserRole('Candidate');
      console.log(userRole);

      //Redirect to Home Page
      window.location.href = "/unapprovedCandidates";
    } catch (error) {
      console.error("Error in creating candidate:", error);
      setError('Error in creating candidate');
    }
  };

  useEffect(() => {
    console.log("updated candidate array:", candidateArray);
  }, [candidateArray])

  //get the data of the candidate
  const getAllCandidatedata = async() => {
    try{
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = getContracts(signer);

    //returns the list of all the voters on the blockchain
    const allCandidateData = await contract.getCandidates();
    console.log(allCandidateData);

    //displays the details of each single voter
    allCandidateData.map(async (ele) => {
      const singleCandidateData = await contract.getCandidateData(ele);
      setCandidateArray(prevState => [...prevState, singleCandidateData]);
      setPushCandidate(prevState => [...prevState, singleCandidateData]);
      setCandidateIndex(prevState => [...prevState, singleCandidateData[2].toNumber()]);
      console.log("camdidate data:", singleCandidateData);
    })

    //returns the total number of voters available
    const candidateLength = await contract.getCandidateLength();
    setCandidateLength(candidateLength.toNumber());
    console.log(candidateLength.toNumber());  //convert hec to number
    }
    catch(error)
    {
      console.error("Error in fetching data:", error);
      setError('Something went wrong with fetching data from the contract');
    }
  };

  const ApprovedCandidate = async(candidateAddress, message) => {
    try 
    {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = getContracts(signer);

      const transaction = await contract.approveCandidate(candidateAddress, message);
      await transaction.wait();
      console.log(`Candidate approved ${candidateAddress}`);
      //Redirect
      window.location.href = "/home";
    } 
    catch (error) 
    {
      console.log('Error in Approving candidate');
      setError('Failed to Accept Voter')
    }
  }

  const RejectCandidate = async(candidateAddress, message) => {
    try 
    {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = getContracts(signer);

      const transaction = await contract.rejectCandidate( candidateAddress, message);
      await transaction.wait();
      console.log(`Candidate rejected ${candidateAddress}`);
    } 
    catch (error) 
    {
      console.log(`Error in creating voter ${candidateAddress} `);
      setError('Failed to reject candidate');
    }
  }

  useEffect(() => {
    getAllCandidatedata();
  }, [])

  // Upload file to Pinata's IPFS
  const uploadToIPFS = async (file) => {

    console.log('starting..');
    const fromData = new FormData();

    fromData.append("file", file);

    const API_KEY = '20c50cb9f72f9844cdd7'
    const API_SECRET = '996eebb7c188e46323c78ad75922d17d636350bf37c33e3fbff1bd350f3a9a37'

    // the endpoint needed to upload the file
    const url =  'https://api.pinata.cloud/pinning/pinFileToIPFS';
    const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhOGQ3NTMxNy0wMjQwLTQxNTMtYTZhZS0zYWQxNTc4Y2U0N2QiLCJlbWFpbCI6ImFwZzExMTMzMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMjBjNTBjYjlmNzJmOTg0NGNkZDciLCJzY29wZWRLZXlTZWNyZXQiOiI5OTZlZWJiN2MxODhlNDYzMjNjNzhhZDc1OTIyZDE3ZDYzNjM1MGJmMzdjMzNlM2ZiZmYxYmQzNTBmM2E5YTM3IiwiZXhwIjoxNzYxMTQxMTk1fQ.9beZK2zfysefAZBKJFUqjB1AxRPAh87eNHJHDjwsGfc';
    const response = await axios.post(
      url,
      fromData,
      {
        maxContentLength: "Infinity",
        headers: {
            Authorization: `Bearer ${JWT}`,
            "Content-Type": `multipart/form-data;boundary=${fromData._boundary}`, 
            'pinata_api_key': API_KEY,
            'pinata_secret_api_key': API_SECRET

        }
      }
  )

  console.log(response)

  const ipfsUrl =  (response.data.IpfsHash);

  console.log("https://gateway.pinata.cloud/ipfs/" + ipfsUrl);
  return ipfsUrl;

};

  
// -----------ELECTION COMMISSION--------------

const setelectionTime = async(startTime, endTime) => {
  try 
  {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = getContracts(signer);

    const transaction = await contract.setVotingPeriod(startTime, endTime);
    await transaction.wait();

    console.log('Voting period set successfully');
    //Redirect
    window.location.href = "/";
  } 
  catch (error) 
  {
    console.log('Error in setting the voting peroid');
    setError('Failed to set the voting peroid duration')
  }
}

  const getCurrentVotingStatus = async() => {
    try 
    {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = getContracts(signer);

      const votingStatus = await contract.currentVotingStatus();
      console.log("Voting Status:" , votingStatus);
      setCurrentVotingStatus(votingStatus);
    } 
    catch (error) 
    {
      console.log('Error in getting voting status');
      setError('Error in getting voting status');
    }
  }

  const fetchWinner = async() => {
    try 
    {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = getContracts(signer);

      const[winningAddress, name, voteCount] = await contract.getWinningCandidate();
       // Display the winner's details on the page
      //  document.getElementById("winner").innerText = ` Winner Address: ${winningAddress} Name: ${name} Votes: ${voteCount}`;
      setWinner({
        address: winningAddress,
        name: name,
        votes: voteCount.toString(),
      });
      console.log("Wining candidate details: ", winningAddress, name, voteCount);
    } 
    catch(error) 
    {
      console.error("Error fetching winner:", error);
      setError('Error in fetching winner');
    }
  };

  const resetContract = async() => {
    try 
    {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = getContracts(signer);

      const transaction = await contract.resetContract();
      console.log('Contract was reseting....!!!');
      setMessage('Transaction submitted, awaiting confirmation...');

      await transaction.wait();
      setMessage('Contract has been reset successfully.');
    } 
    catch (error) 
    {
      console.log("Error in Resetting the contract");
      setError('Error in Reseting the contract');
    } 
  }

  return (
    <VotingContext.Provider
      value={{
        checkIfWalletIsConnected,
        connectWallet,
        uploadToIPFS,
        voterArray,
        createVoter,
        currentAccount,
        error,
        getAllVoterData,
        giveVote,
        setCandidate,
        getAllCandidatedata,
        voterLength,
        voterAddress,
        candidateLength,
        candidateArray,
        ApproveVoter,
        RejectVoter,
        ApprovedCandidate,
        RejectCandidate,
        setelectionTime,
        getCurrentVotingStatus,
        fetchWinner,
        winner,
        resetContract,
        userRole
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};
