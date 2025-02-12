'use client'

import React, { useRef, useLayoutEffect, useState } from 'react'
import LottieAnimation from '../components/LottieAnimation'
import Slidebar from '../components/Slidebar'
import Typingtext from '../components/Typingtext'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import PrivacyPolicy from '../components/PrivacyPolicy'
import VotingProcessExplainer from '../components/VotingProcessExplainer'
import NoticeToCandidate from '../components/NoticeToCandidate'
import gsap from "gsap"

export default function Landing() {
  const comp = useRef(null)
  const lottieRef = useRef(null)
  const [navbarColor, setNavbarColor] = useState("bg-transparent")

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
        })
    }, comp)

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative" ref={comp}>
      <Slidebar />

      <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left side - Typingtext */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 lg:p-12">
        <Typingtext />
      </div>
      
      {/* Right side - Lottie Animation */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 lg:p-12">
        <div className="w-full max-w-2xl aspect-square">
          <LottieAnimation ref={lottieRef} />
        </div>
      </div>
    </div>

      {/* Voting Process Explainer */}
      <div className="px-4 md:px-8 py-8 md:py-16">
        <VotingProcessExplainer />
      </div>

      {/* Notice to user section */}
      <div className="px-4 md:px-8 py-8 md:py-16">
        <NoticeToCandidate />
      </div>

      {/* Privacy and policy */}
      <div className="px-4 md:px-8 py-8 md:py-16">
        <PrivacyPolicy />
      </div>

      {/* FAQ */}
      <div className="px-4 md:px-8 py-8 md:py-16">
        <FAQ />
      </div>

      {/* Footer Section */}
      <div className="">
        <Footer />
      </div>
    </div>
  )
}