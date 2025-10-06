'use client'
import React, { useState } from 'react'
import Button from './Button'
import { useRouter } from 'next/navigation'

const Guidelines = () => {
  const Guides = [
    "A platform built to help you grow spiritually - not alone but with communities of believers.",
    "Connect with Godly Counsellors to Advice you, Pray for you, Counsel you on any issues, difficulties you might be going through.",
    "Join communities of believers and ask question, share inspiration, scriptures, soul lifting contents."
  ]
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const router = useRouter()

  const handleSwipe = (direction: string) => {
    if (direction === "left" && currentIndex < Guides.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else if (direction === 'right' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className='flex flex-col'>
      <div className='bg-gray-400 w-[300px] text-white pb-4 rounded shadow-2xl mt-0 '>
        <div className='text-xl bg-[#2E2255] px-3 py-3 rounded-t'>
          {Guides[currentIndex]}
        </div>
        <div className="dots  mt-7 z-20 flex justify-between w-[200px] ml-12">
          {Guides.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? "bg-gray-500" : "bg-white "} w-[20px] h-[20px] rounded-full shadow`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
      {currentIndex === Guides.length - 1 && (
        <Button onClick={() => router.push("/register/sign-up")}>Get Started</Button>
      )}
    </div>
  )
}

export default Guidelines
