
import React, { useEffect, useState } from "react"
import productData from "@/data/productData"
import ProductCard from "@/modules/home/components/ProductCard"
import { useNavigate } from "react-router-dom"

import ProductCarousel from "@/modules/home/components/ui/Carousel" // ⬅️ new carousel component
import chevLeft from "@/assets/icons/chevronLeft.svg"
import chevRight from "@/assets/icons/chevronRight.svg"

const FlashSales = () => {
  const navigate = useNavigate()

  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 22,
    minutes: 14,
    seconds: 58,
  })

  // 🔥 FILTER FLASH SALE PRODUCTS ONLY
  const flashSaleProducts = productData.filter(
    (item) => item.flashSale === true
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) seconds--
        else {
          seconds = 59
          if (minutes > 0) minutes--
          else {
            minutes = 59
            if (hours > 0) hours--
            else {
              hours = 23
              if (days > 0) days--
              else return prev
            }
          }
        }
        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-[#F8F8F8] py-10 lg:py-16">
      <div className="w-[90%] m-auto flex flex-col gap-y-6">
        {/* Header: label, title, and countdown */}
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-x-3">
            <div className="bg-[#A1C249] w-4 h-8"></div>
            <p className="text-[1.1rem] md:text-[1.25rem] font-medium text-[#1A1A1A]">
              Today&apos;s deals
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-y-3 gap-x-20">
            <div className="flex flex-col md:flex-row gap-y-4 items-start gap-x-10">
              <h3 className="font-medium leading-[100%] text-3xl lg:text-5xl md:leading-6 text-[#1A1A1A]">
                Flash Sales
              </h3>

              <div className="flex justify-between md:justify-normal gap-3 md:gap-6 items-center mt-3 md:mt-0">
                {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
                  const value = [
                    timeLeft.days,
                    timeLeft.hours,
                    timeLeft.minutes,
                    timeLeft.seconds,
                  ][i]

                  return (
                    <React.Fragment key={label}>
                      <div className="text-center">
                        <p className="text-black text-[1rem] md:text-[1.1rem] lg:text-[1.25rem]">
                          {label}
                        </p>
                        <p className="text-[1.7rem] lg:text-[2.5rem] font-bold">
                          {String(value).padStart(2, "0")}
                        </p>
                      </div>
                      {i < 3 && (
                        <div className="text-3xl font-bold text-[#A1C249] pt-6">
                          :
                        </div>
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel section: buttons above, handled inside ProductCarousel */}
        <ProductCarousel
          items={flashSaleProducts}
          chevLeft={chevLeft}
          chevRight={chevRight}
          // no title here so only chevrons show above the row of cards
          renderItem={(product) => <ProductCard product={product} />}
        />

        {/* View all button */}
        <div className="flex justify-center lg:mt-4">
          <button
            onClick={() => navigate("/shop")}
            className="bg-[#A1C249] px-18 py-3 rounded-[1.875rem] text-white font-bold leading-7"
          >
            View all Products
          </button>
        </div>
      </div>
    </div>
  )
}

export default FlashSales
