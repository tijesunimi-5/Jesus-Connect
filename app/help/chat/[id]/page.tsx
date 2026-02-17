"use client";

import React, { useState, useEffect, useRef, use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';

interface Message {
  id: string;
  sender: 'user' | 'counselor';
  text: string;
  time: string;
}

// We use the same IDs to "link" to our mock counselors
const MOCK_COUNSELORS = [
  { id: "1", name: "Dr. Sarah Adenuga", expertise: "Mental Health" },
  { id: "2", name: "Pastor John Okoro", expertise: "Spiritual Growth" },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function UserChatPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "counselor", text: "Hello. I am here to listen. How can I support you today?", time: "10:00 AM" }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const counselor = MOCK_COUNSELORS.find(c => c.id === resolvedParams.id) || MOCK_COUNSELORS[0];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center">
      <div className="w-full max-w-2xl flex flex-col h-screen shadow-2xl bg-white">

        {/* Sanctuary Header */}
        <header className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Link href={`/help/counselor/${counselor.id}`} className="text-slate-400 hover:text-emerald-600">
              ←
            </Link>
            <div>
              <h1 className="font-bold text-slate-900">{counselor.name}</h1>
              <p className="text-xs text-emerald-600 font-medium">{counselor.expertise}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Identity</span>
            <span className="text-xs font-bold text-emerald-700">Anonymous</span>
          </div>
        </header>

        {/* Chat Sanctuary */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] space-y-1`}>
                <div className={`px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-none'
                    : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                  }`}>
                  {msg.text}
                </div>
                <p className={`text-[10px] text-slate-400 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <footer className="p-6 border-t border-slate-100 bg-white">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Speak your heart..."
              className="flex-1 bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
            <button
              type="submit"
              className="bg-emerald-600 text-white p-4 rounded-2xl hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
            <span>🔒 End-to-end Encrypted</span>
            <span>•</span>
            <span>🕊️ Safe Space</span>
          </div>
        </footer>
      </div>
    </div>
  );
}