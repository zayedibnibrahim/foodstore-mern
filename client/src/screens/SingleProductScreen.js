import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MultiSelect from 'react-multi-select-component'
import { detailsProduct } from '../actions/productActions'
import { Image, Row, Col, ListGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import Message from '../components/Message'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCartPlus,
  faHeart,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { addToCart } from '../actions/cartActions'
import { addToWish } from '../actions/userActions'
import { useAlert } from 'react-alert'
import { ADD_TO_WISHLIST_RESET } from '../constants/userConstants'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

const SingleProductScreen = ({ match, history }) => {
  const productSlug = match.params.slug
  const alert = useAlert()
  const [counter, setCounter] = useState(1)
  const [variable, setVariable] = useState('')
  const [addon, setAddon] = useState([])
  const dispatch = useDispatch()

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const productDetails = useSelector((state) => state.productDetails)
  const {
    loading: loadingDetails,
    product,
    error: errorDetails,
  } = productDetails

  const wish = useSelector((state) => state.wish)
  const { loadingAdd, successAdd } = wish

  useEffect(() => {
    dispatch(detailsProduct(productSlug))
  }, [dispatch, productSlug])

  useEffect(() => {
    if (successAdd) {
      alert.success('Product Added To Wishlist ')
      dispatch({ type: ADD_TO_WISHLIST_RESET })
    }
  }, [successAdd, alert, dispatch])

  const handleAddToCart = () => {
    dispatch(
      addToCart(
        productSlug,
        counter,
        variable,
        addon.length < 1 ? null : addon.map((adn) => adn.value)
      )
    )
    history.push('/cart')
  }
  return (
    <div
      style={{
        backgroundColor: '#FFC94F',
        padding: '50px',
        borderRadius: '35px',
      }}
      className='single__product__container'
    >
      <Meta title={`${product?.title} | Food Store`} />
      <Link to='/' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <Row>
        {errorDetails && <Message variant='alert'>{errorDetails}</Message>}
        <Col
          sm={12}
          md={6}
          style={{ position: 'relative' }}
          className='d-flex justify-content-start align-items-start'
        >
          {loadingDetails ? (
            <Skeleton height={400} count={1} />
          ) : (
            <>
              <Image
                src={product.image && product.image.url}
                alt={product.title}
                className='w-75'
              ></Image>
              {userInfo && (
                <Button
                  variant='secondary'
                  onClick={() => dispatch(addToWish(product._id))}
                  style={{ position: 'absolute', top: '10px', left: '15px' }}
                >
                  {loadingAdd ? (
                    <Loader className='size-sm' />
                  ) : (
                    <FontAwesomeIcon icon={faHeart} />
                  )}
                </Button>
              )}
            </>
          )}
        </Col>
        <Col sm={12} md={6}>
          {loadingDetails ? (
            <Skeleton height={50} count={4} />
          ) : (
            <>
              <ListGroup>
                <ListGroup.Item style={{ backgroundColor: 'transparent' }}>
                  <h2 style={{ color: '#000000', fontWeight: '600' }}>
                    {product.title}
                  </h2>
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: 'transparent' }}>
                  <Row>
                    <Col>Category:</Col>
                    <Col>
                      <Link
                        to={`/category/${product.category?.slug}`}
                        className='food-card_category'
                        style={{
                          color: '#34495e',
                          fontSize: '18px',
                          cursor: 'pointer',
                        }}
                      >
                        {product.category?.name}
                      </Link>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: 'transparent' }}>
                  <Row>
                    <Col>Description:</Col>
                    <Col>
                      <p>{product.description && product.description}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: 'transparent' }}>
                  {product.variable && <h4>Choose from bellow: </h4>}
                  {product.price ? (
                    <h5>Price: {product.price}</h5>
                  ) : product.variable ? (
                    product.variable.attribute.map((attr) => (
                      <div key={attr._id}>
                        <Row
                          className='variable-item p-1'
                          style={{ borderRadius: '10px' }}
                        >
                          <label htmlFor={attr._id}>
                            <Col className='d-flex align-items-center'>
                              <Image
                                src={product.image && product.image.url}
                                alt={product.title}
                                style={{ width: '50px', margin: '0px 5px' }}
                              ></Image>
                              <input
                                type='radio'
                                name='variable'
                                value={attr._id}
                                id={attr._id}
                                onClick={() => setVariable(attr._id)}
                              />
                              <p style={{ margin: '0px' }}>
                                {attr.name} - ${attr.price}
                              </p>
                            </Col>
                          </label>
                        </Row>
                        <br />
                      </div>
                    ))
                  ) : (
                    'No Price Given'
                  )}
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: 'transparent' }}>
                  {product.addon && product.addon.length > 0 ? (
                    <MultiSelect
                      options={product.addon.map((a) => ({
                        label: a.name,
                        value: a._id,
                      }))}
                      value={addon}
                      onChange={setAddon}
                      labelledBy='Select Addon'
                      className='product-addons'
                    />
                  ) : (
                    ''
                  )}
                </ListGroup.Item>
                {product.availability === 'Yes' ? (
                  <ListGroup.Item style={{ backgroundColor: 'transparent' }}>
                    <Row>
                      <Col>
                        <Button
                          onClick={() => setCounter(counter - 1)}
                          disabled={counter < 2}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </Button>
                        <span
                          style={{
                            padding: '10px 15px',
                            backgroundColor: '#fdcb6e',
                            fontWeight: '600',
                            fontSize: '18px',
                          }}
                        >
                          {counter}
                        </span>
                        <Button
                          onClick={() => setCounter(counter + 1)}
                          disabled={counter > 49}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          style={{ width: '-webkit-fill-available' }}
                          variant='dark'
                          onClick={handleAddToCart}
                          disabled={product.variable && !variable}
                        >
                          Add To Cart <FontAwesomeIcon icon={faCartPlus} />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ) : (
                  <Message variant='info'>Item Not Available</Message>
                )}
              </ListGroup>
            </>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default SingleProductScreen
