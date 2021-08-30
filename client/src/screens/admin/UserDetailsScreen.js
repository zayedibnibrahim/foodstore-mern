import React, { useEffect } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser } from '../../actions/userActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import OrderListTable from '../../components/OrderListTable'

const UserDetailsScreen = ({ match, history }) => {
  const userId = match.params.id
  const dispatch = useDispatch()

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const userDetails = useSelector((state) => state.userDetails)
  const {
    loading,
    error,
    userInfoAndOrders: { user, orderList },
  } = userDetails

  useEffect(() => {
    if (userInfo && userInfo.role !== 'admin') {
      history.push('/')
    } else {
      dispatch(detailsUser(userId))
    }
  }, [dispatch, userId, history, userInfo])

  return (
    <Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Col md={4}>
            <h3>Info</h3>

            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>ID:</Col>
                  <Col>{user?._id}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Name:</Col>
                  <Col>{user?.name}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Email:</Col>
                  <Col>{user?.email}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className='d-flex flex-column'>
                  <Col>
                    Address: {user?.shipping?.address}
                    {<br />}City: {user?.shipping?.city}
                    {<br />}Post Code: {user?.shipping?.postcode}
                    {<br />}Country: {user?.shipping?.country}
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={8}>
            <OrderListTable orderList={orderList} />
          </Col>
        </>
      )}
    </Row>
  )
}

export default UserDetailsScreen
