import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const texts = [
  "Welcome to my Portfolio!",
  "I love coding cool projects...",
  "I turn ideas into reality with code!",
  "Exploring Web & Software Development...",
];

const HeroSection = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  
  useEffect(() => {
    if (charIndex < texts[index].length) {
      setTimeout(() => {
        setText((prev) => prev + texts[index][charIndex]);
        setCharIndex(charIndex + 1);
      }, 100);
    } else {
      setTimeout(() => {
        setText(""); 
        setCharIndex(0);
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, 1000);
    }
  }, [charIndex]);

  return (
    <div className="relative h-screen bg-black text-yellow-500 flex items-center justify-center flex-col font-mono overflow-hidden">
      
      {/* Matrix Background Animation */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          className="absolute w-full h-full bg-repeat opacity-40"
          style={{ backgroundImage: "url('/matrix.png')" }} 
          animate={{ y: ["0%", "100%"] }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        />
      </div>

      {/* Terminal UI */}
      <motion.div
        className="relative border border-green-500 bg-black p-6 rounded-lg shadow-lg w-[80%] max-w-2xl z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex justify-between items-center mb-2">
          <motion.span 
            className="text-green-300"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            coder@portfolio:~$
          </motion.span>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Custom Typing Effect */}
        <p className="text-xl md:text-2xl">{text}▮</p>

        {/* Fake Error Effect */}
        <motion.p
          className="text-red-400 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Error: Too much creativity detected!
        </motion.p>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mt-6">
          <motion.a
            href="https://github.com/"
            target="_blank"
            className="text-green-400 text-3xl hover:text-green-300 transition-all duration-300"
            whileHover={{ scale: 1.2 }}
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://linkedin.com/"
            target="_blank"
            className="text-green-400 text-3xl hover:text-green-300 transition-all duration-300"
            whileHover={{ scale: 1.2 }}
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="https://twitter.com/"
            target="_blank"
            className="text-green-400 text-3xl hover:text-green-300 transition-all duration-300"
            whileHover={{ scale: 1.2 }}
          >
            <FaTwitter />
          </motion.a>
        </div>

        {/* Explore Button (Command Prompt Style) */}
        <motion.button
          className="mt-6 px-6 py-3 border border-green-400 text-green-400 text-lg rounded-md hover:bg-green-500 hover:text-black 
          transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Start Exploring →
        </motion.button>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 text-green-400 text-lg"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        ↓ Scroll Down to Explore More
      </motion.div>
    </div>
  );
};

export default HeroSection;
