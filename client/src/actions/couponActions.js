import axios from 'axios'
import {
  COUPON_CREATE_FAIL,
  COUPON_CREATE_REQUEST,
  COUPON_CREATE_SUCCESS,
  COUPON_DELETE_FAIL,
  COUPON_DELETE_REQUEST,
  COUPON_DELETE_SUCCESS,
  COUPON_LIST_FAIL,
  COUPON_LIST_REQUEST,
  COUPON_LIST_SUCCESS,
} from '../constants/couponConstants'

export const createCoupon = (coupon) => async (dispatch, getState) => {
  try {
    dispatch({ type: COUPON_CREATE_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.post(`${process.env.REACT_APP_API}/api/coupon`, coupon, config)
    dispatch({ type: COUPON_CREATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: COUPON_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listCoupon = () => async (dispatch, getState) => {
  try {
    dispatch({ type: COUPON_LIST_REQUEST })
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
      `${process.env.REACT_APP_API}/api/coupon`,
      config
    )

    dispatch({ type: COUPON_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: COUPON_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteCoupon = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: COUPON_DELETE_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/coupon/${id}`,
      config
    )

    dispatch({ type: COUPON_DELETE_SUCCESS, payload: data.message })
  } catch (error) {
    dispatch({
      type: COUPON_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
