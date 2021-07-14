import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProduct } from '../../actions/productActions'
import { Image, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch()
  //check logged in user
  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    if (userInfo && userInfo.role !== 'admin') {
      history.push('/')
    } else {
      dispatch(listProduct())
    }
  }, [dispatch, userInfo, history])

  return (
    <>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>SL No</th>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>ADDONS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>
                <Image
                  src={product.image.url}
                  rounded
                  style={{ width: '40px' }}
                />
              </td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>{product.category.name}</td>
              <td>
                {product.addon.map((a) => (
                  <>
                    <span>{a.name}</span>
                    <br />
                  </>
                ))}
              </td>
              <td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button variant='dark' className='btn-sm'>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </LinkContainer>
                <Button
                  variant='danger'
                  className='btn-sm'
                  // onClick={() => deleteHandler(product._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default ProductListScreen
