import React, { useState } from 'react'
import ShopCategory from '../component/ShopCategory'
import FlashSales from '../component/FlashSales'
import ShopNewArrival from '../component/ShopNewArrival'
import productData from '../data/productData'
import DownloadApp from '../component/DownloadApp'


const Shop = () => {
  const [selected, setSelected] = useState('All')

  const filteredProducts =
    selected === 'All'
      ? productData
      : productData.filter((p) => p.category.trim() === selected)

  return (
    <div>
      <ShopCategory selected={selected} setSelected={setSelected} />
      <ShopNewArrival selected={selected} products={filteredProducts} />
      <FlashSales />
      <DownloadApp />
    </div>
  )
}

export default Shop
