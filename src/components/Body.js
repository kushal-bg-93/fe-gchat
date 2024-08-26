import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

const Body = () => {
  return (
    <div>
        <Header/>
        <ToastContainer/>
        <Outlet/>
    </div>
  )
}

export default Body