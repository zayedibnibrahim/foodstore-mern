import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { addonCreateReducer, addonListReducer } from './reducers/addonReducers'
import { userListReducer, userLogInReducer } from './reducers/userReducers'

const reducer = combineReducers({
  userLogIn: userLogInReducer,
  userList: userListReducer,
  addonCreate: addonCreateReducer,
  addonList: addonListReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

//initialStates
const initialState = {
  userLogIn: { userInfo: userInfoFromStorage },
}

//Middleware
const middleware = [thunk]

//Store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
