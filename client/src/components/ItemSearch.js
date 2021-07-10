import React from 'react'

const ItemSearch = ({ setKeyword, keyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }

  return (
    <>
      <input
        type='search'
        onChange={handleSearchChange}
        placeholder='Filter Category'
        value={keyword}
      />
    </>
  )
}

export default ItemSearch
