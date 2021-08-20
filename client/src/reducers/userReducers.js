import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  CART_SAVE_SHIPPING_ADDRESS_REQUEST,
  CART_SAVE_SHIPPING_ADDRESS_SUCCESS,
  CART_SAVE_SHIPPING_ADDRESS_FAIL,
} from '../constants/userConstants'

export const userLogInReducer = (state = { userInfo: null }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return { userInfo: null }
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { ...state, loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case CART_SAVE_SHIPPING_ADDRESS_REQUEST:
      return { loading: true }
    case CART_SAVE_SHIPPING_ADDRESS_SUCCESS:
      return { loading: false, successShippingAdded: true }
    case CART_SAVE_SHIPPING_ADDRESS_FAIL:
      return { loading: false, errorShippingAdded: action.payload }
    case USER_LIST_RESET:
      return {}
    default:
      return state
  }
}
