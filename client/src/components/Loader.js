import React from 'react'
import { Spinner } from 'react-bootstrap'
const Loader = ({ size }) => {
  return (
    <>
      <Spinner
        animation='grow'
        variant='dark'
        // style={{ height: '100px', width: '100px' }}
        className={size}
      />
    </>
  )
}
Loader.defaultProps = {
  size: 'size-md',
}

export default Loader
