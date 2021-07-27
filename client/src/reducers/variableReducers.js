import {
  VARIABLE_CREATE_FAIL,
  VARIABLE_CREATE_REQUEST,
  VARIABLE_CREATE_SUCCESS,
  VARIABLE_LIST_FAIL,
  VARIABLE_LIST_REQUEST,
  VARIABLE_LIST_SUCCESS,
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
