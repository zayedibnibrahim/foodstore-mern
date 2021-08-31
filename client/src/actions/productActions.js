import axios from 'axios'
import {
  COUNT_PRODUCTS_FAIL,
  COUNT_PRODUCTS_REQUEST,
  COUNT_PRODUCTS_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DETAILS_PRODUCT_FAIL,
  DETAILS_PRODUCT_REQUEST,
  DETAILS_PRODUCT_SUCCESS,
  LIST_PRODUCT_ADMIN_FAIL,
  LIST_PRODUCT_ADMIN_REQUEST,
  LIST_PRODUCT_ADMIN_SUCCESS,
  LIST_PRODUCT_FAIL,
  LIST_PRODUCT_REQUEST,
  LIST_PRODUCT_SUCCESS,
  REMOVE_IMAGE_FAIL,
  REMOVE_IMAGE_REQUEST,
  REMOVE_IMAGE_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from '../constants/productConstants'

export const uploadFile = (file) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPLOAD_IMAGE_REQUEST })
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
      `${process.env.REACT_APP_API}/api/upload`,
      { image: file },
      config
    )

    dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const removeFile = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_IMAGE_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.post(`${process.env.REACT_APP_API}/api/remove`, { id }, config)
    dispatch({ type: REMOVE_IMAGE_SUCCESS })
  } catch (error) {
    dispatch({
      type: REMOVE_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST })
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
      `${process.env.REACT_APP_API}/api/product`,
      product,
      config
    )
    dispatch({ type: CREATE_PRODUCT_SUCCESS })
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProduct = (search) => async (dispatch) => {
  try {
    dispatch({ type: LIST_PRODUCT_REQUEST })

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/product?search=${search}`
    )
    dispatch({ type: LIST_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: LIST_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`${process.env.REACT_APP_API}/api/product/${id}`, config)
    dispatch({ type: DELETE_PRODUCT_SUCCESS })
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST })
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
      `${process.env.REACT_APP_API}/api/product/${product.slug}`,
      product,
      config
    )
    dispatch({ type: UPDATE_PRODUCT_SUCCESS })
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const detailsProduct = (slug) => async (dispatch) => {
  try {
    dispatch({ type: DETAILS_PRODUCT_REQUEST })

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/product/${slug}`
    )

    dispatch({ type: DETAILS_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DETAILS_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const CountProduct = () => async (dispatch) => {
  try {
    dispatch({ type: COUNT_PRODUCTS_REQUEST })

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/productCount`
    )
    dispatch({ type: COUNT_PRODUCTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: COUNT_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProductAdmin = (sort, order, page) => async (dispatch) => {
  try {
    dispatch({ type: LIST_PRODUCT_ADMIN_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/productListAdmin`,
      { sort, order, page },
      config
    )
    dispatch({ type: LIST_PRODUCT_ADMIN_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: LIST_PRODUCT_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
