import {
  VARIABLE_CREATE_FAIL,
  VARIABLE_CREATE_REQUEST,
  VARIABLE_CREATE_SUCCESS,
  VARIABLE_DELETE_FAIL,
  VARIABLE_DELETE_REQUEST,
  VARIABLE_DELETE_SUCCESS,
  VARIABLE_DETAILS_FAIL,
  VARIABLE_DETAILS_REQUEST,
  VARIABLE_DETAILS_RESET,
  VARIABLE_DETAILS_SUCCESS,
  VARIABLE_LIST_FAIL,
  VARIABLE_LIST_REQUEST,
  VARIABLE_LIST_SUCCESS,
  VARIABLE_UPDATE_FAIL,
  VARIABLE_UPDATE_REQUEST,
  VARIABLE_UPDATE_RESET,
  VARIABLE_UPDATE_SUCCESS,
} from '../constants/variableConstants'

export const variableCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VARIABLE_CREATE_REQUEST:
      return { loading: true }
    case VARIABLE_CREATE_SUCCESS:
      return { loading: false, success: true }
    case VARIABLE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const variableListReducer = (state = { variables: [] }, action) => {
  switch (action.type) {
    case VARIABLE_LIST_REQUEST:
      return { ...state, loading: true }
    case VARIABLE_LIST_SUCCESS:
      return { loading: false, variables: action.payload }
    case VARIABLE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const variableDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case VARIABLE_DELETE_REQUEST:
      return { loading: true }
    case VARIABLE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case VARIABLE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const variableDetailsReducer = (
  state = { variableData: {} },
  action
) => {
  switch (action.type) {
    case VARIABLE_DETAILS_REQUEST:
      return { ...state, loading: true }
    case VARIABLE_DETAILS_SUCCESS:
      return { loading: false, variableData: action.payload }
    case VARIABLE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case VARIABLE_DETAILS_RESET:
      return { loading: false, variableData: {} }
    default:
      return state
  }
}

export const variableUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case VARIABLE_UPDATE_REQUEST:
      return { loading: true }
    case VARIABLE_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case VARIABLE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case VARIABLE_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
