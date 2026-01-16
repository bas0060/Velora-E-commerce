import React from 'react'
import delivery from '../assets/icons/delivery.svg'
import headphone from '../assets/icons/headphone.svg'
import guarantee from '../assets/icons/guarantee.svg'

const Specification = () => {
  return (
    <section className='bg-[#F8F8F8] pb-18'>
      <div className="md:w-[95%] lg:w-[70%] gap-y-6 m-auto grid grid-cols-1 md:grid-cols-3 items-center justify-between">
        <div className="flex flex-col items-center text-center gap-y-5">
            <img src={delivery} alt="deliveryIcon" className="w-24 h-24" />
            <div className="flex flex-col">
                <p className="font-semibold text-[1.25rem]">FREE AND FAST DELIVERY</p>
                <p className="text-[.875rem]">Free delivery for all orders over $140</p>
            </div>
        </div>
        <div className="flex flex-col items-center text-center gap-y-5">
            <img src={headphone} alt="deliveryIcon" className="w-24 h-24" />
            <div className="flex flex-col">
                <p className="font-semibold text-[1.25rem]">24/7 CUSTOMER SERVICE</p>
                <p className="text-[.875rem]">Friendly 24/7 customer support</p>
            </div>
        </div>
        <div className="flex flex-col items-center text-center gap-y-5">
            <img src={guarantee} alt="deliveryIcon" className="w-24 h-24" />
            <div className="flex flex-col">
                <p className="font-semibold text-[1.25rem]">MONEY BACK GUARANTEE</p>
                <p className="text-[.875rem]">We reurn money within 30 days</p>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Specification
