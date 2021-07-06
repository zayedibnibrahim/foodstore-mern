import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { currentUser } from './actions/userActions'
import Footer from './components/Footer'
import Header from './components/Header'
import { USER_LOGIN_SUCCESS } from './constants/userConstants'
import { auth } from './firebase'
import ForgetPassword from './screens/ForgetPassword'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterCompleteScreen from './screens/RegisterCompleteScreen'
import RegisterScreen from './screens/RegisterScreen'
import History from './screens/user/History'

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
            <Route path='/user/history' component={History} exact />
            <Route path='/register' component={RegisterScreen} exact />
            <Route path='/login' component={LoginScreen} />
            <Route path='/forgot/password' component={ForgetPassword} />
            <Route
              path='/register/complete'
              component={RegisterCompleteScreen}
            />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
