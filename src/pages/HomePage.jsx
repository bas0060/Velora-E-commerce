import React from 'react'
import Hero from '../component/Hero'
import Categories from '../component/Categories'
import FlashSales from '../component/FlashSales'
import NewArrival from '../component/NewArrival'
import DownloadApp from '../component/DownloadApp'
import Specification from '../component/Specification'
// import LatestOffers from '../component/LatestOffers'


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
