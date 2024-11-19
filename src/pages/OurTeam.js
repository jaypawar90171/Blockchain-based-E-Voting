import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition';

const teamMembers = [
  {
    name: "Jay Pawar",
    role: "Front-end Developer",
    image: "../../asset/jay1.jpg",
    bio: "Jay is an expert in React and Next.js, passionate about creating seamless user experiences.",
  },
  {
    name: "Sanika Navale",
    role: "Designer",
    image: "../../asset/sanika.jpg",
    bio: "Sanika brings creative visions to life with her keen eye for design and user-centric approach.",
  },
  {
    name: "Alfaj Mulla",
    role: "Back-end Developer",
    image: "../../asset/alfaj.jpg",
    bio: "Alfaj guides our product strategy, ensuring we deliver value to our users at every step.",
  },
  {
    name: "Aakash Gurav",
    role: "Designer",
    image: "../../asset/jay.jpg",
    bio: "Aakash crafts compelling narratives that resonate with our audience and communicate our vision.",
  },
];

function TeamMember({ name, role, image, bio }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="flex flex-col items-center"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative w-60 h-60 mb-4 overflow-hidden rounded-lg">
        <motion.img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        {isHovered && (
          <motion.div 
            className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-white text-sm text-center">{bio}</p>
          </motion.div>
        )}
      </div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">{role}</p>
      <div className="flex space-x-2 mt-2">
        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
          <span className="sr-only">Twitter</span>
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors duration-300">
          <span className="sr-only">LinkedIn</span>
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </motion.div>
    
  );
}

export default function OurTeam() {
  return (
    <PageTransition>
    <div className="bg-gradient-to-b from-gray-100 to-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-2xl lg:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our team</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We're a dynamic group of individuals who are passionate about what we do
            and dedicated to delivering the best results for our clients.
          </p>
        </motion.div>
        <motion.ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {teamMembers.map((member, index) => (
            <motion.li 
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TeamMember {...member} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
    </PageTransition>
  );
}