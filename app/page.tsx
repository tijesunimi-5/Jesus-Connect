"use client"
import { Button } from '@/components/Button';
import { SectionContainer } from '@/components/section';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#FDFDFD]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Soft Abstract Background Shape */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl -z-10 opacity-60" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-slate-100 rounded-full blur-3xl -z-10 opacity-50" />

        <SectionContainer className="text-center pt-24 pb-32">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-full">
            Safe • Anonymous • Faith-Based
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-6">
            You Don’t Have to <br /> Walk Alone.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Connect anonymously with trusted counselors and godly mentors who care about your spiritual, emotional, and physical well-being.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/help">
              <Button className="px-10">I Need Help</Button>
            </Link>
            <Button variant="outline">I Am a Counselor</Button>
          </div>
        </SectionContainer>
      </div>

      {/* How It Works */}
      <SectionContainer className="bg-white rounded-[40px] shadow-sm border border-slate-50">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { step: '01', title: 'Choose your need', desc: 'Select from categories like spiritual growth, mental health, or financial guidance.' },
            { step: '02', title: 'Find a counselor', desc: 'Browse verified mentors near you or available for digital conversation.' },
            { step: '03', title: 'Start a chat', desc: 'Engage in a safe, private, and anonymous conversation at your own pace.' }
          ].map((item, i) => (
            <div key={i} className="group">
              <div className="text-4xl font-bold text-slate-200 mb-4 group-hover:text-emerald-200 transition-colors">{item.step}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Safety Section */}
      <SectionContainer>
        <div className="bg-slate-900 rounded-[40px] p-10 md:p-20 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Your Safety is Our Priority</h2>
          <p className="max-w-3xl mx-auto text-slate-300 text-lg leading-relaxed">
            Every conversation on Jesus Connect is encrypted and anonymous by default.
            We maintain a community built on respect, biblical values, and absolute
            confidentiality. You are in a safe space.
          </p>
        </div>
      </SectionContainer>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12">
        <SectionContainer className="py-0 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-bold text-slate-900 text-xl">Jesus Connect</span>
          <div className="flex gap-8 text-slate-500 text-sm">
            <a href="/privacy" className="hover:text-slate-900">Privacy Policy</a>
            <a href="/terms" className="hover:text-slate-900">Terms of Service</a>
            <a href="#" className="hover:text-slate-900">Contact Us</a>
          </div>
          <p className="text-slate-400 text-sm">© 2026 Jesus Connect. All rights reserved.</p>
        </SectionContainer>
      </footer>
    </main>
  );
}