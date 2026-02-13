"use client";
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { SectionContainer } from '@/components/section';
import { useState } from 'react';

const categories = [
  { id: 'spiritual', label: 'Spiritual Growth', emoji: '🙏' },
  { id: 'mental', label: 'Mental Health', emoji: '🧠' },
  { id: 'finance', label: 'Finance', emoji: '💰' },
  { id: 'abuse', label: 'Abuse/Trauma', emoji: '🛡️' },
  { id: 'addiction', label: 'Addiction', emoji: '🔗' },
  { id: 'family', label: 'Family & Marriage', emoji: '🏠' },
];

const states = ["Lagos", "Abuja", "Rivers", "Oyo", "Kaduna", "Enugu", "Other"];

export default function HelpSelection() {
  const [selectedCat, setSelectedCat] = useState('');
  const [location, setLocation] = useState('');

  return (
    <main className="min-h-screen bg-[#FDFDFD] pt-12 pb-24">
      <SectionContainer className="max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">What do you need help with?</h1>
          <p className="text-slate-600">Select a category to help us match you with the right person.</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {categories.map((cat) => (
            <Card
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`${selectedCat === cat.id ? 'ring-2 ring-emerald-500 border-emerald-100 bg-emerald-50/30' : ''}`}
            >
              <div className="text-3xl mb-3">{cat.emoji}</div>
              <p className="font-semibold text-slate-800">{cat.label}</p>
            </Card>
          ))}
        </div>

        {/* Location Filter */}
        <div className="mb-12">
          <label className="block text-sm font-medium text-slate-700 mb-3">Your Location (Optional)</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full md:w-1/2 p-4 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none"
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state} value={state.toLowerCase()}>{state}</option>
            ))}
          </select>
        </div>

        {/* Action */}
        <div className="flex justify-center md:justify-start">
          <Button
            className="px-12 py-4 text-lg"
            disabled={!selectedCat}
          >
            Find Counselors
          </Button>
        </div>
      </SectionContainer>
    </main>
  );
}