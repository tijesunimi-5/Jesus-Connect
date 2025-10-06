'use client'
import React, { useEffect, useState } from 'react'
import { Context } from './Context';
import { alertContext } from './AlertContext';

interface ToastProps {
  message: string;
  timeout: number;
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({message, timeout, onClose}) => {
  const [show, setShow] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const { alertMessage, alertType, setAlertMessage } = Context()

  const backgroundColor = () => {
    switch (alertType) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'loading':
        return 'bg-blue-500'; // Or a gray for loading
      case 'info':
      default:
        return 'bg-gray-600'; // Default to amber for info or unset
    }
  };

  useEffect(() => {
    setShow(true)
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        onClose()
      }, 500)
    }, timeout)
    return () => clearTimeout(timer)
  }, [timeout, onClose])

  return (
    <div className={`fixed bottom-4 right-4 ${backgroundColor()} text-white p-4 rounded-md transition-all duration-500 ${show ? "translate-y-0" : "translate-y-full"} ${fadeOut ? "opacity-0" : "opacity-100"} w-fit`}>
      {message}
    </div>
  )
}

export default Toast
