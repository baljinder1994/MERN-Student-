import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const projects = [
  { name: "AI Debugger", link: "#", command: "load AI_Debugger.exe" },
  { name: "Crypto Tracker", link: "#", command: "run Crypto_Tracker.sh" },
  { name: "ChatBot", link: "#", command: "start ChatBot.v2" },
  { name: "Finance App", link: "#", command: "execute Finance_App.exe" },
];

const ProjectConsole = () => {
  const [typedCommand, setTypedCommand] = useState("");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (index < projects.length) {
      let cmd = projects[index].command;
      let i = 0;
      const typingEffect = setInterval(() => {
        setTypedCommand(cmd.slice(0, i));
        i++;
        if (i > cmd.length) {
          clearInterval(typingEffect);
          setTimeout(() => {
            setTypedCommand("");
            setIndex(index + 1);
          }, 2000);
        }
      }, 100);
      return () => clearInterval(typingEffect);
    }
  }, [index]);

  return (
    <div className="min-h-screen bg-[#000814] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-[#011627] text-green-400 p-6 rounded-lg shadow-lg font-mono text-lg">
        <div className="pb-4 border-b border-green-400 mb-4">
          <span className="text-cyan-400">[root@portfolio]</span>:~$ 
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="ml-2"
          >
            █
          </motion.span>
        </div>

        <div className="h-32 overflow-hidden">
          {projects.slice(0, index).map((proj, i) => (
            <div key={i} className="mb-2">
              <span className="text-cyan-400">[root@portfolio]</span>:~$ {proj.command}
              <motion.a
                href={proj.link}
                className="text-yellow-400 ml-4 hover:underline"
                whileHover={{ scale: 1.1 }}
              >
                [Open]
              </motion.a>
            </div>
          ))}
          {isTyping && (
            <div>
              <span className="text-cyan-400">[root@portfolio]</span>:~$ {typedCommand}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="ml-1"
              >
                █
              </motion.span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectConsole;
