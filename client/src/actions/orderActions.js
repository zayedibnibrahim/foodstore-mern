import axios from 'axios'
import {
  ADMIN_ORDER_LIST_FAIL,
  ADMIN_ORDER_LIST_REQUEST,
  ADMIN_ORDER_LIST_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_STATUS_UPDATE_FAIL,
  ORDER_STATUS_UPDATE_REQUEST,
  ORDER_STATUS_UPDATE_SUCCESS,
  PAYMENT_STATUS_UPDATE_FAIL,
  PAYMENT_STATUS_UPDATE_REQUEST,
  PAYMENT_STATUS_UPDATE_SUCCESS,
  USER_ORDER_LIST_FAIL,
  USER_ORDER_LIST_REQUEST,
  USER_ORDER_LIST_SUCCESS,
} from '../constants/orderConstants'

export const createOrder =
  (paymentIntent, paymentMethod) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST })
      const {
        userLogIn: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/order`,
        { paymentIntent, paymentMethod },
        config
      )
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const detailsOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/order/${id}`,
      config
    )
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listOrderUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ORDER_LIST_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/order`,
      config
    )
    dispatch({ type: USER_ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listOrderAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_ORDER_LIST_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/admin/orderlist`,
      config
    )
    dispatch({ type: ADMIN_ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ADMIN_ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateOrderStatus = (id, status) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_STATUS_UPDATE_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.put(
      `${process.env.REACT_APP_API}/api/admin/orderStatus/${id}`,
      { status },
      config
    )
    dispatch({ type: ORDER_STATUS_UPDATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: ORDER_STATUS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updatePaymentStatus =
  (id, status) => async (dispatch, getState) => {
    try {
      dispatch({ type: PAYMENT_STATUS_UPDATE_REQUEST })
      const {
        userLogIn: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      await axios.put(
        `${process.env.REACT_APP_API}/api/admin/paymentStatus/${id}`,
        { status },
        config
      )
      dispatch({ type: PAYMENT_STATUS_UPDATE_SUCCESS })
    } catch (error) {
      dispatch({
        type: PAYMENT_STATUS_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
