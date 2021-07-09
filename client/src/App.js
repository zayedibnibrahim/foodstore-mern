import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { currentUser } from './actions/userActions'
import Footer from './components/Footer'
import Header from './components/Header'
import { USER_LOGIN_SUCCESS } from './constants/userConstants'
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

function App() {
  const dispatch = useDispatch()

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: USER_LOGIN_SUCCESS,
              payload: {
                name: res.name,
                email: res.email,
                token: idTokenResult.token,
                role: res.role,
                _id: res._id,
              },
            })
          })
          .catch((err) => console.log(err))
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
            <Route path='/admin/addon' component={AddonScreen} exact />
            <Route
              path='/admin/addon/:slug/edit'
              component={AddonEditScreen}
              exact
            />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
