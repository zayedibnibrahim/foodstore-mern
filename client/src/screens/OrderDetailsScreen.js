import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import {
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Badge,
} from 'react-bootstrap'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { faCheck } from '@fortawesome/free-brands-svg-icons'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Invoice from '../components/Invoice'

const OrderDetailsScreen = ({ history, match }) => {
  const orderId = match.params.id
  const dispatch = useDispatch()

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading, order, error } = orderDetails

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (!order || order._id !== orderId) {
      dispatch(detailsOrder(orderId))
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [history, userInfo, orderId, order, dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      {userInfo && userInfo.role !== 'admin' && (
        <Link to='/user/orderhistory' className='btn btn-dark my-3'>
          Go Back
        </Link>
      )}

      <h3>Order: {order._id}</h3>
      <Row className='orderDetails'>
        <Col md={8}>
          <ListGroup style={{ backgroundColor: '#ced6e0' }}>
            <ListGroup.Item>
              <Row className='d-flex flex-lg-row flex-md-row flex-sm-column flex-xs-column'>
                <Col>
                  <h4>Shipping</h4>
                  <p>
                    <strong>Name: </strong> {order.orderdBy?.name}
                  </p>
                  <p>
                    <strong>Email: </strong>{' '}
                    <a href={`mailto:${order.orderdBy?.email}`}>
                      {order.orderdBy?.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {order.orderdBy?.shipping.address},{' '}
                    {order.orderdBy?.shipping.city}{' '}
                    {order.orderdBy?.shipping.postcode},{' '}
                    {order.orderdBy?.shipping.country}
                  </p>
                </Col>
                <Col className='d-flex justify-content-md-end align-items-start justify-content-sm-start'>
                  <PDFDownloadLink
                    document={<Invoice order={order} />}
                    fileName='invoice.pdf'
                    className='btn btn-sm btn-primary'
                  >
                    Download Invoice
                  </PDFDownloadLink>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Order Status</h4>
              {order.orderStatus && order.orderStatus === 'Not Processed' ? (
                <Message variant='dark'>Not Processed</Message>
              ) : order.orderStatus === 'processing' ? (
                <Message variant='info'>Processing</Message>
              ) : order.orderStatus === 'Dispatched' ? (
                <Message variant='Primary'>Dispatched</Message>
              ) : order.orderStatus === 'Completed' ? (
                <Message variant='success'>Completed</Message>
              ) : (
                <Message variant='danger'>Cancelled</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Payment Method</h4>
              <p>
                <strong>Method: </strong>
                {order.paymentIntent &&
                  order.paymentIntent.payment_method_types[0]}
              </p>
              {order.paymentIntent &&
              order.paymentIntent.status === 'succeeded' ? (
                <Message variant='success'>
                  Paid on : {new Date(order.createdAt).toLocaleDateString()}
                </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Order Items</h4>
              {order.products?.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup>
                  {order.products?.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.product.image.url}
                            alt={item.product.title}
                            fluid
                          />
                        </Col>
                        <Col md={10}>
                          <Row className='d-flex flex-column'>
                            <Col>
                              <Row className='d-flex flex-row'>
                                <Col md={9}>
                                  <span style={{ fontWeight: '900' }}>
                                    {index + 1}){' '}
                                  </span>
                                  <span style={{ fontWeight: '600' }}>
                                    <Link to={`/product/${item.product.slug}`}>
                                      {item.product.title}
                                    </Link>{' '}
                                    x {item.quantity}
                                  </span>
                                </Col>
                                <Col md={3}>
                                  <span style={{ fontWeight: '600' }}>
                                    = ${item.quantity * item.price}
                                  </span>
                                </Col>
                              </Row>
                            </Col>
                            {item.variableData && (
                              <Col>
                                <span style={{ fontSize: '14px' }}>Type:</span>{' '}
                                <Badge
                                  style={{
                                    backgroundColor: '#b33939',
                                    marginLeft: '2px',
                                  }}
                                >
                                  {item.variableData.name}
                                </Badge>
                              </Col>
                            )}
                            {item.addon && (
                              <Col>
                                <span style={{ fontSize: '14px' }}>
                                  Addons:
                                </span>{' '}
                                {item.addon.map((adn) => (
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
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup style={{ backgroundColor: '#ced6e0' }}>
              <ListGroup.Item>
                <h4>Order Summary</h4>
              </ListGroup.Item>
              {order.couponApplied ? (
                <>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <b>Total:</b>
                      </Col>
                      <Col>
                        $<del>{order.cartTotal}</del>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <b>Total After Discount:</b>
                      </Col>
                      <Col>${order.totalAfterDiscount}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <b>Total Payable:</b>
                      </Col>
                      <Col>${order.totalAfterDiscount}</Col>
                    </Row>
                  </ListGroup.Item>
                </>
              ) : (
                <>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <b>Total:</b>
                      </Col>
                      <Col>${order.cartTotal}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <b>Total Payable:</b>
                      </Col>
                      <Col>${order.cartTotal}</Col>
                    </Row>
                  </ListGroup.Item>
                </>
              )}

              {/* {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )} */}
              {/* {loadingDelivered && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      variant='dark'
                      className='btn btn-block'
                      onClick={deliverHandler}
                      style={{ width: '-webkit-fill-available' }}
                    >
                      Mark As Delivered{' '}
                      <FontAwesomeIcon icon={faCheck} color='green' />
                    </Button>
                  </ListGroup.Item>
                )} */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderDetailsScreen
