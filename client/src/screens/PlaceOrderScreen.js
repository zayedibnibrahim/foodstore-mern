import React, { useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import StripeCheckoutForm from '../components/form/StripeCheckoutForm'
import { useDispatch, useSelector } from 'react-redux'

const promise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY)
const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

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
      <StripeCheckoutForm userInfo={userInfo} cartItems={cartItems} />
    </Elements>
  )
}

export default PlaceOrderScreen
