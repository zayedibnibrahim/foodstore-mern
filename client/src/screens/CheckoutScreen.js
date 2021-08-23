import React, { useEffect } from 'react'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearDbCart, couponCancel, listCart } from '../actions/cartActions'
import ShippingForm from '../components/form/ShippingForm'
import Message from '../components/Message'
import {
  APPLY_COUPON_RESET,
  CANCEL_COUPON_RESET,
  CART_LIST_RESET,
  DB_CART_CLEAR_RESET,
} from '../constants/cartConstants'
import { useAlert } from 'react-alert'
import { CART_SAVE_SHIPPING_ADDRESS_RESET } from '../constants/userConstants'
import ApplyCoupon from '../components/form/ApplyCoupon'
import Loader from '../components/Loader'

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

  const applyCoupon = useSelector((state) => state.applyCoupon)
  const {
    loading: loadingApplyCoupon,
    success: successApplyCoupon,
    error: errorApplyCoupon,
  } = applyCoupon

  const cancelCoupon = useSelector((state) => state.cancelCoupon)
  const { loading: loadingCancelCoupon, success: successCancelCoupon } =
    cancelCoupon

  useEffect(() => {
    if (userInfo && !userInfo.token) {
      history.push('/')
    } else {
      dispatch(listCart())
      if (cartClearSuccess) {
        dispatch({ type: DB_CART_CLEAR_RESET })
        dispatch({ type: CART_LIST_RESET })
        history.push('/')
      }
      if (successShippingAdded) {
        alert.success('Shipping Address Added')
        dispatch({ type: CART_SAVE_SHIPPING_ADDRESS_RESET })
      }
      if (successCancelCoupon) {
        alert.success('Coupon Removed')
        dispatch({ type: CANCEL_COUPON_RESET })
        dispatch(listCart())
      }
      if (successApplyCoupon) {
        alert.success('Coupon Added')
        dispatch({ type: APPLY_COUPON_RESET })
        dispatch(listCart())
      } else {
        dispatch({ type: APPLY_COUPON_RESET })
      }
    }
  }, [
    userInfo,
    history,
    dispatch,
    cartClearSuccess,
    successShippingAdded,
    alert,
    successApplyCoupon,
    successCancelCoupon,
  ])

  const handleClearCart = () => {
    dispatch(clearDbCart())
  }

  const cancelCouponHandler = () => {
    dispatch(couponCancel())
  }

  return (
    <>
      <Row>
        {cartItems ? (
          <>
            <Col md={6} sm={12}>
              <Row className='d-flex flex-column'>
                <Col>
                  {errorShippingAdded && (
                    <Message variant='danger'>{errorShippingAdded}</Message>
                  )}
                  <h3>Shipping Information</h3>

                  <ShippingForm />
                </Col>
                <Col>
                  <ApplyCoupon
                    errorApplyCoupon={errorApplyCoupon}
                    loadingApplyCoupon={loadingApplyCoupon}
                  />
                </Col>
              </Row>
            </Col>
            <Col md={6} sm={12}>
              <h3>Order Summary</h3>
              <Card>
                <ListGroup>
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
                    {cartItems && cartItems.couponApplied === false ? (
                      cartItems.cartTotal
                    ) : (
                      <del>{cartItems.cartTotal}</del>
                    )}
                  </ListGroup.Item>
                  {cartItems && cartItems.couponApplied && (
                    <ListGroup.Item>
                      <Row className='d-flex flex-column'>
                        <Col>
                          <p
                            style={{
                              fontWeight: '600',
                              backgroundColor: '#273c75',
                              color: '#fff',
                              padding: '5px 10px',
                              borderRadius: '10px',
                            }}
                          >
                            Discount Applied: Total Payable: $
                            {cartItems ? cartItems.totalAfterDiscount : 0}
                          </p>
                        </Col>
                        <Col>
                          <Button
                            variant='danger'
                            size='sm'
                            onClick={cancelCouponHandler}
                            disabled={loadingCancelCoupon}
                          >
                            Cancel Coupon
                            {loadingCancelCoupon && <Loader size='size-sm' />}
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Button
                          disabled={userInfo && !userInfo.shipping}
                          variant={
                            userInfo && !userInfo.shipping ? 'dark' : 'success'
                          }
                          onClick={() => history.push('/place-order')}
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
