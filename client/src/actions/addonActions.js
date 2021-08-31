import axios from 'axios'
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
  ADDON_UPDATE_SUCCESS,
} from '../constants/addonConstants'

export const createAddon = (addon, price) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADDON_CREATE_REQUEST })
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
      `${process.env.REACT_APP_API}/api/addon`,
      { name: addon, price },
      config
    )

    dispatch({ type: ADDON_CREATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: ADDON_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listAddon = () => async (dispatch) => {
  try {
    dispatch({ type: ADDON_LIST_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/addon`,
      config
    )

    dispatch({ type: ADDON_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ADDON_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteAddon = (slug) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADDON_DELETE_REQUEST })

    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`${process.env.REACT_APP_API}/api/addon/${slug}`, config)

    dispatch({ type: ADDON_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: ADDON_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const detailsAddon = (slug) => async (dispatch) => {
  try {
    dispatch({ type: ADDON_DETAILS_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/addon/${slug}`,
      config
    )

    dispatch({ type: ADDON_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ADDON_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateAddon =
  (newAddon, price, slug) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADDON_UPDATE_REQUEST })

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
        `${process.env.REACT_APP_API}/api/addon/${slug}`,
        { name: newAddon, price },
        config
      )

      dispatch({ type: ADDON_UPDATE_SUCCESS })
    } catch (error) {
      dispatch({
        type: ADDON_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
