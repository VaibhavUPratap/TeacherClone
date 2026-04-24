import React, { useState, useEffect, useRef } from "react";
import { apiRequest, streamRequest } from "../../api/api";
import { 
  Send, 
  Paperclip, 
  Volume2, 
  MoreHorizontal, 
  History, 
  BookOpen,
  User,
  Sparkles,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Conversations() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello. I'm ready to assist with today's study plan. We were last reviewing the mechanics of cellular respiration. Would you like to continue there, or explore a new topic?",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isStreaming) return;

    const userMsg = { role: "user", text: inputText };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsStreaming(true);

    setMessages((prev) => [...prev, { role: "ai", text: "" }]);

    try {
      await streamRequest(
        `/chat/stream?question=${encodeURIComponent(inputText)}`,
        (token) => {
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            const updated = { ...last, text: last.text + token };
            return [...prev.slice(0, -1), updated];
          });
        },
        () => setIsStreaming(false),
        (err) => {
          console.error("Stream error:", err);
          setIsStreaming(false);
          setMessages((prev) => [
            ...prev,
            { role: "ai", text: "Sorry, I encountered an error. Please check if Ollama is running." },
          ]);
        }
      );
    } catch (err) {
      setIsStreaming(false);
    }
  };

  const handleTTS = async (text) => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    try {
      const response = await fetch("http://localhost:8000/tts/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice_id: "p306", language: "en" }),
      });

      if (!response.ok) throw new Error("TTS failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(url);
      };
      audio.play();
    } catch (err) {
      console.error("TTS error:", err);
      setIsSpeaking(false);
    }
  };

  return (
    <div className="conversations-page fade-in">
      <div className="chat-layout">
        {/* Left Column: History */}
        <aside className="chat-sidebar glass-card">
          <div className="sidebar-header">
            <History size={18} />
            <h3>History</h3>
          </div>
          <div className="history-list">
            <div className="history-item active">
              <p className="item-title">Cellular Respiration</p>
              <p className="item-date">Just now</p>
            </div>
            <div className="history-item">
              <p className="item-title">Advanced Calculus</p>
              <p className="item-date">Yesterday</p>
            </div>
          </div>
        </aside>

        {/* Middle Column: Chat Area */}
        <main className="chat-main glass-card">
          <header className="chat-header">
            <div className="ai-info">
              <div className="ai-avatar glass">
                <Sparkles size={18} />
              </div>
              <div>
                <h4>Academic Assistant</h4>
                <p className="status">Online • Ready to help</p>
              </div>
            </div>
            <button className="more-btn glass"><MoreHorizontal size={18} /></button>
          </header>

          <div className="messages-area" ref={scrollRef}>
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  className={`message-wrapper ${msg.role}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="message-content glass">
                    {msg.text || (isStreaming && i === messages.length - 1 ? <Loader2 className="animate-spin" size={16} /> : "")}
                    {msg.role === "ai" && msg.text && (
                      <button className="tts-btn" onClick={() => handleTTS(msg.text)}>
                        <Volume2 size={14} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="input-area">
            <div className="input-box-wrapper glass">
              <button className="attach-btn"><Paperclip size={18} /></button>
              <input 
                type="text" 
                placeholder="Ask anything..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <motion.button 
                className="send-btn" 
                onClick={handleSend} 
                disabled={isStreaming}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={18} />
              </motion.button>
            </div>
          </div>
        </main>

        {/* Right Column: Context/Sources */}
        <aside className="chat-context glass-card">
          <div className="sidebar-header">
            <BookOpen size={18} />
            <h3>Sources</h3>
          </div>
          <div className="sources-content">
            <div className="source-card glass">
              <div className="source-badge">KNOWLEDGE BASE</div>
              <h4>Course Materials</h4>
              <p>Generated based on uploaded PDF notes and lecture transcripts.</p>
            </div>
          </div>
        </aside>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .conversations-page {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .chat-layout {
          display: grid;
          grid-template-columns: 240px 1fr 280px;
          gap: 24px;
          height: calc(100vh - 160px);
        }

        .chat-sidebar, .chat-context {
          display: flex;
          flex-direction: column;
          padding: 20px;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          color: var(--text-primary);
        }

        .sidebar-header h3 {
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .history-item {
          padding: 12px;
          border-radius: 12px;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .history-item:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .history-item.active {
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .item-title {
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 2px;
        }

        .item-date {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .chat-main {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-color);
        }

        .ai-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ai-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
        }

        .ai-info h4 {
          font-size: 0.9375rem;
        }

        .ai-info .status {
          font-size: 0.75rem;
          color: #10b981;
        }

        .more-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-tertiary);
        }

        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .message-wrapper {
          display: flex;
          width: 100%;
        }

        .message-wrapper.user { justify-content: flex-end; }
        .message-wrapper.ai { justify-content: flex-start; }

        .message-content {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 0.9375rem;
          position: relative;
        }

        .user .message-content {
          background: var(--accent-primary);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .ai .message-content {
          background: var(--bg-tertiary);
          border-bottom-left-radius: 4px;
        }

        .tts-btn {
          position: absolute;
          right: -30px;
          bottom: 0;
          color: var(--text-tertiary);
        }

        .tts-btn:hover { color: var(--accent-primary); }

        .input-area {
          padding: 24px;
          border-top: 1px solid var(--border-color);
        }

        .input-box-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          border-radius: 16px;
        }

        .input-box-wrapper input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: white;
          padding: 8px;
        }

        .attach-btn {
          color: var(--text-tertiary);
        }

        .send-btn {
          width: 40px;
          height: 40px;
          background: var(--accent-primary);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sources-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .source-card {
          padding: 16px;
          border-radius: 16px;
        }

        .source-badge {
          display: inline-block;
          font-size: 0.625rem;
          font-weight: 800;
          padding: 2px 6px;
          background: rgba(99, 102, 241, 0.1);
          color: var(--accent-primary);
          border-radius: 4px;
          margin-bottom: 12px;
        }

        .source-card h4 {
          font-size: 0.875rem;
          margin-bottom: 8px;
        }

        .source-card p {
          font-size: 0.8125rem;
          color: var(--text-tertiary);
          line-height: 1.4;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
