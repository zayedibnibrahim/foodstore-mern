import React, { useEffect, useState } from 'react'
import FormContainer from '../../components/FormContainer'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { detailsAddon, updateAddon } from '../../actions/addonActions'
import { ADDON_UPDATE_RESET } from '../../constants/addonConstants'
const AddonEditScreen = ({ history, match }) => {
  const addonSlug = match.params.slug
  const [addon, setAddon] = useState('')
  const [price, setPrice] = useState('')

  const dispatch = useDispatch()

  //check logged in user

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const addonDetails = useSelector((state) => state.addonDetails)
  const { addonData, loading, error } = addonDetails

  const addonUpdate = useSelector((state) => state.addonUpdate)
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = addonUpdate

  useEffect(() => {
    if (userInfo && userInfo.role !== 'admin') {
      history.push('/')
    }

    if (successUpdate) {
      dispatch({ type: ADDON_UPDATE_RESET })
      history.push('/admin/addon')
    } else {
      if (!addonData.name || addonData.slug !== addonSlug) {
        dispatch(detailsAddon(addonSlug))
      } else {
        setAddon(addonData.name)
        setPrice(addonData.price)
      }
    }
  }, [dispatch, history, addonSlug, addonData, successUpdate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(updateAddon(addon, price, addonSlug))
  }

  return (
    <>
      <Link to='/admin/addon' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        {successUpdate && <Message variant='success'>Addon Updated</Message>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={submitHandler} className='my-5'>
          <Form.Group controlId='Update addon'>
            <Form.Label>Create Addon</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter addon'
              value={addon}
              onChange={(e) => setAddon(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='price'>
            <Form.Label>Price($)</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price($)'
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
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

export default AddonEditScreen
