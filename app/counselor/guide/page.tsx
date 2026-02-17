"use client";
import { Card } from '@/components/Card';

export default function CounselorGuide() {
  const rules = [
    { title: "Scriptural Integrity", desc: "Always align advice with Biblical truth while maintaining a tone of grace." },
    { title: "Absolute Secrecy", desc: "Never share a user's story or details outside the platform, even without names." },
    { title: "Escalation Policy", desc: "If a user mentions self-harm or illegal activity, you must notify an Admin immediately." },
    { title: "No Financial Requests", desc: "Never ask for or offer money to users. Refer financial needs to the Admin team." }
  ];

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Counselor Handbook</h1>
        <p className="text-slate-500 mt-2">Our sacred commitment to those we serve.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {rules.map((rule, i) => (
          <Card key={i} className="border-emerald-50 bg-white">
            <h3 className="font-bold text-emerald-700 mb-2">{rule.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{rule.desc}</p>
          </Card>
        ))}
      </div>

      <div className="p-8 bg-emerald-900 text-white rounded-[32px]">
        <h2 className="text-xl font-bold mb-4">The "Ministry First" Mindset</h2>
        <p className="text-emerald-100 leading-relaxed">
          Remember that you represent Christ to the person on the other side of the screen.
          Be slow to speak, quick to listen, and always end your sessions in prayer
          (if the user is comfortable).
        </p>
      </div>
    </div>
  );
}