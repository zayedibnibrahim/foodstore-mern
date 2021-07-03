import React from 'react'
import { Spinner } from 'react-bootstrap'
const Loader = () => {
  return (
    <>
      <Spinner
        animation='grow'
        variant='light'
        style={{ height: '100px', width: '100px' }}
      />
    </>
  )
}

export default Loader
