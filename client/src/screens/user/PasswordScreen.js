import React, { useEffect, useState } from 'react'
import FormContainer from '../../components/FormContainer'
import { Form, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import { auth } from '../../firebase'
import { useSelector } from 'react-redux'
import Meta from '../../components/Meta'
const Password = ({ history }) => {
  const [password, setPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [history, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setSuccessMessage('')
      const user = auth.currentUser
      await user.updatePassword(password)
      setSuccessMessage('Password Updated')
      setPassword('')
      setErrorMessage('')
    } catch (error) {
      setErrorMessage(error.message)
      setSuccessMessage('')
    }
  }
  return (
    <FormContainer>
      <Meta title='Food Store | Reset Password' />
      <h1>Enter New Password</h1>
      {successMessage && <Message variant='success'>{successMessage}</Message>}
      {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Enter New Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <p>{password}</p>
        </Form.Group>
        <Button
          type='submit'
          variant='outline-primary'
          className='my-3'
          disabled={!password}
        >
          Submit
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Password
