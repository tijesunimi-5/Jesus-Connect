'use client'
import React, { useState } from 'react'
import Button from '../../../components/Button'
import { FaArrowLeft } from 'react-icons/fa6'
import { validatePassword } from '@/helpers/validator'
import { Context } from '@/components/Context'
import { ClientUser } from '@/Types/ClientUser'
import Secret from '@/components/Secret'
import { useRouter } from 'next/navigation'

const page = () => {
  const [anonymous, setAnonymous] = useState<boolean>(false)
  const [form, setForm] = useState<string | null>(null)
  const [name, setName] = useState<string>("")
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
  const { setUser, user, setAlertMessage} = Context()
  const [loading, setLoading] = useState<boolean>(false)
  const [visibility, setVisibility] = useState<boolean>(false)
  const router = useRouter()
  const BACKEND_URL = "http://localhost:8000"

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    setPasswordErrors(validatePassword(event.target.value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (form === "form" && !name) {
      console.log("Name is invalid")
      setAlertMessage("Name must be a valid character")
    }
    if (!email) {
      console.log("Email not valid")
      setAlertMessage("Email must not be left empty", "info")
    }
    if (!password) {
      setAlertMessage("Password must be provided", "info")
    }

    try {
      const response = await fetch(`${BACKEND_URL}/user/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name: name, email: email, password: password, role:"user"})
      })

      const data = await response.json()
      console.log(data)
      if (data.exist && data.user?.secret === null) {
        setVisibility(true)
        return
      }
      if (data.exist && data.user.secret !== null) {
        setAlertMessage("User already exists, sign in", "info")
        router.push("/register/sign-in")
        return
      }
      if (!response.ok) {
        setAlertMessage(data.message, "error")
        return
      }
      setAlertMessage(data.message, "success")
      const User : ClientUser = {
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
      console.log(user)
    } catch (error) {
      console.error(error)
      setAlertMessage('An error occured', "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center flex-col h-screen bg-gray-300 px-3'>
      {!visibility && (
        <div className='w-full flex justify-center items-center flex-col h-screen bg-gray-300 px-3'>
          <div>
            <h1 className='text text-3xl font-bold'>Create Account</h1>
          </div>


          <div className={`flex flex-col gap-2 items-center bg-white shadow-2xl rounded mt-5 px-3 py-2 ${form && "hidden"}`}>
            <h1 className='text-xl word'>What type of account would you want to create?</h1>
            <span className='bg text-white w-fit px-4 py-1 rounded mt-4 font-semibold tracking-wide cursor-pointer shadow' onClick={() => setForm("anonymous")}>
              Anonymous Account
            </span>
            <span className='bg text-white w-fit px-4 py-1 rounded cursor-pointer shadow' onClick={() => setForm("form")}>
              Open account
            </span>
          </div>

          {form === "anonymous" && (
            <div className="anonymous-form bg-white rounded shadow-2xl px-3 py-2 w-full mt-5 relative">
              <FaArrowLeft className='text-xl text absolute top-3 left-4' onClick={() => setForm(null)} />
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


                <p className="mt-5 word">Have an account aleady? <a href="/register/sign-in" className="underline">Login</a></p>
                <Button type='submit' className='mt-5 w-full font-bold text-xl'>
                  {loading ? "Creating..." : "Create account"}
                </Button>
              </form>
            </div>
          )}

          {form === "form" && (
            <div className="anonymous-form bg-white rounded shadow-2xl px-3 py-2 w-full mt-5 relative">
              <FaArrowLeft className='text-xl text absolute top-3 left-4' onClick={() => setForm(null)} />
              <form className='pt-9' onSubmit={handleSubmit}>
                <div className="inputbox">
                  <input

                    type="text"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  />
                  <span>Name</span>
                  <i></i>
                </div>

                <div className="inputbox mt-6">
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


                <p className="mt-5 word">Have an account aleady? <a href="/register/sign-in" className="underline">Login</a></p>
                <Button type='submit' className='mt-5 w-full font-bold text-xl'>
                  {loading ? "Creating..." : "Create account"}
                </Button>
              </form>
            </div>
          )}
        </div>
      )}

      {visibility && <Secret visibility={visibility} setVisibility={setVisibility} />}
    </div>
  )
}

export default page
