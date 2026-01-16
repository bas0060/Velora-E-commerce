import React from 'react'
import BlogFamily from '../assets/images/blogFamily.svg'
// import BlogFamily from '../assets/images/shopWoman.png'

const BlogStory = () => {
  return (
    <section className=" bg-[#F8F8F8] pt-10 md:pt-0 pb-16">
        <div className="w-[90%] flex flex-col md:flex-row m-auto justify-between">
            <div className="w-full flex flex-col gap-y-6 md:gap-y-12 md:w-3/7 md:self-end pb-20">
                <div className="flex flex-col gap-y-2 md:gap-y-4">
                    <div className="flex items-center gap-x-3">
                        <div className="bg-[#A1C249] w-4 h-8" />
                        <p className="text-[1.125rem] font-medium text-[#1A1A1A]">Blog</p>
                    </div>
                    <h3 className="font-medium text-[25px] md:text-4xl leading-6 text-[#1A1A1A]">Our Story</h3>
                </div>
                <div className="flex flex-col gap-y-3 md:gap-y-8 md:w-3/4">
                    <p className="md:text-[1.25rem] font-normal font-space text-[#A1A1A1] md:leading-6">
                        Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. Exclusive offers a wide range of product categories including fashion, beauty, electronics, home appliances and groceries.
                    </p>
                    <p className="md:text-[1.25rem] font-normal text-[#A1A1A1] md:leading-6">
                        Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.
                    </p>
                </div>
            </div>
            <div className="flex items-start md:w-1/2 -mt-36">
                <img src={BlogFamily} alt="Blog Family" className='w-auto object-contain ' /> 
            </div>
        </div>
    </section>
  )
}

export default BlogStory
