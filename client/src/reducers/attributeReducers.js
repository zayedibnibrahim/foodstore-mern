import {
  ATTRIBUTE_CREATE_FAIL,
  ATTRIBUTE_CREATE_REQUEST,
  ATTRIBUTE_CREATE_SUCCESS,
  ATTRIBUTE_DELETE_FAIL,
  ATTRIBUTE_DELETE_REQUEST,
  ATTRIBUTE_DELETE_SUCCESS,
  ATTRIBUTE_DETAILS_FAIL,
  ATTRIBUTE_DETAILS_REQUEST,
  ATTRIBUTE_DETAILS_RESET,
  ATTRIBUTE_DETAILS_SUCCESS,
  ATTRIBUTE_LIST_FAIL,
  ATTRIBUTE_LIST_REQUEST,
  ATTRIBUTE_LIST_SUCCESS,
  ATTRIBUTE_UPDATE_FAIL,
  ATTRIBUTE_UPDATE_REQUEST,
  ATTRIBUTE_UPDATE_RESET,
  ATTRIBUTE_UPDATE_SUCCESS,
} from '../constants/attributeConstants'

export const attributeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ATTRIBUTE_CREATE_REQUEST:
      return { loading: true }
    case ATTRIBUTE_CREATE_SUCCESS:
      return { loading: false, success: true }
    case ATTRIBUTE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const attributeListReducer = (state = { attributes: [] }, action) => {
  switch (action.type) {
    case ATTRIBUTE_LIST_REQUEST:
      return { ...state, loading: true }
    case ATTRIBUTE_LIST_SUCCESS:
      return { loading: false, attributes: action.payload }
    case ATTRIBUTE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const attributeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ATTRIBUTE_DELETE_REQUEST:
      return { loading: true }
    case ATTRIBUTE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ATTRIBUTE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const attributeDetailsReducer = (
  state = { attributeData: {} },
  action
) => {
  switch (action.type) {
    case ATTRIBUTE_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ATTRIBUTE_DETAILS_SUCCESS:
      return { loading: false, attributeData: action.payload }
    case ATTRIBUTE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case ATTRIBUTE_DETAILS_RESET:
      return { loading: false, attributeData: {} }
    default:
      return state
  }
}

export const attributeUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ATTRIBUTE_UPDATE_REQUEST:
      return { loading: true }
    case ATTRIBUTE_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case ATTRIBUTE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case ATTRIBUTE_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
