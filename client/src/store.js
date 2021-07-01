import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { addonCreateReducer, addonListReducer } from './reducers/addonReducers'

const reducer = combineReducers({
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
