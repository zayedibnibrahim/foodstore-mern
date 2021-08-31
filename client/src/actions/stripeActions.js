import axios from 'axios'
import {
  STRIPE_CLIENT_SECRET_FAIL,
  STRIPE_CLIENT_SECRET_REQUEST,
  STRIPE_CLIENT_SECRET_SUCCESS,
} from '../constants/stripeConstants'

export const secretClient = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STRIPE_CLIENT_SECRET_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/create-payment-intent`,
      {},
      config
    )
    dispatch({ type: STRIPE_CLIENT_SECRET_SUCCESS, payload: data.clientSecret })
  } catch (error) {
    dispatch({
      type: STRIPE_CLIENT_SECRET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
