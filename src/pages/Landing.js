import React from 'react'
import LottieAnimation from '../components/LottieAnimation';
import Slidebar from '../components/Slidebar';
import Typingtext from '../components/Typingtext';
import { useRef } from 'react';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import PrivacyPolicy from '../components/PrivacyPolicy';
import VotingProcessExplainer from '../components/VotingProcessExplainer';
import NoticeToCandidate from '../components/NoticeToCandidate';
import {useLayoutEffect, useState} from 'react'
import gsap from "gsap";
export default function Landing() {
  
    const comp = useRef(null);
    const lottieRef = useRef(null); // Create a ref for the LottieAnimation component
    const [navbarColor, setNavbarColor] = useState("bg-transparent");

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const timeline = gsap.timeline()
        .from("#intro-slider", {
          xPercent: "-100",
          duration: 1.3,
          delay: 0.3,
          onStart: () => setNavbarColor("bg-transparent"),
        })
        .from(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          y: "+=30",
          stagger: 0.5,
        })
        .to(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          y: "-=30",
          delay: 0.3,
          stagger: 0.5,
        })
        .to("#intro-slider", {
          xPercent: "-100",
          duration: 1.3,
        })
        .from("#welcome", {
          opacity: 0,
          duration: 0.5,
          y: "-=30",
          onStart: () => setNavbarColor("bg-blue-900"),
        })
        .to("#welcome", {
          opacity: 0,
          duration: 0.5,
          y: "+=30",
          stagger: 0.5,
        })
        .from(lottieRef.current, {
          opacity: 0,
          y: "+=30",
          duration: 1,
          delay: 0.2,
        });
    }, comp);

    return () => ctx.revert();
  }, []);
    


  return (
    <div className="relative" ref={comp}>
      {/* Navbar */}
      {/* <Navbar className="absolute top-0 left-0 w-full z-5" />  */}
      
        <Slidebar />
      {/* Text Intro and Lottie Animation Section */}

        {/* Text Intro and Lottie Animation Section */}
        <div className="flex min-h-screen bg-white">
        {/* Left side - Typetext */}
        <div className="w-1/2 flex items-center justify-center">
          <Typingtext />
        </div>
        
        {/* Right side - Lottie Animation */}
        <div className="w-1/2 flex items-center justify-center">
          <LottieAnimation ref={lottieRef} />
        </div>
      </div>
      

    
      {/* Voting Process Explainer  */}
      <div>
          <VotingProcessExplainer/>
      </div>


       {/* Notice to user section  */}
       <div className="">
          <NoticeToCandidate/>
        </div>

        {/* Privacy and policy  */}
        <div>
          <PrivacyPolicy/>
        </div>

        {/* Voting Process Explainer  */}
        <div>
          <FAQ/>
        </div>

        {/* Footer Section */}
        <div>
          <Footer/>
        </div>

    </div>
  );
}
