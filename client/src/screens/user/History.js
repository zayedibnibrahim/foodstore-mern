import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const History = ({ history }) => {
  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [history, userInfo])

  return (
    <div>
      <h1>History</h1>
    </div>
  )
}

export default History
