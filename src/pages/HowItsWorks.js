import React from 'react'
import { motion } from 'framer-motion'
import { FaLink, FaGlobe, FaLock, FaChartBar } from 'react-icons/fa'
import PageTransition from '../components/PageTransition'

export default function HowItWorks() {
  const features = [
    {
      title: "Immutable Record Keeping",
      description: "Every vote is recorded as a transaction on the blockchain, creating an unalterable and transparent record of the entire voting process.",
      icon: <FaLink className="h-12 w-12 text-blue-500" />,
      color: "bg-blue-100",
    },
    {
      title: "Decentralized Verification",
      description: "Multiple nodes in the network verify each vote, eliminating single points of failure and reducing the risk of manipulation.",
      icon: <FaGlobe className="h-12 w-12 text-green-500" />,
      color: "bg-green-100",
    },
    {
      title: "Enhanced Privacy",
      description: "Cryptographic techniques ensure voter anonymity while still allowing for vote verification, Advanced encryption standards protect personal data.",
      icon: <FaLock className="h-12 w-12 text-yellow-500" />,
      color: "bg-yellow-100",
    },
    {
      title: "Smart Contract Automation",
      description: "Smart contracts automatically tally votes and execute election rules, reducing human error and increasing efficiency in the voting process.",
      icon: <FaChartBar className="h-12 w-12 text-purple-500" />,
      color: "bg-purple-100",
    },
  ]

  return (
    <PageTransition>
    <div className="bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-center text-lg font-semibold text-indigo-600">Blockchain-Powered Democracy</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Secure, Transparent, and Decentralized Voting
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-600">
            Our decentralized voting system leverages blockchain technology to ensure the integrity, transparency, and security of every election.
          </p>
        </motion.div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`${feature.color} rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-4 text-base text-gray-700">{feature.description}</p>
              <div className="mt-6 h-48 flex items-center justify-center">
                {feature.icon}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-gray-900">Why Blockchain for Voting?</h3>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
            Blockchain technology provides a secure, transparent, and tamper-resistant foundation for digital voting. 
            By distributing the voting records across a network of nodes, we eliminate single points of failure and 
            create a system that is resistant to hacking and fraud. This revolutionary approach ensures that every 
            vote is counted accurately and that the results can be independently verified by anyone.
          </p>
        </motion.div>
      </div>
    </div>
    </PageTransition>
  )
}
