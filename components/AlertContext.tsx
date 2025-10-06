'use client'
import React, { createContext, useContext, useState } from 'react'

interface Alert {
  id: number;
  message: string;
  type: string;
}

interface AlertContextProps {
  alerts: Alert[]
  addAlert: (message: string, type: string) => void;
  removeAlert: (id: number) => void;
}

const AlertContext = createContext<AlertContextProps>({
  alerts: [],
  addAlert: () => { },
  removeAlert: () => { },
})

const AlertProvider: React.FC = ({ children }: any) => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [id, setId] = useState(0)

  const addAlert = (message: string, type: string) => {
    setAlerts([...alerts, { id, message, type }])
    setId(id + 1)
  }

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export { AlertContext, AlertProvider }

export const alertContext = () => {
  const context = useContext(AlertContext)
  if (context === undefined) {
    throw new Error("appContext must be used within a Provider")
  }
  return context
}