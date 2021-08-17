import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { Image, Row, Col, ListGroup, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../components/Message'
const CartScreen = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    dispatch(addToCart())
  }, [dispatch])

  const removeItemHandler = (slug) => {
    dispatch(removeFromCart(slug))
  }
  const checkOutHandler = () => {}
  return (
    <>
      <Row>
        <Col md={9}>
          {cartItems.length === 0 ? (
            <Message variant={'info'}>
              Your cart is empty! <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item.product}
                  style={{ backgroundColor: '#dfe6e9' }}
                >
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={4}>
                      <Link
                        to={`/product/${item.slug}`}
                        style={{
                          color: '#000',
                          fontSize: '18px',
                          fontWeight: '600',
                        }}
                      >
                        {item.title}
                      </Link>
                      {item.variableData && (
                        <p
                          style={{
                            backgroundColor: '#b2bec3',
                            padding: '5px 5px 7px',
                            margin: '0px',
                            borderRadius: '10px',
                            color: '#000',
                            fontSize: '14px',
                            marginBottom: '3px',
                          }}
                        >
                          <span style={{ fontWeight: '500' }}>Type:</span>{' '}
                          {item.variableData.name}
                        </p>
                      )}
                      {item.addonData && (
                        <p
                          style={{
                            backgroundColor: '#b2bec3',
                            padding: '5px 5px 7px',
                            margin: '0px',
                            borderRadius: '10px',
                            color: '#000',
                            fontSize: '14px',
                          }}
                        >
                          <span style={{ fontWeight: '500' }}>Addon:</span>
                          {item.addonData.map((adn) => (
                            <>
                              <br />
                              <span>
                                {adn.name} x {item.qty && item.qty}
                              </span>
                            </>
                          ))}
                          <hr />
                          <span>
                            Total Addon Price: ${item.addonPrice * item.qty}
                          </span>
                        </p>
                      )}
                    </Col>
                    <Col md={2}>
                      <p style={{ fontWeight: '600' }}>
                        ${item.price * item.qty}
                      </p>
                    </Col>
                    <Col md={3} className='d-flex flex-row align-items-start'>
                      <Button
                        onClick={() =>
                          dispatch(
                            addToCart(
                              item.slug,
                              item.qty - 1,
                              item.variableData && item.variableData._id,
                              !item.addonData
                                ? null
                                : item.addonData.map((adn) => adn._id)
                            )
                          )
                        }
                        disabled={item.qty < 2}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </Button>
                      <span
                        style={{
                          padding: '7px 15px',
                          backgroundColor: '#fdcb6e',
                          fontWeight: '600',
                          fontSize: '15px',
                        }}
                      >
                        {item.qty && item.qty}
                      </span>
                      <Button
                        onClick={() =>
                          dispatch(
                            addToCart(
                              item.slug,
                              item.qty + 1,
                              item.variableData && item.variableData._id,
                              !item.addonData
                                ? null
                                : item.addonData.map((adn) => adn._id)
                            )
                          )
                        }
                        disabled={item.qty > 49}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </Col>
                    <Col md={1}>
                      <Button
                        type='button'
                        variant='dark'
                        onClick={() => {
                          removeItemHandler(item.slug)
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={3}>
          <Card style={{ backgroundColor: '#DFE6E9' }}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                Total: ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                Items
              </ListGroup.Item>
              <ListGroup.Item>
                Total Addon Price (${' '}
                {cartItems.reduce(
                  (acc, item) => acc + item.addonPriceWithQty,
                  0
                )}
                )
              </ListGroup.Item>
              <ListGroup.Item>
                Total (${' '}
                {cartItems.reduce(
                  (acc, item) => acc + item.qty * item.price,
                  0
                )}
                )
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  variant='dark'
                  style={{ width: '-webkit-fill-available' }}
                  onClick={checkOutHandler}
                >
                  Proceed To CheckOut
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CartScreen
