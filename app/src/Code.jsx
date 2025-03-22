import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const debugLogs = [
  "[LOG] Initializing Portfolio.exe...",
  "[INFO] Connecting to GitHub API...",
  "[WARNING] Rate limit exceeded! Retrying...",
  "[ERROR] 404 - Experience Not Found!",
  "[DEBUG] Searching for alternative skills...",
  "[SUCCESS] Alternative skills retrieved.",
  "[LOG] Executing Render...",
];

const DebugConsole = () => {
  const [logs, setLogs] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < debugLogs.length) {
      setTimeout(() => {
        setLogs((prev) => [...prev, debugLogs[index]]);
        setIndex(index + 1);
      }, 1200);
    }
  }, [index]);

  return (
    <div className="relative min-h-screen bg-[#0d1117] flex items-center justify-center px-6 py-10">
      
      {/* Glassmorphic Debug Console */}
      <motion.div
        className="relative w-[85%] max-w-3xl p-6 rounded-lg backdrop-blur-lg bg-white/5 border border-gray-600 shadow-lg text-gray-300 font-mono"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Console Header */}
        <div className="flex justify-between items-center pb-3 border-b border-gray-700">
          <span className="text-green-400">Dev Console - Debugging</span>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Debug Logs Typing Effect */}
        <div className="mt-4 space-y-2">
          {logs.map((log, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className={
                log.includes("[ERROR]")
                  ? "text-red-400"
                  : log.includes("[WARNING]")
                  ? "text-yellow-400"
                  : log.includes("[SUCCESS]")
                  ? "text-green-400"
                  : "text-gray-400"
              }
            >
              {log} ▮
            </motion.p>
          ))}
        </div>

        {/* Fake Input */}
        <motion.p
          className="mt-4 text-green-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Processing Next Command...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default DebugConsole;
