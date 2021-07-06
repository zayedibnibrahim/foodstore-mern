import axios from 'axios'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../constants/userConstants'
import { auth } from '../firebase'

export const logInUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const { token } = await user.getIdTokenResult()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.post('/api/create-or-update-user', {}, config)
    const { email, name, _id, role } = data
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { _id, name, email, token, role },
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const currentUser = async (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.post('/api/current-user', {}, config)
  localStorage.setItem('userInfo', JSON.stringify(data))
  return data
}

export const logOut = () => (dispatch) => {
  auth.signOut()
  dispatch({ type: USER_LOGOUT })
  localStorage.removeItem('userInfo')
}
