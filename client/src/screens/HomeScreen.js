import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
const HomeScreen = () => {
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default HomeScreen
