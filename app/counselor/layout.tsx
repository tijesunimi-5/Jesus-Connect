"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CounselorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAvailable, setIsAvailable] = useState(true);

  const navLinks = [
    // { name: 'Dashboard', href: '/counselor/dashboard', icon: '📊' },
    { name: 'Conversations', href: '/counselor/dashboard', icon: '💬' },
    { name: 'Profile', href: '/counselor/profile', icon: '👤' },
    { name: 'Settings', href: '#', icon: '⚙️' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full transition-all">
        <div className="p-6">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">CareBridge</h1>
          <p className="text-xs font-medium text-slate-600 uppercase tracking-widest mt-1">Counselor Portal</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive
                    ? 'bg-slate-50 text-slate-700'
                    : 'text-slate-600 hover:bg-slate-50'
                  }`}
              >
                <span>{link.icon}</span>
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="mb-4 px-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">Availability</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                {isAvailable ? 'Online' : 'Offline'}
              </span>
            </div>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isAvailable ? 'bg-emerald-600' : 'bg-slate-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center gap-3 p-2 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
              S
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">Sarah Adenuga</p>
              <button className="text-[10px] text-slate-400 hover:text-red-500 font-bold uppercase tracking-tighter">Logout</button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-10">
          <span className="font-bold text-slate-900">CareBridge</span>
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-xs">S</div>
        </div>

        <div className="p-6 md:p-10 lg:p-12 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}