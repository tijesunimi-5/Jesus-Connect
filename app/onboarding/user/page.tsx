"use client";

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { SectionContainer } from '@/components/section';

export default function UserOnboarding() {
  const [isAnonymous, setIsAnonymous] = useState<boolean | null>(null);

  return (
    <SectionContainer className="max-w-2xl min-h-screen flex flex-col justify-center">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Welcome to Jesus Connect</h1>
        <p className="text-slate-600 mt-2">How would you like to be known in this community?</p>
      </div>

      {isAnonymous === null ? (
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            onClick={() => setIsAnonymous(true)}
            className="text-center p-8 border-2 hover:border-emerald-500 transition-all cursor-pointer group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🛡️</div>
            <h3 className="font-bold text-slate-900 text-lg">Stay Anonymous</h3>
            <p className="text-sm text-slate-500 mt-2">Connect using an alias. No real name or photo required.</p>
          </Card>

          <Card
            onClick={() => setIsAnonymous(false)}
            className="text-center p-8 border-2 hover:border-emerald-500 transition-all cursor-pointer group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">👤</div>
            <h3 className="font-bold text-slate-900 text-lg">Open Profile</h3>
            <p className="text-sm text-slate-500 mt-2">Use your real identity to build long-term relationships.</p>
          </Card>
        </div>
      ) : (
        <Card className="p-8">
          <button
            onClick={() => setIsAnonymous(null)}
            className="text-xs font-bold text-slate-400 uppercase mb-6 hover:text-emerald-600 transition-colors"
          >
            ← Change choice
          </button>

          <form className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">
              {isAnonymous ? "Create your Anonymous Alias" : "Complete your Open Profile"}
            </h2>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">
                {isAnonymous ? "Display Alias (e.g. GratefulBrother7)" : "Full Name"}
              </label>
              <input
                type="text"
                placeholder={isAnonymous ? "Choose a nickname" : "Enter your real name"}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex gap-3">
              <span className="text-emerald-600 font-bold">💡</span>
              <p className="text-xs text-emerald-800 leading-relaxed">
                <strong>Note:</strong> You can change your visibility settings at any time from your profile settings later.
              </p>
            </div>

              <a href='/help' className="px-6 rounded-2xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 w-full bg-emerald-600 hover:bg-emerald-700 py-4">
              Finish Onboarding
            </a>
          </form>
        </Card>
      )}
    </SectionContainer>
  );
}