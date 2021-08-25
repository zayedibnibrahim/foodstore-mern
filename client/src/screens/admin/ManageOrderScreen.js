import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderAdmin } from '../../actions/orderActions'

const ManageOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const userOrderList = useSelector((state) => state.userOrderList)
  const { orderList, loading, error } = userOrderList

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch(listOrderAdmin())
    } else {
      history.push('/login')
    }
  }, [history, userInfo, dispatch])
  return <div></div>
}

export default ManageOrderScreen
