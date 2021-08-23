import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import StripeCheckoutForm from '../components/form/StripeCheckoutForm'

const promise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY)
const PlaceOrderScreen = () => {
  return (
    <Elements stripe={promise}>
      <StripeCheckoutForm />
    </Elements>
  )
}

export default PlaceOrderScreen
