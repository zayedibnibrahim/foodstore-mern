import axios from 'axios'
import {
  VARIABLE_CREATE_FAIL,
  VARIABLE_CREATE_REQUEST,
  VARIABLE_CREATE_SUCCESS,
  VARIABLE_DELETE_FAIL,
  VARIABLE_DELETE_REQUEST,
  VARIABLE_DELETE_SUCCESS,
  VARIABLE_DETAILS_FAIL,
  VARIABLE_DETAILS_REQUEST,
  VARIABLE_DETAILS_SUCCESS,
  VARIABLE_LIST_FAIL,
  VARIABLE_LIST_REQUEST,
  VARIABLE_LIST_SUCCESS,
  VARIABLE_UPDATE_FAIL,
  VARIABLE_UPDATE_REQUEST,
  VARIABLE_UPDATE_SUCCESS,
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
    await axios.post(
      `${process.env.REACT_APP_API}/api/variable`,
      variable,
      config
    )

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
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/variable`,
      config
    )

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

export const deleteVariable = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: VARIABLE_DELETE_REQUEST })

    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(
      `${process.env.REACT_APP_API}/api/variable/${id}`,
      config
    )

    dispatch({ type: VARIABLE_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: VARIABLE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const detailsVariable = (id) => async (dispatch) => {
  try {
    dispatch({ type: VARIABLE_DETAILS_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/variable/${id}`,
      config
    )

    dispatch({ type: VARIABLE_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: VARIABLE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateVariable = (variable) => async (dispatch, getState) => {
  const { label: name, attribute, variableId } = variable
  try {
    dispatch({ type: VARIABLE_UPDATE_REQUEST })

    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put(
      `${process.env.REACT_APP_API}/api/variable/${variableId}`,
      { name, attribute },
      config
    )

    dispatch({ type: VARIABLE_UPDATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: VARIABLE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
