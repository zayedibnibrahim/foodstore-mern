import {
  ADDON_LIST_FAIL,
  ADDON_LIST_REQUEST,
  ADDON_LIST_SUCCESS,
  CREATE_ADDON_FAIL,
  CREATE_ADDON_REQUEST,
  CREATE_ADDON_SUCCESS,
} from '../constants/addonConstants'

export const addonCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ADDON_REQUEST:
      return { loading: true }
    case CREATE_ADDON_SUCCESS:
      return { loading: false, success: true }
    case CREATE_ADDON_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const addonListReducer = (state = { addons: [] }, action) => {
  switch (action.type) {
    case ADDON_LIST_REQUEST:
      return { ...state, loading: true }
    case ADDON_LIST_SUCCESS:
      return { loading: false, addons: action.payload }
    case ADDON_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
