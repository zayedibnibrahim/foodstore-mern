import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Table } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import Message from '../../components/Message'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Loader from '../../components/Loader'
import ItemSearch from '../../components/ItemSearch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { createCoupon } from '../../actions/couponActions'
import { useAlert } from 'react-alert'
import { COUPON_CREATE_RESET } from '../../constants/couponConstants'
const CouponScreen = () => {
  const alert = useAlert()
  const [name, setName] = useState('')
  const [expiry, setExpiry] = useState(new Date())
  const [discount, setDiscount] = useState('')
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch()

  const couponCreate = useSelector((state) => state.couponCreate)
  const { loading, success, error } = couponCreate

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createCoupon({ name, expiry, discount }))
  }

  useEffect(() => {
    if (success) {
      alert.success('Coupon Created')
      setName('')
      setExpiry(new Date())
      setDiscount('')
      dispatch({ type: COUPON_CREATE_RESET })
    }
  }, [alert, success, dispatch])
  return (
    <>
      <FormContainer>
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={handleSubmit} className='my-5'>
          <Form.Group controlId='name'>
            <Form.Label>Coupon</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Coupon'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='expire'>
            <Form.Label>Expire</Form.Label>
            <DatePicker
              selected={expiry}
              onChange={(date) => setExpiry(date)}
            />
          </Form.Group>
          <Form.Group controlId='discount'>
            <Form.Label>Discount %</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter discount (%)'
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            type='submit'
            variant='primary'
            className='my-3'
            // disabled={loading}
          >
            Create Coupon
            {/* {loading && <Loader size='size-sm' />} */}
          </Button>
        </Form>
      </FormContainer>
      {/* <Row>
        {loadingAddon ? (
          <Loader />
        ) : errorAddon ? (
          <Message variant='danger'>{errorAddon}</Message>
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
                  <th>PRICE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {addons.filter(searched(keyword)).map((addon) => (
                  <tr key={addon._id}>
                    <td>{addon.name}</td>
                    <td>{addon.slug}</td>
                    <td>${addon.price}</td>
                    <td>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(addon.slug)}
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
      </Row> */}
    </>
  )
}

export default CouponScreen
