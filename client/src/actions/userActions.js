import axios from 'axios'
import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
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
    const { data } = await axios.post(
      '/api/auth/create-or-update-user',
      {},
      config
    )
    const { email, name, _id, role } = data
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { _id, name, email, token, role },
    })
    localStorage.setItem(
      'userInfo',
      JSON.stringify({ _id, name, email, role, token })
    )
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
  const { data } = await axios.post('/api/auth/current-user', {}, config)
  const { email, name, _id, role } = data
  localStorage.setItem(
    'userInfo',
    JSON.stringify({ _id, name, email, role, token })
  )
  return data
}

export const logOut = () => (dispatch) => {
  auth.signOut()
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_LIST_RESET })
  localStorage.removeItem('userInfo')
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get('/api/users', config)
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
