import React, { useEffect, useState } from 'react'
import FormContainer from '../../components/FormContainer'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { detailsVariable, updateVariable } from '../../actions/variableActions'
import { useAlert } from 'react-alert'
import {
  VARIABLE_DETAILS_RESET,
  VARIABLE_UPDATE_RESET,
} from '../../constants/variableConstants'
import { listAttribute } from '../../actions/attributeActions'
import MultiSelect from 'react-multi-select-component'

const VariableEditScreen = ({ history, match }) => {
  const alert = useAlert()
  const variableId = match.params.id
  const [label, setLabel] = useState('')
  const [selectedAttribute, setSelectedAttribute] = useState([])
  const dispatch = useDispatch()

  //check logged in user
  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  //show variable list
  const attributeList = useSelector((state) => state.attributeList)
  const { attributes, error: errorListAttribute } = attributeList

  const variableDetails = useSelector((state) => state.variableDetails)
  const { variableData, loading, error } = variableDetails

  const variableUpdate = useSelector((state) => state.variableUpdate)
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = variableUpdate

  useEffect(() => {
    if (userInfo && userInfo.role !== 'admin') {
      history.push('/')
    }
  }, [userInfo, history])

  useEffect(() => {
    if (successUpdate) {
      alert.success('Variable Updated')
      dispatch({ type: VARIABLE_UPDATE_RESET })
      dispatch({ type: VARIABLE_DETAILS_RESET })
      history.push('/admin/variables')
    } else {
      if (!variableData.name || variableData._id !== variableId) {
        dispatch(detailsVariable(variableId))
        dispatch(listAttribute())
      } else {
        setLabel(variableData.name)
        if (variableData.attribute.length > 0) {
          setSelectedAttribute(
            variableData.attribute.map((a) => ({
              label: `${a.name} - ${a.product}`,
              value: a._id,
            }))
          )
        }
      }
    }
  }, [dispatch, history, variableId, variableData, successUpdate, alert])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      updateVariable({
        label,
        attribute: selectedAttribute.map((a) => a.value),
        variableId,
      })
    )
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <Link to='/admin/variables' className='btn btn-dark my-3'>
            Go Back
          </Link>
        </Col>
        <Col>
          {loading && <Loader />}
          {loadingUpdate && <Loader />}
        </Col>
      </Row>

      <FormContainer>
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {errorListAttribute && (
          <Message variant='danger'>{errorListAttribute}</Message>
        )}
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={submitHandler} className='my-5'>
          <Form.Group controlId='label'>
            <Form.Label>Label</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Label'
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='attribute'>
            <Form.Label>Attribute</Form.Label>
            <MultiSelect
              options={attributes.map((a) => ({
                label: `${a.name} - ${a.product}`,
                value: a._id,
              }))}
              value={selectedAttribute}
              onChange={setSelectedAttribute}
              labelledBy='Select Attributes'
              className='product-attributes'
            />
          </Form.Group>
          <Button type='submit' variant='primary' className='my-3'>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default VariableEditScreen
