"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { PageContainer } from '@/components/PageContainer';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

const MOCK_COUNSELORS = [
  {
    id: "1",
    name: "Dr. Sarah Adenuga",
    expertise: "Mental Health",
    location: "Lagos",
    shortBio: "Specializing in anxiety and depression with a focus on faith-centered cognitive behavioral therapy.",
    fullBio: "Dr. Sarah has over 12 years of experience helping individuals navigate the complexities of mental health through a biblical lens. She believes that emotional healing is a vital part of the spiritual journey. Her approach combines clinical excellence with compassionate, Christ-centered guidance to help you find peace and resilience.",
    focusAreas: ["Anxiety", "Depression", "CBT", "Spiritual Maturity"]
  },
  {
    id: "2",
    name: "Pastor John Okoro",
    expertise: "Spiritual Growth",
    location: "Abuja",
    shortBio: "Helping individuals find their purpose and strengthen their walk with God through biblical mentoring.",
    fullBio: "Pastor John is dedicated to discipleship and spiritual formation. He has served in ministry for two decades, focusing on helping people hear God's voice and align their lives with their divine calling. His counseling is rooted deeply in scripture and prayerful discernment.",
    focusAreas: ["Prayer", "Purpose", "Bible Study", "Leadership"]
  },
  {
    id: "3",
    name: "Sister Maryam Bello",
    expertise: "Family & Marriage",
    location: "Kaduna",
    shortBio: "Dedicated to helping couples build strong, Christ-centered foundations for their homes.",
    fullBio: "Sister Maryam focuses on reconciliation and communication within the family unit. She provides a safe space for couples and families to address conflict, rebuild trust, and implement biblical principles that lead to lasting harmony in the home.",
    focusAreas: ["Marriage", "Parenting", "Conflict Resolution", "Communication"]
  },
  {
    id: "4",
    name: "Emmanuel Chidoka",
    expertise: "Finance",
    location: "Rivers",
    shortBio: "Expert in biblical stewardship and practical debt management for young professionals.",
    fullBio: "Emmanuel bridges the gap between practical financial planning and spiritual stewardship. He helps individuals and families break free from debt and build generational wealth using principles of integrity and wisdom found in the Word.",
    focusAreas: ["Budgeting", "Debt Freedom", "Investment", "Stewardship"]
  },
  {
    id: "5",
    name: "Dr. Grace Ofori",
    expertise: "Abuse/Trauma",
    location: "Lagos",
    shortBio: "Providing a safe, confidential space for healing and restoration from past trauma.",
    fullBio: "Dr. Grace provides a trauma-informed approach to healing. She understands the delicate nature of restoration and offers a patient, supportive environment for survivors to process their experiences and reclaim their identity in Christ.",
    focusAreas: ["Trauma Recovery", "Emotional Safety", "Identity", "Healing"]
  },
  {
    id: "6",
    name: "Bro. David Vance",
    expertise: "Addiction",
    location: "Oyo",
    shortBio: "Supporting the journey to freedom through community, prayer, and accountability structures.",
    fullBio: "David works with individuals seeking freedom from life-controlling habits. His approach is built on the pillars of community support, consistent prayer, and practical accountability, believing that no one is beyond the reach of God's transforming grace.",
    focusAreas: ["Recovery", "Accountability", "Habit Breaking", "Grace"]
  }
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CounselorProfile({ params }: PageProps) {
  const resolvedParams = use(params);
  const counselor = MOCK_COUNSELORS.find((c) => c.id === resolvedParams.id);

  if (!counselor) {
    return (
      <PageContainer>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-slate-900">Counselor not found</h2>
          <p className="text-slate-500 mb-8">The profile you are looking for does not exist.</p>
          <Link href="/help">
            <Button variant="outline">Back to Search</Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mb-8">
        <Link
          href="/help/results"
          className="text-sm text-slate-500 hover:text-emerald-600 transition-colors inline-flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to results
        </Link>
      </div>

      {/* Grid Container - Added items-start to allow sticky behavior */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Left Column: Header Card & Focus Areas (Sticky on Desktop) */}
        <div className="lg:col-span-1 lg:sticky lg:top-8 space-y-6">
          <Card className="text-center md:text-left border-emerald-50 shadow-emerald-900/5">
            <div className="w-24 h-24 bg-emerald-100 rounded-3xl mx-auto md:mx-0 mb-6 flex items-center justify-center text-slate-700 font-bold text-3xl">
              {counselor.name.charAt(0)}
            </div>
            <div className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider text-slate-700 bg-emerald-50 rounded-full">
              Available for conversation
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{counselor.name}</h1>
            <p className="text-slate-600 font-medium mb-4">{counselor.expertise}</p>
            <p className="text-slate-500 text-sm flex items-center justify-center md:justify-start gap-1">
              📍 {counselor.location}
            </p>
            <hr className="my-6 border-slate-100" />
            <p className="text-slate-600 italic leading-relaxed">
              "I am here to listen and walk with you through this season with grace and truth."
            </p>
          </Card>

          <Card className="bg-slate-50/50 border-none shadow-none">
            <h3 className="font-bold text-slate-900 mb-4">Focus Areas</h3>
            <div className="flex flex-wrap gap-2">
              {counselor.focusAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-sm rounded-xl shadow-sm"
                >
                  {area}
                </span>
              ))}
              <span className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-sm rounded-xl shadow-sm">Faith-Centered</span>
            </div>
          </Card>
        </div>

        {/* Right Column: Bio & CTA (Scrolling content) */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 md:p-12 border-none shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-50 pb-4">About</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                {counselor.fullBio}
              </p>

              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-slate-500 rounded-full" />
                Counseling Approach
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Every session is grounded in compassion and confidentiality. My goal is to provide
                practical guidance that aligns with biblical truth, ensuring you feel heard,
                respected, and empowered to take the next steps in your journey. We will focus on
                restoration, practical steps, and spiritual alignment.
              </p>
            </div>
          </Card>

          {/* Privacy Note */}
          <div className="p-6 bg-white border border-emerald-100 rounded-[32px] flex gap-4 items-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
              🛡️
            </div>
            <p className="text-sm text-slate-600">
              <strong className="text-slate-900">Your Privacy Matters.</strong> This counselor has signed a non-disclosure agreement. No personal details are shared with 3rd parties without your explicit consent.
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-slate-900 rounded-[40px] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4 tracking-tight">Ready to begin a private conversation?</h2>
              <p className="text-slate-400 mb-10 max-w-md mx-auto text-lg">
                Take the first step today. Your identity remains anonymous until you choose to share it.
              </p>
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-5 text-xl border-none shadow-lg shadow-emerald-900/40">
                Start Private Conversation
              </Button>
              <div className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">🔒 128-bit Encryption</span>
                <span className="w-1 h-1 bg-slate-700 rounded-full" />
                <span className="flex items-center gap-1">👤 Anonymous Mode</span>
              </div>
            </div>

            {/* Background Decorative Accents */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-500/10 rounded-full blur-[80px] -ml-32 -mb-32" />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}