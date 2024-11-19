import React from 'react'
import { motion } from 'framer-motion'

export default function Input({inputType, title, placeholder, handleClick, delay}) {
  return (
    <motion.div
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    >
      <p className="mb-2.5 text-lg font-semibold">{title}</p>
      {inputType === 'text' ? (
        <div className="mb-2.5">
          <input type='text' className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder={placeholder} onChange={handleClick}/>
        </div>
      ): (
        ""
      )}
    </motion.div>
  )
}
