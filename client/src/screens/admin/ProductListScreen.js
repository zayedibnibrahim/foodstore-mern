import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CountProduct,
  deleteProduct,
  listProductAdmin,
} from '../../actions/productActions'
import { Image, Button, Row, Col, Table, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useAlert } from 'react-alert'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
import ItemSearch from '../../components/ItemSearch'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

const ProductListScreen = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState('category')
  const [order, setOrder] = useState('asc')

  const [page, setPage] = useState(1)
  const alert = useAlert()
  const dispatch = useDispatch()
  //check logged in user
  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const productCount = useSelector((state) => state.productCount)
  const { productsCount } = productCount

  const productListAdmin = useSelector((state) => state.productListAdmin)
  const { loading, error, productsListAdmin } = productListAdmin

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch(CountProduct())
      dispatch(listProductAdmin(sort, order, page))
      if (successDelete) {
        alert.success('Product Deleted')
        dispatch({ type: DELETE_PRODUCT_RESET })
      }
    } else {
      history.push('/')
    }
  }, [dispatch, userInfo, history, successDelete, alert, page, sort, order])

  const deleteHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteProduct(id))
    }
  }
  const searched = (keyword) => (item) =>
    item.title.toLowerCase().includes(keyword)

  const handlePageChange = (data) => {
    setPage(data.selected + 1)
  }
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col>
          {loading && <Loader />}
          {loadingDelete && <Loader />}
        </Col>
        <Col className='d-flex justify-content-end'>
          <Link to='/admin/product/create' className='btn btn-dark my-3'>
            Create New
          </Link>
        </Col>
      </Row>
      <Row className='align-items-center my-2'>
        <Col>
          <h5>Filter</h5>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Form.Group controlId='filter'>
            <Form.Control
              onChange={(e) => setSort(e.target.value)}
              as='select'
              value={sort}
            >
              <option value='category'>Category</option>
              <option value='title'>Title</option>
              <option value='createdAt'>Created At</option>
              <option value='updatedAt'>Updated At</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='Order'>
            <Form.Control
              onChange={(e) => setOrder(e.target.value)}
              as='select'
              value={order}
            >
              <option value='asc'>ASC</option>
              <option value='desc'>DESC</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {error && <Message variant='danger'>{error}</Message>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        <ItemSearch setKeyword={setKeyword} keyword={keyword} />
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>DELIVERY</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>ADDONS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {productsListAdmin
              .filter(searched(keyword))
              .map((product, index) => (
                <tr key={product._id}>
                  <td>
                    <Image
                      src={product.image.url}
                      rounded
                      style={{ width: '40px' }}
                    />
                  </td>
                  <td>
                    {product.availability === 'No' ? (
                      <span style={{ color: 'red', fontWeight: '800' }}>
                        {product.title}
                      </span>
                    ) : (
                      <span style={{ color: '#000', fontWeight: '600' }}>
                        {product.title}
                      </span>
                    )}
                  </td>
                  <td>
                    {product.delivery === 'Yes' ? (
                      <FontAwesomeIcon icon={faCheckCircle} color='green' />
                    ) : (
                      <FontAwesomeIcon icon={faCheckCircle} color='red' />
                    )}
                  </td>
                  <td>
                    {product.price ? (
                      <span>${product.price}</span>
                    ) : product.variable && product.variable.attribute ? (
                      product.variable.attribute.map((attr) => (
                        <span key={attr._id}>
                          Attr: ${attr.price}
                          <br />
                        </span>
                      ))
                    ) : (
                      'No Price'
                    )}
                  </td>
                  <td>{product.category.name}</td>
                  <td>
                    {product.addon.map((a) => (
                      <span key={a._id}>
                        {a.name}
                        <br />
                      </span>
                    ))}
                  </td>
                  <td className='d-flex justify-content-around'>
                    <LinkContainer to={`/admin/product/${product.slug}/edit`}>
                      <Button variant='dark' className='btn-sm'>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakClassName={'break-me'}
          breakLabel={'....'}
          pageCount={Math.ceil(productsCount / 10)}
          onPageChange={handlePageChange}
          marginPagesDisplayed={5}
          pageRangeDisplayed={10}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </Row>
    </>
  )
}

export default ProductListScreen
