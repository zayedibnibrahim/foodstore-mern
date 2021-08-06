import React, { useState } from 'react'
import CategoryCarousalHome from '../components/CategoryCarousalHome'
import ProductByCategory from '../components/ProductByCategory'
const HomeScreen = () => {
  const [catId, setCatId] = useState('60eec354a9c59a2bace98fab')
  return (
    <div>
      <CategoryCarousalHome setCatId={setCatId} />
      <ProductByCategory catId={catId} />
    </div>
  )
}

export default HomeScreen
