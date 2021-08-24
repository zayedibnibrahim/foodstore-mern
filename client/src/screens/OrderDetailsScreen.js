import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

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
  return <div>{match.params.id}</div>
}

export default OrderDetailsScreen
