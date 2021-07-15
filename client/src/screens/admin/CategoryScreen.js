import React, { useEffect, useState } from 'react'
import FormContainer from '../../components/FormContainer'
import ItemSearch from '../../components/ItemSearch'
import { Form, Button, Row, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LinkContainer } from 'react-router-bootstrap'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  createCategory,
  deleteCategory,
  listCategory,
} from '../../actions/categoryActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

const CategoryScreen = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')

  //check logged in user
  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  //showCategory list
  const categoryList = useSelector((state) => state.categoryList)
  const {
    loading: loadingCategory,
    categories,
    error: errorCategory,
  } = categoryList

  const dispatch = useDispatch()

  //delete category
  const categoryDelete = useSelector((state) => state.categoryDelete)
  const { success: successDelete } = categoryDelete

  //create category
  const categoryCreate = useSelector((state) => state.categoryCreate)
  const { loading, success, error } = categoryCreate

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch(listCategory())
    } else {
      history.push('/')
    }
  }, [dispatch, userInfo, history, success, successDelete])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createCategory(category))
    setCategory('')
  }

  const deleteHandler = (slug) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteCategory(slug))
    }
  }

  const searched = (keyword) => (category) =>
    category.name.toLowerCase().includes(keyword)
  return (
    <>
      <FormContainer>
        {success && <Message variant='success'>Category Added</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={submitHandler} className='my-5'>
          <Form.Group controlId='category'>
            <Form.Label>Create Category</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            type='submit'
            variant='primary'
            className='my-3'
            disabled={loading}
          >
            Create {loading && <Loader size='size-sm' />}
          </Button>
        </Form>
      </FormContainer>
      <Row>
        {loadingCategory ? (
          <Loader />
        ) : errorCategory ? (
          <Message variant='danger'>{errorCategory}</Message>
        ) : (
          <>
            <ItemSearch setKeyword={setKeyword} keyword={keyword} />
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
                  <th>NAME</th>
                  <th>SLUG</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {categories.filter(searched(keyword)).map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{category.slug}</td>
                    <td>
                      <LinkContainer
                        to={`/admin/category/${category.slug}/edit`}
                      >
                        <Button variant='dark' className='btn-sm'>
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(category.slug)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Row>
    </>
  )
}

export default CategoryScreen
