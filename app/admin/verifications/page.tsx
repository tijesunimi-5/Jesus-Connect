"use client";
import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

export default function VerificationsPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const applications = [
    { id: "app_1", name: "Pastor Segun Arinze", church: "Grace Tabernacle", bio: "15 years in youth ministry...", doc: "ordination_cert.pdf" },
    { id: "app_2", name: "Evang. Ruth Joy", church: "Zion Ministry", bio: "Focus on marriage and restoration...", doc: "recommendation.pdf" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Counselor Verifications</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Application List */}
        <div className="lg:col-span-1 space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              onClick={() => setSelected(app.id)}
              className={`p-4 rounded-2xl cursor-pointer transition-all border ${selected === app.id ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-white border-slate-100 hover:border-emerald-100'
                }`}
            >
              <p className="font-bold text-slate-900">{app.name}</p>
              <p className="text-xs text-slate-500">{app.church}</p>
            </div>
          ))}
        </div>

        {/* Application Detail View */}
        <div className="lg:col-span-2">
          {selected ? (
            <Card className="p-8">
              <h2 className="text-xl font-bold mb-6">Review Application</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Organization</label>
                    <p className="text-slate-900 font-medium">Grace Tabernacle</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Documents</label>
                    <button className="block text-sm text-emerald-600 font-bold hover:underline">📄 view_ordination.pdf</button>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Ministry Bio</label>
                  <p className="text-slate-600 text-sm leading-relaxed mt-1">
                    Pastor Segun has served as a lead pastor for over 15 years. He specializes in providing
                    scriptural guidance to young professionals struggling with work-life balance and spiritual burnout.
                  </p>
                </div>

                <div className="pt-8 border-t border-slate-50 flex gap-4">
                  <Button className="bg-emerald-600 flex-1">Approve Counselor</Button>
                  <Button variant="outline" className="text-red-500 border-red-100 hover:bg-red-50 flex-1">Reject Application</Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-200 rounded-[40px] text-slate-400 italic">
              Select an application to review
            </div>
          )}
        </div>
      </div>
    </div>
  );
}