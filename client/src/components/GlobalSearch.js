import React from 'react'
import { Form, Button, FormControl } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
const GlobalSearch = () => {
  return (
    <>
      <Form className='d-flex'>
        <FormControl type='search' placeholder='Search' className='mr-2' />
        <Button style={{ backgroundColor: '#ff636a' }}>
          <FontAwesomeIcon icon={faSearch} color='#fff' />
        </Button>
      </Form>
    </>
  )
}

export default GlobalSearch
