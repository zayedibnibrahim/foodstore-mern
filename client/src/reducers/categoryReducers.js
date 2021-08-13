import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_RESET,
  CATEGORY_UPDATE_SUCCESS,
  PRODUCT_BY_CATEGORY_FAIL,
  PRODUCT_BY_CATEGORY_REQUEST,
  PRODUCT_BY_CATEGORY_SUCCESS,
} from '../constants/categoryConstants'

export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { loading: true }
    case CATEGORY_CREATE_SUCCESS:
      return { loading: false, success: true }
    case CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { ...state, loading: true }
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload }
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true }
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const categoryDetailsReducer = (
  state = { categoryData: {} },
  action
) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return { ...state, loading: true }
    case CATEGORY_DETAILS_SUCCESS:
      return { loading: false, categoryData: action.payload }
    case CATEGORY_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const categoryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST:
      return { loading: true }
    case CATEGORY_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case CATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case CATEGORY_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const productGetByCategoryReducer = (
  state = { products: [], categoryName: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_BY_CATEGORY_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_BY_CATEGORY_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        categoryName: action.payload.category,
      }
    case PRODUCT_BY_CATEGORY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
