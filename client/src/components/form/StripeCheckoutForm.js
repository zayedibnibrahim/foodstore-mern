import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import FormContainer from '../FormContainer'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { createOrder } from '../../actions/orderActions'
import Message from '../Message'
import { CART_LIST_RESET } from '../../constants/cartConstants'
import { userDbCartDelete } from '../../actions/cartActions'
import { useAlert } from 'react-alert'

const StripeCheckoutForm = ({ cartItems, userInfo }) => {
  const alert = useAlert()
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)

  const dispatch = useDispatch()
  const history = useHistory()

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, loading, error: errorCreateOrder } = orderCreate

  useEffect(() => {
    if (success) {
      dispatch({ type: CART_LIST_RESET })
      dispatch(userDbCartDelete())
      alert.success('Order Placed ')
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [success, history])

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
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/create-payment-intent`,
      {},
      config
    )

    const payload = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: userInfo.name,
          email: userInfo.email,
        },
      },
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      if (payload.paymentIntent.status === 'succeeded') {
        dispatch(createOrder(payload.paymentIntent, 'Stripe'))
        setError(null)
        setProcessing(false)
        setSucceeded(true)
      }
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
      <div>
        <h4>Order Summary:</h4>
        <Card>
          {errorCreateOrder && (
            <Message variant='danger'>{errorCreateOrder}</Message>
          )}
          <ListGroup>
            {cartItems &&
              cartItems.products.map((pd, index) => (
                <ListGroup.Item key={pd._id}>
                  <Row className='d-flex flex-column'>
                    <Col>
                      <Row className='d-flex flex-row'>
                        <Col md={9}>
                          <span style={{ fontWeight: '900' }}>
                            {index + 1}){' '}
                          </span>
                          <span style={{ fontWeight: '600' }}>
                            {pd.product.title} x {pd.quantity}
                          </span>
                        </Col>
                        <Col md={3}>
                          <span style={{ fontWeight: '600' }}>
                            = ${pd.quantity * pd.price}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                    {pd.variableData && (
                      <Col>
                        <span style={{ fontSize: '14px' }}>Type:</span>{' '}
                        <Badge
                          style={{
                            backgroundColor: '#b33939',
                            marginLeft: '2px',
                          }}
                        >
                          {pd.variableData.name}
                        </Badge>
                      </Col>
                    )}
                    {pd.addon && (
                      <Col>
                        <span style={{ fontSize: '14px' }}>Addons:</span>{' '}
                        {pd.addon.map((adn) => (
                          <Badge
                            key={adn._id}
                            style={{
                              backgroundColor: '#FFC107',
                              marginLeft: '2px',
                            }}
                          >
                            {adn.name.split('-')[0]}
                          </Badge>
                        ))}
                      </Col>
                    )}
                  </Row>
                </ListGroup.Item>
              ))}
          </ListGroup>
          <ListGroup>
            <ListGroup.Item>
              {cartItems && cartItems.couponApplied === false ? (
                <Row>
                  <Col>
                    <h6 className='fw-bold'>
                      Total: ${cartItems && cartItems.cartTotal}
                    </h6>
                  </Col>
                  <Col
                    style={{ padding: '8px 5px', backgroundColor: '#dff9fb' }}
                  >
                    <h6 className='fw-bold'>
                      Total Payable: ${cartItems && cartItems.cartTotal}
                    </h6>
                  </Col>
                </Row>
              ) : (
                <Row className='d-flex flex-column'>
                  <Col
                    style={{ backgroundColor: '#273c75', padding: '8px 5px' }}
                  >
                    <h6 className='fw-800 m-0 text-white'>
                      Price After Discount: $
                      {cartItems && cartItems.totalAfterDiscount}
                    </h6>
                  </Col>
                  <Col
                    style={{ padding: '8px 5px', backgroundColor: '#dff9fb' }}
                  >
                    <h6 className='fw-bold m-0'>
                      Total Payable: $
                      {cartItems && cartItems.totalAfterDiscount}
                    </h6>
                  </Col>
                </Row>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
      {cartItems && (
        <form
          id='payment-form'
          className='stripe-form my-4'
          onSubmit={handleSubmit}
        >
          <CardElement
            id='card-element'
            options={cartStyle}
            onChange={handleChange}
          />
          <button
            className='stripe-button'
            disabled={processing || disabled || succeeded || loading}
          >
            <span id='button-text'>
              {processing ? (
                <div className='spinner' id='spinner'></div>
              ) : (
                'Pay'
              )}
            </span>
          </button>
          <br />
          {error && (
            <div className='card-error' role='alert'>
              {error}
            </div>
          )}
          <p className={succeeded ? 'result-message' : 'result-message hidden'}>
            Payment Successful.{' '}
            <Link to='/user/history'>See it in your purchase history.</Link>
          </p>
        </form>
      )}
    </FormContainer>
  )
}

export default StripeCheckoutForm
