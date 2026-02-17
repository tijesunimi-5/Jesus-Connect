"use client";
import { Button } from '@/components/Button';
import { SectionContainer } from '@/components/section';
import Link from 'next/link';

export default function PrivacySafety() {
  return (
    <SectionContainer className="max-w-3xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy & Safety</h1>
        <p className="text-lg text-slate-600 italic">"The name of the Lord is a strong tower; the righteous run into it and are safe." — Proverbs 18:10</p>
      </div>

      <div className="space-y-10">
        <section className="bg-red-50 border border-red-100 p-6 rounded-3xl">
          <h2 className="text-red-800 font-bold mb-2 flex items-center gap-2">
            ⚠️ Emergency Disclaimer
          </h2>
          <p className="text-red-700 text-sm leading-relaxed">
            Jesus Connect is not an emergency response service. If you are in immediate danger,
            experiencing a medical emergency, or having thoughts of self-harm, please
            immediately call your local emergency number or go to the nearest hospital.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Privacy Promise</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              <strong>True Anonymity:</strong> We do not require your real name, phone number, or
              social media links to speak with a counselor. Your identity is hidden by default.
            </p>
            <p>
              <strong>Encrypted Sanctuary:</strong> Your conversations are encrypted. This means
              only you and your assigned counselor can read the messages exchanged.
            </p>
            <p>
              <strong>Data Stewardship:</strong> We do not sell your data. We believe your
              vulnerability is sacred, not a product.
            </p>
          </div>
        </section>

        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </SectionContainer>
  );
}