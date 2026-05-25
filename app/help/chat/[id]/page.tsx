"use client";

import React, { useState, useEffect, useRef, use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { useAuth } from '@/app/context/AuthContext';
import { useToast } from '@/app/context/ToastContext';
import { useApi } from '@/components/hooks/useApi';

interface Message {
  id: string;
  sender_id: string;
  sender_role: 'user' | 'counselor';
  content: string;
  created_at: string;
  is_edited?: boolean;
}

const MOCK_COUNSELORS = [
  { id: "1", name: "Dr. Sarah Adenuga", expertise: "Mental Health" },
  { id: "2", name: "Pastor John Okoro", expertise: "Spiritual Growth" },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function UserChatPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const conversationId = resolvedParams.id;

  const { user } = useAuth();
  const { showToast } = useToast();
  const { execute, loading } = useApi();

  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const counselor = MOCK_COUNSELORS.find(c => c.id === conversationId) || MOCK_COUNSELORS[0];

  // Fetch messages with polling
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await execute<Message[]>(`/conversations/${conversationId}/messages`, 'GET');
        if (data) setMessages(data);
      } catch (err) { /* Silent fail for polling */ }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 4000);
    return () => clearInterval(interval);
  }, [conversationId, execute]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !user) return;

    try {
      if (editingMessage) {
        // UPDATE (EDIT) LOGIC
        await execute(`/messages/${editingMessage.id}`, 'PUT', { content: inputText });
        setEditingMessage(null);
        showToast("Message updated", "success");
      } else {
        // CREATE (SEND) LOGIC
        await execute('/messages', 'POST', {
          conversation_id: conversationId,
          sender_id: user.id,
          content: inputText
        });
      }
      setInputText("");
      // Refresh messages immediately after action
      const data = await execute<Message[]>(`/conversations/${conversationId}/messages`, 'GET');
      if (data) setMessages(data);
    } catch (err: any) {
      showToast(err.message || "Action failed", "error");
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await execute(`/messages/${messageId}`, 'DELETE');
      setMessages(messages.filter(m => m.id !== messageId));
      setActiveMenu(null);
      showToast("Message deleted", "info");
    } catch (err) {
      showToast("Could not delete message", "error");
    }
  };

  const startEditing = (msg: Message) => {
    setEditingMessage(msg);
    setInputText(msg.content);
    setActiveMenu(null);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center">
      <div className="w-full max-w-2xl flex flex-col h-screen shadow-2xl bg-white relative">

        {/* Header */}
        <header className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <Link href="/help/results" className="text-slate-400 hover:text-emerald-600 transition-colors">←</Link>
            <div>
              <h1 className="font-bold text-slate-900">{counselor.name}</h1>
              <p className="text-xs text-emerald-600 font-medium">{counselor.expertise}</p>
            </div>
          </div>
          <div className="text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
            Identity<br /><span className="text-emerald-700 text-xs uppercase">Anonymous</span>
          </div>
        </header>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30" onClick={() => setActiveMenu(null)}>
          {messages.map((msg) => {
            const isMe = msg.sender_role === 'user';
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} group relative`}>
                <div className="max-w-[85%] space-y-1 relative">
                  {/* Context Menu Button (WhatsApp Style) */}
                  {isMe && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === msg.id ? null : msg.id); }}
                      className="absolute -left-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-slate-600"
                    >
                      ⋮
                    </button>
                  )}

                  {/* Menu Dropdown */}
                  {activeMenu === msg.id && (
                    <div className="absolute right-0 top-10 bg-white shadow-xl border border-slate-100 rounded-xl py-2 z-30 w-32 animate-slide-up">
                      <button onClick={() => startEditing(msg)} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700">Edit</button>
                      <button onClick={() => deleteMessage(msg.id)} className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600">Delete</button>
                    </div>
                  )}

                  <div className={`px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm transition-all ${isMe ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                    } ${editingMessage?.id === msg.id ? 'ring-2 ring-emerald-500' : ''}`}>
                    {msg.content}
                    {msg.is_edited && <span className="ml-2 text-[9px] opacity-60 italic">(edited)</span>}
                  </div>

                  <p className={`text-[10px] text-slate-400 font-medium ${isMe ? 'text-right' : 'text-left'}`}>
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Edit State Banner */}
        {editingMessage && (
          <div className="px-6 py-2 bg-emerald-50 border-t border-emerald-100 flex justify-between items-center animate-slide-up">
            <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Editing Message</p>
            <button onClick={() => { setEditingMessage(null); setInputText(""); }} className="text-xs text-emerald-600 font-bold hover:underline">Cancel</button>
          </div>
        )}

        {/* Input Area */}
        <footer className="p-6 border-t border-slate-100 bg-white">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={editingMessage ? "Correct your message..." : "Speak your heart..."}
              className="flex-1 bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="bg-emerald-600 text-white p-4 rounded-2xl hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-900/20 disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${editingMessage ? 'fill-emerald-200' : 'fill-current'}`} viewBox="0 0 20 20">
                {editingMessage ? (
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                ) : (
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                )}
              </svg>
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}