"use client";

import React, { useState, useEffect, useRef, use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';

// Types for the chat
interface Message {
  id: string;
  sender: 'user' | 'counselor';
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  userName: string;
  issue: string;
  messages: Message[];
}

// Mock Data
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv_1",
    userName: "Anonymous Brother",
    issue: "Spiritual Growth",
    messages: [
      { id: "1", sender: "user", text: "Hello Pastor, I've been struggling with my prayer life lately.", time: "10:05 AM" },
      { id: "2", sender: "counselor", text: "I understand. Many go through seasons like this. When did you first notice this shift?", time: "10:10 AM" },
      { id: "3", sender: "user", text: "About a month ago. It feels like I'm just saying words and not really connecting.", time: "10:12 AM" },
    ]
  },
  {
    id: "conv_2",
    userName: "Anonymous Sister",
    issue: "Family Peace",
    messages: [
      { id: "1", sender: "user", text: "There is so much tension in my home right now.", time: "08:30 AM" },
    ]
  }
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ConversationPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [inputText, setInputText] = useState("");
  const [conversation, setConversation] = useState<Conversation | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize conversation from mock data
  useEffect(() => {
    const found = MOCK_CONVERSATIONS.find(c => c.id === resolvedParams.id);
    setConversation(found);
  }, [resolvedParams.id]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !conversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'counselor',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversation({
      ...conversation,
      messages: [...conversation.messages, newMessage]
    });
    setInputText("");
  };

  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-slate-800">Conversation not found</h2>
        <p className="text-slate-500 mt-2 mb-6">This talk may have ended or moved.</p>
        <Link href="/counselor/dashboard">
          <Button variant="outline">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-120px)]">
      {/* Header */}
      <header className="bg-white p-6 rounded-t-[32px] border-b border-slate-100 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/counselor/dashboard" className="text-slate-400 hover:text-emerald-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-900">{conversation.userName}</h1>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                {conversation.issue}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs text-slate-400 font-medium">Active Conversation</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-white/50"
      >
        <div className="text-center py-4">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Conversation Started</p>
        </div>

        {conversation.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'counselor' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] md:max-w-[70%] space-y-1`}>
              <div className={`px-5 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${msg.sender === 'counselor'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                }`}>
                {msg.text}
              </div>
              <p className={`text-[10px] font-medium text-slate-400 ${msg.sender === 'counselor' ? 'text-right' : 'text-left'
                }`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <footer className="p-6 bg-white rounded-b-[32px] border-t border-slate-100 shadow-lg">
        <form onSubmit={handleSendMessage} className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            placeholder="Type your message with grace and wisdom..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
            rows={2}
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-3 bottom-3 p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:hover:bg-emerald-600 shadow-md shadow-emerald-900/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
        <p className="text-[10px] text-slate-400 text-center mt-3 uppercase tracking-tighter">
          Your messages are confidential and encrypted 🛡️
        </p>
      </footer>
    </div>
  );
}