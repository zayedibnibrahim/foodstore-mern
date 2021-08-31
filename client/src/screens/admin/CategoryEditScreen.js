import React, { useEffect, useState } from 'react'
import FormContainer from '../../components/FormContainer'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { detailsCategory, updateCategory } from '../../actions/categoryActions'
import {
  CATEGORY_DETAILS_RESET,
  CATEGORY_UPDATE_RESET,
  UPLOAD_CATEGORY_IMAGE_RESET,
} from '../../constants/categoryConstants'
import CategoryImageUploader from '../../components/form/CategoryImageUploader'
const CategoryEditScreen = ({ history, match }) => {
  const categorySlug = match.params.slug
  const [category, setCategory] = useState('')
  const [image, setImage] = useState({})

  const dispatch = useDispatch()

  //check logged in user

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { categoryData, loading, error } = categoryDetails

  const categoryUpdate = useSelector((state) => state.categoryUpdate)
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = categoryUpdate

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      if (successUpdate) {
        dispatch({ type: CATEGORY_UPDATE_RESET })
        dispatch({ type: UPLOAD_CATEGORY_IMAGE_RESET })
        dispatch({ type: CATEGORY_DETAILS_RESET })
        history.push('/admin/category')
      } else {
        if (!categoryData.name || categoryData.slug !== categorySlug) {
          dispatch(detailsCategory(categorySlug))
        } else {
          setCategory(categoryData.name)
          setImage(categoryData.image)
        }
      }
    } else {
      history.push('/')
    }
  }, [dispatch, history, categorySlug, categoryData, successUpdate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(updateCategory({ name: category, image, slug: categorySlug }))
  }

  return (
    <>
      <Link to='/admin/category' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        {successUpdate && <Message variant='success'>Category Updated</Message>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={submitHandler} className='my-5'>
          <Form.Group controlId='Update category'>
            <Form.Group controlId='image' className='mt-1'>
              <CategoryImageUploader setImage={setImage} image={image} />
            </Form.Group>
            <Form.Label>Category</Form.Label>
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
            Update {loadingUpdate && <Loader size='size-sm' />}
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default CategoryEditScreen
