import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const addToCart =
  (slug, qty, variable = null, addonPd = null) =>
  async (dispatch, getState) => {
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

        addonData: data.addon.length
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
            ? data.variable.attribute.find((pv) => pv._id === variable).price +
              data.addon
                .filter(
                  (adn) => addonPd && addonPd.find((add) => add === adn._id)
                )
                .reduce((acc, item) => acc + item.price, 0)
            : null,
        addonPriceWithQty:
          data.addon.length > 0 &&
          data.addon
            .filter((adn) => addonPd && addonPd.find((add) => add === adn._id))
            .reduce((acc, item) => acc + item.price, 0) * qty,
        addonPrice:
          data.addon.length > 0 &&
          data.addon
            .filter((adn) => addonPd && addonPd.find((add) => add === adn._id))
            .reduce((acc, item) => acc + item.price, 0),
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
