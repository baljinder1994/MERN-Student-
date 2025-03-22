import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaReact, FaNodeJs, FaJs, FaCss3Alt, FaHtml5, FaGitAlt, FaDatabase } from "react-icons/fa";

const techStack = [
  { name: "React.js", icon: <FaReact className="text-blue-400" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "Git", icon: <FaGitAlt className="text-red-500" /> },
  { name: "MongoDB", icon: <FaDatabase className="text-green-600" /> },
];

const TechStack = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <div ref={ref} className="min-h-screen bg-[#0D1117] flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Terminal UI */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-gray-300 bg-[#161B22] p-6 rounded-lg shadow-lg border border-gray-600"
        >
          <p className="text-cyan-400 font-mono">developer@portfolio:~$</p>
          <p className="mt-2 font-mono text-green-400">cat tech_stack.json</p>
          <pre className="mt-3 text-gray-400 bg-black/30 p-4 rounded-md text-sm overflow-hidden">
{`{
  "frontend": ["React.js", "HTML5", "CSS3", "JavaScript"],
  "backend": ["Node.js", "MongoDB", "Express.js"],
  "tools": ["Git", "GitHub", "VS Code"]
}`}
          </pre>
        </motion.div>

        {/* Right: Animated Tech Stack Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 justify-center md:justify-start">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              className="bg-[#161B22] p-6 rounded-xl shadow-lg flex flex-col items-center justify-center w-28 h-28"
              initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
              animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              whileHover={{ scale: 1.1, rotateZ: 5 }}
            >
              <div className="text-4xl">{tech.icon}</div>
              <p className="text-sm text-gray-300 mt-2">{tech.name}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TechStack;
