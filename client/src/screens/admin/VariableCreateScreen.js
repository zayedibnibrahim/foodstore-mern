import React, { useEffect, useState } from 'react'
import FormContainer from '../../components/FormContainer'
import { Form, Button, Row, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LinkContainer } from 'react-router-bootstrap'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

const VariableCreateScreen = ({ history }) => {
  const [label, setLabel] = useState('')
  const [meta, setMeta] = useState('')
  const dispatch = useDispatch()
  //check logged in user
  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn
  useEffect(() => {
    if (userInfo && userInfo.role !== 'admin') {
      history.push('/')
    }
  }, [userInfo, history])
  const submitHandler = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <FormContainer>
        <Form onSubmit={submitHandler} className='my-5'>
          <Form.Group controlId='label'>
            <Form.Label>Label</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Label'
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='meta'>
            <Form.Label>Label</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Meta'
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='my-3'>
            Create
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default VariableCreateScreen
