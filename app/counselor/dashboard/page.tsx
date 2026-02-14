"use client";

import React from 'react';
import Link from 'next/link';

const ACTIVE_CONVERSATIONS = [
  {
    id: "conv_1",
    userName: "Anonymous Brother",
    issue: "Spiritual Growth",
    lastMessage: "Thank you for the scripture you shared, it really helped me look at things differently...",
    time: "12m ago",
    unreadCount: 2,
  },
  {
    id: "conv_2",
    userName: "Anonymous Sister",
    issue: "Family Peace",
    lastMessage: "I will try to have that conversation with my husband tonight as we discussed.",
    time: "2h ago",
    unreadCount: 0,
  }
];

export default function CounselorDashboard() {
  const hasConversations = ACTIVE_CONVERSATIONS.length > 0;

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <header>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back, Sarah.</h1>
        <p className="text-slate-600 mt-2">
          You have <span className="text-slate-700 font-semibold">{ACTIVE_CONVERSATIONS.length} active conversations</span>.
        </p>
        <p className="text-sm text-slate-400 mt-1 italic">
          "God is not unjust; he will not forget your work and the love you have shown him as you have helped his people and continue to help them."
        </p>
      </header>

      {/* Conversations Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
          <button className="text-sm text-slate-600 font-medium hover:underline">View All</button>
        </div>

        {hasConversations ? (
          <div className="grid gap-4">
            {ACTIVE_CONVERSATIONS.map((conv) => (
              <div
                key={conv.id}
                className="group bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-slate-900">{conv.userName}</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase rounded-md tracking-wider">
                      {conv.issue}
                    </span>
                    {conv.unreadCount > 0 && (
                      <span className="w-5 h-5 bg-slate-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-pulse">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm line-clamp-1 italic">
                    "{conv.lastMessage}"
                  </p>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
                  <span className="text-xs text-slate-400 font-medium">{conv.time}</span>
                  <Link href={`/counselor/conversation/${conv.id}`}>
                    <button className="px-5 py-2.5 bg-slate-600 text-white text-sm font-semibold rounded-xl hover:bg-slate-700 transition-colors shadow-sm shadow-slate-900/10">
                      Continue Conversation
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              🕊️
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">You have no active conversations yet.</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
              When someone reaches out for help in your area of expertise, their request will appear here.
            </p>
            <button className="px-6 py-3 border border-slate-200 text-slate-600 text-sm font-bold rounded-2xl hover:bg-slate-50 transition-colors">
              Update Profile
            </button>
          </div>
        )}
      </section>

      {/* Helpful Resources / Guidance Card */}
      <section className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">Need guidance?</h3>
          <p className="text-slate-100/80 text-sm mb-6 max-w-md">
            Check our counselor handbook for tips on handling difficult topics or when to escalate a situation to the admin team.
          </p>
          <button className="px-6 py-3 bg-slate-500 text-white text-sm font-bold rounded-2xl hover:bg-slate-400 transition-colors shadow-xl">
            View Handbook
          </button>
        </div>
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
      </section>
    </div>
  );
}