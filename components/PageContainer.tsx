export const PageContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-slate-50/50 pb-24 pt-12">
    <div className="max-w-7xl mx-auto px-6">
      {children}
    </div>
  </div>
);