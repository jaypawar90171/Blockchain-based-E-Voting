"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PageTransition from "../components/PageTransition"
import { Twitter, Linkedin, Github, Mail, ChevronRight, Users, Award, Coffee, Code } from "lucide-react"

const teamMembers = [
  {
    name: "Jay Pawar",
    role: "Smart Contracts & Backend",
    image: "../../asset/photo.jpg",
    bio: "Jay is an expert in React and Next.js, passionate about creating seamless user experiences.",
    social: {
      twitter: "#",
      linkedin: "https://www.linkedin.com/in/jay-pawar-2717b1297/",
      github: "https://github.com/jaypawar90171",
    },
  },
  {
    name: "Sanika Navale",
    role: "Designer",
    image: "../../asset/sanika.jpg",
    bio: "Sanika brings creative visions to life with her keen eye for design and user-centric approach.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Alfaj Mulla",
    role: "Back-end Developer",
    image: "../../asset/alfaj.jpg",
    bio: "Alfaj guides our product strategy, ensuring we deliver value to our users at every step.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Aakash Gurav",
    role: "Designer",
    image: "../../asset/jay.jpg",
    bio: "Aakash crafts compelling narratives that resonate with our audience and communicate our vision.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
]

// Stats for the team section
const teamStats = [
  { icon: <Code className="h-6 w-6" />, value: "10K+", label: "Lines of Code" },
  { icon: <Coffee className="h-6 w-6" />, value: "500+", label: "Cups of Coffee" },
  { icon: <Award className="h-6 w-6" />, value: "15+", label: "Projects Completed" },
  { icon: <Users className="h-6 w-6" />, value: "100%", label: "Client Satisfaction" },
]

// Role filters
const roles = ["All", "Front-end Developer", "Designer", "Back-end Developer"]

function TeamMember({ name, role, image, bio, social }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-gray-800 shadow-xl"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="aspect-square overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-80"></div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6"
        initial={{ y: 20, opacity: 0.8 }}
        animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-end justify-between">
          <div>
            <motion.div
              className="mb-1 h-0.5 w-10 bg-purple-500"
              initial={{ width: 0 }}
              animate={isHovered ? { width: 40 } : { width: 0 }}
              transition={{ duration: 0.3 }}
            ></motion.div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-purple-400">{role}</p>
          </div>
          <motion.div
            className="flex space-x-2"
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <a
              href={social.twitter}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-gray-300 transition-colors hover:bg-purple-600 hover:text-white"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href={social.linkedin}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-gray-300 transition-colors hover:bg-purple-600 hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={social.github}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-gray-300 transition-colors hover:bg-purple-600 hover:text-white"
            >
              <Github className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.p
          className="mt-4 text-sm text-gray-300"
          initial={{ opacity: 0, height: 0 }}
          animate={isHovered ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {bio}
        </motion.p>

        <motion.div
          className="mt-4 flex items-center text-sm text-purple-400"
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <span>View Profile</span>
          <ChevronRight className="ml-1 h-4 w-4" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function OurTeam() {
  const [selectedRole, setSelectedRole] = useState("All")

  const filteredMembers =
    selectedRole === "All" ? teamMembers : teamMembers.filter((member) => member.role === selectedRole)

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-900 pb-20">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-gray-900"></div>
            {/* Animated dots background */}
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

          <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-600/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              >
                <Users className="h-8 w-8 text-purple-500" />
              </motion.div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                Meet Our Team
              </h1>
              <p className="mt-6 text-xl text-gray-300">
                We're a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
                best results for our clients.
              </p>
            </motion.div>

            {/* Team Stats */}
            <motion.div
              className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {teamStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center rounded-lg bg-gray-800/50 p-6 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <div className="mb-3 rounded-full bg-purple-600/20 p-3 text-purple-500">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          {/* Role Filters */}
          <motion.div
            className="mb-12 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedRole === role ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {role}
              </button>
            ))}
          </motion.div>

          {/* Team Grid */}
          <motion.div
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TeamMember {...member} />
              </motion.div>
            ))}
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            className="mt-24 rounded-2xl bg-gradient-to-r from-purple-900/50 to-indigo-900/50 p-8 text-center shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h2 className="text-2xl font-bold text-white">Want to work with our team?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-300">
              We're always looking for talented individuals to join our team. If you're passionate about creating
              amazing experiences, we'd love to hear from you.
            </p>
            <button className="mt-6 inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700">
              <Mail className="mr-2 h-5 w-5" />
              Get in touch
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
