import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductsByCategory } from '../actions/categoryActions'
import { Row, Col } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import ProductCard from './ProductCard'

const ProductByCategory = ({ catId }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(PRODUCT_BY_CATEGORY_RESET)
    dispatch(listProductsByCategory(catId))
  }, [dispatch, catId])

  const productGetByCategory = useSelector(
    (state) => state.productGetByCategory
  )
  const { loading, error, products } = productGetByCategory
  return (
    <div className='py-5'>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products &&
            products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product}></ProductCard>
              </Col>
            ))}
        </Row>
      )}
    </div>
  )
}

export default ProductByCategory
