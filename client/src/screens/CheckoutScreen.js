import React, { useEffect } from 'react'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearDbCart, listCart } from '../actions/cartActions'
import ShippingForm from '../components/form/ShippingForm'
import Message from '../components/Message'
import {
  CART_LIST_RESET,
  DB_CART_CLEAR_RESET,
} from '../constants/cartConstants'
import { useAlert } from 'react-alert'
import { CART_SAVE_SHIPPING_ADDRESS_RESET } from '../constants/userConstants'

const CheckoutScreen = ({ history }) => {
  const alert = useAlert()
  const dispatch = useDispatch()

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const cartList = useSelector((state) => state.cartList)
  const { cartItems } = cartList

  const dbCartClear = useSelector((state) => state.dbCartClear)
  const { success: cartClearSuccess } = dbCartClear

  const userList = useSelector((state) => state.userList)
  const { successShippingAdded, errorShippingAdded } = userList

  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    } else {
      dispatch(listCart())
    }
    if (cartClearSuccess) {
      dispatch({ type: DB_CART_CLEAR_RESET })
      history.push('/')
    }
    if (successShippingAdded) {
      alert.success('Shipping Address Added')
      dispatch({ type: CART_SAVE_SHIPPING_ADDRESS_RESET })
    }
  }, [
    userInfo,
    history,
    dispatch,
    cartClearSuccess,
    successShippingAdded,
    alert,
  ])

  const handleClearCart = () => {
    dispatch(clearDbCart())
    dispatch({ type: CART_LIST_RESET })
  }
  return (
    <>
      <Row>
        {cartItems ? (
          <>
            <Col md={6} sm={12}>
              {errorShippingAdded && (
                <Message variant='danger'>{errorShippingAdded}</Message>
              )}
              <h3>Shipping Information</h3>

              <ShippingForm />
            </Col>
            <Col md={6} sm={12}>
              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  {!cartItems ? (
                    <ListGroup.Item>
                      Go back to Home<Link to='/'></Link>
                    </ListGroup.Item>
                  ) : (
                    cartItems &&
                    cartItems.products.map((pd) => (
                      <ListGroup.Item key={pd._id}>
                        <Row className='d-flex flex-column'>
                          <Col>
                            <span style={{ fontWeight: '600' }}>
                              {pd.product.title} x {pd.quantity} = $
                              {pd.quantity * pd.price}
                            </span>
                          </Col>
                          {pd.addon && (
                            <Col>
                              <span style={{ fontSize: '14px' }}>Addons:</span>{' '}
                              {pd.addon.map((adn) => (
                                <Badge
                                  key={adn._id}
                                  style={{
                                    backgroundColor: '#FFC107',
                                    marginLeft: '2px',
                                  }}
                                >
                                  {adn.name.split('-')[0]}
                                </Badge>
                              ))}
                            </Col>
                          )}
                        </Row>
                      </ListGroup.Item>
                    ))
                  )}
                  <ListGroup.Item>
                    <span style={{ fontWeight: '600' }}>Total: </span>$
                    {cartItems ? cartItems.cartTotal : 0}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Button
                          disabled={userInfo && !userInfo.shipping}
                          variant={
                            userInfo && !userInfo.shipping ? 'dark' : 'success'
                          }
                        >
                          Place Order
                        </Button>
                      </Col>
                      <Col>
                        <Button onClick={handleClearCart} variant='warning'>
                          Clear Items
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </>
        ) : (
          <Message variant='info'>
            No Product has been Proceed to checkout. Go back to{' '}
            <Link to={'/'}>Home</Link>
          </Message>
        )}
      </Row>
    </>
  )
}

export default CheckoutScreen
