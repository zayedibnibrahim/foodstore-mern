import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CategoryCarousalHome from '../components/CategoryCarousalHome'
import ProductByCategory from '../components/ProductByCategory'
import { DETAILS_PRODUCT_RESET } from '../constants/productConstants'
const HomeScreen = () => {
  const [catSlug, setCatSlug] = useState('appetizer')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: DETAILS_PRODUCT_RESET })
  }, [dispatch])
  return (
    <div>
      <CategoryCarousalHome setCatSlug={setCatSlug} />
      <ProductByCategory catSlug={catSlug} />
    </div>
  )
}

export default HomeScreen
