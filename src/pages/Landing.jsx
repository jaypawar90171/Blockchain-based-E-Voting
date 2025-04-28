"use client"

import { motion } from "framer-motion"
import PrivacyPolicy from "../components/PrivacyPolicy"
import VotingProcessExplainer from "../components/VotingProcessExplainer"

function FloatingPaths({ position, colorIndex = 0, yOffset = 0, xOffset = 0 }) {
  // Define the three colors in the specified order with higher brightness
  const colors = [
    "rgba(255,165,0,", // Orange
    "rgba(255,255,255,", // White
    "rgba(0,128,0,", // Green
  ]

  // Use the provided colorIndex to select the color
  const baseColor = colors[colorIndex % colors.length]

  const paths = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position - xOffset} -${189 + i * 6 + yOffset}C-${
      380 - i * 5 * position - xOffset
    } -${189 + i * 6 + yOffset} -${312 - i * 5 * position - xOffset} ${216 - i * 6 + yOffset} ${
      152 - i * 5 * position - xOffset
    } ${343 - i * 6 + yOffset}C${616 - i * 5 * position - xOffset} ${470 - i * 6 + yOffset} ${
      684 - i * 5 * position - xOffset
    } ${875 - i * 6 + yOffset} ${684 - i * 5 * position - xOffset} ${875 - i * 6 + yOffset}`,
    color: `${baseColor}${0.7 + i * 0.05})`, // Increased base opacity for brightness
    width: 2 + i * 0.3, // Increased stroke width for visibility
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
        <title>eVoteLedger</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={path.color}
            strokeWidth={path.width}
            initial={{ pathLength: 0.3, opacity: 0.8 }}
            animate={{
              pathLength: 1,
              opacity: [0.7, 1, 0.7],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function Landing() {
  const title = "eVoteLedger"
  const words = title.split(" ")

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Gradient background from our-team.jsx */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-gray-900"></div>

        {/* Animated dots background from our-team.jsx */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-purple-500"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: Math.random() * 5 + 5,
            }}
          />
        ))}
      </div>

      {/* Floating paths from Landing.js */}
      <div className="absolute inset-0">
        {/* Left side paths */}
        <FloatingPaths position={1} colorIndex={0} yOffset={-150} />
        <FloatingPaths position={-1} colorIndex={1} yOffset={-90} />
        <FloatingPaths position={0.5} colorIndex={2} yOffset={-50} />

        {/* Right side paths - move to top right */}
        <FloatingPaths position={-1} colorIndex={0} yOffset={150} xOffset={800} />
        <FloatingPaths position={1} colorIndex={1} yOffset={250} xOffset={800} />
        <FloatingPaths position={-0.5} colorIndex={2} yOffset={350} xOffset={800} />
      </div>

      {/* Content from Landing.js */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <div
            className="inline-block group relative bg-gradient-to-b from-white/10 to-white/5
                        p-px rounded-2xl backdrop-blur-lg 
                        overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <button
              className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                            bg-black/80 hover:bg-black/90
                            text-white transition-all duration-300 
                            group-hover:-translate-y-0.5 border border-white/10
                            hover:shadow-md hover:shadow-white/10"
            >
              <span className="opacity-90 group-hover:opacity-100 transition-opacity">Let's Vote</span>
              <span
                className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                                transition-all duration-300"
              >
                →
              </span>
            </button>
          </div>
        </motion.div>
      </div>
      {/* <div>
        <VotingProcessExplainer />
      </div>
      <div>
        <PrivacyPolicy />
      </div> */}

    </div>
    
  )
}