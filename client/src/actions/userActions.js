import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../constants/userConstants'
import { auth } from '../firebase'

export const logInUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    dispatch({ type: USER_LOGIN_SUCCESS, payload: userData })
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error })
  }
}

export const logOut = () => (dispatch) => {
  auth.signOut()
  dispatch({ type: USER_LOGOUT })
}
