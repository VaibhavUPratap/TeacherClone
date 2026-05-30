import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { 
  Send, 
  Volume2, 
  Sparkles,
  Loader2,
  User,
  Bot,
  VolumeX
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { streamRequest } from "../../api/api";
import { MessageRenderer } from "./MessageRenderer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const StudentChat = forwardRef((props, ref) => {
  const [activeTeacher, setActiveTeacher] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  
  const scrollRef = useRef(null);
  const audioRef = useRef(null);

  // Expose sendMessage to parent components
  useImperativeHandle(ref, () => ({
    sendMessage: (text) => {
      handleSend(text);
    }
  }));

  // Initialize teacher context
  useEffect(() => {
    const teacherData = localStorage.getItem('activeTeacher');
    if (teacherData) {
      const teacher = JSON.parse(teacherData);
      setActiveTeacher(teacher);
      setMessages([
        {
          role: "ai",
          text: `Hello! I am ${teacher.name}. I'll be your ${teacher.teaching_style} guide for ${teacher.subject_id.charAt(0).toUpperCase() + teacher.subject_id.slice(1)}. How can I help you with your studies today?`,
          id: Date.now()
        },
      ]);
    } else {
      // Fallback
      setMessages([
        {
          role: "ai",
          text: "Hello! Please select a teacher clone from the dashboard to start learning.",
          id: Date.now()
        },
      ]);
    }
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (forcedText = null) => {
    const textToSend = forcedText || inputText;
    if (!textToSend.trim() || isStreaming || !activeTeacher) return;

    const userMsg = { role: "user", text: textToSend, id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    const currentQuestion = textToSend;
    if (!forcedText) setInputText("");
    setIsStreaming(true);

    // Add empty AI message to start streaming into
    const aiMsgId = Date.now() + 1;
    setMessages((prev) => [...prev, { role: "ai", text: "", id: aiMsgId }]);

    let fullResponse = "";

    try {
      await streamRequest(
        `/chat/stream?question=${encodeURIComponent(currentQuestion)}&teacher_id=${activeTeacher.id}`,
        (token) => {
          fullResponse += token;
          setMessages((prev) => {
            return prev.map(msg => 
              msg.id === aiMsgId ? { ...msg, text: fullResponse } : msg
            );
          });
        },
        () => {
          setIsStreaming(false);
          if (autoSpeak && fullResponse) {
            handleTTS(fullResponse);
          }
        },
        (err) => {
          console.error("Stream error:", err);
          setIsStreaming(false);
          setMessages((prev) => [
            ...prev,
            { role: "ai", text: "I'm sorry, I encountered an error. Please try again or check if the server is running.", id: Date.now() },
          ]);
        }
      );
    } catch (err) {
      console.error("Fetch error:", err);
      setIsStreaming(false);
    }
  };

  const handleTTS = async (text) => {
    if (isSpeaking) {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsSpeaking(false);
        }
        return;
    }

    if (!activeTeacher) return;

    setIsSpeaking(true);
    try {
      const response = await fetch(`${API_BASE_URL}/tts/speak`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            text: text.substring(0, 1000), // Safety cap
            voice_id: activeTeacher.voice_id || activeTeacher.id, 
            language: "en" 
        }),
      });

      if (!response.ok) throw new Error("TTS failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(url);
      };
      
      audio.onerror = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(url);
      };

      await audio.play();
    } catch (err) {
      console.error("TTS error:", err);
      setIsSpeaking(false);
    }
  };

  return (
    <div className="student-chat-container premium-glass">
      <div className="chat-header-minimal">
        <div className="ai-status">
          {activeTeacher ? (
            <div className="teacher-badge-simple">
              <div className="status-indicator">
                <div className="status-dot pulse" />
              </div>
              <div className="header-info">
                <span className="teacher-name">{activeTeacher.name}</span>
                <span className="teacher-style-tag">AI Agent • {activeTeacher.teaching_style}</span>
              </div>
            </div>
          ) : (
            <>
              <div className="status-dot"></div>
              <span>TeacherClone AI</span>
            </>
          )}
        </div>
        <div className="header-actions">
          <button 
            className={`action-toggle ${autoSpeak ? 'active' : ''}`}
            onClick={() => setAutoSpeak(!autoSpeak)}
            title={autoSpeak ? "Voice cloning enabled" : "Voice cloning disabled"}
          >
            {autoSpeak ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </div>

      <div className="chat-messages-area" ref={scrollRef}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id} 
              className={`msg-group ${msg.role}`}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="msg-bubble-wrapper">
                <div className="msg-bubble">
                  <div className="msg-content">
                    {msg.text ? <MessageRenderer text={msg.text} /> : (isStreaming && msg.id === messages[messages.length - 1].id ? (
                      <div className="typing-dots">
                        <span></span><span></span><span></span>
                      </div>
                    ) : "")}
                  </div>
                  
                  {msg.role === "ai" && msg.text && !isStreaming && (
                    <div className="msg-actions">
                      <button 
                        className={`msg-action-btn ${isSpeaking ? 'active' : ''}`} 
                        onClick={() => handleTTS(msg.text)}
                        title="Listen to cloned voice"
                      >
                        {isSpeaking ? <Loader2 size={14} className="animate-spin" /> : <Volume2 size={14} />}
                        <span>Cloned Voice</span>
                      </button>
                      <button className="msg-action-btn">
                        <Sparkles size={14} />
                        <span>Explain Better</span>
                      </button>
                    </div>
                  )}
                </div>
                <div className="msg-meta">
                  {msg.role === "ai" ? activeTeacher?.name : "You"} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="chat-input-area">
        <div className="input-glow" />
        <div className="input-box-wrapper">
          <textarea 
            placeholder={activeTeacher ? `Message ${activeTeacher.name}...` : "Select a teacher..."} 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={!activeTeacher}
            rows={1}
          />
          <button 
            className="chat-send-btn" 
            onClick={handleSend} 
            disabled={isStreaming || !inputText.trim() || !activeTeacher}
          >
            {isStreaming ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .student-chat-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: rgba(15, 15, 25, 0.4);
          backdrop-filter: blur(40px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
          position: relative;
        }

        .chat-header-minimal {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.01);
        }

        .teacher-badge-simple {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
        }

        .status-dot.pulse {
          box-shadow: 0 0 10px #10b981;
          animation: pulse-glow 2s infinite;
        }

        @keyframes pulse-glow {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }

        .header-info {
          display: flex;
          flex-direction: column;
        }

        .teacher-name {
          font-size: 1rem;
          font-weight: 700;
          color: white;
          line-height: 1.2;
        }

        .teacher-style-tag {
          font-size: 0.7rem;
          color: #6366f1;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .action-toggle {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.4);
          padding: 8px;
          border-radius: 10px;
          transition: all 0.2s;
        }

        .action-toggle.active {
          color: #6366f1;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .chat-messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .msg-group {
          display: flex;
          flex-direction: column;
          max-width: 80%;
        }

        .msg-group.user {
          align-self: flex-end;
          align-items: flex-end;
        }

        .msg-group.ai {
          align-self: flex-start;
          align-items: flex-start;
        }

        .msg-bubble-wrapper {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .msg-bubble {
          padding: 16px 20px;
          border-radius: 20px;
          font-size: 0.95rem;
          line-height: 1.6;
          position: relative;
        }

        .user .msg-bubble {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
          border-bottom-right-radius: 4px;
          box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2);
        }

        .ai .msg-bubble {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
          border-bottom-left-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .msg-meta {
          font-size: 0.7rem;
          color: var(--text-tertiary);
          margin: 0 4px;
        }

        .msg-actions {
          display: flex;
          gap: 8px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .msg-action-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all 0.2s;
        }

        .msg-action-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .msg-action-btn.active {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .typing-dots {
          display: flex;
          gap: 4px;
          padding: 10px 0;
        }

        .typing-dots span {
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out;
        }

        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        .chat-input-area {
          padding: 24px;
          background: rgba(255, 255, 255, 0.02);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
        }

        .input-box-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 12px 16px;
          transition: all 0.3s;
          position: relative;
          z-index: 1;
        }

        .input-box-wrapper:focus-within {
          border-color: #6366f1;
          background: rgba(0, 0, 0, 0.3);
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.1);
        }

        .input-box-wrapper textarea {
          flex: 1;
          background: transparent;
          border: none;
          color: white;
          font-size: 1rem;
          resize: none;
          outline: none;
          padding: 8px 4px;
          max-height: 200px;
        }

        .chat-send-btn {
          width: 44px;
          height: 44px;
          background: #6366f1;
          color: white;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .chat-send-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        }

        .chat-send-btn:disabled {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.1);
        }

        .input-glow {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 40px;
          background: #6366f1;
          filter: blur(40px);
          opacity: 0.1;
          pointer-events: none;
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
});

export default StudentChat;
