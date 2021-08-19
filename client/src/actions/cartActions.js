import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_DB_FAIL,
  CART_DB_REQUEST,
  CART_DB_SUCCESS,
  CART_LIST_FAIL,
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_REMOVE_ITEM,
} from '../constants/cartConstants'

export const addToCart =
  (slug, qty, variable = null, addonPd = null) =>
  async (dispatch, getState) => {
    if (slug || qty || variable || addonPd) {
      const { data } = await axios.get(`/api/product/${slug}`)

      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          product: data._id,
          slug: data.slug,
          title: data.title,
          image: data.image.url,
          qty,
          variableData:
            data.variable &&
            data.variable.attribute.find((pv) => pv._id === variable),

          addonData:
            data.addon.length && addonPd
              ? data.addon.filter(
                  (adn) => addonPd && addonPd.find((add) => add === adn._id)
                )
              : null,
          price:
            data.price &&
            (data.addon.filter(
              (adn) => addonPd && addonPd.find((add) => add === adn._id)
            ).length === 0 ||
              !data.addon.filter(
                (adn) => addonPd && addonPd.find((add) => add === adn._id)
              ))
              ? data.price
              : data.variable && (data.addon.length === 0 || !data.addon)
              ? data.variable.attribute.find((pv) => pv._id === variable).price
              : data.price &&
                data.addon.filter(
                  (adn) => addonPd && addonPd.find((add) => add === adn._id)
                ).length > 0
              ? data.price +
                data.addon
                  .filter(
                    (adn) => addonPd && addonPd.find((add) => add === adn._id)
                  )
                  .reduce((acc, item) => acc + item.price, 0)
              : data.variable && data.addon.length > 0
              ? data.variable.attribute.find((pv) => pv._id === variable)
                  .price +
                data.addon
                  .filter(
                    (adn) => addonPd && addonPd.find((add) => add === adn._id)
                  )
                  .reduce((acc, item) => acc + item.price, 0)
              : null,
          addonPriceWithQty:
            data.addon.length > 0 &&
            data.addon
              .filter(
                (adn) => addonPd && addonPd.find((add) => add === adn._id)
              )
              .reduce((acc, item) => acc + item.price, 0) * qty,
          addonPrice:
            data.addon.length > 0 &&
            data.addon
              .filter(
                (adn) => addonPd && addonPd.find((add) => add === adn._id)
              )
              .reduce((acc, item) => acc + item.price, 0),
        },
      })
    }

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }

export const removeFromCart = (slug) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: slug,
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const dbCart = (cart) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_DB_REQUEST })

    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post('/api/cart', { cart }, config)
    dispatch({ type: CART_DB_SUCCESS })
  } catch (error) {
    dispatch({
      type: CART_DB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_LIST_REQUEST })

    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/cart', config)
    dispatch({ type: CART_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CART_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
