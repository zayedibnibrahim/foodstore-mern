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
  CART_SAVE_SHIPPING_ADDRESS_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  ADD_TO_WISHLIST_FAIL,
  ADD_TO_WISHLIST_RESET,
  REMOVE_WISHLIST_REQUEST,
  REMOVE_WISHLIST_SUCCESS,
  REMOVE_WISHLIST_FAIL,
  REMOVE_WISHLIST_RESET,
  LIST_WISHLIST_REQUEST,
  LIST_WISHLIST_SUCCESS,
  LIST_WISHLIST_FAIL,
  LIST_WISHLIST_RESET,
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
    case USER_LIST_RESET:
      return { users: [] }
    case CART_SAVE_SHIPPING_ADDRESS_REQUEST:
      return { loadingShippingAdded: true }
    case CART_SAVE_SHIPPING_ADDRESS_SUCCESS:
      return {
        loadingShippingAdded: false,
        successShippingAdded: true,
      }
    case CART_SAVE_SHIPPING_ADDRESS_FAIL:
      return {
        loadingShippingAdded: false,
        errorShippingAdded: action.payload,
      }
    case CART_SAVE_SHIPPING_ADDRESS_RESET:
      return { users: [] }

    default:
      return state
  }
}

export const userDetailsReducer = (
  state = { userInfoAndOrders: [{ user: null }, { orderList: null }] },
  action
) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, userInfoAndOrders: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_RESET:
      return { userInfoAndOrders: [{ user: null }, { orderList: null }] }
    default:
      return state
  }
}

export const wishReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST_REQUEST:
      return { loadingAdd: true }
    case ADD_TO_WISHLIST_SUCCESS:
      return { loadingAdd: false, successAdd: true }
    case ADD_TO_WISHLIST_FAIL:
      return { loadingAdd: false, errorAdd: action.payload }
    case ADD_TO_WISHLIST_RESET:
      return {}
    case REMOVE_WISHLIST_REQUEST:
      return { loadingRemove: true }
    case REMOVE_WISHLIST_SUCCESS:
      return { loadingRemove: false, successRemove: true }
    case REMOVE_WISHLIST_FAIL:
      return { loadingRemove: false, errorRemove: action.payload }
    case REMOVE_WISHLIST_RESET:
      return {}
    default:
      return state
  }
}

export const wishListReducer = (state = { wishlistData: null }, action) => {
  switch (action.type) {
    case LIST_WISHLIST_REQUEST:
      return { ...state, loading: true }
    case LIST_WISHLIST_SUCCESS:
      return { loading: false, wishlistData: action.payload }
    case LIST_WISHLIST_FAIL:
      return { loading: false, error: action.payload }
    case LIST_WISHLIST_RESET:
      return {}
    default:
      return state
  }
}
