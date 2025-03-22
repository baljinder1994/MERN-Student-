import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const logs = [
  "[INFO] Fetching User Details...",
  "[OK] User Identified: Anonymous Coder",
  "[INFO] Skills: React, Node.js, MongoDB, Framer Motion, Tailwind CSS",
  "[WARNING] Unauthorized Access Attempt Detected!",
  "[OK] Access Granted...",
  "[INFO] Initiating Portfolio System...",
];

const UserProfile = () => {
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  useEffect(() => {
    if (currentLogIndex < logs.length) {
      setTimeout(() => {
        setDisplayedLogs((prev) => [...prev, logs[currentLogIndex]]);
        setCurrentLogIndex(currentLogIndex + 1);
      }, 1200);
    }
  }, [currentLogIndex]);

  return (
    <div className="relative min-h-screen bg-black text-green-400 flex items-center justify-center font-mono">
      
      {/* Terminal-style Container */}
      <motion.div
        className="relative border border-green-500 bg-[#050505] p-6 rounded-lg shadow-lg w-[80%] max-w-3xl z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Terminal Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-green-300">system@portfolio:~$</span>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* System Logs Typing Effect */}
        <div className="text-lg">
          {displayedLogs.map((log, index) => (
            <p key={index}>{log} ▮</p>
          ))}
        </div>

        {/* Fake Command Input */}
        <motion.p
          className="mt-4 text-green-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Loading Next Module...
        </motion.p>
      </motion.div>

      {/* Background Matrix Effect */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "url('/matrix.png')" }} 
        animate={{ y: ["0%", "100%"] }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
      />
    </div>
  );
};

export default UserProfile;
