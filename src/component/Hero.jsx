import React from 'react'
import arrowUp from '../assets/icons/arrow.svg'
import heroImg from '../assets/images/heroImg.svg'
import shopWoman from '../assets/images/shopWoman.png'
import blackStar from '../assets/images/blackStar.svg'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className=' bg-[#F8F8F8] pt-12 md:pt-24 h-auto'>
        <div className="flex flex-col">
            <div className="px-5 md:px-13 lg:px-20 flex flex-col gap-y-8 md:flex-row md:items-center">
                <div className="flex flex-col gap-y-4 md:gap-y-12 items-start md:w-[36%] lg:w-3/7">
                    <div className="flex flex-col gap-y-4">
                        <div className="bg-[#A1C249] rounded-4xl w-[50%] md:w-[60%] lg:w-[29%] ">
                            <p className="text-[1.25rem] text-center font-medium py-2 text-[#1A1A1A] leading-10">Limited Offer</p>
                        </div>
                        <h3 className="text-[2.125rem] md:text-[2.5rem] lg:text-[3.125rem] font-medium text-black md:leading-12 lg:leading-16">
                            First Purchase Enjoy a Special Offer
                        </h3>
                    </div>
                    <Link to={'/shop'} className="bg-[#A1C249] rounded-[3rem] md:-mt-8 lg:mt-0">
                        <div className="flex items-center md:w-full m-auto gap-x-2 md:gap-x-5 px-6 py-2 md:py-3">
                            <p className="text-[1.4rem] font-medium text-[#1A1A1A] leading-10">Shop now</p>
                            <div className=" bg-white rounded-full">
                                <img src={arrowUp} alt="arrowUp" className="w-7 md:w-8 lg:w-9 h-auto p-2" />
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="md:w-[64%] lg:w-3/5 flex items-start relative lg:gap-x-4">
                    <div className="bg-[#A1C249] absolute top-3 md:top-9 lg:top-14 left-8 md:left-18 lg:left-36 border rounded-full ">
                        <div className="bg-[#A1C249] w-20 md:w-27 h-20 md:h-27 m-1 border-2 border-dotted rounded-full">
                            <p className="text-[1rem] md:text-[1.7rem] font-medium pt-6 pl-[1.4rem] md:p-7 text-[#1A1A1A] leading-[100%]">50%<br />Sale</p>
                        </div>
                    </div>
                    <div className=" md:h-full">
                        <img src={shopWoman} alt="heroImg" className=" h-72 md:h-108 lg:h-[80%] object-cover" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-y-4 md:flex-row bg-[#A1C249] items-center justify-between md:px-5 py-8 lg:px-7 md:mt-0">
                <img src={blackStar} alt="blackStar" className="w-6 md:w-7 lg:w-8 aspect-square" />
                <span className=" font-medium text-[2.125rem] md:text-[2.5rem] lg:text-[3.125rem] leading-7">Fashion</span>
                <img src={blackStar} alt="blackStar" className="w-6 md:w-7 lg:w-8 aspect-square" />
                <span className=" font-medium text-[2.125rem] md:text-[2.5rem] lg:text-[3.125rem] leading-7">Style</span>
                <img src={blackStar} alt="blackStar" className="w-6 md:w-7 lg:w-8 aspect-square" />
                <span className=" font-medium text-[2.125rem] md:text-[2.5rem] lg:text-[3.125rem] leading-7">Elegance</span>
                <img src={blackStar} alt="blackStar" className="w-6 md:w-7 lg:w-8 aspect-square" />
                <span className=" font-medium text-[2.125rem] md:text-[2.5rem] lg:text-[3.125rem] leading-7">Fashion</span>
                <img src={blackStar} alt="blackStar" className="w-6 md:w-7 lg:w-8 aspect-square" />
            </div>
        </div>
    </section>
  )
}

export default Hero
