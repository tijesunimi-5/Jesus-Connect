import { Button } from './Button';
import { Card } from './Card';
import Link from 'next/link';

interface CounselorProps {
  id: string | number; // Add ID here
  name: string;
  expertise: string;
  location: string;
  shortBio: string;
}

export const CounselorCard = ({ id, name, expertise, location, shortBio }: CounselorProps) => (
  <Card className="flex flex-col h-full hover:translate-y-[-4px] transition-all duration-300">
    <div className="flex-1">
      <div className="w-16 h-16 bg-emerald-100 rounded-2xl mb-4 flex items-center justify-center text-emerald-700 font-bold text-xl">
        {name.charAt(0)}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-1">{name}</h3>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-lg">
          {expertise}
        </span>
        <span className="text-xs font-medium px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg">
          📍 {location}
        </span>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-6">
        {shortBio}
      </p>
    </div>

    {/* Wrap the button in a Link directing to the dynamic route */}
    <Link href={`/help/counselor/${id}`} className="w-full">
      <Button variant="outline" fullWidth className="text-sm">
        View Profile
      </Button>
    </Link>
  </Card>
);