import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button = ({ children, variant = 'primary', fullWidth, className, ...props }: ButtonProps) => {
  const baseStyles = "px-6 py-3 rounded-2xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50";
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",
    outline: "border-2 border-slate-200 text-slate-700 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};