import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MultiSelect from 'react-multi-select-component'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { listCategory } from '../../actions/categoryActions'
import { listAddon } from '../../actions/addonActions'
import ImageUploader from '../../components/form/ImageUploader'
import { useAlert } from 'react-alert'
import { createProduct } from '../../actions/productActions'
import {
  CREATE_PRODUCT_RESET,
  UPLOAD_IMAGE_RESET,
} from '../../constants/productConstants'
import { listVariable } from '../../actions/variableActions'
const ProductCreateScreen = ({ history }) => {
  const alert = useAlert()
  const [title, setTitle] = useState('')
  const [productType, setProductType] = useState('simple')
  const [price, setPrice] = useState('')
  const [variable, setVariable] = useState()
  const [image, setImage] = useState({})
  const [category, setCategory] = useState('')
  const [selectedAddon, setSelectedAddon] = useState([])
  // const [addon, setAddon] = useState([])
  const [sold, setSold] = useState(0)
  const [description, setDescription] = useState('')
  const [delivery, setDelivery] = useState('')
  const [availability, setAvailability] = useState('')

  const dispatch = useDispatch()
  //check logged in user
  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const productCreate = useSelector((state) => state.productCreate)
  const { loading, success, error } = productCreate

  //showCategory list
  const categoryList = useSelector((state) => state.categoryList)
  const { categories, error: errorCategory } = categoryList

  //showAddon list
  const addonList = useSelector((state) => state.addonList)
  const { addons, error: errorAddon } = addonList

  const variableList = useSelector((state) => state.variableList)
  const { variables } = variableList

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch(listCategory())
      dispatch(listAddon())
      dispatch(listVariable())
      if (success) {
        alert.success('Product Created')
        setTitle('')
        setPrice('')
        setVariable()
        setProductType('simple')
        setImage({})
        setCategory('')
        setSelectedAddon([])
        setSold(0)
        setDescription('')
        setDelivery('')
        setAvailability('')
        dispatch({ type: UPLOAD_IMAGE_RESET })
        dispatch({ type: CREATE_PRODUCT_RESET })
      }
    } else {
      history.push('/')
    }
  }, [dispatch, success, alert, userInfo, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProduct({
        image,
        title,
        price,
        variable,
        category,
        addon: selectedAddon.map((a) => a.value),
        sold,
        description,
        delivery,
        availability,
      })
    )
  }
  return (
    <>
      <Link to='/admin/products' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Add Product</h1>
        {errorCategory && <Message variant='danger'>{errorCategory}</Message>}
        {errorAddon && <Message variant='danger'>{errorAddon}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='image' className='mt-1'>
            <ImageUploader setImage={setImage} image={image} />
          </Form.Group>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='productType'>
            <Form.Label>Product Type</Form.Label>
            <Form.Control
              onChange={(e) => setProductType(e.target.value)}
              as='select'
              value={productType}
            >
              <option value='simple'>Simple Product</option>
              <option value='variable'>Variable Product</option>
            </Form.Control>
          </Form.Group>
          {productType === 'simple' ? (
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
          ) : (
            <Form.Group controlId='variable'>
              <Form.Label>Variable</Form.Label>
              <Form.Control
                as='select'
                value={variable}
                onChange={(e) => setVariable(e.target.value)}
              >
                <option>Select Variable</option>
                {variables &&
                  variables.map((v) => (
                    <option key={v._id} value={v._id}>
                      {v.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
          )}

          <Form.Group controlId='category'>
            <Form.Label className='Font'>Category</Form.Label>
            <Form.Control
              onChange={(e) => setCategory(e.target.value)}
              as='select'
              required
              value={category}
            >
              <option>Select Category</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='addon'>
            <Form.Label>Addon</Form.Label>
            <MultiSelect
              options={addons.map((a) => ({
                label: a.name,
                value: a._id,
              }))}
              value={selectedAddon}
              onChange={setSelectedAddon}
              labelledBy='Select Addon'
              className='product-addons'
            />
          </Form.Group>
          <Form.Group controlId='sold'>
            <Form.Label>Sold</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter Sold'
              value={sold}
              required
              onChange={(e) => setSold(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Enter Description'
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='delivery'>
            <Form.Label>Delivery</Form.Label>
            <Form.Control
              onChange={(e) => setDelivery(e.target.value)}
              as='select'
              value={delivery}
              required
            >
              <option>Select Delivery</option>
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='availability'>
            <Form.Label>Availability</Form.Label>
            <Form.Control
              onChange={(e) => setAvailability(e.target.value)}
              as='select'
              value={availability}
              required
            >
              <option>Select Availability</option>
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </Form.Control>
          </Form.Group>
          <Row>
            <Col md={6}>
              <Button
                type='submit'
                variant='primary'
                className='my-5'
                disabled={loading}
              >
                Create
              </Button>
            </Col>
            <Col md={6}>{loading && <Loader size='size-sm' />}</Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  )
}

export default ProductCreateScreen
