"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PageContainer } from '@/components/PageContainer';
import { CounselorCard } from '@/components/CounselorCard';
import { Button } from '@/components/Button';

const MOCK_COUNSELORS = [
  {
    id: 1,
    name: "Dr. Sarah Adenuga",
    expertise: "Mental Health",
    location: "Lagos",
    shortBio: "Specializing in anxiety and depression with a focus on faith-centered cognitive behavioral therapy."
  },
  {
    id: 2,
    name: "Pastor John Okoro",
    expertise: "Spiritual Growth",
    location: "Abuja",
    shortBio: "Helping individuals find their purpose and strengthen their walk with God through biblical mentoring."
  },
  {
    id: 3,
    name: "Sister Maryam Bello",
    expertise: "Family & Marriage",
    location: "Kaduna",
    shortBio: "Dedicated to helping couples build strong, Christ-centered foundations for their homes."
  },
  {
    id: 4,
    name: "Emmanuel Chidoka",
    expertise: "Finance",
    location: "Rivers",
    shortBio: "Expert in biblical stewardship and practical debt management for young professionals."
  },
  {
    id: 5,
    name: "Dr. Grace Ofori",
    expertise: "Abuse/Trauma",
    location: "Lagos",
    shortBio: "Providing a safe, confidential space for healing and restoration from past trauma."
  },
  {
    id: 6,
    name: "Bro. David Vance",
    expertise: "Addiction",
    location: "Oyo",
    shortBio: "Supporting the journey to freedom through community, prayer, and accountability structures."
  }
];

export default function ResultsPage() {
  const searchParams = useSearchParams();

  // Get raw values from URL
  const categoryParam = searchParams.get('category');
  const locationParam = searchParams.get('location');

  // Fallbacks if params are missing
  const category = categoryParam || 'all';
  const location = locationParam || 'anywhere';

  const filteredCounselors = MOCK_COUNSELORS.filter(counselor => {
    // 1. Check Category: Match if param is 'all' OR if expertise contains the category string
    const matchesCategory =
      category.toLowerCase() === 'all' ||
      counselor.expertise.toLowerCase().includes(category.toLowerCase());

    // 2. Check Location: Match if param is 'anywhere' OR exact match with counselor location
    const matchesLocation =
      location.toLowerCase() === 'anywhere' ||
      counselor.location.toLowerCase() === location.toLowerCase();

    return matchesCategory && matchesLocation;
  });

  return (
    <PageContainer>
      {/* Header Section */}
      <div className="mb-12">
        <Link
          href="/help"
          className="group flex items-center text-sm text-slate-500 hover:text-emerald-600 transition-colors mb-6"
        >
          <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span>
          Back to selection
        </Link>

        <h1 className="text-4xl font-bold text-slate-900 mb-2">Available Counselors</h1>
        <p className="text-slate-600 text-lg">
          Showing <span className="text-slate-900 font-medium">{filteredCounselors.length}</span> results for
          <span className="font-semibold text-emerald-700 capitalize"> "{category}"</span>
          {location.toLowerCase() !== 'anywhere' && (
            <> in <span className="font-semibold text-emerald-700 capitalize">"{location}"</span></>
          )}
        </p>
      </div>

      {/* Grid Results */}
      {filteredCounselors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCounselors.map((counselor) => (
            <CounselorCard
              key={counselor.id}
              name={counselor.name}
              expertise={counselor.expertise}
              location={counselor.location}
              shortBio={counselor.shortBio}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-[40px] border border-slate-100 shadow-sm">
          <div className="text-5xl mb-6">🕊️</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">No counselors found</h3>
          <p className="text-slate-500 mb-10 max-w-sm mx-auto">
            We couldn't find a match for this specific search. Try widening your location to "Anywhere".
          </p>
          <Link href="/help">
            <Button variant="outline" className="px-8">Adjust Filters</Button>
          </Link>
        </div>
      )}

      {/* Safety Notice Card */}
      <div className="mt-16 bg-slate-900 rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Can't find what you're looking for?</h3>
            <p className="text-slate-400">Our support team is available for urgent spiritual guidance.</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-500 border-none whitespace-nowrap">
            Talk to an Admin
          </Button>
        </div>
        {/* Subtle Decorative Circle */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>
    </PageContainer>
  );
}