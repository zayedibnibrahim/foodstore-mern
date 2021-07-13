import React from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../actions/userActions'
import { useHistory } from 'react-router-dom'
const Header = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const logoutHandler = () => {
    dispatch(logOut())
    history.push('/login')
  }

  return (
    <header>
      <Navbar bg='dark' expand='lg' variant='dark' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Food Store</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FontAwesomeIcon icon={faCartPlus} /> Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name}>
                  <LinkContainer to='/user/history'>
                    <NavDropdown.Item>History</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/user/wishlist'>
                    <NavDropdown.Item>Wishlist</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/user/password'>
                    <NavDropdown.Item>Password</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <p style={{ color: '#636e72' }}>{userInfo.email}</p>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    Sign In <FontAwesomeIcon icon={faSignInAlt} />
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.role === 'admin' && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>User list</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/product/create'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/category'>
                    <NavDropdown.Item>Category</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/addon'>
                    <NavDropdown.Item>Addon</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderList'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
