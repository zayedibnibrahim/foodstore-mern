import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../../actions/userActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

const UserListScreen = ({ history }) => {
  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listUsers())
    if (userInfo && userInfo.role !== 'admin') {
      history.push('/')
    }
  }, [dispatch, userInfo, history])

  const userList = useSelector((state) => state.userList)
  const { loading: loadingUserList, users, error: errorUserList } = userList
  return (
    <>
      {errorUserList && <Message variant='danger'>{errorUserList}</Message>}
      {loadingUserList && <Loader />}
      <ul>
        {users && users.map((user) => <li key={user._id}>{user.name}</li>)}
      </ul>
    </>
  )
}

export default UserListScreen
