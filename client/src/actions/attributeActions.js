import axios from 'axios'
import {
  ATTRIBUTE_CREATE_FAIL,
  ATTRIBUTE_CREATE_REQUEST,
  ATTRIBUTE_CREATE_SUCCESS,
  ATTRIBUTE_DELETE_FAIL,
  ATTRIBUTE_DELETE_REQUEST,
  ATTRIBUTE_DELETE_SUCCESS,
  ATTRIBUTE_DETAILS_FAIL,
  ATTRIBUTE_DETAILS_REQUEST,
  ATTRIBUTE_DETAILS_SUCCESS,
  ATTRIBUTE_LIST_FAIL,
  ATTRIBUTE_LIST_REQUEST,
  ATTRIBUTE_LIST_SUCCESS,
  ATTRIBUTE_UPDATE_FAIL,
  ATTRIBUTE_UPDATE_REQUEST,
  ATTRIBUTE_UPDATE_SUCCESS,
} from '../constants/attributeConstants'

export const createAttribute =
  (attribute, price, product) => async (dispatch, getState) => {
    try {
      dispatch({ type: ATTRIBUTE_CREATE_REQUEST })
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
        `${process.env.REACT_APP_API}/api/attribute`,
        { name: attribute, price, product },
        config
      )

      dispatch({ type: ATTRIBUTE_CREATE_SUCCESS })
    } catch (error) {
      dispatch({
        type: ATTRIBUTE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listAttribute = () => async (dispatch) => {
  try {
    dispatch({ type: ATTRIBUTE_LIST_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/attribute`,
      config
    )

    dispatch({ type: ATTRIBUTE_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ATTRIBUTE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteAttribute = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ATTRIBUTE_DELETE_REQUEST })

    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(
      `${process.env.REACT_APP_API}/api/attribute/${id}`,
      config
    )

    dispatch({ type: ATTRIBUTE_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: ATTRIBUTE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const detailsAttribute = (id) => async (dispatch) => {
  try {
    dispatch({ type: ATTRIBUTE_DETAILS_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/attribute/${id}`,
      config
    )

    dispatch({ type: ATTRIBUTE_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ATTRIBUTE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateAttribute =
  (newAttribute, price, product, attributeId) => async (dispatch, getState) => {
    try {
      dispatch({ type: ATTRIBUTE_UPDATE_REQUEST })

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
        `${process.env.REACT_APP_API}/api/attribute/${attributeId}`,
        { name: newAttribute, price, product },
        config
      )

      dispatch({ type: ATTRIBUTE_UPDATE_SUCCESS })
    } catch (error) {
      dispatch({
        type: ATTRIBUTE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
