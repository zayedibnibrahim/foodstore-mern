import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../../actions/userActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

const UserListScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch])

  const userList = useSelector((state) => state.userList)
  const { loading, users, error } = userList
  return (
    <>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <ul>
        {users && users.map((user) => <li key={user._id}>{user.name}</li>)}
      </ul>
    </>
  )
}

export default UserListScreen
