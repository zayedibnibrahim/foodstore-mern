import React from 'react'
import { Select } from 'antd'
const { Option } = Select

const MultiSelect = ({ addons, addon, setAddon }) => {
  return (
    <>
      <Select
        mode='multiple'
        style={{ width: '100%' }}
        placeholder='Please select'
        value={addon}
        onChange={(value) => setAddon(value)}
      >
        {addons.length &&
          addons.map((s) => (
            <Option key={s._id} value={s._id}>
              {s.name}
            </Option>
          ))}
      </Select>
    </>
  )
}

export default MultiSelect
