import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const OrderListTable = ({ orderList }) => {
  return (
    <Table
      striped
      bordered
      hover
      responsive
      className='table-sm'
      variant='dark'
    >
      <thead>
        <tr>
          <th>SL</th>
          <th>ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>STATUS</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {orderList &&
          orderList.map((order, index) => (
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
                  <>
                    <FontAwesomeIcon icon={faCheck} color='green' />{' '}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </>
                ) : (
                  <FontAwesomeIcon icon={faTimes} color='red' />
                )}
              </td>
              <td>
                {order.orderStatus && order.orderStatus === 'Not Processed' ? (
                  <Button variant='dark'>Not Processed</Button>
                ) : order.orderStatus === 'Processing' ? (
                  <Button variant='info'>Processing</Button>
                ) : order.orderStatus === 'Dispatched' ? (
                  <Button variant='warning'>Dispatched</Button>
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
  )
}

export default OrderListTable
