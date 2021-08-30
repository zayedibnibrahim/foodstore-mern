import React, { useEffect, useState } from 'react'
import { Form, FormControl, ListGroup } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { listProduct } from '../actions/productActions'
import { LIST_PRODUCT_RESET } from '../constants/productConstants'
const GlobalSearch = () => {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('')

  const productList = useSelector((state) => state.productList)
  const { products } = productList

  useEffect(() => {
    if (searchValue) {
      dispatch(listProduct(searchValue))
    } else {
      dispatch({ type: LIST_PRODUCT_RESET })
    }
  }, [dispatch, searchValue])
  return (
    <>
      <Form className='d-flex' style={{ position: 'relative' }}>
        <FormControl
          type='search'
          placeholder='Search'
          className='mr-2'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {products?.length > 0 && searchValue && (
          <div style={{ position: 'absolute', top: '40px', zIndex: '99' }}>
            <ListGroup>
              {products?.map((pd) => (
                <ListGroup.Item key={pd._id}>{pd.title}</ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
      </Form>
    </>
  )
}

export default GlobalSearch
