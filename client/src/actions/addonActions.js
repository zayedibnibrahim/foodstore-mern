import axios from 'axios'
import {
  ADDON_LIST_FAIL,
  ADDON_LIST_REQUEST,
  ADDON_LIST_SUCCESS,
  CREATE_ADDON_FAIL,
  CREATE_ADDON_REQUEST,
  CREATE_ADDON_SUCCESS,
} from '../constants/addonConstants'

export const createAddon = (addon) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ADDON_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    await axios.post('/api/addon', { addon }, config)

    dispatch({ type: CREATE_ADDON_SUCCESS })
  } catch (error) {
    dispatch({
      type: CREATE_ADDON_FAIL,
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

    const { data } = await axios.get('/api/addon')
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
