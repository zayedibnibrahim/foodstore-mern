import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import { auth } from '../firebase'
import { useSelector } from 'react-redux'
import Meta from '../components/Meta'

const RegisterCompleteScreen = ({ history, location }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo, error } = userLogIn
  const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForSignIn'))
  }, [history])

  const submitHandler = async (e) => {
    e.preventDefault()

    if (password === confirmPassword) {
      if (password.length >= 6) {
        try {
          setMessage('')
          const result = await auth.signInWithEmailLink(
            email,
            window.location.href
          )
          if (result.user.emailVerified) {
            //Remove email from localhost
            window.localStorage.removeItem('emailForSignIn')

            //Update user Info
            const user = auth.currentUser
            await user.updatePassword(password)
            await user.updateProfile({
              displayName: name,
            })
            await auth.signOut()
            history.push('/login')
          }
        } catch (error) {
          setMessage(error.message)
        }
      } else {
        setMessage('password must be 6 digit long')
      }
    } else {
      setMessage("Password Doesn't match")
    }
  }

  return (
    <FormContainer>
      <Meta title='Food Store | Register Complete' />
      <h3>complete Register</h3>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            defaultValue={email}
            disabled
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            value={confirmPassword}
            placeholder='Confirm password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='outline-primary' className='my-3'>
          complete Register
        </Button>
      </Form>
    </FormContainer>
  )
}

export default RegisterCompleteScreen
