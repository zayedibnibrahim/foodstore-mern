import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MultiSelect from 'react-multi-select-component'
import { detailsProduct } from '../actions/productActions'
import { Image, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import Message from '../components/Message'
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
              <h2 style={{ color: '#000000', fontWeight: '600' }}>
                {product.title}
              </h2>
              <Link
                to={`/category/${product.category?.slug}`}
                className='food-card_category'
                style={{
                  color: '#34495e',
                  fontSize: '18px',
                  cursor: 'pointer',
                }}
              >
                Category:
                {product.category?.name}
              </Link>
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
            </>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default SingleProductScreen
