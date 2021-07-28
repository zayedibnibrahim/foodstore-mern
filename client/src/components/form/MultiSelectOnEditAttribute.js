import React from 'react'
import { Select } from 'antd'
const { Option } = Select

const MultiSelectOnEditAttribute = ({
  attributes,
  attributePrev,
  setAttributePrev,
}) => {
  return (
    <>
      <Select
        mode='multiple'
        style={{ width: '100%' }}
        placeholder='Please select'
        value={attributePrev}
        onChange={(value) => setAttributePrev(value)}
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

export default MultiSelectOnEditAttribute
