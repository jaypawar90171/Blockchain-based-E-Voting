import { useEffect, useRef, useState, useContext } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { Camera, Loader2, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';
import { VotingContext } from '../context/voter';

const FaceAuth = () => {
  const webcamRef = useRef(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [referenceDescriptor, setReferenceDescriptor] = useState(null);
  const [processingVote, setProcessingVote] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { giveVote, voterArray, getUserData } = useContext(VotingContext);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      
      try {
        await Promise.all([
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        ]);
        
        // Get current voter address - you might have it in localStorage or context
        const voterAddress = localStorage.getItem('currentVoterAddress') || 
                      (window.ethereum && window.ethereum.selectedAddress);
        
        if (!voterAddress) {
          setError("Voter address not found. Please login again.");
          setShowModal(true);
          setIsModelLoading(false);
          return;
        }

        // Find voter by matching the ethereum address (index 2) - case insensitive
    const voterData = voterArray.find(
      voter => voter[2].toLowerCase() === voterAddress.toLowerCase()
    );
  
    if (!voterData) {
      setError("Voter not found. Please ensure you are registered.");
      setShowModal(true);
      setIsModelLoading(false);
      return;
    }
        
        // Get voter's IPFS hash and construct URL
        const voterIpfsHash = voterData[5];
        console.log("Voter IPFS Hash:", voterIpfsHash);
        const imageUrl = `https://gateway.pinata.cloud/ipfs/${voterIpfsHash}`;
        
        // Fetch the voter's image and extract face descriptor
        const img = await faceapi.fetchImage(imageUrl);
        const detection = await faceapi.detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
          
        if (detection) {
          setReferenceDescriptor(detection.descriptor);
        } else {
          setError("Could not detect face in reference image");
          setShowModal(true);
        }
        
        setIsModelLoading(false);
      } catch (error) {
        console.error('Error loading models or reference image:', error);
        setError("Error preparing face authentication");
        setShowModal(true);
        setIsModelLoading(false);
      }
    };

    loadModels();
  }, [voterArray, getUserData]);

  // This function will be called once authentication is successful
  const processVote = async () => {
    try {
      setProcessingVote(true);
      // Get the candidate address from localStorage
      const candidateAddress = localStorage.getItem('candidateToVoteFor');
      
      if (candidateAddress) {
        // Call the vote function
        await giveVote(candidateAddress);
        setVoteSuccess(true);
        // Clear the localStorage
        localStorage.removeItem('candidateToVoteFor');
        
        // Wait a moment to show success message before redirecting
        setTimeout(() => navigate('/'), 2000);
      } else {
        console.error("No candidate address found in localStorage");
        setError("No candidate selected for voting");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error during voting:", error);
      setError("Failed to record your vote on the blockchain");
      setShowModal(true);
    } finally {
      setProcessingVote(false);
    }
  };

  const handleCapture = async () => {
    if (!webcamRef.current?.video || !referenceDescriptor || isAuthenticated !== null) return;

    try {
      const detection = await faceapi.detectSingleFace(webcamRef.current.video)
        .withFaceLandmarks()
        .withFaceDescriptor();
  
      if (detection) {
        const distance = faceapi.euclideanDistance(detection.descriptor, referenceDescriptor);
        const threshold = 0.6; // Adjust this threshold based on testing
        const authenticated = distance < threshold;
        
        console.log(`Face match distance: ${distance}, Authenticated: ${authenticated}`);
        
        setIsAuthenticated(authenticated);
        
        if (authenticated) {
          // Process the vote immediately after successful authentication
          processVote();
        } else {
          setError("Face authentication failed. Please ensure good lighting and try again.");
          setShowModal(true);
        }
      }
    } catch (err) {
      console.error("Error during face capture:", err);
    }
  };

  useEffect(() => {
    if (!isModelLoading && isAuthenticated === null) {
      const interval = setInterval(handleCapture, 1000);
      return () => clearInterval(interval);
    }
  }, [isModelLoading, referenceDescriptor, isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Camera className="w-12 h-12 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Face Authentication</h1>
          <p className="text-gray-300 mt-2">Please position your face in the camera frame to verify your identity before voting</p>
        </div>

        <div className="relative">
          {/* Show webcam only if not authenticated yet */}
          {!isAuthenticated && (
            <div className="rounded-lg overflow-hidden bg-black">
              <Webcam
                ref={webcamRef}
                mirrored
                className="w-full"
                videoConstraints={{
                  width: 640,
                  height: 480,
                  facingMode: "user"
                }}
              />
            </div>
          )}

          {/* Show success indicator after authentication */}
          {isAuthenticated && (
            <div className="rounded-lg overflow-hidden bg-black/30 h-60 flex flex-col items-center justify-center">
              {processingVote ? (
                <>
                  <Loader2 className="w-16 h-16 text-blue-400 animate-spin mb-4" />
                  <p className="text-white text-lg">Processing your vote...</p>
                </>
              ) : voteSuccess ? (
                <>
                  <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                  <p className="text-white text-lg">Vote successfully cast!</p>
                  <p className="text-gray-300 text-sm mt-2">Redirecting you back...</p>
                </>
              ) : null}
            </div>
          )}

          {isModelLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="flex items-center bg-gray-800 px-4 py-2 rounded-full">
                <Loader2 className="w-5 h-5 mr-2 animate-spin text-blue-400" />
                <span className="text-white">Loading...</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-300">
          {isModelLoading ? (
            <p>Loading face recognition models...</p>
          ) : isAuthenticated === null ? (
            <p>Face detection is active. Hold still for authentication.</p>
          ) : isAuthenticated ? (
            processingVote ? (
              <p>Please wait while we record your vote on the blockchain...</p>
            ) : (
              <p>Authentication successful! Your vote has been recorded.</p>
            )
          ) : (
            <p>Authentication failed. Please try again.</p>
          )}
        </div>
      </div>

      {showModal && (
        <AuthModal 
          message={error || "Authentication failed. Please try again."}
          onClose={() => {
            setShowModal(false);
            if (error && error.includes("not found")) {
              navigate('/');
            } else {
              setIsAuthenticated(null);
            }
          }} 
        />
      )}
    </div>
  );
};

export default FaceAuth;