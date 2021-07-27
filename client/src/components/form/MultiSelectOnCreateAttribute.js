import React from 'react'
import { Select } from 'antd'
const { Option } = Select

const MultiSelectOnCreateAttribute = ({
  attributes,
  attribute,
  setAttribute,
}) => {
  return (
    <>
      <Select
        mode='multiple'
        style={{ width: '100%' }}
        placeholder='Please select'
        value={attribute}
        onChange={(value) => setAttribute(value)}
      >
        {attributes.length &&
          attributes.map((s) => (
            <Option key={s._id} value={s._id}>
              {s.name}
            </Option>
          ))}
      </Select>
    </>
  )
}

export default MultiSelectOnCreateAttribute
