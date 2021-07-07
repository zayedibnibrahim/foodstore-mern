import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listAddon } from '../actions/addonActions'

const AddonList = () => {
  const dispatch = useDispatch()
  const addonList = useSelector((state) => state.addonList)
  const { addons } = addonList

  useEffect(() => {
    dispatch(listAddon())
  }, [dispatch])
  return (
    <div>
      {addons.map((x) => (
        <p>{x.addon}</p>
      ))}
    </div>
  )
}

export default AddonList
