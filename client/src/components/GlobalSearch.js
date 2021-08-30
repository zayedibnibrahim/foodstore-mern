import React, { useEffect } from 'react'
import { Form, FormControl, ListGroup } from 'react-bootstrap'

import { useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { listProduct } from '../actions/productActions'
import { LIST_PRODUCT_RESET } from '../constants/productConstants'
const GlobalSearch = ({ products, setSearchValue, searchValue }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (searchValue) {
      dispatch(listProduct(searchValue))
    } else {
      dispatch({ type: LIST_PRODUCT_RESET })
    }
  }, [dispatch, searchValue])
  return (
    <>
      <Form style={{ position: 'relative' }}>
        <FormControl
          type='search'
          placeholder='Search (ex: chicken)'
          className='mr-2'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {products?.length > 0 && searchValue && (
          <div style={{ position: 'absolute', top: '40px', zIndex: '99' }}>
            <ListGroup>
              {products?.map((pd) => (
                <LinkContainer
                  to={`/product/${pd.slug}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => dispatch({ type: LIST_PRODUCT_RESET })}
                >
                  <ListGroup.Item key={pd._id}>{pd.title}</ListGroup.Item>
                </LinkContainer>
              ))}
            </ListGroup>
          </div>
        )}
      </Form>
    </>
  )
}

export default GlobalSearch
