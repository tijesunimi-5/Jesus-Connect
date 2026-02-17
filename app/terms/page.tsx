"use client";
import { SectionContainer } from '@/components/section';

export default function TermsPage() {
  return (
    <SectionContainer className="max-w-3xl">
      <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>

      <div className="space-y-8 text-slate-600">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">1. Scope of Service</h2>
          <p>
            Jesus Connect provides spiritual and emotional support. Our counselors are mentors
            and pastors; they are not necessarily licensed medical doctors or psychiatrists
            unless explicitly stated in their profile.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">2. User Conduct</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>No abusive, profane, or sexual language.</li>
            <li>No solicitation of funds or commercial advertising.</li>
            <li>Respect the counselor's time and availability.</li>
          </ul>
        </section>

        <section className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-sm italic">
            By using this platform, you agree that Jesus Connect is not liable for
            decisions made based on spiritual advice received.
          </p>
        </section>
      </div>
    </SectionContainer>
  );
}