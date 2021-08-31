import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import ModalImage from 'react-modal-image'
import { Badge, Button, Col, Row } from 'react-bootstrap'
import FoodModal from './FoodModal'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
const ProductCard = ({ product, loading, error, userInfo, loadingAdd }) => {
  const [modalShow, setModalShow] = useState(false)

  return (
    <>
      <Row
        style={{
          backgroundColor: '#ef5777',
          borderRadius: '5px',
          height: '100%',
          // marginRight: '10px',
        }}
        className='d-flex my-2 p-2 product-card m-auto'
      >
        <Col className='justify-content-start' md={2} sm={2}>
          <ModalImage
            small={product.image.url}
            large={product.image.url}
            alt={product.title}
            className='product__by__category__box'
          />
        </Col>
        <Col className='justify-content-start' md={6} sm={10}>
          <Row className='d-flex flex-column'>
            <Col>
              <Link
                to={`/product/${product.slug}`}
                style={{
                  color: '#000',
                  // textDecoration: 'none',
                  fontWeight: '600',
                }}
              >
                {product.title}
              </Link>
            </Col>
            {product.addon.length > 0 && (
              <Col>
                {product.addon.map((adn) => (
                  <Badge
                    key={adn._id}
                    style={{ backgroundColor: '#FFC107', marginLeft: '2px' }}
                  >
                    {adn.name.split('-')[0]}
                  </Badge>
                ))}
              </Col>
            )}
          </Row>
        </Col>
        <Col className='justify-content-start' md={4} sm={12}>
          <Row className='d-flex flex-md-column flex-sm-row'>
            <Col className='d-flex justify-content-start justify-sm-content-start'>
              <h6 style={{ color: '#ffffff' }}>
                Price:{' '}
                {product.price ? (
                  <span className='fs-6'>${product.price}</span>
                ) : product.variable ? (
                  <span className='fs-6'>
                    ${product.variable.attribute[0].price}- $
                    {
                      product.variable.attribute[
                        product.variable.attribute.length - 1
                      ].price
                    }
                  </span>
                ) : (
                  'No price'
                )}
              </h6>
            </Col>
            <Col className='d-flex justify-content-start'>
              <Button
                variant='dark'
                size='sm'
                onClick={() => setModalShow(true)}
              >
                Order Now <FontAwesomeIcon icon={faChevronCircleRight} />
              </Button>
              <FoodModal
                setModalShow={setModalShow}
                modalShow={modalShow}
                product={product}
                loading={loading}
                error={error}
                userInfo={userInfo}
                loadingAdd={loadingAdd}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default ProductCard
