import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderAdmin } from '../../actions/orderActions'
import { Button, Col, Row, Table } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { LinkContainer } from 'react-router-bootstrap'

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
          <h2>My Orders</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>SL</th>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order._id}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      $
                      {order.couponApplied
                        ? order.totalAfterDiscount
                        : order.cartTotal}
                    </td>
                    <td>
                      {order.paymentIntent &&
                      order.paymentIntent.status === 'succeeded' ? (
                        new Date(order.createdAt).toLocaleDateString()
                      ) : (
                        <FontAwesomeIcon icon={faTimes} color='red' />
                      )}
                    </td>
                    <td>
                      {order.orderStatus &&
                      order.orderStatus === 'Not Processed' ? (
                        <Button variant='dark'>Not Processed</Button>
                      ) : order.orderStatus === 'processing' ? (
                        <Button variant='info'>Processing</Button>
                      ) : order.orderStatus === 'Dispatched' ? (
                        <Button variant='Primary'>Dispatched</Button>
                      ) : order.orderStatus === 'Completed' ? (
                        <Button variant='success'>Completed</Button>
                      ) : (
                        <Button variant='danger'>Cancelled</Button>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='secondary'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ManageOrderScreen
