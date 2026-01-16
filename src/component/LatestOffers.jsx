import React, { useState } from 'react'
import mailIcon from '../assets/icons/mailIcon.svg'

const LatestOffers = () => {
      const [query, setQuery] = useState("");
  return (
    <section className='bg-[#F8F8F8]'>
        <div className="w-[90%] px-10 py-6 md:px-14 md:py-8 lg:px-24 lg:py-14 m-auto bg-[#A1C249] rounded-4xl">
            <div className="flex flex-col gap-y-5 md:flex-row md:items-start justify-between w-full">
                <div className=" w-full md:w-[60%] lg:w-[50%]">
                    <h3 className="font-medium md:font-semibold lg:font-bold leading-9 md:leading-11.25 text-[25px] md:text-[32px] lg:text-[40px] text-[#1A1A1A]">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h3>
                </div>
                <div className="flex flex-col gap-y-3 md:w-[50%] lg:w-[33%]">
                    <div className="relative w-full flex gap-x-4">
                        <input 
                        type="email" value={query}
                        onChange={(e) => setQuery(e.target.value)} 
                        className='text-[1rem] w-full py-3 pl-14 focus:outline-none rounded-[4rem] bg-[#F8F8F8] placeholder:text-[14px] placeholder:pl-' placeholder='Enter your email address' />
                        <img src={mailIcon} alt="mailIcon" className="absolute w-auto aspect-square top-3 left-6 " />
                    </div>
                    <button type='submit' className="bg-[#F8F8F8] rounded-[4rem] text-[1rem] py-3 font-medium text-center text-[#A1C249] cursor-pointer">Subscribe to Newsletter</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default LatestOffers
