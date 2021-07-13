import {
  ADDON_CREATE_FAIL,
  ADDON_CREATE_REQUEST,
  ADDON_CREATE_SUCCESS,
  ADDON_DELETE_FAIL,
  ADDON_DELETE_REQUEST,
  ADDON_DELETE_SUCCESS,
  ADDON_DETAILS_FAIL,
  ADDON_DETAILS_REQUEST,
  ADDON_DETAILS_SUCCESS,
  ADDON_LIST_FAIL,
  ADDON_LIST_REQUEST,
  ADDON_LIST_SUCCESS,
  ADDON_UPDATE_FAIL,
  ADDON_UPDATE_REQUEST,
  ADDON_UPDATE_RESET,
  ADDON_UPDATE_SUCCESS,
} from '../constants/addonConstants'

export const addonCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDON_CREATE_REQUEST:
      return { loading: true }
    case ADDON_CREATE_SUCCESS:
      return { loading: false, success: true }
    case ADDON_CREATE_FAIL:
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

export const addonDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDON_DELETE_REQUEST:
      return { loading: true }
    case ADDON_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ADDON_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const addonDetailsReducer = (state = { addonData: {} }, action) => {
  switch (action.type) {
    case ADDON_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ADDON_DETAILS_SUCCESS:
      return { loading: false, addonData: action.payload }
    case ADDON_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const addonUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDON_UPDATE_REQUEST:
      return { loading: true }
    case ADDON_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case ADDON_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case ADDON_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
