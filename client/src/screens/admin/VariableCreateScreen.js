import React, { useEffect, useState } from 'react'
import FormContainer from '../../components/FormContainer'
import { Form, Button, Row, Table, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LinkContainer } from 'react-router-bootstrap'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { listAttribute } from '../../actions/attributeActions'
import {
  createVariable,
  deleteVariable,
  listVariable,
} from '../../actions/variableActions'
import ItemSearch from '../../components/ItemSearch'
import MultiSelect from 'react-multi-select-component'

const VariableCreateScreen = ({ history }) => {
  const [label, setLabel] = useState('')
  const [selectedAttribute, setSelectedAttribute] = useState([])
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch()
  //check logged in user
  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  //show attribute list
  const attributeList = useSelector((state) => state.attributeList)
  const { attributes, error: errorListAttribute } = attributeList

  //Create variable list
  const variableCreate = useSelector((state) => state.variableCreate)
  const { loading, success: successCreate, error: errorCreate } = variableCreate

  //Show variable list
  const variableList = useSelector((state) => state.variableList)
  const { loading: loadingList, variables, error: errorList } = variableList

  //Delete variable
  const variableDelete = useSelector((state) => state.variableDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = variableDelete

  useEffect(() => {
    if (userInfo && userInfo.role !== 'admin') {
      history.push('/')
    }
  }, [userInfo, history])

  useEffect(() => {
    dispatch(listAttribute())
    dispatch(listVariable())
    if (successCreate) {
      setLabel('')
      setSelectedAttribute([])
    }
  }, [dispatch, successDelete, successCreate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createVariable({
        name: label,
        attribute: selectedAttribute.map((a) => a.value),
      })
    )
  }
  const deleteHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteVariable(id))
    }
  }

  const searched = (keyword) => (attribute) =>
    attribute.name.toLowerCase().includes(keyword)
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Manage Variable</h1>
        </Col>
        <Col>
          {loading && <Loader />}
          {loadingDelete && <Loader />}
        </Col>
      </Row>
      <Row>
        <FormContainer>
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
              Create
            </Button>
          </Form>
        </FormContainer>
      </Row>
      <Row>
        {errorList && <Message variant='danger'>{errorList}</Message>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {errorListAttribute && (
          <Message variant='danger'>{errorListAttribute}</Message>
        )}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loadingList ? (
          <Loader />
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
                  <th>ATTRIBUTES</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {variables.filter(searched(keyword)).map((variable) => (
                  <tr key={variable._id}>
                    <td>{variable.name}</td>
                    <td>
                      {variable.attribute.map((a) => (
                        <span key={a._id}>
                          {a.name}
                          <br />
                        </span>
                      ))}
                    </td>
                    <td>
                      <LinkContainer
                        to={`/admin/variable/${variable._id}/edit`}
                      >
                        <Button variant='dark' className='btn-sm'>
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(variable._id)}
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

export default VariableCreateScreen
