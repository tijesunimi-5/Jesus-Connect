"use client";
import React, { useState } from 'react';
import { Card } from '@/components/Card';

const MOCK_USERS = [
  { id: "u1", name: "GratefulBrother7", type: "Seeker", status: "Anonymous", joinDate: "2024-02-10", chats: 3 },
  { id: "u2", name: "John Doe", type: "Seeker", status: "Open", joinDate: "2024-02-12", chats: 1 },
  { id: "u3", name: "Dr. Sarah Adenuga", type: "Counselor", status: "Verified", joinDate: "2023-11-05", chats: 42 },
  { id: "u4", name: "Pastor John Okoro", type: "Counselor", status: "Verified", joinDate: "2023-12-20", chats: 15 },
];

export default function UserDirectory() {
  const [filter, setFilter] = useState("All");

  const filteredUsers = filter === "All"
    ? MOCK_USERS
    : MOCK_USERS.filter(u => u.type === filter);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">User Directory</h1>
          <p className="text-slate-500">Manage all members of the Jesus Connect community.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-100">
          {["All", "Seeker", "Counselor"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === t ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'
                }`}
            >
              {t}s
            </button>
          ))}
        </div>
      </header>

      <Card className="overflow-hidden border-none shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">User / Alias</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Type</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Visibility</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Joined</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{user.id}</p>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{user.type}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${user.status === 'Anonymous' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{user.joinDate}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-xs font-bold text-slate-400 hover:text-slate-900 mr-4">View Info</button>
                  <button className="text-xs font-bold text-red-400 hover:text-red-600">Restrict</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}