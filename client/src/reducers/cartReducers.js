import {
  APPLY_COUPON_FAIL,
  APPLY_COUPON_REQUEST,
  APPLY_COUPON_RESET,
  APPLY_COUPON_SUCCESS,
  CANCEL_COUPON_FAIL,
  CANCEL_COUPON_REQUEST,
  CANCEL_COUPON_RESET,
  CANCEL_COUPON_SUCCESS,
  CART_ADD_ITEM,
  CART_CLEAR_ITEM,
  CART_DB_FAIL,
  CART_DB_REQUEST,
  CART_DB_RESET,
  CART_DB_SUCCESS,
  CART_LIST_FAIL,
  CART_LIST_REQUEST,
  CART_LIST_RESET,
  CART_LIST_SUCCESS,
  CART_REMOVE_ITEM,
  DB_CART_CLEAR_FAIL,
  DB_CART_CLEAR_REQUEST,
  DB_CART_CLEAR_RESET,
  DB_CART_CLEAR_SUCCESS,
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find(
        (pd) => pd.product === item.product
      )
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((pd) =>
            pd.product === existItem.product ? item : pd
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((pd) => pd.slug !== action.payload),
      }
    case CART_CLEAR_ITEM:
      return { cartItems: [] }
    default:
      return state
  }
}

export const cartSaveDbReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_DB_REQUEST:
      return { loading: true }
    case CART_DB_SUCCESS:
      return { loading: false, success: true }
    case CART_DB_FAIL:
      return { loading: false, error: action.payload }
    case CART_DB_RESET:
      return {}
    default:
      return state
  }
}

export const cartListReducer = (state = { cartItems: null }, action) => {
  switch (action.type) {
    case CART_LIST_REQUEST:
      return { ...state, loading: true }
    case CART_LIST_SUCCESS:
      return { loading: false, cartItems: action.payload }
    case CART_LIST_FAIL:
      return { loading: false, error: action.payload }
    case CART_LIST_RESET:
      return { ...state, cartItems: null }
    default:
      return state
  }
}

export const dbCartClearReducer = (state = {}, action) => {
  switch (action.type) {
    case DB_CART_CLEAR_REQUEST:
      return { loading: true }
    case DB_CART_CLEAR_SUCCESS:
      return { loading: false, success: true }
    case DB_CART_CLEAR_FAIL:
      return { loading: false, error: action.payload }
    case DB_CART_CLEAR_RESET:
      return {}
    default:
      return state
  }
}

export const applyCouponReducer = (state = {}, action) => {
  switch (action.type) {
    case APPLY_COUPON_REQUEST:
      return { loading: true }
    case APPLY_COUPON_SUCCESS:
      return { loading: false, success: true }
    case APPLY_COUPON_FAIL:
      return { loading: false, error: action.payload }
    case APPLY_COUPON_RESET:
      return {}
    default:
      return state
  }
}

export const cancelCouponReducer = (state = {}, action) => {
  switch (action.type) {
    case CANCEL_COUPON_REQUEST:
      return { loading: true }
    case CANCEL_COUPON_SUCCESS:
      return { loading: false, success: true }
    case CANCEL_COUPON_FAIL:
      return { loading: false, error: action.payload }
    case CANCEL_COUPON_RESET:
      return {}
    default:
      return state
  }
}
