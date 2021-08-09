import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct } from '../actions/productActions'
import { Form, Button, Image, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
const SingleProductScreen = ({ match }) => {
  const productSlug = match.params.slug
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
        <Col sm={12} md={6}>
          {loadingDetails ? (
            <Skeleton height={400} count={1} />
          ) : (
            <Image
              src={product.image?.url}
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
                  fontSize: '20px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                {product.category?.name}
              </Link>
            </>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default SingleProductScreen
