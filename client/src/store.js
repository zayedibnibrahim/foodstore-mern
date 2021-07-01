import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { addonCreateReducer, addonListReducer } from './reducers/addonReducers'
import { userLogInReducer } from './reducers/userReducers'

const reducer = combineReducers({
  userLogIn: userLogInReducer,
  addonCreate: addonCreateReducer,
  addonList: addonListReducer,
})

//initialStates
const initialState = {}

//Middleware
const middleware = [thunk]

//Store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
