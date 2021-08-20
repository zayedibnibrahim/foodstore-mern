import {
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
      return { cartItems: null }
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
