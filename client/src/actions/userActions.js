import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from '../constants/userConstants'

export const logInUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    dispatch({ type: USER_LOGIN_SUCCESS, payload: userData })
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error })
  }
}
