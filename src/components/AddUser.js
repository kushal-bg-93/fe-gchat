import React, { useEffect, useRef, useState } from 'react'
import Cookies from 'universal-cookie'
import { IoBan } from "react-icons/io5";
import { GrValidate } from "react-icons/gr";
import { toast } from 'react-toastify';
import { ImUserPlus } from "react-icons/im";

const AddUser = () => {

    const cookies=new Cookies(null,{path:'/'})
    const token=cookies.get('token')

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState(1)
    const [users,setUsers]=useState([])
    const [modalStatus,setModalStatus]=useState(false)
    const [toggleStatus,setToggleStatus]=useState(false)
    const [modalData,setModalData]=useState(null)

    const [name,setName]=useState(null)
    const [email,setEmail]=useState(null)
    const [id,setId]=useState(null)
    const [verificationStatus,setVerificationStatus]=useState(null)
    const [toDelete,setToDelete]=useState(null)

    const cName=useRef()
    const cEmail=useRef()
    const cPassword=useRef()

    const [createModalStatus,setCreateModalStatus]=useState(false)

    const handleCreateUser=async()=>{
        if(!cEmail.current.value || !cEmail.current.value || !cPassword.current.value){
            return toast.error("Please enter all the details")
        }
        let createUser=await fetch(process.env.REACT_APP_BACKEND_URL+'/admin/createuser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization':token
            },
            body:JSON.stringify({
                name:cName.current.value,
                email:cEmail.current.value,
                password:cPassword.current.value
            })
        })

        createUser=await createUser.json();
        setCurrentPage(1)
        setToggleStatus(!toggleStatus)
        setCreateModalStatus(false)
        toast.success('User '+cName.current.value+' Created!!')
    }

    const handleUpdateUser=async()=>{
        let updateUser=await fetch(process.env.REACT_APP_BACKEND_URL+'/admin/updateuser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization':token
            },
            body:JSON.stringify({
                name:name,
                id:id,
                email:email,
                verificationStatus:verificationStatus,
                toDelete:toDelete
            })
        })

        updateUser=await updateUser.json()
        setToggleStatus(!toggleStatus)
        setModalStatus(false)
        toast.success("User "+name+" updated")
        setCurrentPage(1)
    }

    const handlePrevPage=()=>{
        if(currentPage!=1){
            setCurrentPage(currentPage-1)
        }
        else return;
    }
    const handleNextPage=()=>{
        if(currentPage!=totalPage){
            setCurrentPage(currentPage+1)
        }
    }

    const handleEditClick=(user)=>{
        if(user){

            setModalData(user)
            setName(user?.name)
            setEmail(user?.email)
            setId(user?._id)
            setVerificationStatus(String(user?.verificationStatus))
            setToDelete(user?.isDeleted)
            setModalStatus(true)
        }
    }

    const fetchUers=async()=>{
        let data=await fetch(process.env.REACT_APP_BACKEND_URL+'/admin/viewUsers?pageNo='+currentPage,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'authorization':token
            },
        })

        data=await data.json()
        setTotalPage(Math.ceil(data?.result?.pageData?.total/data?.result?.pageData?.pageSize))
        setUsers(data?.result?.result)
    }

    useEffect(()=>{
        fetchUers();
    },[currentPage,toggleStatus])

    console.log("This is verificationStatus",verificationStatus)
  return (

        

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">

  <ImUserPlus className='m-5 text-2xl cursor-pointer' onClick={()=>setCreateModalStatus(true)}/>

    {modalStatus?<div className='bg-white w-[40%] left-[25%] border border-gray-400 shadow-md p-4 rounded-md absolute flex flex-col gap-3 justify-start'>
    <p className='text-end cursor-pointer font-bold' onClick={()=>setModalStatus(false)}>X</p>

    <div className="flex flex-col gap-2">
    <label htmlFor="name" className=''>Name</label>
    <input type="text" className='border border-gray-300 m-0 p-2 w-full rounded-md text-gray-500' name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)}/>    
    </div>

    <div className="flex flex-col gap-2">
    <label htmlFor="email" className=''>Email</label>
    <input type="text" className='border border-gray-300 m-0 p-2 w-full rounded-md text-gray-500' name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>    
    </div>

    <div className="flex flex-col gap-2">
    <label htmlFor="verify" className='flex items-center gap-2'>Verification Status <div className={`h-2.5 w-2.5 rounded-full me-2 ${verificationStatus=='true'?"bg-green-500":"bg-red-500"} `}></div></label>
    
    <select name="verificationStatus" id="verificationStatus" className='border border-gray-400 p-2 rounded-md text-gray-500' value={verificationStatus} onChange={(e)=>setVerificationStatus(e.target.value)}>
        <option value={'false'}>Not Verify</option>
        <option value={'true'}>Verified</option>
    </select>
       
    </div>

    <div className="flex flex-col gap-2">
    <label htmlFor="activate" className='flex items-center gap-2'>Activate/Deactivate {(toDelete==0)?<GrValidate className='text-green-600'/>:<IoBan className='text-red-500'/>}</label>
    
    <select name="activate" id="activate" className='border border-gray-400 p-2 rounded-md text-gray-500' value={toDelete} onChange={(e)=>setToDelete(e.target.value)}>
        <option value={0}>Activate</option>
        <option value={1}>Deactivate</option>
    </select>
       
    </div>

    <button className='bg-red-500 p-2 rounded-md text-white' onClick={handleUpdateUser}>Update User</button>
    
    </div>:""}


    {createModalStatus?<div className='bg-white w-[40%] left-[25%] border border-gray-400 shadow-md p-4 rounded-md absolute flex flex-col gap-3 justify-start'>
    <p className='text-end cursor-pointer font-bold' onClick={()=>setCreateModalStatus(false)}>X</p>

    <div className="flex flex-col gap-2">
    <label htmlFor="name" className=''>Name</label>
    <input type="text" className='border border-gray-300 m-0 p-2 w-full rounded-md text-gray-500' name="name" id="name" ref={cName}/>    
    </div>

    <div className="flex flex-col gap-2">
    <label htmlFor="email" className=''>Email</label>
    <input type="email" className='border border-gray-300 m-0 p-2 w-full rounded-md text-gray-500' name="email" id="email" ref={cEmail}/>    
    </div>

    <div className="flex flex-col gap-2">
    <label htmlFor="password" className=''>Password</label>
    <input type="password" className='border border-gray-300 m-0 p-2 w-full rounded-md text-gray-500' name="password" id="password" ref={cPassword}/>    
    </div>



    <button className='bg-red-500 p-2 rounded-md text-white' onClick={handleCreateUser}>Create User</button>
    
    </div>:""}


    <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
  
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        {users.length?users.map(user=>{
            return <tbody key={user?._id}>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img className="w-10 h-10 rounded-full" src={user?.imageId} alt="Jese image"/>
                    <div className="ps-3">
                        <div className="text-base flex items-center gap-4 font-semibold">.{user?.name} {user?.isDeleted?<IoBan className='text-red-500'/>:<GrValidate className='text-green-600'/>}</div>
                        <div className="font-normal text-gray-500">{user?._id}</div>
                    </div> 
                    
                </th>
                <td className="px-6 py-4">
                    {user?.email}
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className={`h-2.5 w-2.5 rounded-full me-2 ${user.verificationStatus?"bg-green-500":"bg-red-500"}`}></div> {user.verificationStatus?"Verified":"Not Verified"}
                    </div>
                </td>
                <td className="px-6 py-4">
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={()=>handleEditClick(user)}>Edit user</button>
                </td>
            </tr>
    
        </tbody>
        }):<p>No Data to Display</p>}
        
    </table>
</div>

<div className="flex gap-1 justify-between mx-20">
    <p className={`${currentPage==1?"text-gray-400 cursor-not-allowed":"cursor-pointer text-sky-600"} text-5xl`} onClick={()=>handlePrevPage()}>{"<"}</p>
    <p className={`${currentPage==totalPage?"text-gray-400 cursor-not-allowed":"cursor-pointer text-sky-600"} text-5xl `} onClick={()=>handleNextPage()}>{">"}</p>
</div>


    </div>
  )
}

export default AddUser