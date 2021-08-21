import {
  COUPON_CREATE_FAIL,
  COUPON_CREATE_REQUEST,
  COUPON_CREATE_RESET,
  COUPON_CREATE_SUCCESS,
} from '../constants/couponConstants'

export const couponCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COUPON_CREATE_REQUEST:
      return { loading: true }
    case COUPON_CREATE_SUCCESS:
      return { loading: false, success: true }
    case COUPON_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case COUPON_CREATE_RESET:
      return {}
    default:
      return state
  }
}
