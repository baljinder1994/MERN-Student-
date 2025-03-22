import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HackingInterface = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <div
      ref={ref}
      className="relative min-h-screen bg-[#050a13] text-gray-200 flex flex-col md:flex-row items-center 
      justify-between px-10 py-20"
    >
      {/* LEFT SIDE - Hacker Console */}
      <motion.div
        className="md:w-1/2 w-full bg-[#0d1724] p-6 rounded-lg border border-cyan-600 shadow-lg relative"
        initial={{ opacity: 0, y: -100 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-cyan-300 flex items-center">
          <span className="mr-2">🕵️‍♂️</span> HACKING MODE ENGAGED
        </h3>

        <div className="mt-4 bg-black p-5 rounded text-sm font-mono text-green-400 leading-relaxed">
          <motion.p
            className="glitch-text"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Initializing Secure Terminal...
          </motion.p>
          <motion.p
            className="text-red-400"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            WARNING! Unauthorized Access Detected!
          </motion.p>
          <motion.p
            className="text-yellow-300"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Bypassing Firewall...
          </motion.p>
          <motion.p
            className="text-green-300"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            ✅ Access Granted! Welcome, Developer.
          </motion.p>
        </div>
      </motion.div>

      {/* RIGHT SIDE - Glowing Hacker Avatar */}
      <motion.div
        className="md:w-1/2 w-full flex justify-center md:justify-end mt-10 md:mt-0 relative"
        initial={{ opacity: 0, y: 100 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="relative w-[320px] h-[320px] bg-[#0d1724] rounded-lg border border-cyan-600 shadow-xl
         flex items-center justify-center">
          <motion.img
            src="img.png"
            alt="Hacker Avatar"
            className="rounded-lg border border-gray-600 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-[-15px] text-cyan-300 bg-[#050a13] px-4 py-2 rounded-md text-xs border 
            border-gray-600 shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            🔥 Code is Power
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HackingInterface;
