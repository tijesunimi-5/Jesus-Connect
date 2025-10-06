'use client'
import React from 'react'
import {  FaArrowUp } from 'react-icons/fa6'

const Head = () => {
  return (
    <div className='fixed top-0 right-0 left-0 bg-[#2E2255] w-full h-10 flex pt-3 px-4 z-40'>
      <h1 className='text-white font-bold tracking-wider text-2xl flex justify-center items-center '>JESUS <FaArrowUp className='text-white mb-1.5' /></h1>
    </div>
  )
}

export default Head
