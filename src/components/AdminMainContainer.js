import React from 'react'
import CheckAdmin from './CheckAdmin'
import CheckLogin from './CheckLogin'
import { Outlet } from 'react-router-dom'

const AdminMainContainer = () => {
  return (
    <div>
        <CheckLogin/>
        <CheckAdmin/>
        <Outlet/>
    </div>
  )
}

export default AdminMainContainer