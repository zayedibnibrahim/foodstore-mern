import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { currentUser } from './actions/userActions'
import Footer from './components/Footer'
import Header from './components/Header'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from './constants/userConstants'
import { auth } from './firebase'
import AddonScreen from './screens/admin/AddonScreen'
import AddonEditScreen from './screens/admin/AddonEditScreen'
import CategoryEditScreen from './screens/admin/CategoryEditScreen'
import CategoryScreen from './screens/admin/CategoryScreen'
import UserListScreen from './screens/admin/UserListScreen'
import ForgetPasswordScreen from './screens/ForgetPasswordScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterCompleteScreen from './screens/RegisterCompleteScreen'
import RegisterScreen from './screens/RegisterScreen'
import HistoryScreen from './screens/user/HistoryScreen'
import PasswordScreen from './screens/user/PasswordScreen'
import wishlistScreen from './screens/user/WishlistScreen'
import ProductCreateScreen from './screens/admin/ProductCreateScreen'
import ProductListScreen from './screens/admin/ProductListScreen'
import ProductEditScreen from './screens/admin/ProductEditScreen'
import VariableCreateScreen from './screens/admin/VariableCreateScreen'
import AttributeScreen from './screens/admin/AttributeScreen'
import AttributeEditScreen from './screens/admin/AttributeEditScreen'
import VariableEditScreen from './screens/admin/VariableEditScreen'
import CategoryArchiveScreen from './screens/CategoryArchiveScreen'
import SingleProductScreen from './screens/SingleProductScreen'
import CartScreen from './screens/CartScreen'
import CheckoutScreen from './screens/CheckoutScreen'
import CouponScreen from './screens/admin/CouponScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderDetailsScreen from './screens/OrderDetailsScreen'

function App() {
  const dispatch = useDispatch()

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({ type: USER_LOGIN_REQUEST })
            dispatch({
              type: USER_LOGIN_SUCCESS,
              payload: {
                name: res.name,
                email: res.email,
                token: idTokenResult.token,
                role: res.role,
                _id: res._id,
                shipping: res.shipping,
              },
            })
          })
          .catch((err) => {
            dispatch({ type: USER_LOGIN_FAIL, payload: err })
          })
      }
    })
    // cleanup
    return () => unsubscribe()
  }, [dispatch])
  return (
    <>
      <Header></Header>
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/register' component={RegisterScreen} exact />
            <Route path='/login' component={LoginScreen} />
            <Route path='/forgot/password' component={ForgetPasswordScreen} />
            <Route
              path='/register/complete'
              component={RegisterCompleteScreen}
            />
            <Route path='/user/history' component={HistoryScreen} exact />
            <Route path='/user/wishlist' component={wishlistScreen} exact />
            <Route path='/user/password' component={PasswordScreen} exact />
            <Route path='/admin/userlist' component={UserListScreen} exact />
            <Route path='/admin/category' component={CategoryScreen} exact />
            <Route
              path='/admin/category/:slug/edit'
              component={CategoryEditScreen}
              exact
            />
            <Route
              path='/category/:slug'
              component={CategoryArchiveScreen}
              exact
            />
            <Route path='/admin/addon' component={AddonScreen} exact />
            <Route
              path='/admin/addon/:slug/edit'
              component={AddonEditScreen}
              exact
            />
            <Route path='/admin/products' component={ProductListScreen} exact />
            <Route
              path='/admin/product/create'
              component={ProductCreateScreen}
              exact
            />
            <Route
              path='/admin/product/:slug/edit'
              component={ProductEditScreen}
              exact
            />
            <Route path='/admin/attribute' component={AttributeScreen} exact />
            <Route
              path='/admin/attribute/:id/edit'
              component={AttributeEditScreen}
              exact
            />
            <Route
              path='/admin/variables'
              component={VariableCreateScreen}
              exact
            />
            <Route
              path='/admin/variable/:id/edit'
              component={VariableEditScreen}
              exact
            />
            <Route path='/admin/coupon' component={CouponScreen} />
            <Route
              path='/product/:slug'
              component={SingleProductScreen}
              exact
            />
            <Route path='/cart' component={CartScreen} />
            <Route path='/checkout' component={CheckoutScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={OrderDetailsScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
