import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { logInUser } from './actions/userActions'
import Footer from './components/Footer'
import Header from './components/Header'
import { auth } from './firebase'
import ForgetPassword from './screens/ForgetPassword'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterCompleteScreen from './screens/RegisterCompleteScreen'
import RegisterScreen from './screens/RegisterScreen'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { token } = await user.getIdTokenResult()
        const { email, displayName } = user

        dispatch(logInUser({ displayName, email, token }))
      }
    })
    return () => unsubscribe()
  }, [dispatch])

  return (
    <>
      <Router>
        <Header></Header>
        <main className='py-3'>
          <Container>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/login' component={LoginScreen} />
            <Route path='/forgot/password' component={ForgetPassword} />
            <Route path='/register' component={RegisterScreen} exact />
            <Route
              path='/register/complete'
              component={RegisterCompleteScreen}
            />
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  )
}

export default App
