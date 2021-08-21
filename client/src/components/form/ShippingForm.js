import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { currentUser, saveShippingAddress } from '../../actions/userActions'

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from '../../constants/userConstants'
import { auth } from '../../firebase'

const ShippingForm = () => {
  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const dispatch = useDispatch()

  const [address, setAddress] = useState(
    userInfo.shipping ? userInfo.shipping.address : ''
  )
  const [city, setCity] = useState(
    userInfo.shipping ? userInfo.shipping.city : ''
  )
  const [postcode, setPostCode] = useState(
    userInfo.shipping ? userInfo.shipping.postcode : ''
  )
  const [country, setCountry] = useState(
    userInfo.shipping ? userInfo.shipping.country : ''
  )

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postcode, country }))

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({ type: USER_LOGIN_REQUEST })
            dispatch({
              type: USER_LOGIN_SUCCESS,
              payload: {
                name: res.name,
                email: res.email,
                token: idTokenResult.token,
                role: res.role,
                _id: res._id,
                shipping: res.shipping,
              },
            })
          })
          .catch((err) => {
            dispatch({ type: USER_LOGIN_FAIL, payload: err })
          })
      }
    })
    // cleanup
    return () => unsubscribe()
  }
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId='address'>
        <Form.Label>Address</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter address'
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId='city'>
        <Form.Label>City</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter city'
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId='postalCode'>
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter postal code'
          value={postcode}
          required
          onChange={(e) => setPostCode(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId='country'>
        <Form.Label>Country</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter country'
          value={country}
          required
          onChange={(e) => setCountry(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Button type='submit' variant='dark' className='my-3'>
        Update
      </Button>
    </Form>
  )
}

export default ShippingForm
