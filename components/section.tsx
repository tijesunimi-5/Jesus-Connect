export const SectionContainer = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`max-w-7xl mx-auto px-6 py-16 md:py-24 ${className}`}>
    {children}
  </section>
);