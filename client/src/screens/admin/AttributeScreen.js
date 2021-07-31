import React, { useEffect, useState } from 'react'
import FormContainer from '../../components/FormContainer'
import { Form, Button, Row, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LinkContainer } from 'react-router-bootstrap'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  createAttribute,
  deleteAttribute,
  listAttribute,
} from '../../actions/attributeActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import ItemSearch from '../../components/ItemSearch'
const AttributeScreen = ({ history }) => {
  const [attribute, setAttribute] = useState('')
  const [price, setPrice] = useState('')
  const [product, setProduct] = useState('')

  const [keyword, setKeyword] = useState('')

  //check logged in user
  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  //showAttribute list
  const attributeList = useSelector((state) => state.attributeList)
  const {
    loading: loadingAttribute,
    attributes,
    error: errorAttribute,
  } = attributeList

  const dispatch = useDispatch()

  //delete attribute
  const attributeDelete = useSelector((state) => state.attributeDelete)
  const { success: successDelete } = attributeDelete

  //create attribute
  const attributeCreate = useSelector((state) => state.attributeCreate)
  const { loading, success, error } = attributeCreate

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createAttribute(attribute, price, product))
    setAttribute('')
    setPrice('')
    setProduct('')
  }
  const searched = (keyword) => (attribute) =>
    attribute.product.toLowerCase().includes(keyword)

  const deleteHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteAttribute(id))
    }
  }

  useEffect(() => {
    if (userInfo && userInfo.role !== 'admin') {
      history.push('/')
    }
    dispatch(listAttribute())
  }, [dispatch, userInfo, history, success, successDelete])

  return (
    <>
      <FormContainer>
        {success && <Message variant='success'>Attribute Added</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={submitHandler} className='my-5'>
          <Form.Group controlId='attribute'>
            <Form.Label>Create Attribute</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter attribute'
              value={attribute}
              onChange={(e) => setAttribute(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
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
            Create {loading && <Loader size='size-sm' />}
          </Button>
        </Form>
      </FormContainer>
      <Row>
        {loadingAttribute ? (
          <Loader />
        ) : errorAttribute ? (
          <Message variant='danger'>{errorAttribute}</Message>
        ) : (
          <>
            <ItemSearch setKeyword={setKeyword} keyword={keyword} />
            <Table
              striped
              bordered
              hover
              responsive
              className='table-sm'
              variant='dark'
            >
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>PRODUCT</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {attributes.filter(searched(keyword)).map((attribute) => (
                  <tr key={attribute._id}>
                    <td>{attribute.name}</td>
                    <td>${attribute.price}</td>
                    <td>{attribute.product}</td>
                    <td>
                      <LinkContainer
                        to={`/admin/attribute/${attribute._id}/edit`}
                      >
                        <Button variant='dark' className='btn-sm'>
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(attribute._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Row>
    </>
  )
}

export default AttributeScreen
