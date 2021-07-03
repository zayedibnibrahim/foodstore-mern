import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { auth } from '../firebase'
import Message from '../components/Message'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const RegisterScreen = ({ history }) => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn
  useEffect(() => {
    if (userInfo && userInfo.token) {
      history.push('/')
    }
  }, [history, userInfo])

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
    </FormContainer>
  )
}

export default RegisterScreen
