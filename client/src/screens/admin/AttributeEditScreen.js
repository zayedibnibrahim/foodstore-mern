import React, { useEffect, useState } from 'react'
import FormContainer from '../../components/FormContainer'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import {
  detailsAttribute,
  updateAttribute,
} from '../../actions/attributeActions'
import {
  ATTRIBUTE_DETAILS_RESET,
  ATTRIBUTE_UPDATE_RESET,
} from '../../constants/attributeConstants'
const AttributeEditScreen = ({ history, match }) => {
  const attributeId = match.params.id
  const [attribute, setAttribute] = useState('')
  const [price, setPrice] = useState('')
  const [product, setProduct] = useState('')

  const dispatch = useDispatch()

  //check logged in user

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const attributeDetails = useSelector((state) => state.attributeDetails)
  const { attributeData, loading, error } = attributeDetails

  const attributeUpdate = useSelector((state) => state.attributeUpdate)
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = attributeUpdate

  useEffect(() => {
    if (userInfo && userInfo.role !== 'admin') {
      history.push('/')
    }

    if (successUpdate) {
      dispatch({ type: ATTRIBUTE_UPDATE_RESET })
      dispatch({ type: ATTRIBUTE_DETAILS_RESET })
      history.push('/admin/attribute')
    } else {
      if (!attributeData.name || attributeData._id !== attributeId) {
        dispatch(detailsAttribute(attributeId))
      } else {
        setAttribute(attributeData.name)
        setPrice(attributeData.price)
        setProduct(attributeData.product)
      }
    }
  }, [dispatch, history, attributeId, attributeData, successUpdate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(updateAttribute(attribute, price, product, attributeId))
  }

  return (
    <>
      <Link to='/admin/attribute' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        {successUpdate && (
          <Message variant='success'>Attribute Updated</Message>
        )}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={submitHandler} className='my-5'>
          <Form.Group controlId='Update attribute'>
            <Form.Label>Create Attribute</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter attribute'
              value={attribute}
              onChange={(e) => setAttribute(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='price'>
            <Form.Label>Price($)</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price($)'
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='product'>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Product Name'
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            type='submit'
            variant='primary'
            className='my-3'
            disabled={loading}
          >
            Update {loadingUpdate && <Loader size='size-sm' />}
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default AttributeEditScreen
