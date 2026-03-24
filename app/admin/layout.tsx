"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menu = [
    { name: 'Overview', href: '/admin/dashboard', icon: '📊' },
    { name: 'Verifications', href: '/admin/verifications', icon: '🛡️' },
    { name: 'User Directory', href: '/admin/users', icon: '👥' },
    { name: 'Complaints & Flags', href: '/admin/flags', icon: '🚩' },
    // { name: 'Platform Settings', href: '#', icon: '⚙️' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-white font-bold text-xl">Jesus Connect</h1>
          <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-1">Admin Control</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${pathname === item.href ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' : 'hover:bg-slate-800'
                }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 ml-64 p-10">
        {children}
      </main>
    </div>
  );
}