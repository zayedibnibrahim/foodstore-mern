import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import FormContainer from '../FormContainer'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
const StripeCheckoutForm = () => {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post('/api/create-payment-intent', {}, config)

    const payload = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: userInfo.name,
          email: userInfo.email,
          phone: '01776488104',
        },
      },
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      console.log(JSON.stringify(payload, null, 4))
      setError(null)
      setProcessing(false)
      setSucceeded(true)
    }
  }
  const handleChange = async (e) => {
    setDisabled(e.empty)
    setError(e.error ? e.error.message : '')
  }

  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  }
  return (
    <FormContainer>
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment Successful.{' '}
        <Link to='/user/history'>See it in your purchase history.</Link>
      </p>

      <form id='payment-form' className='stripe-form' onSubmit={handleSubmit}>
        <CardElement
          id='card-element'
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className='stripe-button'
          disabled={processing || disabled || succeeded}
        >
          <span id='button-text'>
            {processing ? <div className='spinner' id='spinner'></div> : 'Pay'}
          </span>
        </button>
        <br />
        {error && (
          <div className='card-error' role='alert'>
            {error}
          </div>
        )}
      </form>
    </FormContainer>
  )
}

export default StripeCheckoutForm
