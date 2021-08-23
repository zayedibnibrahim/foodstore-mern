import {
  STRIPE_CLIENT_SECRET_FAIL,
  STRIPE_CLIENT_SECRET_REQUEST,
  STRIPE_CLIENT_SECRET_SUCCESS,
} from '../constants/stripeConstants'

export const stripeClientSecretReducer = (
  state = { clientSecret: null },
  action
) => {
  switch (action.type) {
    case STRIPE_CLIENT_SECRET_REQUEST:
      return { ...state, loading: true }
    case STRIPE_CLIENT_SECRET_SUCCESS:
      return { loading: false, clientSecret: action.payload }
    case STRIPE_CLIENT_SECRET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
