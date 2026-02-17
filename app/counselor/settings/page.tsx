"use client";

import React from 'react';
import { Card } from '@/components/Card';

export default function CounselorSettings() {
  return (
    <div className="max-w-4xl space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>

      {/* Notifications Section */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Notifications</h2>
        <Card className="divide-y divide-slate-50">
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-800">Email Notifications</p>
              <p className="text-sm text-slate-500">Receive an email when a user starts a new conversation.</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-emerald-600" />
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-800">Daily Digest</p>
              <p className="text-sm text-slate-500">Summary of your active conversations and unread messages.</p>
            </div>
            <input type="checkbox" className="w-5 h-5 accent-emerald-600" />
          </div>
        </Card>
      </section>

      {/* Security Section */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Security</h2>
        <Card className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-slate-800">Password</p>
              <p className="text-sm text-slate-500">Last changed 3 months ago.</p>
            </div>
            <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Update Password</button>
          </div>
        </Card>
      </section>

      {/* Danger Zone */}
      <section className="pt-8 border-t border-slate-200">
        <button className="text-sm font-bold text-red-400 hover:text-red-500">
          Deactivate Counselor Account
        </button>
      </section>
    </div>
  );
}