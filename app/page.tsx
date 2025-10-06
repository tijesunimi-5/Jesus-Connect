"use client"
import Button from "@/components/Button";
import Guidelines from "@/components/Guidelines";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

export default function Home() {
  const [start, setStart] = useState<boolean>(false)
  const [toggle, setToggle] = useState<boolean>(false)
  useEffect(() => {
    setTimeout(() => {
      setStart(true)
    }, 5000)
  }, [])

  return (
    <section className="relative flex justify-center items-center h-screen w-full flex-col mx-0 overflow-hidden bg-gray-300">

      <div className={`${toggle && "h-0 overflow-hidden transition-all duration-200 ease-in-out"}`}>
        <div className="relative mt-[-100px]">
          <h1 className="text-6xl font-extrabold text-[#fff] bg-[#341A75] px-4 skew-y-[-3deg] shadow-2xl py-2 relative z-10">
            JESUS
          </h1>
          <h2 className="absolute text-3xl text-[#341A75] font-bold bg-gray-400 px-3 py-2 flex items-center justify-center skew-[-1.2deg]">
            Connect <FaArrowUp className="mb-1.5" />
          </h2>
        </div>

        <div
          className={`w-[300px] bg-[#341A75] rounded-3xl h-2 overflow-hidden flex absolute bottom-[150px] ml-[-25px] ${toggle && "hidden"}`}>
          <span className='w-[50px] rounded-2xl bg-gray-500 h-2 loader'></span>
        </div>
      </div>

      {toggle && <Guidelines />}

      {start && !toggle && <Button onClick={() => setToggle(!toggle)} className="absolute bottom-[80px] px-8 text-2xl ml-[-15px]">Start</Button>}
    </section>
  );
}
