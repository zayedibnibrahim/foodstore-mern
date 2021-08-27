import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderAdmin } from '../../actions/orderActions'
import { Col, Row } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

import OrderListTable from '../../components/OrderListTable'

const ManageOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const adminOrderList = useSelector((state) => state.adminOrderList)
  const { orderList, loading, error } = adminOrderList

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch(listOrderAdmin())
    } else {
      history.push('/login')
    }
  }, [history, userInfo, dispatch])
  return (
    <>
      <Row>
        <Col>
          <h3>Customers Orders</h3>
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

export default ManageOrderScreen
