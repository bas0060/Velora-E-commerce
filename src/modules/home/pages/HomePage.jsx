import React, { Suspense, lazy } from 'react'
import Hero from '@/modules/home/components/Hero'
import DownloadApp from '@/modules/home/components/DownloadApp'
import Specification from '@/modules/home/components/Specification'
import { ComponentLoadingFallback } from '@/components/Loading'

const FlashSales = lazy(() => import('@/modules/home/components/FlashSales'))
const Categories = lazy(() => import('@/modules/home/components/Categories'))
const NewArrival = lazy(() => import('@/modules/home/components/NewArrival'))
// import LatestOffers from '@/modules/home/components/LatestOffers'

const HomePage = () => {
  return (
    <>
      <Hero />
      <Suspense fallback={<ComponentLoadingFallback />}>
        <FlashSales />
      </Suspense>
      <Suspense fallback={<ComponentLoadingFallback />}>
        <Categories />
      </Suspense>
      <Suspense fallback={<ComponentLoadingFallback />}>
        <NewArrival />
      </Suspense>
      <DownloadApp />
      <Specification />
    </>
  )
}

export default HomePage
