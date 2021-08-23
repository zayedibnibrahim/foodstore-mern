import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { couponApply } from '../../actions/cartActions'
import Message from '../Message'
import Loader from '../Loader'

const ApplyCoupon = ({ errorApplyCoupon, loadingApplyCoupon }) => {
  const [applyCoupon, setApplyCoupon] = useState('')
  const dispatch = useDispatch()
  const applyCouponHandler = (e) => {
    e.preventDefault()
    dispatch(couponApply(applyCoupon))
  }
  return (
    <>
      {errorApplyCoupon && (
        <Message variant='danger'>{errorApplyCoupon}</Message>
      )}
      <Form onSubmit={applyCouponHandler} className='my-5'>
        <Form.Group controlId='name'>
          <Form.Label>Coupon</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Coupon'
            value={applyCoupon}
            onChange={(e) => setApplyCoupon(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type='submit'
          variant='primary'
          className='my-3'
          disabled={loadingApplyCoupon}
        >
          Apply Coupon
          {loadingApplyCoupon && <Loader size='size-sm' />}
        </Button>
      </Form>
    </>
  )
}

export default ApplyCoupon
