"use client";
import React from 'react';
import { Card } from '@/components/Card';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { label: "Total Seekers", value: "1,240", growth: "+12%", icon: "👥" },
    { label: "Verified Counselors", value: "84", growth: "+3", icon: "🛡️" },
    { label: "Active Chats", value: "312", growth: "High", icon: "💬" },
    { label: "Pending Reviews", value: "12", growth: "Action Needed", icon: "⏳" },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Overseer Overview</h1>
        <p className="text-slate-500">Monitoring the health and safety of the community.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">{stat.icon}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.growth.includes('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                {stat.growth}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-tight mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Simplified Recent Flags Section */}
        <Card className="p-6">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="text-red-500">🚩</span> Critical Flags
          </h3>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100">
                <div>
                  <p className="text-sm font-bold text-red-900">Inappropriate Language Reported</p>
                  <p className="text-xs text-red-700">Chat ID: #1290 • 4 minutes ago</p>
                </div>
                <button className="text-xs font-bold bg-white px-3 py-1.5 rounded-lg border border-red-200 text-red-600">Review</button>
              </div>
            ))}
          </div>
        </Card>

        {/* Simplified Queue Section */}
        <Card className="p-6">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="text-emerald-500">⏳</span> Counselor Queue
          </h3>
          <div className="space-y-4">
            {["Pastor Ade", "Sister Chidi"].map((name) => (
              <div key={name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-xs font-bold text-emerald-700">{name[0]}</div>
                  <p className="text-sm font-bold text-slate-700">{name}</p>
                </div>
                <Link href="/admin/verifications">
                  <button className="text-xs font-bold text-emerald-600">View App</button>
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}