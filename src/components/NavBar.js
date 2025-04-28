"use client"

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, ChevronDown, Menu, X, Vote, Award, Users, Settings } from "lucide-react"

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const menuItems = [
    {
      id: 1,
      title: "Candidate",
      icon: <Users className="w-4 h-4 mr-2" />,
      dropdown: [
        { title: "Candidate register", link: "/candidateRegister" },
      ],
    },
    {
      id: 2,
      title: "Voter",
      icon: <Vote className="w-4 h-4 mr-2" />,
      dropdown: [
        { title: "Home", link: "/home" },
        { title: "Voter Registration", link: "/allowedvoters" },
      ],
    },
    {
      id: 3,
      title: "Election Commission",
      icon: <Settings className="w-4 h-4 mr-2" />,
      dropdown: [
        { title: "Approve Voters", link: "/unapprovedVoters" },
        { title: "Approve Candidates", link: "/unapprovedCandidates" },
        { title: "Set Voting Period", link: "/votingPeroid" },
        { title: "Reset Contract", link: "/reset" },
        { title: "Voter List", link: "/voterlist" },
      ],
    },
    {
      id: 4,
      title: "Local",
      icon: <Award className="w-4 h-4 mr-2" />,
      dropdown: [
        { title: "Winner", link: "/winner" },
        { title: "Our Team", link: "/ourteam" },
        { title: "How it works", link: "/howitsworks" },
      ],
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    // Apply theme to document body
    document.body.classList.toggle("light-mode", !isDarkMode)
    document.body.classList.toggle("dark-mode", isDarkMode)
  }, [isDarkMode])

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Theme variables
  const navbarBg = isDarkMode
    ? "bg-gradient-to-r from-navy-900 to-navy-800"
    : "bg-gradient-to-r from-blue-50 to-indigo-50"

  const textColor = isDarkMode ? "text-white" : "text-navy-900"
  const logoColor = isDarkMode ? "text-indigo-300" : "text-indigo-600"
  const dropdownBg = isDarkMode ? "bg-navy-800" : "bg-white"
  const dropdownHoverBg = isDarkMode ? "hover:bg-navy-700" : "hover:bg-gray-100"
  const dropdownTextColor = isDarkMode ? "text-gray-200" : "text-gray-700"
  const buttonHoverBg = isDarkMode ? "hover:bg-navy-700" : "hover:bg-indigo-100"
  const mobileMenuBg = isDarkMode ? "bg-navy-800" : "bg-white"
  const borderColor = isDarkMode ? "border-navy-700" : "border-gray-200"
  const iconColor = isDarkMode ? "text-indigo-300" : "text-indigo-600"


  return (
    <nav className={`${navbarBg} shadow-lg ${textColor} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`h-10 w-10 rounded-full flex items-center justify-center ${isDarkMode ? "bg-navy-700" : "bg-indigo-100"}`}
              >
                <Vote className={`h-6 w-6 ${logoColor}`} />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`ml-2 text-xl font-bold ${logoColor}`}
              >
                eVoteLedger
              </motion.span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Menu Items */}
            <ul className="flex space-x-1">
              {menuItems.map((item) => (
                <li key={item.id} className="relative dropdown-container">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleDropdown(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${buttonHoverBg} focus:outline-none transition duration-150 ease-in-out flex items-center`}
                    aria-expanded={activeDropdown === item.id}
                  >
                    {item.icon}
                    {item.title}
                    <motion.div animate={{ rotate: activeDropdown === item.id ? 180 : 0 }} className="ml-1">
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.id && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute z-10 left-0 mt-2 w-56 rounded-md shadow-lg ${dropdownBg} ring-1 ring-black ring-opacity-5 border ${borderColor} overflow-hidden`}
                      >
                        {item.dropdown.map((subItem, index) => (
                          <motion.li
                            key={index}
                            whileHover={{ x: 5 }}
                            className={`${dropdownHoverBg} border-b ${borderColor} last:border-b-0`}
                          >
                            <Link
                              to={subItem.link}
                              className={`block px-4 py-3 text-sm ${dropdownTextColor} ${dropdownHoverBg}`}
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

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`ml-4 p-2 rounded-full ${isDarkMode ? "bg-navy-700" : "bg-indigo-100"} ${iconColor} focus:outline-none`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle for Mobile */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? "bg-navy-700" : "bg-indigo-100"} ${iconColor} focus:outline-none`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md ${buttonHoverBg} focus:outline-none`}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className={`${mobileMenuBg} border-t ${borderColor} shadow-inner px-2 pt-2 pb-3 space-y-1 sm:px-3`}>
              {menuItems.map((item) => (
                <React.Fragment key={item.id}>
                  <motion.div whileHover={{ x: 5 }} className="rounded-md">
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium ${dropdownTextColor} ${dropdownHoverBg} flex items-center justify-between`}
                    >
                      <span className="flex items-center">
                        {item.icon}
                        {item.title}
                      </span>
                      <motion.div animate={{ rotate: activeDropdown === item.id ? 180 : 0 }}>
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                    </button>
                  </motion.div>
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.id && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="ml-4 space-y-1 border-l-2 pl-2 mt-1 mb-2 border-indigo-300"
                      >
                        {item.dropdown.map((subItem, index) => (
                          <motion.li key={index} whileHover={{ x: 5 }} className="rounded-md">
                            <Link
                              to={subItem.link}
                              className={`block px-3 py-2 rounded-md text-sm ${dropdownTextColor} ${dropdownHoverBg}`}
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

export default Navbar
