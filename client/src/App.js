import React, { lazy, Suspense } from 'react'
import { Container, Image } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import loadingGif from './image/Bean Eater-1s-207px.gif'

const Footer = lazy(() => import('./components/Footer'))
const Header = lazy(() => import('./components/Header'))
const AddonEditScreen = lazy(() => import('./screens/admin/AddonEditScreen'))
const AddonScreen = lazy(() => import('./screens/admin/AddonScreen'))
const CategoryEditScreen = lazy(() =>
  import('./screens/admin/CategoryEditScreen')
)
const CategoryScreen = lazy(() => import('./screens/admin/CategoryScreen'))
const UserListScreen = lazy(() => import('./screens/admin/UserListScreen'))
const ForgetPasswordScreen = lazy(() =>
  import('./screens/ForgetPasswordScreen')
)
const HomeScreen = lazy(() => import('./screens/HomeScreen'))
const LoginScreen = lazy(() => import('./screens/LoginScreen'))
const RegisterCompleteScreen = lazy(() =>
  import('./screens/RegisterCompleteScreen')
)
const RegisterScreen = lazy(() => import('./screens/RegisterScreen'))
const PasswordScreen = lazy(() => import('./screens/user/PasswordScreen'))
const WishlistScreen = lazy(() => import('./screens/user/WishlistScreen'))
const ProductCreateScreen = lazy(() =>
  import('./screens/admin/ProductCreateScreen')
)
const ProductListScreen = lazy(() =>
  import('./screens/admin/ProductListScreen')
)
const ProductEditScreen = lazy(() =>
  import('./screens/admin/ProductEditScreen')
)
const VariableCreateScreen = lazy(() =>
  import('./screens/admin/VariableCreateScreen')
)
const AttributeScreen = lazy(() => import('./screens/admin/AttributeScreen'))
const AttributeEditScreen = lazy(() =>
  import('./screens/admin/AttributeEditScreen')
)
const VariableEditScreen = lazy(() =>
  import('./screens/admin/VariableEditScreen')
)
const CategoryArchiveScreen = lazy(() =>
  import('./screens/CategoryArchiveScreen')
)
const SingleProductScreen = lazy(() => import('./screens/SingleProductScreen'))
const CartScreen = lazy(() => import('./screens/CartScreen'))
const CheckoutScreen = lazy(() => import('./screens/CheckoutScreen'))
const CouponScreen = lazy(() => import('./screens/admin/CouponScreen'))
const PlaceOrderScreen = lazy(() => import('./screens/PlaceOrderScreen'))
const OrderDetailsScreen = lazy(() => import('./screens/OrderDetailsScreen'))
const OrderHistoryScreen = lazy(() =>
  import('./screens/user/OrderHistoryScreen')
)
const ManageOrderScreen = lazy(() =>
  import('./screens/admin/ManageOrderScreen')
)
const UserDetailsScreen = lazy(() =>
  import('./screens/admin/UserDetailsScreen')
)

function App() {
  // const dispatch = useDispatch()

  // // to check firebase auth state
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //     if (user) {
  //       const idTokenResult = await user.getIdTokenResult()

  //       currentUser(idTokenResult.token)
  //         .then((res) => {
  //           dispatch({ type: USER_LOGIN_REQUEST })
  //           dispatch({
  //             type: USER_LOGIN_SUCCESS,
  //             payload: {
  //               name: res.name,
  //               email: res.email,
  //               token: idTokenResult.token,
  //               role: res.role,
  //               _id: res._id,
  //               shipping: res.shipping,
  //             },
  //           })
  //         })
  //         .catch((err) => {
  //           dispatch({ type: USER_LOGIN_FAIL, payload: err })
  //         })
  //     }
  //   })
  //   // cleanup
  //   return () => unsubscribe()
  // }, [dispatch])
  return (
    <Suspense
      fallback={
        <div
          className='d-flex align-items-center justify-content-center'
          style={{ height: '100vh' }}
        >
          <Image src={loadingGif} alt='loader' className='w-md-75 w-sm-25' />
        </div>
      }
    >
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
            <Route
              path='/user/orderhistory'
              component={OrderHistoryScreen}
              exact
            />
            <Route path='/user/wishlist' component={WishlistScreen} exact />
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
            <Route path='/admin/manageorder' component={ManageOrderScreen} />
            <Route
              path='/product/:slug'
              component={SingleProductScreen}
              exact
            />
            <Route path='/cart' component={CartScreen} />
            <Route path='/checkout' component={CheckoutScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={OrderDetailsScreen} />
            <Route path='/admin/user/:id' component={UserDetailsScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Suspense>
  )
}

export default App
