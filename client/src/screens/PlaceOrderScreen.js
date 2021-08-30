import React, { useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import StripeCheckoutForm from '../components/form/StripeCheckoutForm'
import { useSelector } from 'react-redux'
import Meta from '../components/Meta'

const promise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY)
const PlaceOrderScreen = ({ history }) => {
  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const cartList = useSelector((state) => state.cartList)
  const { cartItems } = cartList

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (cartItems === null) {
      history.push('/login')
    }
  }, [history, userInfo, cartItems])

  return (
    <Elements stripe={promise}>
      <Meta title='Food Store | Place Order' />
      <StripeCheckoutForm userInfo={userInfo} cartItems={cartItems} />
    </Elements>
  )
}

export default PlaceOrderScreen
