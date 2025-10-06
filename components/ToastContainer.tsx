'use client'
import React, { useState, useEffect } from 'react'
import { Context } from './Context'
import Toast from './Toast'

const ToastContainer = () => {
  const [message, setMessage] = useState<string[]>([])
  const { setAlertMessage, alertMessage } = Context()

  useEffect(() => {
    if (alertMessage) {
      setMessage((prevMessage) => [...prevMessage, alertMessage])
      const timer = setTimeout(() => {
        setMessage((prevMessage) => prevMessage.slice(1))
        if (message.length === 1) {
          setAlertMessage("", null)
        }
      }, 3000)
    }
  }, [alertMessage])

  const handleClose = (index: number) => {
    setMessage((prevMessage) => prevMessage.filter((message, i) => i !== index))
  }

  return (
    <div className={`fixed bottom-0 right-4 flex flex-col-reverse`}>
      {message.map((message, index) => (
        <Toast
          key={index}
          message={message}
          timeout={3000}
          onClose={() => handleClose(index)}
        />
      ))}
    </div>
  )
}

export default ToastContainer
