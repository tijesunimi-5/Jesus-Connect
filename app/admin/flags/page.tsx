"use client";
import React from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

const MOCK_FLAGS = [
  { id: "f1", reason: "Potential Scams/Solicitation", severity: "High", reporter: "u2", target: "u14", snippet: "Please can you send me 5,000 Naira for transport to church?", time: "10 mins ago" },
  { id: "f2", reason: "Inappropriate Content", severity: "Medium", reporter: "u8", target: "u21", snippet: "Actually, I don't think you should follow those bible verses...", time: "1 hour ago" },
];

export default function FlagsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Safety Center</h1>
        <p className="text-slate-500">Review reported messages and automated keyword flags.</p>
      </div>

      <div className="grid gap-6">
        {MOCK_FLAGS.map((flag) => (
          <Card key={flag.id} className="p-6 border-l-4 border-l-red-500">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-bold uppercase rounded">
                    {flag.severity} Severity
                  </span>
                  <h3 className="font-bold text-slate-900">{flag.reason}</h3>
                  <span className="text-xs text-slate-400">{flag.time}</span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 italic text-sm text-slate-600">
                  "{flag.snippet}"
                </div>

                <div className="flex gap-4 text-xs font-bold text-slate-400">
                  <p>Reporter: <span className="text-slate-900">{flag.reporter}</span></p>
                  <p>Flagged User: <span className="text-slate-900">{flag.target}</span></p>
                </div>
              </div>

              <div className="flex md:flex-col gap-2 shrink-0">
                <Button className="bg-slate-900 text-xs py-2">View Full Chat</Button>
                <Button variant="outline" className="text-xs py-2 text-red-600 border-red-100 hover:bg-red-50">Issue Warning</Button>
                <Button variant="ghost" className="text-xs py-2">Dismiss</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}