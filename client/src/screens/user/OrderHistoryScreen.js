import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { listOrderUser } from '../../actions/orderActions'
import ShippingForm from '../../components/form/ShippingForm'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Meta from '../../components/Meta'
import OrderListTable from '../../components/OrderListTable'

const OrderHistoryScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const userOrderList = useSelector((state) => state.userOrderList)
  const { orderList, loading, error } = userOrderList

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listOrderUser())
    }
  }, [history, userInfo, dispatch])

  return (
    <>
      <Meta title='Food Store | Order History' />
      <Row>
        <Col md={2}>
          <ShippingForm />
        </Col>
        <Col md={10}>
          <h3>My Orders</h3>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <OrderListTable orderList={orderList} />
          )}
        </Col>
      </Row>
    </>
  )
}

export default OrderHistoryScreen
