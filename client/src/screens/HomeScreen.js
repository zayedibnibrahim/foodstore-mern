import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CategoryCarousalHome from '../components/CategoryCarousalHome'
import ProductByCategory from '../components/ProductByCategory'

import { useAlert } from 'react-alert'
import { ADD_TO_WISHLIST_RESET } from '../constants/userConstants'
import Meta from '../components/Meta'
const HomeScreen = () => {
  const alert = useAlert()
  const [catSlug, setCatSlug] = useState('appetizer')
  const dispatch = useDispatch()

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const wish = useSelector((state) => state.wish)
  const { loadingAdd, successAdd } = wish

  useEffect(() => {
    if (successAdd) {
      alert.success('Product Added To Wishlist ')
      dispatch({ type: ADD_TO_WISHLIST_RESET })
    }
  }, [successAdd, alert, dispatch])
  return (
    <div>
      <Meta title='Food Store | Home' />
      <CategoryCarousalHome setCatSlug={setCatSlug} />
      <ProductByCategory
        catSlug={catSlug}
        userInfo={userInfo}
        loadingAdd={loadingAdd}
      />
    </div>
  )
}

export default HomeScreen
