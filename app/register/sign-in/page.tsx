'use client'
import { Context } from '@/components/Context'
import { validatePassword } from '@/helpers/validator'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Button from '@/components/Button'
import Secret from '@/components/Secret'
import { ClientUser } from '@/Types/ClientUser'

const page = () => {
  const { setAlertMessage, setUser } = Context()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordErrors, setPasswordErrors] = useState({
    capitalLetter: false,
    number: false,
    minLength: false,
    maxLength: false,
    specialChar: false,
    hasLowercase: false
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [visibility, setVisibility] = useState<boolean>(false)
  const router = useRouter()
  const BACKEND_URL = "http://localhost:8000"

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setPasswordErrors(validatePassword(e.target.value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (!email) {
      setAlertMessage("Email field cannot be empty!", "info")
      return
    }
    if (!password) {
      setAlertMessage("Password doesn't meet requirements", "info")
      return
    }

    try {
      const response = await fetch(`${BACKEND_URL}/user/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password })
      })

      const data = await response.json()
      if (!response.ok) {
        setAlertMessage(data.message, "error")
        return
      }
      setAlertMessage(data.message, "success")
      const User: ClientUser = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        logged: data.user.logged,
        confirmed: data.user.comfirmed,
        secret: data.user.secret
      }
      setUser(User)
      setVisibility(true)
    } catch (error) {
      console.error(error)
      setAlertMessage("Something went wrong", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full flex justify-center items-center flex-col h-screen bg-gray-300 px-3'>
      {!visibility && (
        <div className='w-full flex justify-center items-center flex-col h-screen bg-gray-300 px-3'>
          <div>
            <h1 className='text text-3xl font-bold'>Sign In</h1>
          </div>
          <div className='bg-white rounded shadow-2xl px-3 py-2 w-full mt-5 relative'>
            <form className='pt-9' onSubmit={handleSubmit}>
              <div className="inputbox">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <span>Email</span>
                <i></i>
              </div>

              <div className="inputbox mt-6">
                <input
                  required
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <span>Password</span>
                <i></i>
              </div>
              <div className='word mt-4'>
                {passwordErrors.capitalLetter && <div>• Password must contain a capital letter.</div>}
                {passwordErrors.number && <div>• Password must contain a number.</div>}
                {passwordErrors.minLength && <div>• Password must be at least 8 characters long.</div>}
                {passwordErrors.maxLength && <div>• Password must be no more than 24 characters long.</div>}
                {passwordErrors.specialChar && <div>• Password must contain a special character.</div>}
              </div>


              <p className="mt-5 word">Don't have an account? <a href="/register/sign-up" className="underline">Create account</a></p>
              <Button type='submit' className='mt-5 w-full font-bold text-xl'>
                {loading ? "Signing..." : "Sign In"}
              </Button>
            </form>
          </div>
        </div>
      )}

      {visibility && <Secret visibility={visibility} setVisibility={setVisibility} />}
    </div>
  )
}

export default page
