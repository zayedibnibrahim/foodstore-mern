import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MultiSelect from 'react-multi-select-component'
import { detailsProduct } from '../actions/productActions'
import { Image, Row, Col, ListGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import Message from '../components/Message'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
const SingleProductScreen = ({ match }) => {
  const productSlug = match.params.slug
  const [selected, setSelected] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(detailsProduct(productSlug))
  }, [dispatch, productSlug])

  const productDetails = useSelector((state) => state.productDetails)
  const {
    loading: loadingDetails,
    product,
    error: errorDetails,
  } = productDetails
  return (
    <div
      style={{
        backgroundColor: '#FFC94F',
        padding: '50px',
        borderRadius: '35px',
      }}
    >
      <Link to='/' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <Row>
        {errorDetails && <Message variant='alert'>{errorDetails}</Message>}
        <Col sm={12} md={6}>
          {loadingDetails ? (
            <Skeleton height={400} count={1} />
          ) : (
            <Image
              src={product.image && product.image.url}
              alt={product.title}
              className='w-75'
            ></Image>
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
                      value={selected}
                      onChange={setSelected}
                      labelledBy='Select Addon'
                      className='product-addons'
                    />
                  ) : (
                    ''
                  )}
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: 'transparent' }}>
                  <Row>
                    <Col>
                      <div className='food-card_order-count'>
                        <div className='input-group mb-3'>
                          <div className='input-group-prepend'>
                            <Button
                              className='btn btn-outline-secondary minus-btn'
                              type='button'
                              id='button-addon1'
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </Button>
                          </div>
                          <input
                            type='text'
                            className='form-control input-manulator'
                            placeholder=''
                            aria-label='Example text with button addon'
                            aria-describedby='button-addon1'
                            value='0'
                          />
                          <div className='input-group-append'>
                            <Button
                              className='btn btn-outline-secondary add-btn'
                              type='button'
                              id='button-addon1'
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <Button
                        style={{ width: '-webkit-fill-available' }}
                        variant='dark'
                      >
                        Add To Cart
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default SingleProductScreen
