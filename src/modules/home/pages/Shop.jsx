import React, { useState } from 'react'
import ShopCategory from '@/modules/home/components/ShopCategory'
import FlashSales from '@/modules/home/components/FlashSales'
import DownloadApp from '@/modules/home/components/DownloadApp'


const Shop = () => {
  const [selected, setSelected] = useState('All')

  return (
    <div>
      <ShopCategory selected={selected} setSelected={setSelected} />
      <FlashSales />
      <DownloadApp />
    </div>
  )
}

export default Shop
