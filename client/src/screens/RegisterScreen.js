import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { auth } from '../firebase'
import Message from '../components/Message'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta'

const RegisterScreen = ({ history, location }) => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo, error } = userLogIn
  const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const config = {
        url: process.env.REACT_APP_REGISTRATION_URL_REDIRECT,
        handleCodeInApp: true,
      }

      await auth.sendSignInLinkToEmail(email, config)
      window.localStorage.setItem('emailForSignIn', email)
      setMessage(`Email sent to ${email}, Please Check your mail`)
      setEmail('')
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <FormContainer>
      <Meta title='Food Store | Sign Up' />
      <h1>Sign Up</h1>
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
      <Row className='py-3'>
        <Col>
          Already have An Account? <Link to='/login'>Log In</Link>
        </Col>
      </Row>
      {message && <Message variant='primary'>{message}</Message>}
      {error && <Message variant='danger'>{message}</Message>}
    </FormContainer>
  )
}

export default RegisterScreen
