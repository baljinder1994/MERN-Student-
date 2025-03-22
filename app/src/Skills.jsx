import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const logMessages = [
  "🛠️ Initializing Debugger...",
  "🔍 Scanning for Memory Leaks...",
  "✅ System Check Passed!",
  "⚠️ Warning: Unused Variable Found!",
  "🚀 Compiling Code...",
  "❌ Error: Unexpected Token in Line 42",
  "✅ Build Successful! Ready to Deploy.",
];

const DebuggerTerminal = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });
  const [visibleLogs, setVisibleLogs] = useState([]);

  useEffect(() => {
    if (inView) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < logMessages.length) {
          setVisibleLogs((prev) => [...prev, logMessages[i]]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 700);
    }
  }, [inView]);

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center bg-[#0D1117] text-green-400 px-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Animated Debugging Logs */}
        <motion.div
          className="bg-black border border-green-400 rounded-lg p-4 shadow-lg w-full h-[300px] overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <h3 className="text-green-300 text-lg font-bold">🖥️ Debugging Terminal</h3>
          <div className="mt-3 space-y-2 overflow-auto h-[250px]">
  {visibleLogs.map((log, index) => (
    <motion.p
      key={index}
      className={`text-sm ${
        log?.includes("Error") ? "text-red-400" :
        log?.includes("Warning") ? "text-yellow-400" :
        "text-green-400"
      }`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      {log || "Loading..."} {/* Ensures log is not undefined */}
    </motion.p>
  ))}
</div>

        </motion.div>

        {/* Right: Debugging Status */}
        <motion.div
          className="bg-[#161B22] border border-gray-700 rounded-lg p-6 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h3 className="text-cyan-400 text-lg font-bold">⚡ Debugging Status</h3>
          <div className="mt-3 space-y-2 text-gray-300 text-sm">
            <p>🛠️ CPU Usage: <span className="text-green-400">30%</span></p>
            <p>🔍 Memory Scan: <span className="text-yellow-400">2 Warnings</span></p>
            <p>❌ Critical Errors: <span className="text-red-400">1 Found</span></p>
            <p>🚀 Build Status: <span className="text-green-400">Success</span></p>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default DebuggerTerminal;
