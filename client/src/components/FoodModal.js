import React, { useState } from 'react'
import { Button, Modal, Image, Row, Col, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MultiSelect from 'react-multi-select-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faMinus,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { addToCart } from '../actions/cartActions'
import Skeleton from 'react-loading-skeleton'
import Message from './Message'
import { addToWish } from '../actions/userActions'
import Loader from './Loader'

const FoodModal = ({
  setModalShow,
  modalShow,
  product,
  loading,
  error,
  userInfo,
  loadingAdd,
}) => {
  const [counter, setCounter] = useState(1)
  const [variable, setVariable] = useState('')
  const [addon, setAddon] = useState([])
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(
      addToCart(
        product.slug,
        counter,
        variable,
        addon.length < 1 ? null : addon.map((adn) => adn.value)
      )
    )
    setModalShow(false)
  }
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal {...props} size='xl' centered>
        <Modal.Header
          className='d-flex justify-content-end pb-0'
          style={{ backgroundColor: '#FFC94F', border: 'none' }}
        >
          <Button onClick={props.onHide}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Modal.Header>
        <div
          style={{
            backgroundColor: '#FFC94F',
            padding: '50px',
            borderRadius: '10px',
          }}
        >
          <Row>
            {error && <Message variant='alert'>{error}</Message>}
            <Col sm={12} md={6}>
              {loading ? (
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
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '15px',
                      }}
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
              {loading ? (
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
                                    style={{
                                      width: '50px',
                                      margin: '0px 5px',
                                    }}
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
                      <ListGroup.Item
                        style={{ backgroundColor: 'transparent' }}
                      >
                        <Row>
                          <Col className='d-flex'>
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
                              Add To Cart
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
      </Modal>
    )
  }
  return (
    <MyVerticallyCenteredModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      animation={false}
    />
  )
}

export default FoodModal
