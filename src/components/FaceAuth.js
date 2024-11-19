// import { useEffect, useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import * as faceapi from 'face-api.js';
// import { Camera, Loader2 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import AuthModal from 'AuthModal';

// const FaceAuth = () => {
//   const webcamRef = useRef(null);
//   const [isModelLoading, setIsModelLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [referenceDescriptor, setReferenceDescriptor] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL = '/models';
      
//       try {
//         await Promise.all([
//           faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
//           faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//           faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
//         ]);
        
//         const img = await faceapi.fetchImage('https://gateway.pinata.cloud/ipfs/QmRXvLVJwn3MHKWixfPSTLXpyCvmDEMVKCNxTFduquYoA6');
//         const detection = await faceapi.detectSingleFace(img)
//           .withFaceLandmarks()
//           .withFaceDescriptor();
          
//         if (detection) {
//           setReferenceDescriptor(detection.descriptor);
//         }
        
//         setIsModelLoading(false);
//       } catch (error) {
//         console.error('Error loading models:', error);
//       }
//     };

//     loadModels();
//   }, []);

//   const handleCapture = async () => {
//     if (!webcamRef.current?.video || !referenceDescriptor) return;

//     const detection = await faceapi.detectSingleFace(webcamRef.current.video)
//       .withFaceLandmarks()
//       .withFaceDescriptor();

//     if (detection) {
//       const distance = faceapi.euclideanDistance(detection.descriptor, referenceDescriptor);
//       const authenticated = distance < 0.6;
//       setIsAuthenticated(authenticated);
      
//       if (authenticated) {
//         setTimeout(() => navigate('/about'), 1000);
//       } else {
//         setShowModal(true);
//       }
//     }
//   };

//   useEffect(() => {
//     if (!isModelLoading) {
//       const interval = setInterval(handleCapture, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [isModelLoading, referenceDescriptor]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
//       <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8 w-full max-w-2xl">
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center mb-4">
//             <Camera className="w-12 h-12 text-blue-600" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800">Face Authentication</h1>
//           <p className="text-gray-600 mt-2">Please position your face in the camera frame</p>
//         </div>

//         <div className="relative">
//           <div className="rounded-lg overflow-hidden bg-black">
//             <Webcam
//               ref={webcamRef}
//               mirrored
//               className="w-full"
//               videoConstraints={{
//                 width: 640,
//                 height: 480,
//                 facingMode: "user"
//               }}
//             />
//           </div>

//           {isModelLoading && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black/50">
//               <div className="flex items-center bg-white px-4 py-2 rounded-full">
//                 <Loader2 className="w-5 h-5 mr-2 animate-spin text-blue-600" />
//                 <span>Loading...</span>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="mt-6 text-center text-sm text-gray-500">
//           {isModelLoading ? (
//             <p>Loading face recognition models...</p>
//           ) : (
//             <p>Face detection is active. You will be redirected when authenticated.</p>
//           )}
//         </div>
//       </div>

//       {showModal && <AuthModal onClose={() => setShowModal(false)} />}
//     </div>
//   );
// };

// export default FaceAuth;
