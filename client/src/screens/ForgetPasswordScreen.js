import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import { auth } from '../firebase'
import { useSelector } from 'react-redux'
import Meta from '../components/Meta'

const ForgetPasswordScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn
  const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setMessage('')
      const config = {
        url: process.env.REACT_APP_FORGOT_PASSWORD_URL_REDIRECT,
        handleCodeInApp: true,
      }
      await auth.sendPasswordResetEmail(email, config)
      setMessage('Check Your Email To Reset Password')
    } catch (error) {
      setMessage(error.message)
    }
  }
  return (
    <FormContainer>
      <Meta title='Food Store | Forgot Password' />
      <h1>Forgot Password</h1>
      {message && <Message variant='primary'>{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            required
          ></Form.Control>
        </Form.Group>
        <Button
          type='submit'
          variant='outline-primary'
          className='my-3'
          disabled={!email}
        >
          Submit
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ForgetPasswordScreen
