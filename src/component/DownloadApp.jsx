import React from 'react'
import googlePlay from '../assets/images/googlePlay.svg'
import phone from '../assets/images/phone.svg'
import { Link } from 'react-router-dom'

const DownloadApp = () => {
  return (
    <section className='bg-[#F8F8F8] pb-20'>
      <div className="w-[90%] px-8 pt-8 pb-12 md:py-10 md:px-0 lg:px-24 lg:py-20 m-auto bg-[#A1C249] rounded-4xl md:rounded-[4rem]">
        <div className="flex flex-col gap-y-14 md:flex-row md:items-center justify-between w-full">
          <div className="flex flex-col gap-y-4 md:w-[43%] md:ml-10 lg:gap-y-15 lg:w-[50%]">
              <h3 className="font-medium md:leading-15 text-[30px] md:text-[40px] lg:text-[50px] text-[#1A1A1A]">Enjoy better Experience with our App</h3>
              <div className="flex flex-col w-[85%] lg:w-auto lg:flex-row lg:items-center gap-y-5 gap-x-5">
                  <Link to='/' className="flex items-center gap-x-3 p-4 bg-black rounded-2xl">
                      <img src={googlePlay} alt="" className=" pl-3  md:pl-0" />
                      <div className="flex flex-col gap-y-1">
                          <p className="text-[#F7F7F7] text-[.6rem]">DOWNLOAD ON THE</p>
                          <p className="text-2xl font-medium text-[#F7F7F7]">App Store</p> 
                      </div>
                  </Link>
                  <Link to='/' className="flex items-center gap-x-3 p-4 bg-black rounded-2xl">
                      <img src={googlePlay} alt="" className=" pl-3  md:pl-0" />
                      <div className="flex flex-col gap-y-1">
                          <p className="text-[#F7F7F7] text-[.6rem]">GET IT ON </p>
                          <p className="text-2xl font-medium text-[#F7F7F7]">GOOGLE PLAY</p>
                      </div>
                  </Link>
              </div>
          </div>
          <div className="w-[14.4rem] md:w-[18.4rem] lg:w-[22.4rem] m-auto lg:m-0 relative aspect-square shadow-2xl rounded-full">
            <img src={phone} alt="" className="absolute w-auto h-70 md:h-100 lg:h-120 -top-6 md:-top-13 lg:-top-16 right-10 lg:right-12" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default DownloadApp
