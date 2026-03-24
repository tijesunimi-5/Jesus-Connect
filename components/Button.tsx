import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  href?: string; // Added optional href
}

export const Button = ({
  children,
  variant = 'primary',
  fullWidth,
  className,
  href,
  ...props
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-2xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 text-center";

  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",
    outline: "border-2 border-slate-200 text-slate-700 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  // If href is provided, render as a Next.js Link
  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  // Otherwise, render as a standard button
  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};