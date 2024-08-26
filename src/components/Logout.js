import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { removeUser } from '../utils/slices/authSlice';
const Logout = () => {

    const dispatch=useDispatch()

    const navigate=useNavigate()
    const cookies = new Cookies(null, { path: '/'});
    const allCookies = cookies.getAll();
    console.log('This is allCookies>>',allCookies)

    useEffect(()=>{
        cookies.remove('token')
        cookies.remove('role')
        cookies.remove('name')
        cookies.remove('id')
        // removeCookies()
        dispatch(removeUser())

        navigate('/')
    },[allCookies])

  return (
    <div>Logout</div>
  )
}

export default Logout