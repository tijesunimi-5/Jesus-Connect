'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ClientUser } from '@/Types/ClientUser'
import { useRouter } from 'next/navigation'

interface ContextType {
  user: ClientUser | null;
  setUser: (user: ClientUser | null) => void;
  alertMessage: string;
  setAlertMessage: (message: string, type?: "success" | "error" | "info" | "loading" | null) => void;
  alertType: "success" | "error" | "info" | "loading" | null;
  setAlertType: (type: "success" | "error" | "info" | "loading" | null) => void;
  initialLoadComplete: boolean;
}

const appContext = createContext<ContextType | undefined>(undefined)
const getLocalStorageItem = (key: string): any => {
  if (typeof window !== "undefined") {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error(`Error parsing localstorage key "${key}":`, error)
      localStorage.removeItem(key)
      return null
    }
  }
  return null
}

const Provider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<ClientUser | null>(null)
  const [alertMessage, setAlertMessageState] = useState<string>('')
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info' | 'loading' | null>(null)
  const setAlertMessage = (message: string, type: "success" | "error" | "info" | "loading" | null = "info") => {
    setAlertMessageState(message)
    setAlertType(type)
    if (message) {
      if (type !== 'loading') {
        setTimeout(() => {
          setAlertMessageState('')
          setAlertType(null)
        }, 3000)
      }
    }
  }
  const [initialLoadCompleteInternal, setInitialLoadCompleteInternal] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = getLocalStorageItem('user');

      if (storedUser) setUserState(storedUser)

      setInitialLoadCompleteInternal(true)
    }
  }, [])

  useEffect(() => {
    if (initialLoadCompleteInternal && typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  const contextValue = React.useMemo(() => ({
    user,
    setUser:
      setUserState,
    alertMessage,
    setAlertMessage,
    alertType,
    setAlertType,
    initialLoadComplete: initialLoadCompleteInternal
  }),
    [
      user,
      alertMessage,
      initialLoadCompleteInternal,
      alertType,
      setUserState,
      setAlertMessage,
      setAlertType
    ])

  return (
    <appContext.Provider value={contextValue}>
      {children}
    </appContext.Provider>
  )
}

export default Provider

export const Context = () => {
  const context = useContext(appContext)
  if (context === undefined) {
    throw new Error("appContext must be used within a Provider")
  }
  return context
}