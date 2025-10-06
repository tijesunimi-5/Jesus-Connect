'use client'
import React, { useRef, useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import Button from './Button'
import { useRouter } from 'next/navigation'
import { Context } from './Context'

interface SecretProps {
  visibility?: boolean
  setVisibility?: (visibility: boolean) => void
}

const Secret = ({ visibility, setVisibility }: SecretProps) => {
  const { user, setAlertMessage } = Context()
  const SECRET_LENGTH = 6
  const [secretValues, setSecretValues] = useState<string[]>(Array(SECRET_LENGTH).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return
    const newSecretValues = [...secretValues]
    newSecretValues[index] = value
    setSecretValues(newSecretValues)

    if (value && index < SECRET_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !secretValues[index] && index > 0) {
      const newSecretValues = [...secretValues]
      newSecretValues[index - 1] = ""
      setSecretValues(newSecretValues)
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const paste = e.clipboardData.getData("text").slice(0, SECRET_LENGTH).split("")
    const newSecretValues = [...secretValues]
    paste.forEach((char, i) => {
      if (/^[0-9]$/.test(char)) {
        newSecretValues[i] = char
      }
    })
    setSecretValues(newSecretValues)
    inputRefs.current[Math.min(paste.length, SECRET_LENGTH) - 1]?.focus()
  }

  const getSecretCode = () => secretValues.join("")

  const returnToLogin = () => {
    setVisibility?.(!visibility)
  }

  const handleValidation = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    console.log(getSecretCode())

    try {
      const response = await fetch("http://localhost:8000/secret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: getSecretCode(), email: user?.email })
      })

      const data = await response.json()
      if (response.ok) {
        setAlertMessage(data.message, "success")
        router.push("/dashboard")
      } else {
        setAlertMessage(data.message, "error")
      }
      console.log(data)
    } catch (error) {
      console.error(error)
      setAlertMessage("An error occured", "error")
      return
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=' bg-white rounded shadow-2xl px-3 py-5'>
      {user?.secret === null && <h2 className="text-center text font-bold text-2xl">
          Register Secret
      </h2>}
      {user?.secret !== null && <h2 className='text-center text font-bold text-2xl'>Provide Secret</h2>}
      <div className='flex items-center mt-3' onClick={returnToLogin}><FaChevronLeft />Back to Sign In</div>

      <form onSubmit={handleValidation}>
        <div className="flex justify-between gap-2 mb-4 mt-5">
          {secretValues.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-[40px] h-[40px] border rounded-lg text-center text-xl font-bold text! focus:text! focus:outline-none focus:ring-2 focus:ring-gray-800"
              disabled={loading}
            />
          ))}
        </div>

        <Button className={`mt-5  py-1 ${loading ? "px-[97px]" : "px-28"}`} type='submit'>{loading ? "Validating..." : "Validate"}</Button>
      </form>
    </div>
  )
}

export default Secret
