import React, { useEffect } from 'react'
import { Card, Col, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listCart } from '../actions/cartActions'
import { CART_DB_RESET } from '../constants/cartConstants'

const CheckoutScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const cartList = useSelector((state) => state.cartList)
  const { cartItems } = cartList

  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    } else {
      dispatch(listCart())
      dispatch({ type: CART_DB_RESET })
    }
  }, [userInfo, history, dispatch])

  return (
    <>
      <Row>
        <Col md={6} sm={12}>
          <h1>Shipping Address</h1>
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
                    {pd.product.title} x {pd.quantity} ={' '}
                    {pd.quantity * pd.price}
                  </ListGroup.Item>
                ))
              )}
              <ListGroup.Item>
                <span style={{ fontWeight: '600' }}>Total: </span>$
                {cartItems ? cartItems.cartTotal : 0}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CheckoutScreen
