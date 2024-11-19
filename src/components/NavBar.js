import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef(null)

  const menuItems = [
    { 
      id: 1, 
      title: 'Candidate', 
      dropdown: [
        { title: 'Home', link: '/home' },
        { title: 'Candidate register', link: '/candidateRegister' }
      ]
    },
    { 
      id: 2, 
      title: 'Voter', 
      dropdown: [
        { title: 'Home', link: '/home' },
        { title: 'Voter Registration', link: '/allowedvoters' }
      ]
    },
    { 
      id: 3, 
      title: 'Election Commission', 
      dropdown: [
        { title: 'Approve Voters', link: '/unapprovedVoters' },
        { title: 'Approve Candidates', link: '/unapprovedCandidates' },
        { title: 'Set Voting Period', link: '/votingPeroid' },
        { title: 'Reset Contract', link: '/reset' },
        { title: 'Voter List', link: '/voterlist' },
      ]
    },
    { 
      id: 4,
      title: 'Local',
      dropdown: [
        { title: 'Get Winner', link: '/winner' },
        { title: 'Our Team', link: '/ourteam' },
        { title: 'How it works', link: '/howitsworks' },
      ] 
    }
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-gradient-to-r from-primary to-primary-dark text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.img 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="h-10 w-auto" 
                src="../../asset/logo512.png" 
                alt="Logo" 
              />
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="ml-2 text-xl font-bold"
              >
                Decentralized Voting
              </motion.span>
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <ul className="flex space-x-4" ref={dropdownRef}>
              {menuItems.map((item) => (
                <li key={item.id} className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleDropdown(item.id)}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white transition duration-150 ease-in-out"
                    aria-expanded={activeDropdown === item.id}
                  >
                    {item.title}
                    <motion.svg 
                      animate={{ rotate: activeDropdown === item.id ? 180 : 0 }}
                      className="ml-1 h-4 w-4 inline-block" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path d="M19 9l-7 7-7-7"></path>
                    </motion.svg>
                  </motion.button>
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.id && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                      >
                        {item.dropdown.map((subItem, index) => (
                          <motion.li 
                            key={index}
                            whileHover={{ backgroundColor: '#f3f4f6' }}
                          >
                            <Link
                              to={subItem.link}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                              {subItem.title}
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary-foreground hover:text-primary hover:bg-primary-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <React.Fragment key={item.id}>
                  <motion.div
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    className="rounded-md"
                  >
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-primary-foreground hover:text-white hover:bg-primary-dark"
                    >
                      {item.title}
                    </button>
                  </motion.div>
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.id && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="ml-4 space-y-1"
                      >
                        {item.dropdown.map((subItem, index) => (
                          <motion.li 
                            key={index}
                            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                            className="rounded-md"
                          >
                            <Link
                              to={subItem.link}
                              className="block px-3 py-2 rounded-md text-base font-medium text-primary-foreground hover:text-white hover:bg-primary-dark"
                            >
                              {subItem.title}
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}