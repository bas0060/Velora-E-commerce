import React from 'react'
import fb from '../assets/icons/facebookIcon.svg'
import x from '../assets/icons/twitterIcon.svg'
import ig from '../assets/icons/instaIcon.svg'
import github from '../assets/icons/githubIcon.svg'
import logo from '../assets/images/logo.svg'
import { Link } from 'react-router-dom'
import paypal from '../assets/icons/payPalIcon.svg'
import googlePay from '../assets/icons/googlePay.svg'
import visa from '../assets/icons/visaIcon.svg'
import applePay from '../assets/icons/applePay.svg'
import masterCard from '../assets/icons/masterCard.svg'

const Footer = () => {
  return (
    <footer className='bg-[#F8F8F8] py-10 md:pb-10 md:pt-15'>
      <div className="w-[90%] flex flex-col gap-y-5 mx-auto">
        <div className="flex flex-col gap-y-6 md:gap-y-8 gap-x-20 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-y-4 w-84">
                <div className="flex items-center gap-x-2">
                    <div className="bg-[#A1C249] p-[.27rem] rounded-[.57rem]">
                        <img src={logo} alt="logo" className="w-auto aspect-square" />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <h2 className="leading-[100%] font-medium md:font-bold text-[2.25rem] md:text-[2.8rem]">
                            Velora.
                        </h2>
                        <p className="leading-[100%] font-normal text-[.6rem] ">Think forward, Spend Smarter</p>
                    </div>
                </div>
                <p className="text-[#00000099] text-[.875rem]">We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
                <div className="flex items-center gap-x-2">
                    <img src={fb} alt="" className="cursor-pointer" /> 
                    <img src={x} alt="" className="cursor-pointer" />
                    <img src={ig} alt="" className="cursor-pointer" />
                    <img src={github} alt="" className="cursor-pointer" />
                </div>
            </div>
            <div className="flex flex-col gap-y-5 md:flex-row items-center justify-between w-full md:gap-40 lg:gap-x-60 lg:w-[80%]">
                <div className="flex items-center w-full justify-between">    
                    <div className="flex flex-col gap-y-4  lg:w-auto ">
                        <h3 className="text-black font-medium text-[1rem]">COMPANY</h3>
                        <ul className='flex flex-col gap-y-2 text-left'>
                            <li>
                                <Link to='/' className='text-[#00000099] font-normal text-[1rem]'>About</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-[#00000099] font-normal text-[1rem]'>Features</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-[#00000099] font-normal text-[1rem]'>Works</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-[#00000099] font-normal text-[1rem]'>Career</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-y-4 lg:w-auto">
                        <h3 className="text-black font-medium text-[1rem]">COMPANY</h3>
                        <ul className='flex flex-col gap-y-2 text-left'>
                            <li>
                                <Link to='/' className='text-[#00000099] font-normal text-[1rem]'>About</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-[#00000099] font-normal text-[1rem]'>Features</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-[#00000099] font-normal text-[1rem]'>Works</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-[#00000099] font-normal text-[1rem]'>Career</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex items-center w-full justify-between">
                    <div className="flex flex-col gap-y-4 lg:w-auto text-left">
                        <h3 className="text-black font-medium text-[1rem]">COMPANY</h3>
                        <ul className='flex flex-col gap-y-2'>
                            <li>
                                <Link to='/' className='text-[#00000099] font-normal text-[1rem]'>About</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-[#00000099] font-normal text-[1rem]'>Features</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-[#00000099] font-normal text-[1rem]'>Works</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-[#00000099] font-normal text-[1rem]'>Career</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-y-4 lg:w-auto text-left">
                        <h3 className="text-black font-medium text-[1rem]">COMPANY</h3>
                        <ul className='flex flex-col gap-y-2'>
                            <li>
                                <Link to='/' className='text-[#00000099] font-normal text-[1rem]'>About</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-[#00000099] font-normal text-[1rem]'>Features</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-[#00000099] font-normal text-[1rem]'>Works</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-[#00000099] font-normal text-[1rem]'>Career</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <hr className='text-gray-300 lg:pt-5'/>
        <div className="flex flex-col gap-y-2 md:flex-row items-center justify-between">
            <div className="flex items-center gap-x-2">
                <img src={visa} alt="" className="" />
                <img src={masterCard} alt="" className="" />
                <img src={paypal} alt="" className="" />
                <img src={googlePay} alt="" className="" />
                <img src={applePay} alt="" className="" />
            </div>
            <p className="text-[#00000099] text-[.875rem]">Velora © 2000-2023, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
