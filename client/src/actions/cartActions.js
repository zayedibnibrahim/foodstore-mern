import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const addToCart =
  (slug, qty, variable, addon) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/product/${slug}`)

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        title: data.title,
        image: data.image.url,
        price: data.price,
        qty,
        variable,
        addon,
      },
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }

export const removeFromCart = (slug) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: slug,
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
