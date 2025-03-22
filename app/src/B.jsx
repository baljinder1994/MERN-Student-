import { useState } from "react";
import { motion } from "framer-motion";

const chatFlow = [
  { question: "Send me your details", response: "What would you like? (Email 📧 / Phone 📱 / LinkedIn 🌐 / GitHub 💻)" },
  { question: "Email", response: "📧 My email is: contact@example.com" },
  { question: "Phone", response: "📱 My phone number is: +123 456 7890" },
  { question: "LinkedIn", response: "🌐 LinkedIn: linkedin.com/in/example" },
  { question: "GitHub", response: "💻 GitHub: github.com/example" },
];

const ContactAssistant = () => {
  const [messages, setMessages] = useState([
    { text: "👋 Hello! Need my contact details? Just ask! 😊", sender: "ai" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState(["Send me your details"]);

  const handleSendMessage = (msg = input) => {
    if (!msg.trim()) return;

    const userMessage = { text: msg, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setSuggestions([]);

    setTimeout(() => {
      const match = chatFlow.find((item) => item.question.toLowerCase() === msg.toLowerCase());
      const responseText = match ? match.response : "❌ Sorry, I can only provide contact details!";
      setMessages((prev) => [...prev, { text: responseText, sender: "ai" }]);
      setIsTyping(false);
      if (match) {
        const nextSuggestions = chatFlow
          .filter((item) => item.question !== "Send me your details")
          .map((item) => item.question);
        setSuggestions(nextSuggestions);
      }
    }, 1200);
  };

  return (
    <>
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-6">
      <motion.div
        className="max-w-md w-full bg-[#161B22] text-gray-300 p-6 rounded-lg shadow-2xl border border-cyan-500"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-cyan-400 text-xl font-bold mb-4">🤖 AI Contact Assistant</h2>
        <div className="h-64 overflow-y-auto border border-gray-700 rounded p-3 bg-[#0A0F1C]">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: msg.sender === "ai" ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`mb-2 p-3 rounded-lg max-w-xs ${
                msg.sender === "ai"
                  ? "bg-cyan-600 text-white text-left"
                  : "bg-gray-700 text-gray-100 text-right self-end"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              className="bg-cyan-600 text-white p-2 rounded-lg w-max"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              Typing...
            </motion.div>
          )}
        </div>
        
        {/* Suggested Inputs */}
        {suggestions.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                onClick={() => handleSendMessage(suggestion)}
                className="bg-gray-700 text-white px-3 py-1 rounded-lg text-sm hover:bg-cyan-500 transition"
                whileHover={{ scale: 1.05 }}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        )}

        {/* Input Box */}
        <div className="mt-4 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for contact details..."
            className="flex-1 bg-[#1E293B] text-white p-2 rounded-l border border-gray-600 focus:outline-none"
          />
          <button
            onClick={() => handleSendMessage()}
            className="bg-cyan-500 text-white p-2 rounded-r hover:bg-cyan-600 transition"
          >
            Send
          </button>
        </div>
      </motion.div>
    </div>
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D1117] text-gray-300 px-6">
      
    {/* Animated Goodbye Text */}
    <motion.h2
      className="text-4xl md:text-5xl font-bold text-cyan-400"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      👋 Thanks for Visiting!
    </motion.h2>

    <motion.p
      className="text-gray-400 mt-4 text-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      🚀 Keep building, keep learning. See you soon!
    </motion.p>

    {/* Subtle Fade-out Effect */}
    <motion.div
      className="mt-10 text-gray-500 text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
    >
      &copy; 2025 YourName | All rights reserved.
    </motion.div>
  </div>
  </>
  );
};

export default ContactAssistant;
