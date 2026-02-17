"use client";

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

export default function CounselorProfile() {
  const [formData, setFormData] = useState({
    name: "Dr. Sarah Adenuga",
    expertise: "Mental Health",
    location: "Lagos",
    bio: "Specializing in anxiety and depression with a focus on faith-centered cognitive behavioral therapy.",
    approach: "Every session is grounded in compassion and confidentiality. My goal is to provide practical guidance that aligns with biblical truth."
  });

  // Generic handler to update state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Public Profile</h1>
        <p className="text-slate-500 mt-2">This information is visible to people seeking help.</p>
      </div>

      <Card className="p-8">
        <form className="space-y-6">
          <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-emerald-100 rounded-3xl flex items-center justify-center text-3xl font-bold text-emerald-700">
                S
              </div>
            </div>
            <div className="flex-1 space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Full Name</label>
                  <input
                    type="text"
                    name="name" // Added name prop
                    value={formData.name}
                    onChange={handleChange} // Added handler
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Expertise</label>
                  <select
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="Mental Health">Mental Health</option>
                    <option value="Spiritual Growth">Spiritual Growth</option>
                    <option value="Marriage">Marriage</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase">Short Bio (Results Preview)</label>
            <textarea
              name="bio"
              rows={2}
              value={formData.bio}
              onChange={handleChange}
              className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase">Counseling Approach (Full Profile)</label>
            <textarea
              name="approach"
              rows={4}
              value={formData.approach}
              onChange={handleChange}
              className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button variant="ghost">Cancel</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}