import React, { useContext } from 'react';
import { VotingContext } from './context/voter'; // Ensure correct context import
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // React Router for navigation
import AllowedVoters from './pages/AllowedVoters' // Corrected import to match file name casing
import VoterList from './pages/VoterList';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import CandidateRegister from './pages/CandidateRegister';
import HowItsWorks from './pages/HowItsWorks';
import OurTeam from './pages/OurTeam';
import PageNotFound from './pages/PageNotFound';
import UnapprovedCandidates from './pages/UnapprovedCandidates';
import UnapprovedVoters from './pages/UnapprovedVoters';
import VotingPeriodSetter from './pages/VotingPeriodSetter';

import Slidebar from './components/Slidebar';
import WinningCandidate from './pages/WinningCandidate';
import ResetVotingContract from './pages/ResetVotingContract';
import Landing from './pages/Landing';
import FaceAuth from './components/FaceAuth';

export default function App() {
  
  return (

    <BrowserRouter>
    <Navbar/>
    {/* <Slidebar/> */}
      <Routes>
        <Route path="/" element={<Landing />} />
      <Route path='/home' element={<Home/>}></Route>
        <Route path='/allowedVoters' element={<AllowedVoters/>}></Route>
        <Route path='/voterList' element={<VoterList/>}></Route>
        <Route path='/candidateRegister' element={<CandidateRegister/>}></Route>
        <Route path='/voterList' element={<VoterList/>}></Route>
        <Route path='/howitsworks' element={<HowItsWorks/>}></Route>
        <Route path='/ourteam' element={<OurTeam/>}></Route>
        <Route path='/unapprovedCandidates' element={<UnapprovedCandidates/>}></Route>
        <Route path='/unapprovedVoters' element={<UnapprovedVoters/>}></Route>
        <Route path='/votingPeroid' element={<VotingPeriodSetter/>}></Route>
        <Route path='/winner' element={<WinningCandidate/>}></Route>
        <Route path='/face-auth' element={<FaceAuth/>}></Route>
        <Route path='/reset' element={<ResetVotingContract/>}></Route>
        {/* <Route path='/slidebar' element={<Slidebar/>}></Route> */}
        <Route path='*' element={<PageNotFound/>}></Route> // Add a catch-all route for page not found
      </Routes>
    </BrowserRouter>
  );
}
