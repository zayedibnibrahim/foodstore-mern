import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button } from 'react-bootstrap'
import { auth } from '../firebase'
import Message from '../components/Message'

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    const config = {
      url: process.env.REACT_APP_REGISTRATION_URL_REDIRECT,
      handleCodeInApp: true,
    }

    await auth.sendSignInLinkToEmail(email, config)

    window.localStorage.setItem('emailForSignIn', email)

    setMessage(`Email sent to ${email}, Please Check your mail`)

    setEmail('')
  }

  return (
    <FormContainer>
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
        <Button type='submit' variant='outline-primary' className='my-3'>
          Register
        </Button>
      </Form>
      {message && <Message variant='primary'>{message}</Message>}
    </FormContainer>
  )
}

export default RegisterScreen
