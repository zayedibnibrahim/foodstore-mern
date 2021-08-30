import {
  COUNT_PRODUCTS_FAIL,
  COUNT_PRODUCTS_REQUEST,
  COUNT_PRODUCTS_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  DETAILS_PRODUCT_FAIL,
  DETAILS_PRODUCT_REQUEST,
  DETAILS_PRODUCT_RESET,
  DETAILS_PRODUCT_SUCCESS,
  LIST_PRODUCT_ADMIN_FAIL,
  LIST_PRODUCT_ADMIN_REQUEST,
  LIST_PRODUCT_ADMIN_SUCCESS,
  LIST_PRODUCT_FAIL,
  LIST_PRODUCT_REQUEST,
  LIST_PRODUCT_RESET,
  LIST_PRODUCT_SUCCESS,
  REMOVE_IMAGE_FAIL,
  REMOVE_IMAGE_REQUEST,
  REMOVE_IMAGE_RESET,
  REMOVE_IMAGE_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_RESET,
  UPLOAD_IMAGE_SUCCESS,
} from '../constants/productConstants'

export const fileUploadReducer = (state = { uploadData: {} }, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return { loading: true }
    case UPLOAD_IMAGE_SUCCESS:
      return { loading: false, success: true, uploadData: action.payload }
    case UPLOAD_IMAGE_FAIL:
      return { loading: false, error: action.payload }
    case UPLOAD_IMAGE_RESET:
      return { uploadData: {} }
    default:
      return state
  }
}

export const fileRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_IMAGE_REQUEST:
      return { loading: true }
    case REMOVE_IMAGE_SUCCESS:
      return { loading: false, success: true }
    case REMOVE_IMAGE_FAIL:
      return { loading: false, error: action.payload }
    case REMOVE_IMAGE_RESET:
      return {}
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true }
    case CREATE_PRODUCT_SUCCESS:
      return { loading: false, success: true }
    case CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    case CREATE_PRODUCT_RESET:
      return {}
    default:
      return state
  }
}

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case LIST_PRODUCT_REQUEST:
      return { ...state, loading: true }
    case LIST_PRODUCT_SUCCESS:
      return { loading: false, products: action.payload }
    case LIST_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    case LIST_PRODUCT_RESET:
      return { ...state, products: [] }
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true }
    case DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true }
    case DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    case DELETE_PRODUCT_RESET:
      return {}
    default:
      return state
  }
}

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loading: true }
    case UPDATE_PRODUCT_SUCCESS:
      return { loading: false, success: true }
    case UPDATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    case UPDATE_PRODUCT_RESET:
      return {}
    default:
      return state
  }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case DETAILS_PRODUCT_REQUEST:
      return { ...state, loading: true }
    case DETAILS_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload }
    case DETAILS_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    case DETAILS_PRODUCT_RESET:
      return { loading: false, product: {} }
    default:
      return state
  }
}

export const productCountReducer = (
  state = { productsCount: null },
  action
) => {
  switch (action.type) {
    case COUNT_PRODUCTS_REQUEST:
      return { ...state, loading: true }
    case COUNT_PRODUCTS_SUCCESS:
      return { loading: false, productsCount: action.payload }
    case COUNT_PRODUCTS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productListAdminReducer = (
  state = { productsListAdmin: [] },
  action
) => {
  switch (action.type) {
    case LIST_PRODUCT_ADMIN_REQUEST:
      return { ...state, loading: true }
    case LIST_PRODUCT_ADMIN_SUCCESS:
      return { loading: false, productsListAdmin: action.payload }
    case LIST_PRODUCT_ADMIN_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
