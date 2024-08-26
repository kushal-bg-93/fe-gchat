import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const CheckLogin = () => {
    const navigate=useNavigate()
    const cookies = new Cookies(null, { path: '/'});

    useEffect(()=>{
        if(!cookies.get('token')) navigate('/')
        // if(cookies.get('role')=='admin') navigate('/projects')
    },[])
  return (
    <div></div>
  )
}

export default CheckLogin