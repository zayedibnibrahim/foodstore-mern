import React, { useState } from 'react'
import CategoryCarousalHome from '../components/CategoryCarousalHome'
import ProductByCategory from '../components/ProductByCategory'
const HomeScreen = () => {
  const [catSlug, setCatSlug] = useState('appetizer')
  return (
    <div>
      <CategoryCarousalHome setCatSlug={setCatSlug} />
      <ProductByCategory catSlug={catSlug} />
    </div>
  )
}

export default HomeScreen
