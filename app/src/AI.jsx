import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const BugScanner = () => {
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState([]);
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.4 });

  const errorMessages = [
    "SyntaxError: Unexpected token ';'",
    "ReferenceError: Undefined variable 'x'",
    "TypeError: Cannot read property 'map' of undefined",
    "Warning: React memory leak detected!",
    "Deprecation Notice: 'componentWillMount' is outdated",
  ];

  // ✅ Reset & Restart scanning every time user scrolls
  useEffect(() => {
    if (inView) {
      setProgress(0); // Reset progress
      setErrors([]); // Reset errors

      controls.start({ opacity: 1, y: 0 });

      let scanInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) return prev + 10;
          clearInterval(scanInterval);
          return 100;
        });
      }, 400);
    }
  }, [inView]);

  // ✅ Show error messages one by one after scan completion
  useEffect(() => {
    if (progress === 100 && errors.length < errorMessages.length) {
      setTimeout(() => {
        setErrors((prev) => [...prev, errorMessages[errors.length]]);
      }, 800);
    }
  }, [progress, errors]);

  return (
    <div
      ref={ref}
      className="relative min-h-screen bg-[#141820] flex flex-col items-center justify-center text-gray-200 p-6"
    >
      {/* AI Scanner Title */}
      <motion.h2
        className="text-3xl font-bold text-cyan-400 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={controls}
        transition={{ duration: 1 }}
      >
        🚀 AI Code Review System
      </motion.h2>

      {/* Scanning Progress Bar */}
      <motion.div
        className="relative w-[80%] max-w-2xl bg-gray-700 rounded-lg h-4 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.div
          className="bg-cyan-500 h-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1 }}
        />
      </motion.div>
      <p className="mt-2 text-sm text-gray-400">
        {progress < 100 ? "🔍 Scanning for bugs..." : "✅ Scan Complete!"}
      </p>

      {/* AI Bug Detection Console */}
      <motion.div
        className="relative bg-[#1a1f2e] border border-gray-600 rounded-lg w-[85%] max-w-3xl mt-6 p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <p className="text-cyan-300">AI Debug Log:</p>

        {/* Error Messages Appearing One by One */}
        <div className="mt-4 space-y-2">
          {errors.map((error, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              className="text-red-400 bg-red-900/30 px-3 py-2 rounded-md"
            >
              ❌ {error}
            </motion.p>
          ))}
        </div>

        {/* AI Status */}
        {progress === 100 && (
          <motion.p
            className="mt-4 text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            ✅ No Critical Errors Found. System Optimized!
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default BugScanner;
