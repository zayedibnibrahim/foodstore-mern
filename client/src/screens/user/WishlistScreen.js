import React, { useEffect } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listWishes, removeToWish } from '../../actions/userActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import ModalImage from 'react-modal-image'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { REMOVE_WISHLIST_RESET } from '../../constants/userConstants'
import Meta from '../../components/Meta'

const WishlistScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const wishList = useSelector((state) => state.wishList)
  const { wishlistData, loading, error } = wishList

  const wish = useSelector((state) => state.wish)
  const { loadingRemove, successRemove } = wish

  useEffect(() => {
    if (userInfo || successRemove) {
      dispatch(listWishes())
      dispatch({ type: REMOVE_WISHLIST_RESET })
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successRemove])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : wishlistData && !wishlistData.length ? (
    <>
      <Meta title='Food Store | Wishlist' />
      <Message variant='info'>Wishlist empty</Message>
    </>
  ) : (
    <Row>
      <Meta title='Food Store | Wishlist' />
      <h3>WishList: </h3>
      <Col>
        <Table
          striped
          bordered
          hover
          responsive
          className='table-sm'
          variant='dark'
        >
          <thead>
            <tr>
              <th>SL</th>
              <th>IMAGE</th>
              <th>TITLE</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>AVAILABILITY</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {wishlistData &&
              wishlistData.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>
                    <ModalImage
                      small={product.image.url}
                      large={product.image.url}
                      alt={product.title}
                      className='wishImage'
                    />
                  </td>
                  <td>
                    <Link
                      to={`/product/${product.slug}`}
                      style={{
                        color: '#fff',
                        fontWeight: '600',
                      }}
                    >
                      {product.title}
                    </Link>
                  </td>
                  <td>{product.category?.name}</td>
                  <td>
                    {product.price ? (
                      <span className='fs-6'>${product.price}</span>
                    ) : product.variable ? (
                      <span className='fs-6'>
                        ${product.variable.attribute[0].price}- $
                        {
                          product.variable.attribute[
                            product.variable.attribute.length - 1
                          ].price
                        }
                      </span>
                    ) : (
                      'No price'
                    )}
                  </td>
                  <td>
                    {product.availability === 'Yes' ? (
                      <FontAwesomeIcon icon={faCheck} color='green' />
                    ) : (
                      <FontAwesomeIcon icon={faTimes} color='red' />
                    )}
                  </td>
                  <td>
                    <Button
                      onClick={() => dispatch(removeToWish(product._id))}
                      disabled={loadingRemove}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  )
}

export default WishlistScreen
