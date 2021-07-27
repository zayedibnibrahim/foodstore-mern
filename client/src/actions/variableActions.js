import axios from 'axios'
import {
  VARIABLE_CREATE_FAIL,
  VARIABLE_CREATE_REQUEST,
  VARIABLE_CREATE_SUCCESS,
  VARIABLE_LIST_FAIL,
  VARIABLE_LIST_REQUEST,
  VARIABLE_LIST_SUCCESS,
} from '../constants/variableConstants'

export const createVariable = (variable) => async (dispatch, getState) => {
  try {
    dispatch({ type: VARIABLE_CREATE_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.post('/api/variable', variable, config)

    dispatch({ type: VARIABLE_CREATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: VARIABLE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listVariable = () => async (dispatch) => {
  try {
    dispatch({ type: VARIABLE_LIST_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get('/api/variable', config)

    dispatch({ type: VARIABLE_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: VARIABLE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
