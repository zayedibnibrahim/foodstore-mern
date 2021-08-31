import axios from 'axios'
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  PRODUCT_BY_CATEGORY_FAIL,
  PRODUCT_BY_CATEGORY_REQUEST,
  PRODUCT_BY_CATEGORY_SUCCESS,
  REMOVE_CATEGORY_IMAGE_FAIL,
  REMOVE_CATEGORY_IMAGE_REQUEST,
  REMOVE_CATEGORY_IMAGE_SUCCESS,
  UPLOAD_CATEGORY_IMAGE_FAIL,
  UPLOAD_CATEGORY_IMAGE_REQUEST,
  UPLOAD_CATEGORY_IMAGE_SUCCESS,
} from '../constants/categoryConstants'

export const categoryUploadFile = (file) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPLOAD_CATEGORY_IMAGE_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/category-image-upload`,
      { image: file },
      config
    )

    dispatch({ type: UPLOAD_CATEGORY_IMAGE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: UPLOAD_CATEGORY_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const categoryRemoveFile = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_CATEGORY_IMAGE_REQUEST })
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
      `${process.env.REACT_APP_API}/api/category-image-remove`,
      { id },
      config
    )
    dispatch({ type: REMOVE_CATEGORY_IMAGE_SUCCESS })
  } catch (error) {
    dispatch({
      type: REMOVE_CATEGORY_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_CREATE_REQUEST })
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
      `${process.env.REACT_APP_API}/api/category`,
      category,
      config
    )

    dispatch({ type: CATEGORY_CREATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listCategory = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/category`,
      config
    )

    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteCategory = (slug) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_DELETE_REQUEST })

    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(
      `${process.env.REACT_APP_API}/api/category/${slug}`,
      config
    )

    dispatch({ type: CATEGORY_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const detailsCategory = (slug) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DETAILS_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/category/${slug}`,
      config
    )

    dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_UPDATE_REQUEST })

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
      `${process.env.REACT_APP_API}/api/category/${category.slug}`,
      category,
      config
    )

    dispatch({ type: CATEGORY_UPDATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProductsByCategory = (slug) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_BY_CATEGORY_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/categoryByCategory`,
      { slug },
      config
    )
    dispatch({ type: PRODUCT_BY_CATEGORY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_BY_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
