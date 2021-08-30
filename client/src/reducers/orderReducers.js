import {
  ADMIN_ORDER_LIST_FAIL,
  ADMIN_ORDER_LIST_REQUEST,
  ADMIN_ORDER_LIST_RESET,
  ADMIN_ORDER_LIST_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_RESET,
  ORDER_DETAILS_SUCCESS,
  ORDER_STATUS_UPDATE_FAIL,
  ORDER_STATUS_UPDATE_REQUEST,
  ORDER_STATUS_UPDATE_RESET,
  ORDER_STATUS_UPDATE_SUCCESS,
  PAYMENT_STATUS_UPDATE_FAIL,
  PAYMENT_STATUS_UPDATE_REQUEST,
  PAYMENT_STATUS_UPDATE_RESET,
  PAYMENT_STATUS_UPDATE_SUCCESS,
  USER_ORDER_LIST_FAIL,
  USER_ORDER_LIST_REQUEST,
  USER_ORDER_LIST_RESET,
  USER_ORDER_LIST_SUCCESS,
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload }
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_DETAILS_RESET:
      return {}
    default:
      return state
  }
}

export const userOrderListReducer = (state = { orderList: [] }, action) => {
  switch (action.type) {
    case USER_ORDER_LIST_REQUEST:
      return { ...state, loading: true }
    case USER_ORDER_LIST_SUCCESS:
      return { loading: false, orderList: action.payload }
    case USER_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case USER_ORDER_LIST_RESET:
      return { orderList: [] }
    default:
      return state
  }
}

export const adminOrderListReducer = (state = { orderList: [] }, action) => {
  switch (action.type) {
    case ADMIN_ORDER_LIST_REQUEST:
      return { ...state, loading: true }
    case ADMIN_ORDER_LIST_SUCCESS:
      return { loading: false, orderList: action.payload }
    case ADMIN_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case ADMIN_ORDER_LIST_RESET:
      return { orderList: [] }
    default:
      return state
  }
}

export const orderStatusUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_STATUS_UPDATE_REQUEST:
      return { loading: true }
    case ORDER_STATUS_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case ORDER_STATUS_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_STATUS_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const paymentStatusUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_STATUS_UPDATE_REQUEST:
      return { loading: true }
    case PAYMENT_STATUS_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case PAYMENT_STATUS_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PAYMENT_STATUS_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
