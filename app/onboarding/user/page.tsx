"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { SectionContainer } from '@/components/section';
import { useAuth } from '@/app/context/AuthContext';
import { useToast } from '@/app/context/ToastContext';
import { useApi } from '@/components/hooks/useApi';

export default function UserOnboarding() {
  const router = useRouter();
  const { setUser } = useAuth();
  const { showToast } = useToast();
  const { execute, loading } = useApi();

  const [isAnonymous, setIsAnonymous] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAnonymous === null) return;

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const nameValue = formData.get('nameValue') as string;

    const payload = {
      email,
      alias: isAnonymous ? nameValue : null,
      full_name: !isAnonymous ? nameValue : null,
      is_anonymous: isAnonymous,
      role: 'seeker',
    };

    try {
      const response = await execute<{ success: boolean; user: any }>(
        '/users/register',
        'POST',
        payload
      );

      if (response.user) {
        setUser(response.user);
        showToast("Welcome to the sanctuary.", "success");
        router.push('/help/results');
      }
    } catch (err: any) {
      showToast(err.message || "Registration failed. Please try again.", "error");
    }
  };

  return (
    <SectionContainer className="max-w-2xl min-h-screen flex flex-col justify-center py-12 px-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight text-balance">
          Welcome to Jesus Connect
        </h1>
        <p className="text-slate-600 mt-3 text-lg">
          How would you like to be known in this community?
        </p>
      </div>

      {isAnonymous === null ? (
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            onClick={() => setIsAnonymous(true)}
            className="text-center p-10 border-2 hover:border-emerald-500 transition-all cursor-pointer group bg-white shadow-sm"
          >
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🛡️</div>
            <h3 className="font-bold text-slate-900 text-xl">Stay Anonymous</h3>
            <p className="text-sm text-slate-500 mt-3 leading-relaxed text-balance">
              Connect using an alias. No real name or photo required.
            </p>
          </Card>

          <Card
            onClick={() => setIsAnonymous(false)}
            className="text-center p-10 border-2 hover:border-emerald-500 transition-all cursor-pointer group bg-white shadow-sm"
          >
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">👤</div>
            <h3 className="font-bold text-slate-900 text-xl">Open Profile</h3>
            <p className="text-sm text-slate-500 mt-3 leading-relaxed text-balance">
              Use your real identity to build long-term relationships.
            </p>
          </Card>
        </div>
      ) : (
        <Card className="p-8 md:p-10 bg-white shadow-xl animate-slide-up">
          <button
            onClick={() => setIsAnonymous(null)}
            className="text-xs font-bold text-slate-400 uppercase mb-8 hover:text-emerald-600 transition-colors flex items-center gap-2"
          >
            ← Change choice
          </button>

          <form onSubmit={handleSubmit} className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-900">
              {isAnonymous ? "Create your Anonymous Alias" : "Complete your Open Profile"}
            </h2>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {isAnonymous ? "Display Alias" : "Full Name"}
                </label>
                <input
                  name="nameValue"
                  type="text"
                  required
                  placeholder={isAnonymous ? "e.g. GratefulBrother7" : "Enter your real name"}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:bg-white outline-none transition-all"
                />
              </div>
            </div>

            <div className="bg-emerald-50/50 p-5 rounded-[24px] border border-emerald-100 flex gap-4 items-start">
              <span className="text-xl">💡</span>
              <p className="text-xs text-emerald-900/80 leading-relaxed font-medium">
                <strong>Note:</strong> You can change your visibility settings at any time from your profile settings later. We prioritize your privacy above all.
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              fullWidth
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 text-lg shadow-lg shadow-emerald-900/10"
            >
              {loading ? "Preparing your Sanctuary..." : "Finish Onboarding"}
            </Button>
          </form>
        </Card>
      )}
    </SectionContainer>
  );
}