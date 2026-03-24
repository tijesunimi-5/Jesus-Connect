"use client";

import React from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { SectionContainer } from '@/components/section';

export default function CounselorOnboarding() {
  return (
    <SectionContainer className="max-w-3xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Counselor Application</h1>
        <p className="text-slate-600 mt-2">Help us maintain a safe and godly environment for all seekers.</p>
      </div>

      <Card className="p-8 space-y-8">
        <form className="space-y-8">
          {/* Ministry Details */}
          <section className="space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-50 pb-2">Ministry Background</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Church/Organization Name</label>
                <input type="text" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Years in Ministry</label>
                <input type="number" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm" />
              </div>
            </div>
          </section>

          {/* Verification */}
          <section className="space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-50 pb-2">Verification Documents</h3>
            <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl text-center">
              <p className="text-sm text-slate-500 mb-4">Upload pastoral ID, ordination certificate, or a recommendation letter.</p>
              <input type="file" className="hidden" id="file-upload" />
              <label
                htmlFor="file-upload"
                className="inline-block px-6 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl cursor-pointer hover:bg-slate-200"
              >
                Choose File
              </label>
            </div>
          </section>

          <div className="bg-slate-900 p-6 rounded-2xl text-white">
            <p className="text-xs italic leading-relaxed text-slate-300">
              "Be shepherds of God’s flock that is under your care, watching over them—not because you must, but because you are willing, as God wants you to be." — 1 Peter 5:2
            </p>
          </div>

          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 py-4 shadow-lg shadow-emerald-900/10">
            Submit Application for Review
          </Button>
          <p className="text-center text-xs text-slate-400 font-medium">
            Applications are typically reviewed by our board within 48-72 hours.
          </p>
        </form>
      </Card>
    </SectionContainer>
  );
}