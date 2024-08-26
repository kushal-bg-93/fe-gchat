import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const CheckAdmin = () => {
    const navigate=useNavigate()
    const cookies = new Cookies(null, { path: '/'});

    useEffect(()=>{
        if(cookies.get('role')=='user') navigate('/chat')
        // if(cookies.get('role')=='admin') navigate('/projects')
    },[])
  return (
    <div></div>
  )
}

export default CheckAdmin