import {
  COUPON_CREATE_FAIL,
  COUPON_CREATE_REQUEST,
  COUPON_CREATE_RESET,
  COUPON_CREATE_SUCCESS,
  COUPON_DELETE_FAIL,
  COUPON_DELETE_REQUEST,
  COUPON_DELETE_RESET,
  COUPON_DELETE_SUCCESS,
  COUPON_LIST_FAIL,
  COUPON_LIST_REQUEST,
  COUPON_LIST_RESET,
  COUPON_LIST_SUCCESS,
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

export const couponListReducer = (state = { coupons: [] }, action) => {
  switch (action.type) {
    case COUPON_LIST_REQUEST:
      return { ...state, loading: true }
    case COUPON_LIST_SUCCESS:
      return { loading: false, coupons: action.payload }
    case COUPON_LIST_FAIL:
      return { loading: false, error: action.payload }
    case COUPON_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const couponDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COUPON_DELETE_REQUEST:
      return { loading: true }
    case COUPON_DELETE_SUCCESS:
      return { loading: false, success: action.payload }
    case COUPON_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case COUPON_DELETE_RESET:
      return {}
    default:
      return state
  }
}
