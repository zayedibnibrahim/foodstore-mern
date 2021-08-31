import axios from 'axios'
import { CART_LIST_RESET } from '../constants/cartConstants'
import {
  ADMIN_ORDER_LIST_RESET,
  USER_ORDER_LIST_RESET,
} from '../constants/orderConstants'
import {
  ADD_TO_WISHLIST_FAIL,
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  CART_SAVE_SHIPPING_ADDRESS_FAIL,
  CART_SAVE_SHIPPING_ADDRESS_REQUEST,
  CART_SAVE_SHIPPING_ADDRESS_SUCCESS,
  LIST_WISHLIST_FAIL,
  LIST_WISHLIST_REQUEST,
  LIST_WISHLIST_SUCCESS,
  REMOVE_WISHLIST_FAIL,
  REMOVE_WISHLIST_REQUEST,
  REMOVE_WISHLIST_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
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
      `${process.env.REACT_APP_API}/api/auth/create-or-update-user`,
      {},
      config
    )
    const { email, name, _id, role, shipping } = data
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { _id, name, email, token, role, shipping },
    })
    localStorage.setItem(
      'userInfo',
      JSON.stringify({ _id, name, email, role, token, shipping })
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
  const { data } = await axios.post(
    `${process.env.REACT_APP_API}/api/auth/current-user`,
    {},
    config
  )
  const { email, name, _id, role, shipping } = data
  localStorage.setItem(
    'userInfo',
    JSON.stringify({ _id, name, email, role, token, shipping })
  )
  return data
}

export const logOut = () => async (dispatch) => {
  await auth.signOut()
  await dispatch({ type: USER_LOGOUT })
  await dispatch({ type: USER_LIST_RESET })
  await dispatch({ type: CART_LIST_RESET })
  await dispatch({ type: USER_ORDER_LIST_RESET })
  await dispatch({ type: ADMIN_ORDER_LIST_RESET })
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
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/users`,
      config
    )
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

export const saveShippingAddress = (shipping) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS_REQUEST,
    })

    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.post(
      `${process.env.REACT_APP_API}/api/users`,
      { shipping },
      config
    )
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const detailsUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/admin/usersDetails/${id}`,
      config
    )
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addToWish = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_TO_WISHLIST_REQUEST,
    })

    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.post(
      `${process.env.REACT_APP_API}/api/wishlist/${id}`,
      {},
      config
    )
    dispatch({ type: ADD_TO_WISHLIST_SUCCESS })
  } catch (error) {
    dispatch({
      type: ADD_TO_WISHLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const removeToWish = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REMOVE_WISHLIST_REQUEST,
    })
    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.put(
      `${process.env.REACT_APP_API}/api/wishlist/${id}`,
      {},
      config
    )
    dispatch({ type: REMOVE_WISHLIST_SUCCESS })
  } catch (error) {
    dispatch({
      type: REMOVE_WISHLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listWishes = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_WISHLIST_REQUEST,
    })
    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/wishlist`,
      config
    )
    dispatch({ type: LIST_WISHLIST_SUCCESS, payload: data.wishlist })
  } catch (error) {
    dispatch({
      type: LIST_WISHLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
