import axios from 'axios'
import {
  COUPON_CREATE_FAIL,
  COUPON_CREATE_REQUEST,
  COUPON_CREATE_SUCCESS,
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
    await axios.post('/api/coupon', coupon, config)
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
