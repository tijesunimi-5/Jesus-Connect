'use client'
import React from 'react'

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children: string;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  key?: string | number
}

const Button = ({ className, onClick, children, type, disabled, key }: ButtonProps) => {
  return (
    <button key={key} type={type} disabled={!!disabled} onClick={onClick} className={`${className} bg-[#341A75] text-white px-4 rounded shadow py-2 font-bold tracking-wider`}>
      {children}
    </button>
  )
}

export default Button
