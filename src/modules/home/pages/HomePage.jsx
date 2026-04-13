import React from 'react'
import Hero from '@/modules/home/components/Hero'
import Categories from '@/modules/home/components/Categories'
import FlashSales from '@/modules/home/components/FlashSales'
import NewArrival from '@/modules/home/components/NewArrival'
import DownloadApp from '@/modules/home/components/DownloadApp'
import Specification from '@/modules/home/components/Specification'
// import LatestOffers from '@/modules/home/components/LatestOffers'


const HomePage = () => {
  return (
    <>
      <Hero/>
      <FlashSales/>
      <Categories/>
      <NewArrival />
      <DownloadApp/>
      <Specification/>
    </>
  )
}

export default HomePage
