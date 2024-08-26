import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { addUser } from '../utils/slices/authSlice';

const Login = () => {
    const dispatch=useDispatch();

    const cookies = new Cookies(null, { path: '/',expires: new Date(Date.now()+259200000) });
    const navigate=useNavigate()

    const [user,SetUser]=useState(null)

    
    useEffect(()=>{
        //add check for admin role and user role
        if(cookies.get('token') ){
            dispatch(addUser(user))
            navigate('/chat')
        }
    })
    const email=useRef()
    const password=useRef()
    const role=useRef()
    const [error,setError]=useState(null)

    const submitLoginHandler=async(e)=>{
        e.preventDefault();

        let loginData=await fetch(process.env.REACT_APP_BACKEND_URL+'/auth/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email?.current?.value,
                password:password?.current?.value,
                role:role?.current?.value
            })
        })

        loginData=await loginData.json()

        if(loginData?.error){
            setError(loginData?.error)
        }else{
            setError(null)
            cookies.set('token',loginData?.result?.token?.token)
            cookies.set('role',loginData?.result?.role)
            cookies.set('id',loginData?.result?._id)
            cookies.set('name',loginData?.result?.name)
            cookies.set('image',loginData?.result?.imageId)
            dispatch(addUser({role:loginData?.result?.role,name:loginData?.result?.name,id:loginData?.result?._id,loginStatus:true}))
            SetUser({role:loginData?.result?.role,name:loginData?.result?.name,id:loginData?.result?._id,loginStatus:true})
            navigate('/chat')
        }

    }
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://www.adobe.com/express/feature/image/remove-background/media_17ddb75ede977959c937fa21a2ce8b7d05d461243.png?width=750&format=png&optimize=medium"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">
          <label className="mr-1">Sign in with</label>
          <button
            type="button"
            className="mx-1 h-9 w-9  rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          >
            <BiLogoFacebook
              size={20}
              className="flex justify-center items-center w-full"
            />
          </button>
          <button
            type="button"
            className="inlne-block mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          >
            <AiOutlineTwitter
              size={20}
              className="flex justify-center items-center w-full"
            />
          </button>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Or
          </p>
        </div>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder="Email Address"
          ref={email}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          placeholder="Password" ref={password}
        />

        <select name="role" ref={role} id="role" className='text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4'>
            <option value="admin">Admin</option>
            <option value="user">User</option>
        </select>
        <div className="mt-4 text-center">
            <label className='text-red-500 text-md font-bold'>{error}</label>
        </div>
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <a
            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit" onClick={(e)=>submitLoginHandler(e)}
          >
            Login
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account?{" "}
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="#"
          >
            Register
          </a>
        </div>
      </div>
    </section>
  )
}

export default Login