export const Card = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
  <div
    onClick={onClick}
    className={`bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow cursor-pointer ${className}`}
  >
    {children}
  </div>
);